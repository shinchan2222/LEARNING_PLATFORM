import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const isSecure = req.headers.get('x-forwarded-proto') === 'https' || req.nextUrl.protocol === 'https:';
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, '', { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'lax',
      maxAge: 0, 
      path: '/' 
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
