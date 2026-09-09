'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import InternshipCatalog from '@/components/catalog/InternshipCatalog';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { 
  GitPullRequest, 
  Award, 
  FileText, 
  Terminal, 
  ShieldCheck,
  ChevronDown,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'How does the faculty code review and grading process work?',
    a: 'Each weekly milestone provides a concrete engineering specification (e.g., implementing raft consensus, transformer attention heads, or zero-trust mTLS). Interns submit their GitHub repository and benchmark logs. Dr. Aris Thorne and senior lab researchers review pull requests line-by-line, scoring performance, architectural hygiene, and algorithmic complexity out of 100 points with actionable rubric feedback.'
  },
  {
    q: 'What are the criteria for receiving a formal Letter of Recommendation (LoR)?',
    a: 'Students completing their research cohort with Honors (cumulative average score ≥ 90/100) and demonstrating rigorous engineering execution are eligible for personalized academic letters of recommendation signed by Dr. Thorne for graduate admissions (MS/Ph.D.) or engineering roles.'
  },
  {
    q: 'How are certificates verified by recruiters and academic institutions?',
    a: 'Every graduate receives a tamper-proof Credential ID (e.g. CS-STANFORD-2026-89412) with an embedded SHA-256 verification hash and QR code. Anyone can verify authenticity, completion grade, and curriculum milestones on our public verification portal at /verify without requiring an account.'
  },
  {
    q: 'What is the expected weekly time commitment?',
    a: 'Cohorts are designed for serious undergraduate and graduate students balancing university coursework. Expected time commitment is 10 to 14 hours per week, structured around asynchronous GitHub submissions, weekly milestone deadlines, and faculty code reviews.'
  },
  {
    q: 'How does the simulated payment and enrollment work?',
    a: 'The platform includes an integrated sandbox payment simulator supporting Razorpay (UPI, NetBanking, Cards) and Stripe (Cards). Upon instant simulated checkout, your cohort seat is reserved, your profile is enrolled, and your student task workspace is unlocked immediately.'
  }
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Formal Architectural Specification',
    description: 'Begin each milestone with a concrete systems design document, API contracts, and algorithmic benchmarks rather than passive video lectures.',
    tag: 'Design Contract'
  },
  {
    step: '02',
    title: 'Production Pull Request Delivery',
    description: 'Implement your solution in Go, Python, or Rust. Submit modular PRs with automated unit tests and synthetic latency benchmarks.',
    tag: 'GitHub Workflow'
  },
  {
    step: '03',
    title: 'Line-by-Line Faculty Review',
    description: 'Dr. Aris Thorne and Stanford lab researchers inspect code cleanliness, thread contention, and edge cases, assigning rubric scores.',
    tag: 'Faculty Evaluation'
  },
  {
    step: '04',
    title: 'Cryptographic Credential & LoR',
    description: 'Earn a verifiable Stanford lab completion credential with persistent URL lookup and eligibility for signed academic recommendation letters.',
    tag: 'Accreditation'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-neutral-900">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Research Rigor & Methodology */}
        <section className="py-16 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                ACADEMIC CURRICULUM ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Engineered for Rigorous Systems Mastery, Not Passive Video Watching
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
                Traditional bootcamps rely on shallow multiple-choice quizzes and toy projects. Our research internships follow the standard operating procedures of top university systems laboratories.
              </p>
            </div>

            {/* 4-Step Methodology Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {METHODOLOGY_STEPS.map((item) => (
                <div 
                  key={item.step} 
                  className="p-5 rounded-xl bg-[#fafaf9] border border-neutral-200/80 hover:border-neutral-400 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-neutral-950 bg-neutral-200/70 px-2 py-0.5 rounded">
                        PHASE {item.step}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 leading-snug mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center gap-1 text-[11px] text-neutral-500 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Milestone Standard</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Reliability Box */}
            <div className="mt-8 p-6 rounded-xl bg-neutral-900 text-neutral-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Stanford Lab Research Guarantee</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  Direct Faculty Mentorship & Guaranteed 72-Hour Code Turnaround
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every submitted pull request receives thorough line-by-line faculty feedback within 72 hours. If our review rigor does not meet your university standards within the first 7 days, receive a complete unconditional refund.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/student"
                  className="px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Inspect Student Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Searchable and Filterable CS Internship Catalog */}
        <InternshipCatalog />

        {/* 4. Student Outcomes & Testimonials */}
        <TestimonialsSection />

        {/* 5. Frequently Asked Questions */}
        <section className="py-16 bg-[#fafaf9] border-t border-neutral-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Institutional Standards & Program Policies
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                Everything you need to know about code reviews, credentials, and admissions.
              </p>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-semibold text-neutral-900 text-xs sm:text-sm hover:text-neutral-950 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-neutral-400 text-xs">0{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                        openFaq === idx ? 'rotate-180 text-neutral-900' : ''
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
