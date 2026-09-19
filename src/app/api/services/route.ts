import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

function parseFeatures(row: Record<string, unknown>) {
  try { return { ...row, features: JSON.parse(row.features as string) }; } catch { return row; }
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM services ORDER BY order_index ASC').all();
    return NextResponse.json(rows.map(r => parseFeatures(r as Record<string, unknown>)));
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
    if (!body.short_desc || typeof body.short_desc !== 'string' || body.short_desc.trim() === '') {
      return NextResponse.json({ error: 'Short description is required' }, { status: 400 });
    }
    if (!body.description || typeof body.description !== 'string' || body.description.trim() === '') {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT MAX(order_index) FROM services), -1) + 1)
    `).run(
      body.icon || 'Code2',
      body.title,
      body.short_desc,
      body.description,
      JSON.stringify(body.features || []),
      body.color || '#0B63E5',
      body.light_color || '#EFF6FF'
    );
    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
