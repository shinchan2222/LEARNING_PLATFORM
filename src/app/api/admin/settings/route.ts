import { NextRequest, NextResponse } from 'next/server';
import { getSession, hashPassword, verifyPassword, signToken, COOKIE_NAME } from '@/lib/auth';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const user = db.prepare('SELECT id, email, created_at FROM admin_users WHERE id = ?').get(session.id) as {
      id: number;
      email: string;
      created_at: string;
    } | undefined;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { currentPassword, newPassword, email } = body;

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required to make changes' }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(session.id) as {
      id: number;
      email: string;
      password_hash: string;
    } | undefined;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await verifyPassword(currentPassword, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    let updatedEmail = user.email;
    let updatedHash = user.password_hash;

    // Handle email change
    if (email && email.trim() !== '' && email !== user.email) {
      const emailTrimmed = email.trim().toLowerCase();
      // Check if email is already taken by another admin
      const existing = db.prepare('SELECT id FROM admin_users WHERE email = ? AND id != ?').get(emailTrimmed, user.id);
      if (existing) {
        return NextResponse.json({ error: 'Email is already in use by another account' }, { status: 409 });
      }
      updatedEmail = emailTrimmed;
    }

    // Handle password change
    if (newPassword && newPassword.trim() !== '') {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
      }
      updatedHash = await hashPassword(newPassword);
    }

    // Update in database
    db.prepare('UPDATE admin_users SET email = ?, password_hash = ? WHERE id = ?').run(
      updatedEmail,
      updatedHash,
      user.id
    );

    // Issue updated token if email changed
    const newToken = await signToken({ id: user.id, email: updatedEmail });
    const response = NextResponse.json({
      success: true,
      message: 'Account settings updated successfully',
      email: updatedEmail,
    });

    const isSecure = req.headers.get('x-forwarded-proto') === 'https' || req.nextUrl.protocol === 'https:';
    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
