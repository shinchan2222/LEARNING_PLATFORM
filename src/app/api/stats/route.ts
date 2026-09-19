import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    return NextResponse.json(getDb().prepare('SELECT * FROM stats ORDER BY order_index ASC').all());
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

    if (!body.value || typeof body.value !== 'string' || body.value.trim() === '') {
      return NextResponse.json({ error: 'Value is required' }, { status: 400 });
    }
    if (!body.label || typeof body.label !== 'string' || body.label.trim() === '') {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const result = getDb().prepare('INSERT INTO stats (value, label, order_index) VALUES (?, ?, COALESCE((SELECT MAX(order_index) FROM stats), -1) + 1)')
      .run(body.value, body.label);
      
    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
