import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const rows = db.prepare('SELECT * FROM jobs ORDER BY created_at DESC').all() as any[];

    const jobs = rows.map((j) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      experience: j.experience,
      description: j.description,
      requirements: JSON.parse(j.requirements || '[]'),
      responsibilities: JSON.parse(j.responsibilities || '[]'),
      salary_range: j.salary_range,
      is_active: Boolean(j.is_active),
      created_at: j.created_at,
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Admin jobs GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
      type = 'Full-time',
      experience = '3+ years',
      description,
      requirements = [],
      responsibilities = [],
      salary_range = '',
      is_active = 1,
    } = body;

    if (!title || !department || !location || !description) {
      return NextResponse.json(
        { error: 'Title, department, location, and description are required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO jobs (
        title, department, location, type, experience, description, requirements, responsibilities, salary_range, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title.trim(),
      department.trim(),
      location.trim(),
      type,
      experience,
      description.trim(),
      JSON.stringify(Array.isArray(requirements) ? requirements : []),
      JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      salary_range || null,
      is_active ? 1 : 0
    );

    return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (error) {
    console.error('Admin jobs POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
