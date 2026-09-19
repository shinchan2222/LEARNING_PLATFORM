import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getDb } from './db';

const secret = process.env.JWT_SECRET;
if (!secret && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ Warning: JWT_SECRET environment variable is not set. Using default secret. Please set JWT_SECRET in production.');
}
const SECRET = new TextEncoder().encode(
  secret || 'devops-super-secret-jwt-key-2024-change-in-production'
);
const COOKIE_NAME = 'devops_admin_token';
const TOKEN_EXPIRY = '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { id: number; email: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<{ id: number; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: number; email: string };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<{ id: number; email: string } | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const session = await verifyToken(token);
    if (!session) return null;
    
    const db = getDb();
    const user = db.prepare('SELECT id FROM admin_users WHERE id = ?').get(session.id);
    if (!user) return null;
    
    return session;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
