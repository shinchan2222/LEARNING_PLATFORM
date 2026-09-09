import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, role, demoUserId } = body;

    let user;

    if (demoUserId) {
      user = db.getUserById(demoUserId);
    } else if (email) {
      user = db.getUserByEmail(email);
    } else if (role) {
      user = db.getUsers().find((u) => u.role === role);
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const res = NextResponse.json({ user, success: true });
    // set simple session cookie
    res.cookies.set('user_session', JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: false, // accessible to client for fast state hydrate
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
