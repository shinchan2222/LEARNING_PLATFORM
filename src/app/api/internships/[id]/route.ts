import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const internship = db.getInternshipById(params.id);
    if (!internship) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }
    return NextResponse.json({ internship });
  } catch (error) {
    console.error('Fetch internship detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch internship' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updates = await req.json();
    const updated = db.updateInternship(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }
    return NextResponse.json({ internship: updated, success: true });
  } catch (error) {
    console.error('Update internship error:', error);
    return NextResponse.json({ error: 'Failed to update internship' }, { status: 500 });
  }
}
