import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC').all() as any[];

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
      created_at: j.created_at,
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
