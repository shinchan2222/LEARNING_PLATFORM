import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateCredentialId, generateId } from '@/lib/utils';
import { Certificate } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const credentialId = searchParams.get('credentialId');

    if (credentialId) {
      const cert = db.getCertificateById(credentialId);
      if (!cert) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
      }
      return NextResponse.json({ certificate: cert });
    }

    let certificates = db.getCertificates();
    if (userId) {
      certificates = certificates.filter((c) => c.userId === userId);
    }

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Fetch certificates error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { applicationId, internshipId, userId, studentName, grade } = body;

    const internship = db.getInternshipById(internshipId);
    const student = db.getUserById(userId);

    if (!internship || !student) {
      return NextResponse.json({ error: 'Internship or student not found' }, { status: 404 });
    }

    const credentialId = generateCredentialId();
    const cert: Certificate = {
      id: generateId('cert'),
      credentialId,
      applicationId: applicationId || `app_${internshipId}_${userId}`,
      internshipId,
      userId,
      studentName: studentName || student.name,
      internshipTitle: internship.title,
      domain: internship.domain,
      durationWeeks: internship.durationWeeks,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      grade: grade || 'Grade A+ (Distinction)',
      instructorName: internship.instructor.name,
      instructorTitle: internship.instructor.title,
      verificationUrl: `https://cs-internships.edu/verify/${credentialId}`
    };

    const saved = db.createCertificate(cert);
    return NextResponse.json({ certificate: saved, success: true }, { status: 201 });
  } catch (error) {
    console.error('Generate certificate error:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}
