import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    const rows = session
      ? getDb().prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all()
      : getDb().prepare('SELECT * FROM blog_posts WHERE published=1 ORDER BY created_at DESC').all();
    return NextResponse.json(rows);
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
    if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const slug = body.slug || (body.title ? body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
    if (!slug) return NextResponse.json({ error: 'Title or slug is required' }, { status: 400 });

    try {
      const result = getDb().prepare(
        'INSERT INTO blog_posts (title, slug, excerpt, content, published) VALUES (?, ?, ?, ?, ?)'
      ).run(body.title, slug, body.excerpt, body.content, body.published ? 1 : 0);
      
      return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
    } catch (dbError: any) {
      if (dbError.code === 'SQLITE_CONSTRAINT_UNIQUE' || (dbError.message && dbError.message.includes('UNIQUE'))) {
        return NextResponse.json({ error: 'Conflict: slug already exists' }, { status: 409 });
      }
      throw dbError;
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
