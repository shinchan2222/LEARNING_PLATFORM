import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { Application } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let applications = db.getApplications();
    if (userId) {
      applications = applications.filter((a) => a.userId === userId);
    }

    // Enrich applications with internship info and user info
    const enriched = applications.map((app) => {
      const internship = db.getInternshipById(app.internshipId);
      const user = db.getUserById(app.userId);
      const submissions = db.getSubmissions().filter((s) => s.applicationId === app.id);
      return {
        ...app,
        internship,
        user: user ? { id: user.id, name: user.name, email: user.email, avatar: user.avatar, college: user.college } : null,
        submissionsCount: submissions.length,
        approvedSubmissionsCount: submissions.filter((s) => s.status === 'approved').length
      };
    });

    return NextResponse.json({ applications: enriched });
  } catch (error) {
    console.error('Fetch applications error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { internshipId, userId } = body;

    if (!internshipId || !userId) {
      return NextResponse.json({ error: 'InternshipId and userId are required' }, { status: 400 });
    }

    const internship = db.getInternshipById(internshipId);
    if (!internship) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }

    // Check if already applied
    const existing = db.getApplications().find((a) => a.userId === userId && a.internshipId === internshipId);
    if (existing) {
      return NextResponse.json({ application: existing, message: 'Already applied' });
    }

    const newApp: Application = {
      id: generateId('app'),
      internshipId,
      userId,
      appliedAt: new Date().toISOString(),
      paymentStatus: 'pending',
      status: 'pending_payment'
    };

    const saved = db.createApplication(newApp);
    return NextResponse.json({ application: saved, success: true }, { status: 201 });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ error: 'Failed to apply' }, { status: 500 });
  }
}
