import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyPassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    const db = getDb();
    const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as
      | { id: number; email: string; password_hash: string }
      | undefined;
      
    const dummyHash = '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012';
    const valid = await verifyPassword(password, user ? user.password_hash : dummyHash);
    
    if (!user || !valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = await signToken({ id: user.id, email: user.email });
    const isSecure = req.headers.get('x-forwarded-proto') === 'https' || req.nextUrl.protocol === 'https:';
    const res = NextResponse.json({ success: true, email: user.email });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
