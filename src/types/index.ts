export type Role = 'admin' | 'student';

export type Domain = 
  | 'AI/ML'
  | 'Full Stack Development'
  | 'Cloud & DevOps'
  | 'Cybersecurity'
  | 'Data Science';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  avatar: string;
  college?: string;
  headline?: string;
  joinedAt: string;
}

export interface SyllabusModule {
  week: number;
  title: string;
  description: string;
  deliverables: string;
  resources?: {
    label: string;
    url: string;
    type: 'doc' | 'video' | 'repo';
  }[];
}

export interface Internship {
  id: string;
  title: string;
  slug: string;
  domain: Domain;
  durationWeeks: number;
  fee: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  highlights: string[];
  prerequisites: string[];
  skills: string[];
  instructor: {
    name: string;
    title: string;
    institution: string;
    avatar: string;
    bio: string;
  };
  syllabus: SyllabusModule[];
  seatsTotal: number;
  seatsLeft: number;
  isOpen: boolean;
  startDate: string;
  rating: number;
  reviewsCount: number;
}

export interface PaymentDetails {
  transactionId: string;
  method: string;
  amount: number;
  currency: string;
  paidAt: string;
  receiptNumber: string;
}

export interface Application {
  id: string;
  internshipId: string;
  userId: string;
  appliedAt: string;
  paymentStatus: 'pending' | 'paid' | 'waived';
  paymentDetails?: PaymentDetails;
  status: 'pending_payment' | 'enrolled' | 'completed' | 'rejected';
  finalGrade?: string;
  completedAt?: string;
}

export interface Submission {
  id: string;
  applicationId: string;
  internshipId: string;
  userId: string;
  weekNumber: number;
  taskTitle: string;
  githubUrl: string;
  liveUrl?: string;
  notes?: string;
  submittedAt: string;
  status: 'under_review' | 'approved' | 'revision_requested';
  score?: number; // 0-100
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface Certificate {
  id: string;
  credentialId: string;
  applicationId: string;
  internshipId: string;
  userId: string;
  studentName: string;
  internshipTitle: string;
  domain: Domain;
  durationWeeks: number;
  issueDate: string;
  grade: string;
  instructorName: string;
  instructorTitle: string;
  verificationUrl: string;
}

export interface DatabaseSchema {
  users: User[];
  internships: Internship[];
  applications: Application[];
  submissions: Submission[];
  certificates: Certificate[];
}
