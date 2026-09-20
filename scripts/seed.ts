// scripts/seed.ts
// Run with: npx tsx scripts/seed.ts
import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DATA_DIR, 'devops.db'));
db.exec('PRAGMA journal_mode = WAL');

// ── Create all tables ──────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL DEFAULT '[]',
    color TEXT NOT NULL DEFAULT '#0B63E5',
    light_color TEXT NOT NULL DEFAULT '#EFF6FF',
    order_index INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT NOT NULL DEFAULT '[]',
    color TEXT NOT NULL DEFAULT '#0B63E5'
  );
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    initials TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    color TEXT NOT NULL DEFAULT '#0B63E5'
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    initials TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#0B63E5'
  );
  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    experience TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL DEFAULT '[]',
    responsibilities TEXT NOT NULL DEFAULT '[]',
    salary_range TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    job_title TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin TEXT,
    portfolio TEXT,
    cover_letter TEXT,
    resume_url TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
  );
`);

// ── Admin User ─────────────────────────────────────────────────────
const existingAdmin = db.prepare('SELECT id FROM admin_users WHERE email = ?').get('admin@devops.com');
if (!existingAdmin) {
  const hash = bcrypt.hashSync('admin123', 12);
  db.prepare('INSERT INTO admin_users (email, password_hash) VALUES (?, ?)').run('admin@devops.com', hash);
  console.log('✅ Admin user created: admin@devops.com / admin123');
} else {
  console.log('ℹ️  Admin user already exists');
}

// ── Services ───────────────────────────────────────────────────────
const servicesCount = (db.prepare('SELECT COUNT(*) as c FROM services').get() as { c: number }).c;
if (servicesCount === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const services = [
    ['Code2', 'Custom Software Development', 'Tailored solutions built for your exact business needs.', 'From ERP and CRM systems to full-scale SaaS platforms — we architect, develop, and maintain software that scales.', JSON.stringify(['ERP & CRM Systems', 'SaaS Platform Development', 'Business Process Automation', 'Legacy System Modernization', 'Third-Party Integrations']), '#0B63E5', '#EFF6FF', 0],
    ['Globe', 'Website Development', 'Stunning websites that convert visitors into customers.', 'We design and build pixel-perfect, fast-loading websites — from corporate portals to e-commerce storefronts.', JSON.stringify(['Corporate & Portfolio Websites', 'E-Commerce & Online Stores', 'High-Converting Landing Pages', 'CMS Integrations', 'Performance & SEO Optimization']), '#7C3AED', '#F5F3FF', 1],
    ['Smartphone', 'Mobile App Development', 'iOS, Android & cross-platform apps users love.', 'We build intuitive, high-performance mobile applications using React Native and Flutter.', JSON.stringify(['iOS & Android Native Apps', 'React Native & Flutter', 'App Store Optimization', 'Push Notifications', 'Payment Gateway Integration']), '#059669', '#ECFDF5', 2],
    ['Palette', 'UI/UX Design', 'Interfaces designed for delight and conversion.', 'Our design team creates wireframes, interactive prototypes, and complete design systems.', JSON.stringify(['User Research & Personas', 'Wireframing & Prototyping', 'Design System Creation', 'Figma Deliverables', 'Accessibility Compliance']), '#DC2626', '#FEF2F2', 3],
    ['Cloud', 'Cloud & DevOps', 'Scalable cloud infrastructure and CI/CD automation.', 'We set up, manage, and optimize cloud infrastructure on AWS, Azure, and GCP.', JSON.stringify(['AWS, Azure & GCP Setup', 'Docker & Kubernetes', 'CI/CD Pipeline Automation', 'Infrastructure as Code', '24/7 Monitoring']), '#F59E0B', '#FFFBEB', 4],
    ['Server', 'API & Backend Development', 'Robust, secure APIs powering your digital products.', 'From RESTful APIs to GraphQL and microservices — we build the backend infrastructure that connects everything.', JSON.stringify(['REST API & GraphQL', 'Microservices Architecture', 'Database Design', 'Authentication & Security', 'Third-Party Integrations']), '#0891B2', '#ECFEFF', 5],
  ];
  for (const s of services) insertService.run(...s);
  console.log('✅ Services seeded');
}

// ── Portfolio ──────────────────────────────────────────────────────
const portfolioCount = (db.prepare('SELECT COUNT(*) as c FROM portfolio').get() as { c: number }).c;
if (portfolioCount === 0) {
  const ins = db.prepare('INSERT INTO portfolio (title, category, description, tech, color) VALUES (?, ?, ?, ?, ?)');
  ins.run('RetailFlow ERP', 'Enterprise Software', 'A fully custom ERP platform for a retail chain managing 50+ stores — real-time inventory, payroll, supplier management, and analytics.', JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS']), '#0B63E5');
  ins.run('MedConnect App', 'Mobile Application', 'A telemedicine React Native app connecting 80,000+ patients with certified doctors for video consultations and prescriptions.', JSON.stringify(['React Native', 'Firebase', 'Node.js', 'Stripe']), '#059669');
  ins.run('LaunchPad SaaS', 'Web Platform', 'A multi-tenant B2B SaaS platform for startup accelerators to manage cohorts, mentor sessions, and investor communications.', JSON.stringify(['Next.js', 'Python', 'MongoDB', 'GCP']), '#7C3AED');
  console.log('✅ Portfolio seeded');
}

// ── Testimonials ───────────────────────────────────────────────────
const testimonialsCount = (db.prepare('SELECT COUNT(*) as c FROM testimonials').get() as { c: number }).c;
if (testimonialsCount === 0) {
  const ins = db.prepare('INSERT INTO testimonials (quote, name, role, initials, rating, color) VALUES (?, ?, ?, ?, ?, ?)');
  ins.run("DEVops delivered our e-commerce platform 2 weeks ahead of schedule. The code quality is exceptional.", 'Sarah Mitchell', 'CEO, StyleVault Inc.', 'SM', 5, '#0B63E5');
  ins.run("We hired DEVops to rebuild our CRM and performance improved by 300%. Our sales team's productivity went through the roof.", 'James Okafor', 'CTO, Apex Financial', 'JO', 5, '#7C3AED');
  ins.run("Our mobile app went from concept to App Store in 10 weeks. Users gave us 4.9 stars on launch day.", 'Priya Sharma', 'Founder, HealthBridge', 'PS', 5, '#059669');
  console.log('✅ Testimonials seeded');
}

// ── Stats ──────────────────────────────────────────────────────────
const statsCount = (db.prepare('SELECT COUNT(*) as c FROM stats').get() as { c: number }).c;
if (statsCount === 0) {
  const ins = db.prepare('INSERT INTO stats (value, label, order_index) VALUES (?, ?, ?)');
  ins.run('200+', 'Projects Delivered', 0);
  ins.run('150+', 'Happy Clients', 1);
  ins.run('6+', 'Years Experience', 2);
  ins.run('24/7', 'Support Available', 3);
  console.log('✅ Stats seeded');
}

// ── Team ───────────────────────────────────────────────────────────
const teamCount = (db.prepare('SELECT COUNT(*) as c FROM team_members').get() as { c: number }).c;
if (teamCount === 0) {
  const ins = db.prepare('INSERT INTO team_members (name, role, bio, initials, color) VALUES (?, ?, ?, ?, ?)');
  ins.run('Alex Johnson', 'CEO & Founder', 'Visionary technologist with 15+ years building enterprise software solutions across 3 continents.', 'AJ', '#0B63E5');
  ins.run('Maria Chen', 'CTO', 'Full-stack architect specializing in scalable cloud-native systems and microservices.', 'MC', '#7C3AED');
  ins.run('David Park', 'Lead Designer', 'Award-winning UI/UX designer with a passion for accessible, user-centered design systems.', 'DP', '#059669');
  console.log('✅ Team seeded');
}

// ── Blog ───────────────────────────────────────────────────────────
const blogCount = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as { c: number }).c;
if (blogCount === 0) {
  const ins = db.prepare('INSERT INTO blog_posts (title, slug, excerpt, content, published) VALUES (?, ?, ?, ?, ?)');
  ins.run('10 Signs You Need Custom Software Instead of Off-the-Shelf', '10-signs-you-need-custom-software', 'Not every business problem has a packaged solution. Here are 10 clear signs your team needs custom-built software.', 'Full article content goes here...', 1);
  ins.run('How We Cut Deployment Time by 80% with CI/CD Pipelines', 'cut-deployment-time-cicd', 'A step-by-step breakdown of how we automated deployments for a 50-developer team and went from weekly releases to multiple daily releases.', 'Full article content goes here...', 1);
  console.log('✅ Blog posts seeded');
}

// ── Careers / Jobs ─────────────────────────────────────────────────
const jobsCount = (db.prepare('SELECT COUNT(*) as c FROM jobs').get() as { c: number }).c;
if (jobsCount === 0) {
  const ins = db.prepare(`INSERT INTO jobs (title, department, location, type, experience, description, requirements, responsibilities, salary_range, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  ins.run(
    'Senior Full-Stack Engineer',
    'Engineering',
    'Remote (Global)',
    'Full-time',
    '5+ years',
    'We are looking for a Senior Full-Stack Engineer to architect and build high-performance web applications, client portals, and microservices.',
    JSON.stringify([
      '5+ years of production experience with TypeScript, React, and Node.js',
      'Strong knowledge of PostgreSQL, SQLite, Redis, and modern ORMs',
      'Experience designing clean REST and GraphQL APIs',
      'Familiarity with cloud platforms (AWS, GCP) and Docker containers'
    ]),
    JSON.stringify([
      'Design, build, and deploy mission-critical software products for global clients',
      'Collaborate closely with UI/UX designers and product managers',
      'Write clean, well-tested, and maintainable code',
      'Mentor junior and mid-level engineers'
    ]),
    '$110,000 - $145,000 / year',
    1
  );

  ins.run(
    'Senior DevOps & Cloud Architect',
    'Cloud & DevOps',
    'Remote',
    'Full-time',
    '4+ years',
    'Lead cloud infrastructure automation, Kubernetes orchestration, and automated CI/CD pipelines across enterprise customer deployments.',
    JSON.stringify([
      'Proven hands-on experience with AWS, GCP, or Azure infrastructure',
      'Strong expertise in Terraform, Kubernetes, Helm, and Docker',
      'Solid background in CI/CD pipeline automation (GitHub Actions, GitLab)',
      'Knowledge of zero-trust security and SOC 2 compliance standards'
    ]),
    JSON.stringify([
      'Architect robust, self-healing cloud infrastructure for client systems',
      'Automate deployment pipelines to enable seamless continuous delivery',
      'Implement proactive monitoring, alerting, and automated incident response',
      'Advise clients on cost optimization and architectural best practices'
    ]),
    '$120,000 - $155,000 / year',
    1
  );

  ins.run(
    'UI/UX Product Designer',
    'Design',
    'Remote or Hybrid',
    'Full-time',
    '3+ years',
    'Shape the user experience and visual design systems for cutting-edge SaaS platforms, mobile apps, and enterprise dashboards.',
    JSON.stringify([
      '3+ years designing web and mobile applications with Figma',
      'Strong portfolio demonstrating user journey maps, wireframes, and polished UI',
      'Deep understanding of accessibility guidelines (WCAG) and responsive design',
      'Experience building and maintaining component libraries and design tokens'
    ]),
    JSON.stringify([
      'Turn complex client requirements into intuitive, elegant user interfaces',
      'Create interactive prototypes to test ideas with stakeholders and users',
      'Work alongside engineering to ensure design fidelity during implementation',
      'Establish and maintain reusable design systems for fast-paced development'
    ]),
    '$90,000 - $120,000 / year',
    1
  );

  ins.run(
    'Mobile App Engineer (React Native)',
    'Mobile',
    'Remote',
    'Full-time',
    '3+ years',
    'Build and maintain cross-platform iOS and Android applications with fluid animations, offline caching, and native performance.',
    JSON.stringify([
      '3+ years building production mobile apps with React Native and TypeScript',
      'Experience with mobile state management and native module bridging',
      'Familiarity with App Store Connect and Google Play Console release workflows',
      'Passion for 60fps smooth animations and tactile mobile interactions'
    ]),
    JSON.stringify([
      'Develop cross-platform mobile apps for consumer and enterprise clients',
      'Integrate push notifications, background sync, and camera/biometric APIs',
      'Optimize application performance, bundle size, and memory usage',
      'Manage app store submission and review cycles'
    ]),
    '$95,000 - $130,000 / year',
    1
  );

  console.log('✅ Careers / Jobs seeded');
}

db.close();
console.log('\n🎉 Database seeded successfully!');
console.log('📍 DB location:', path.join(DATA_DIR, 'devops.db'));
console.log('\n🔐 Admin credentials:');
console.log('   Email:    admin@devops.com');
console.log('   Password: admin123');
