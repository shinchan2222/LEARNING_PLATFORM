import fs from 'fs';
import path from 'path';
import { DatabaseSchema, User, Internship, Application, Submission, Certificate } from '@/types';
import { initialData } from '@/data/initialData';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// In-memory fallback
let memoryDb: DatabaseSchema = JSON.parse(JSON.stringify(initialData));

export function getDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryDb = parsed;
    return parsed;
  } catch (err) {
    console.error('Error reading file db, using memory fallback:', err);
    return memoryDb;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  memoryDb = data;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db to file:', err);
  }
}

// Helper query and mutation functions
export const db = {
  get: getDatabase,
  save: saveDatabase,

  // Users
  getUsers: () => getDatabase().users,
  getUserById: (id: string) => getDatabase().users.find((u) => u.id === id),
  getUserByEmail: (email: string) => getDatabase().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (user: User) => {
    const data = getDatabase();
    data.users.push(user);
    saveDatabase(data);
    return user;
  },

  // Internships
  getInternships: () => getDatabase().internships,
  getInternshipById: (id: string) => getDatabase().internships.find((i) => i.id === id || i.slug === id),
  createInternship: (internship: Internship) => {
    const data = getDatabase();
    data.internships.unshift(internship);
    saveDatabase(data);
    return internship;
  },
  updateInternship: (id: string, updates: Partial<Internship>) => {
    const data = getDatabase();
    const index = data.internships.findIndex((i) => i.id === id);
    if (index === -1) return null;
    data.internships[index] = { ...data.internships[index], ...updates };
    saveDatabase(data);
    return data.internships[index];
  },

  // Applications
  getApplications: () => getDatabase().applications,
  getApplicationById: (id: string) => getDatabase().applications.find((a) => a.id === id),
  getApplicationsByUserId: (userId: string) => getDatabase().applications.filter((a) => a.userId === userId),
  createApplication: (app: Application) => {
    const data = getDatabase();
    // check if already applied
    const existingIndex = data.applications.findIndex((a) => a.userId === app.userId && a.internshipId === app.internshipId);
    if (existingIndex >= 0) {
      data.applications[existingIndex] = { ...data.applications[existingIndex], ...app };
      saveDatabase(data);
      return data.applications[existingIndex];
    }
    data.applications.unshift(app);
    saveDatabase(data);
    return app;
  },
  updateApplication: (id: string, updates: Partial<Application>) => {
    const data = getDatabase();
    const index = data.applications.findIndex((a) => a.id === id);
    if (index === -1) return null;
    data.applications[index] = { ...data.applications[index], ...updates };
    saveDatabase(data);
    return data.applications[index];
  },

  // Submissions
  getSubmissions: () => getDatabase().submissions,
  getSubmissionsByUserId: (userId: string) => getDatabase().submissions.filter((s) => s.userId === userId),
  getSubmissionsByInternshipId: (internshipId: string) => getDatabase().submissions.filter((s) => s.internshipId === internshipId),
  createSubmission: (sub: Submission) => {
    const data = getDatabase();
    // Check if submission for this app and week exists
    const existingIdx = data.submissions.findIndex(
      (s) => s.applicationId === sub.applicationId && s.weekNumber === sub.weekNumber
    );
    if (existingIdx >= 0) {
      data.submissions[existingIdx] = { ...data.submissions[existingIdx], ...sub };
      saveDatabase(data);
      return data.submissions[existingIdx];
    }
    data.submissions.unshift(sub);
    saveDatabase(data);
    return sub;
  },
  updateSubmission: (id: string, updates: Partial<Submission>) => {
    const data = getDatabase();
    const index = data.submissions.findIndex((s) => s.id === id);
    if (index === -1) return null;
    data.submissions[index] = { ...data.submissions[index], ...updates };
    saveDatabase(data);
    return data.submissions[index];
  },

  // Certificates
  getCertificates: () => getDatabase().certificates,
  getCertificateById: (id: string) => getDatabase().certificates.find((c) => c.id === id || c.credentialId === id),
  getCertificatesByUserId: (userId: string) => getDatabase().certificates.filter((c) => c.userId === userId),
  createCertificate: (cert: Certificate) => {
    const data = getDatabase();
    const exists = data.certificates.find((c) => c.credentialId === cert.credentialId || (c.userId === cert.userId && c.internshipId === cert.internshipId));
    if (exists) {
      return exists;
    }
    data.certificates.unshift(cert);
    saveDatabase(data);
    return cert;
  },

  // Reset database to initial state
  resetToDefault: () => {
    saveDatabase(JSON.parse(JSON.stringify(initialData)));
    return initialData;
  }
};
