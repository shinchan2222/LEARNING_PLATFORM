import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const internships = db.getInternships();
    const applications = db.getApplications();
    const submissions = db.getSubmissions();
    const certificates = db.getCertificates();
    const users = db.getUsers();

    const totalStudents = users.filter((u) => u.role === 'student').length;
    const enrolledStudents = applications.filter((a) => a.status === 'enrolled' || a.status === 'completed').length;
    
    // Revenue calculated from paid applications
    const totalRevenue = applications.reduce((sum, app) => {
      if (app.paymentStatus === 'paid' && app.paymentDetails) {
        return sum + (app.paymentDetails.amount || 0);
      }
      return sum;
    }, 0);

    const pendingSubmissions = submissions.filter((s) => s.status === 'under_review').length;
    const gradedSubmissions = submissions.filter((s) => s.status === 'approved' || s.status === 'revision_requested').length;
    const completedCertificates = certificates.length;

    return NextResponse.json({
      stats: {
        totalInternships: internships.length,
        activeInternships: internships.filter((i) => i.isOpen).length,
        totalStudents,
        enrolledStudents,
        totalRevenue,
        pendingSubmissions,
        gradedSubmissions,
        completedCertificates
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
