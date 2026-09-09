import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { User } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role = 'student', college, headline } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const newUser: User = {
      id: generateId('usr'),
      name,
      email,
      password: password || 'password123',
      role: role as 'student' | 'admin',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      college: college || 'Computer Science Department',
      headline: headline || `${role === 'admin' ? 'Faculty Instructor' : 'CS Student & Intern'}`,
      joinedAt: new Date().toISOString()
    };

    db.createUser(newUser);

    const res = NextResponse.json({ user: newUser, success: true }, { status: 201 });
    res.cookies.set('user_session', JSON.stringify({ id: newUser.id, role: newUser.role }), {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
