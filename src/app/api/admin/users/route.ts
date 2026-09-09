import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const query = searchParams.get('q')?.toLowerCase();

    let users = db.getUsers();
    const applications = db.getApplications();
    const submissions = db.getSubmissions();
    const certificates = db.getCertificates();

    if (role && (role === 'admin' || role === 'student')) {
      users = users.filter((u) => u.role === role);
    }

    if (query) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.college && u.college.toLowerCase().includes(query)) ||
          u.id.toLowerCase().includes(query)
      );
    }

    // Enrich users with enrollment, submission, and credential statistics
    const enrichedUsers = users.map((u) => {
      const userApps = applications.filter((a) => a.userId === u.id);
      const userSubs = submissions.filter((s) => s.userId === u.id);
      const userCerts = certificates.filter((c) => c.userId === u.id);

      const enrolledCount = userApps.filter(
        (a) => a.status === 'enrolled' || a.status === 'completed'
      ).length;

      const approvedSubmissions = userSubs.filter((s) => s.status === 'approved').length;

      const totalPaid = userApps.reduce((sum, a) => {
        if (a.paymentStatus === 'paid' && a.paymentDetails?.amount) {
          return sum + a.paymentDetails.amount;
        }
        return sum;
      }, 0);

      // Exclude password for security
      const { password, ...safeUser } = u;

      return {
        ...safeUser,
        enrolledCount,
        applicationsCount: userApps.length,
        submissionsCount: userSubs.length,
        approvedSubmissionsCount: approvedSubmissions,
        certificatesCount: userCerts.length,
        totalPaid,
        applications: userApps.map((a) => ({
          id: a.id,
          internshipId: a.internshipId,
          status: a.status,
          paymentStatus: a.paymentStatus,
          internshipTitle: db.getInternshipById(a.internshipId)?.title || 'Unknown Cohort'
        }))
      };
    });

    return NextResponse.json({
      users: enrichedUsers,
      totalCount: enrichedUsers.length,
      studentCount: enrichedUsers.filter((u) => u.role === 'student').length,
      adminCount: enrichedUsers.filter((u) => u.role === 'admin').length
    });
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json({ error: 'Failed to fetch user accounts' }, { status: 500 });
  }
}
