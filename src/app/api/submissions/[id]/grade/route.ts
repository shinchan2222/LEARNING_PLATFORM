import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateCredentialId, generateId } from '@/lib/utils';
import { Certificate } from '@/types';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { score, feedback, status = 'approved', gradedBy = 'Dr. Aris Thorne' } = body;

    const submission = db.getSubmissions().find((s) => s.id === params.id);
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const updated = db.updateSubmission(params.id, {
      score: Number(score),
      feedback: feedback ? feedback.trim() : 'Approved by professor.',
      status,
      gradedAt: new Date().toISOString(),
      gradedBy
    });

    // Check if student has finished all required weeks for this internship
    let certificateIssued: Certificate | null = null;
    if (status === 'approved') {
      const internship = db.getInternshipById(submission.internshipId);
      const student = db.getUserById(submission.userId);
      const app = db.getApplicationById(submission.applicationId) || 
                  db.getApplications().find((a) => a.userId === submission.userId && a.internshipId === submission.internshipId);

      if (internship && student && app) {
        const studentSubmissions = db.getSubmissions().filter(
          (s) => s.applicationId === app.id && s.status === 'approved'
        );

        // If student passed all required modules (or at least 2 key milestones in demo)
        const totalWeeks = internship.syllabus.length || internship.durationWeeks;
        if (studentSubmissions.length >= totalWeeks) {
          const avgScore = Math.round(
            studentSubmissions.reduce((acc, curr) => acc + (curr.score || 0), 0) / studentSubmissions.length
          );

          const gradeStr = avgScore >= 95 
            ? 'Grade A+ (Distinction - Top 5%)'
            : avgScore >= 85
            ? 'Grade A (Honors)'
            : 'Grade B+ (Merit)';

          db.updateApplication(app.id, {
            status: 'completed',
            finalGrade: gradeStr,
            completedAt: new Date().toISOString()
          });

          // Generate Certificate
          const credentialId = generateCredentialId();
          const newCert: Certificate = {
            id: generateId('cert'),
            credentialId,
            applicationId: app.id,
            internshipId: internship.id,
            userId: student.id,
            studentName: student.name,
            internshipTitle: internship.title,
            domain: internship.domain,
            durationWeeks: internship.durationWeeks,
            issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            grade: gradeStr,
            instructorName: internship.instructor.name,
            instructorTitle: internship.instructor.title,
            verificationUrl: `https://cs-internships.edu/verify/${credentialId}`
          };

          certificateIssued = db.createCertificate(newCert);
        }
      }
    }

    return NextResponse.json({
      success: true,
      submission: updated,
      certificateIssued
    });
  } catch (error) {
    console.error('Grading error:', error);
    return NextResponse.json({ error: 'Failed to grade submission' }, { status: 500 });
  }
}
