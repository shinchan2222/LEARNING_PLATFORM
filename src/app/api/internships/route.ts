import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { Internship } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const search = searchParams.get('search')?.toLowerCase();
    const level = searchParams.get('level');

    let list = db.getInternships();

    if (domain && domain !== 'All') {
      list = list.filter((i) => i.domain === domain);
    }

    if (level && level !== 'All') {
      list = list.filter((i) => i.level === level);
    }

    if (search) {
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(search) ||
          i.description.toLowerCase().includes(search) ||
          i.skills.some((s) => s.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({ internships: list });
  } catch (error) {
    console.error('Fetch internships error:', error);
    return NextResponse.json({ error: 'Failed to fetch internships' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      domain,
      durationWeeks,
      fee,
      level,
      description,
      highlights,
      prerequisites,
      skills,
      syllabus,
      seatsTotal
    } = body;

    if (!title || !domain || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newInternship: Internship = {
      id: generateId('int'),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      domain,
      durationWeeks: Number(durationWeeks) || 6,
      fee: Number(fee) || 199,
      level: level || 'Intermediate',
      description,
      highlights: highlights || [
        'Hands-on industry capstone project',
        'Direct 1-on-1 code reviews by Dr. Thorne',
        'Formal certificate and verification ID'
      ],
      prerequisites: prerequisites || ['Foundational programming skills'],
      skills: skills || ['Computer Science', 'Software Engineering'],
      instructor: {
        name: 'Dr. Aris Thorne',
        title: 'Principal Research Scientist & Professor of CS',
        institution: 'Stanford AI & Systems Lab',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        bio: 'Dr. Thorne directs cutting-edge research in distributed deep learning systems and teaches advanced CS courses.'
      },
      syllabus: syllabus || [
        {
          week: 1,
          title: 'System Foundations & Architectural Patterns',
          description: 'Core design principles and environment setup.',
          deliverables: 'Week 1 starter prototype with automated tests.'
        }
      ],
      seatsTotal: Number(seatsTotal) || 30,
      seatsLeft: Number(seatsTotal) || 30,
      isOpen: true,
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rating: 5.0,
      reviewsCount: 1
    };

    const saved = db.createInternship(newInternship);
    return NextResponse.json({ internship: saved, success: true }, { status: 201 });
  } catch (error) {
    console.error('Create internship error:', error);
    return NextResponse.json({ error: 'Failed to create internship' }, { status: 500 });
  }
}
