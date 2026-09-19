import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    return NextResponse.json(getDb().prepare('SELECT * FROM testimonials ORDER BY id ASC').all());
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!body.quote || typeof body.quote !== 'string' || body.quote.trim() === '') {
      return NextResponse.json({ error: 'Quote is required' }, { status: 400 });
    }
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.role || typeof body.role !== 'string' || body.role.trim() === '') {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }
    if (!body.initials || typeof body.initials !== 'string' || body.initials.trim() === '') {
      return NextResponse.json({ error: 'Initials are required' }, { status: 400 });
    }

    const result = getDb().prepare(
      'INSERT INTO testimonials (quote, name, role, initials, rating, color) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(body.quote, body.name, body.role, body.initials, body.rating || 5, body.color || '#0B63E5');
    
    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
