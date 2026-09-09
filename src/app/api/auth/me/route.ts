import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('user_session');

    if (!sessionCookie?.value) {
      // Return default guest or default student for easy first-time experience
      const defaultStudent = db.getUserById('usr_student_1');
      return NextResponse.json({ user: defaultStudent || null, authenticated: !!defaultStudent });
    }

    try {
      const session = JSON.parse(sessionCookie.value);
      const user = db.getUserById(session.id);
      if (!user) {
        return NextResponse.json({ user: null, authenticated: false });
      }
      return NextResponse.json({ user, authenticated: true });
    } catch {
      return NextResponse.json({ user: null, authenticated: false });
    }
  } catch (error) {
    console.error('Me auth error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
