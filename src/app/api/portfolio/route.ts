import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

function parseTech(row: Record<string, unknown>) {
  try { return { ...row, tech: JSON.parse(row.tech as string) }; } catch { return row; }
}

export async function GET() {
  try {
    const rows = getDb().prepare('SELECT * FROM portfolio ORDER BY id ASC').all();
    return NextResponse.json(rows.map(r => parseTech(r as Record<string, unknown>)));
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

    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!body.category || typeof body.category !== 'string' || body.category.trim() === '') {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!body.description || typeof body.description !== 'string' || body.description.trim() === '') {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const result = getDb().prepare(
      'INSERT INTO portfolio (title, category, description, tech, color) VALUES (?, ?, ?, ?, ?)'
    ).run(body.title, body.category, body.description, JSON.stringify(body.tech || []), body.color || '#0B63E5');
    
    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
