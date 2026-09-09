import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { Submission } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const internshipId = searchParams.get('internshipId');
    const applicationId = searchParams.get('applicationId');

    let submissions = db.getSubmissions();

    if (userId) {
      submissions = submissions.filter((s) => s.userId === userId);
    }
    if (internshipId) {
      submissions = submissions.filter((s) => s.internshipId === internshipId);
    }
    if (applicationId) {
      submissions = submissions.filter((s) => s.applicationId === applicationId);
    }

    // Enrich with student and internship info
    const enriched = submissions.map((sub) => {
      const student = db.getUserById(sub.userId);
      const internship = db.getInternshipById(sub.internshipId);
      return {
        ...sub,
        student: student ? { id: student.id, name: student.name, email: student.email, avatar: student.avatar, college: student.college } : null,
        internship: internship ? { id: internship.id, title: internship.title, domain: internship.domain } : null
      };
    });

    return NextResponse.json({ submissions: enriched });
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      applicationId,
      internshipId,
      userId,
      weekNumber,
      taskTitle,
      githubUrl,
      liveUrl,
      notes
    } = body;

    if (!internshipId || !userId || !githubUrl || !weekNumber) {
      return NextResponse.json({ error: 'Missing required submission fields' }, { status: 400 });
    }

    // Simple validation on github url
    if (!githubUrl.includes('github.com')) {
      return NextResponse.json({ error: 'Please enter a valid GitHub repository URL' }, { status: 400 });
    }

    const newSubmission: Submission = {
      id: generateId('sub'),
      applicationId: applicationId || `app_${internshipId}_${userId}`,
      internshipId,
      userId,
      weekNumber: Number(weekNumber),
      taskTitle: taskTitle || `Week ${weekNumber} Milestone Assignment`,
      githubUrl: githubUrl.trim(),
      liveUrl: liveUrl ? liveUrl.trim() : undefined,
      notes: notes ? notes.trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'under_review'
    };

    const saved = db.createSubmission(newSubmission);
    return NextResponse.json({ submission: saved, success: true }, { status: 201 });
  } catch (error) {
    console.error('Submission create error:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}
