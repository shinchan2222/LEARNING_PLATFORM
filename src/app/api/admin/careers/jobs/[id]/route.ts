import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements,
      responsibilities,
      salary_range,
      is_active,
    } = body;

    const db = getDb();
    const existing = db.prepare('SELECT id FROM jobs WHERE id = ?').get(id);
    if (!existing) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    db.prepare(`
      UPDATE jobs SET
        title = COALESCE(?, title),
        department = COALESCE(?, department),
        location = COALESCE(?, location),
        type = COALESCE(?, type),
        experience = COALESCE(?, experience),
        description = COALESCE(?, description),
        requirements = CASE WHEN ? IS NOT NULL THEN ? ELSE requirements END,
        responsibilities = CASE WHEN ? IS NOT NULL THEN ? ELSE responsibilities END,
        salary_range = COALESCE(?, salary_range),
        is_active = CASE WHEN ? IS NOT NULL THEN ? ELSE is_active END
      WHERE id = ?
    `).run(
      title ? title.trim() : null,
      department ? department.trim() : null,
      location ? location.trim() : null,
      type || null,
      experience || null,
      description ? description.trim() : null,
      requirements ? JSON.stringify(requirements) : null,
      requirements ? JSON.stringify(requirements) : null,
      responsibilities ? JSON.stringify(responsibilities) : null,
      responsibilities ? JSON.stringify(responsibilities) : null,
      salary_range || null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin job PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const db = getDb();
    const result = db.prepare('DELETE FROM jobs WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin job DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
