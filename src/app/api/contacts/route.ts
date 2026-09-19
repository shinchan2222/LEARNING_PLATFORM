import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json(getDb().prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.email || typeof body.email !== 'string' || body.email.trim() === '') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!body.message || typeof body.message !== 'string' || body.message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const result = getDb().prepare(
      'INSERT INTO contacts (name, email, service, message) VALUES (?, ?, ?, ?)'
    ).run(body.name, body.email, body.service || '', body.message);
    
    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
