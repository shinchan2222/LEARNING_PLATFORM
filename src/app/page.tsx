'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import InternshipCatalog from '@/components/catalog/InternshipCatalog';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { 
  CheckCircle, 
  HelpCircle, 
  GitPullRequest, 
  Award, 
  Users, 
  FileText, 
  Terminal, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does the code review and grading process work?',
    a: 'Each week has a concrete engineering milestone with automated tests and architecture specifications. Interns submit their GitHub repository and live deployment link. Dr. Aris Thorne and senior lab researchers review PRs, inspect code cleanliness, benchmark algorithms, and provide line-by-line rubric scores.'
  },
  {
    q: 'Will I receive a formal Letter of Recommendation (LoR)?',
    a: 'Students completing their cohorts with Honors (Grade A or A+) and demonstrating exceptional engineering initiative are eligible for personalized academic letters of recommendation signed by Dr. Thorne for graduate school or job applications.'
  },
  {
    q: 'How do the simulated payments work on this platform?',
    a: 'The platform integrates a complete simulated Razorpay and Stripe sandbox environment supporting UPI, Debit/Credit Cards, and NetBanking. You can test instant verification, receive formal invoice receipts, and auto-enroll immediately.'
  },
  {
    q: 'Can employers and universities verify my completion certificate?',
    a: 'Yes. Every certificate is minted with a unique tamper-proof Credential ID (e.g., CS-STANFORD-2026-XXXXX) and QR code, publicly verifiable through our online verification portal at any time.'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Key Academic & Research Benefits */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Why Intern With Dr. Thorne’s Lab?
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900">
                Bridging Academic Depth with Real-World Production Systems
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 font-bold border border-indigo-100">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Rigorous PR Code Reviews
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No auto-graded multiple choice quizzes. Every week, your code is reviewed on GitHub with feedback on architectural scalability, design patterns, and edge cases.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 font-bold border border-purple-100">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Research Papers & Capstones
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Build portfolio-grade systems directly based on recent NeurIPS, OSDI, and IEEE papers. Graduate with production repositories that wow recruiters.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold border border-emerald-100">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Verifiable Cryptographic Credentials
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive verifiable certificates with unique credential hashes, print-ready PDF vector exports, and public shareable URLs for LinkedIn and resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Searchable and Filterable CS Internship Catalog */}
        <InternshipCatalog />

        {/* 4. Student Outcomes & Testimonials */}
        <TestimonialsSection />

        {/* 5. Frequently Asked Questions */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Got Questions?
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
