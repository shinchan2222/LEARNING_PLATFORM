import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { PaymentDetails } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { applicationId, internshipId, userId, paymentMethod = 'Razorpay UPI' } = body;

    if (!internshipId || !userId) {
      return NextResponse.json({ error: 'Missing payment parameters' }, { status: 400 });
    }

    const internship = db.getInternshipById(internshipId);
    if (!internship) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }

    let application = applicationId ? db.getApplicationById(applicationId) : null;
    if (!application) {
      application = db.getApplications().find((a) => a.userId === userId && a.internshipId === internshipId) || null;
    }

    const receiptNumber = `RCP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const transactionId = `TXN_SIM_${Math.random().toString(36).substring(2, 10).toUpperCase()}_${Date.now().toString().slice(-4)}`;

    const paymentDetails: PaymentDetails = {
      transactionId,
      method: paymentMethod,
      amount: internship.fee,
      currency: 'USD',
      paidAt: new Date().toISOString(),
      receiptNumber
    };

    if (application) {
      application = db.updateApplication(application.id, {
        paymentStatus: 'paid',
        status: 'enrolled',
        paymentDetails
      });
    } else {
      application = db.createApplication({
        id: `app_${Math.random().toString(36).substring(2, 9)}`,
        internshipId,
        userId,
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid',
        status: 'enrolled',
        paymentDetails
      });
    }

    // Decrement seatsLeft if available
    if (internship.seatsLeft > 0) {
      db.updateInternship(internship.id, {
        seatsLeft: Math.max(0, internship.seatsLeft - 1)
      });
    }

    return NextResponse.json({
      success: true,
      application,
      receipt: paymentDetails,
      message: 'Payment verified and student successfully enrolled!'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
