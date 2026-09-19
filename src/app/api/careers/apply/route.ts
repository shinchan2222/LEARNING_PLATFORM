import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const {
      job_id,
      job_title,
      name,
      full_name,
      email,
      phone,
      linkedin,
      portfolio,
      cover_letter,
      resume_url,
    } = body;

    const applicantName = (name || full_name || '').trim();
    if (!applicantName) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const db = getDb();
    let resolvedJobTitle = (job_title || '').trim();
    if (!resolvedJobTitle && job_id) {
      const job = db.prepare('SELECT title FROM jobs WHERE id = ?').get(job_id) as { title: string } | undefined;
      if (job) resolvedJobTitle = job.title;
    }

    if (!resolvedJobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }
    const result = db.prepare(`
      INSERT INTO job_applications (
        job_id, job_title, name, email, phone, linkedin, portfolio, cover_letter, resume_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).run(
      job_id || null,
      resolvedJobTitle,
      applicantName,
      email.trim(),
      phone ? phone.trim() : null,
      linkedin ? linkedin.trim() : null,
      portfolio ? portfolio.trim() : null,
      cover_letter ? cover_letter.trim() : null,
      resume_url ? resume_url.trim() : null
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Application received successfully! Our talent team will review your profile.',
        id: Number(result.lastInsertRowid),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting job application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
