import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.headers.set('Cache-Control', 'no-store');
      return res;
    }
    const res = NextResponse.json({ id: session.id, email: session.email });
    res.headers.set('Cache-Control', 'no-store');
    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
