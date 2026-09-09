# Stanford CS Research & Industry Internships Platform

A bespoke, production-grade learning and internship management platform built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Directed by **Dr. Aris Thorne**, the platform supports mentored research cohorts across **AI/ML**, **Full Stack Distributed Systems**, **Cloud Computing & DevOps**, and **Cybersecurity**.

---

## 🌟 Key Features

### 1. Public Exploration & Cohort Catalog (`/`)
- **Domain Filtering**: Explore programs in AI/ML, Full Stack Systems, Cloud & DevOps, and Cybersecurity.
- **Weekly Curriculum View**: In-depth syllabus modals detailing weekly deliverables, prerequisites, and faculty bios.
- **Simulated Payment Gateway**: Complete sandbox checkout simulation supporting **Razorpay** (UPI, NetBanking, Cards) and **Stripe** (Cards) with instant enrollment receipts.

### 2. Action-Oriented Student Workspace (`/student`)
- **Milestone Progress Tracking**: Clean vertical timeline indicating completed, in-progress, and locked milestones.
- **GitHub PR Review Workflow**: Direct submission interface for repository links, benchmark URLs, and design notes.
- **Faculty Evaluation Ledger**: Line-by-line grading feedback and rubric scores from Dr. Thorne.
- **Honors Certificate Issuance**: Auto-generation of official academic credentials upon milestone completion.

### 3. Student Authentication (`/login` & `/signup`)
- **Dedicated Sign-In**: University email authentication with 1-click student demo profiles (`Alex Rivera`, `Maya Chen`).
- **Student Registration**: Profile creation with automatic student role assignment.

### 4. Public Credential Verification (`/verify`)
- **Tamper-Proof Verification**: Verify credentials via unique Credential IDs (e.g. `CS-STANFORD-2026-89412`).
- **Authentic Credentials**: Gold filigree borders, faculty signatures, QR codes, and print-to-PDF layout.

### 5. Hidden Administrative Gateway (`/admin`)
- **Strict Role-Gated Access**: Accessible only via direct URL entry (`/admin`).
- **Grading Queue**: Code review and scoring interface with pass/revision verdict actions.
- **Internship Catalog Manager**: Publish new research cohorts and toggle registration status.
- **Applicant & Payment Ledger**: Real-time fee transaction auditing.
- **All Users & Accounts Directory**: Comprehensive directory of all registered students and faculty with instant search and enrollment statistics.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Store**: File-backed JSON Database (`data/db.json`)
- **Animations & Effects**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shinchan2222/LEARNING_PLATFORM.git
cd LEARNING_PLATFORM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🔒 Portals & Direct Routes

- **Public Catalog**: `http://localhost:3000/`
- **Student Workspace**: `http://localhost:3000/student`
- **Student Sign In**: `http://localhost:3000/login`
- **Student Sign Up**: `http://localhost:3000/signup`
- **Verify Certificate**: `http://localhost:3000/verify`
- **Admin Gateway (URL-Only)**: `http://localhost:3000/admin`
