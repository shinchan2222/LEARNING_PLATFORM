'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  ShieldCheck, 
  Star,
  Search,
  FileSpreadsheet
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';

export default function HireFromUsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recruiterData, setRecruiterData] = useState({
    companyName: '',
    workEmail: '',
    contactPerson: '',
    phone: '',
    domain: 'DeepTech',
    batchSize: '5-10'
  });

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setRecruiterData({
        companyName: '',
        workEmail: '',
        contactPerson: '',
        phone: '',
        domain: 'DeepTech',
        batchSize: '5-10'
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3 py-1 rounded-full">
              Enterprise Recruitment Partnerships
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Hire Pre-Vetted, Day-One Deployable Talent
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Cut your engineering hiring cycle by 65%. CareerTiQ graduates undergo rigorous 500+ hours of live coding, system design reviews, and automated CI/CD benchmark testing.
            </p>
          </div>
        </section>

        {/* VALUE PROPOSITION GRID */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Talent Matrix
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Why 120+ Enterprises Hire From CareerTiQ
                </h2>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      title: 'Zero Onboarding Ramp-Up Needed',
                      desc: 'Our interns work with real GitHub PRs, Docker orchestration, and production cloud infrastructure before day one.'
                    },
                    {
                      title: 'Pre-Screened Technical Audits',
                      desc: 'Every candidate portfolio comes with EXPLAIN ANALYZE benchmark metrics, code test coverage, and faculty recommendations.'
                    },
                    {
                      title: 'Bilingual Tech Force',
                      desc: 'Hire engineers fluent in Japanese (JLPT N4/N3) and German (Goethe) for international client projects and onsite deployments.'
                    },
                    {
                      title: 'Zero Sourcing Commission',
                      desc: 'Access our graduating cohorts and on-campus recruitment drives with transparent institutional partnership MoUs.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                      <div className="p-2 rounded-xl bg-blue-50 text-[#0B63E5] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Intake Form */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] uppercase font-bold text-[#0B63E5] font-mono">
                      Corporate Talent Desk
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Request Candidate Resumes & Pitch Books
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Receive custom shortlists filtered by domain, tech stack, and CTC expectations within 24 hours.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-900">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                        ✓
                      </div>
                      <h4 className="font-bold text-base">Talent Request Received!</h4>
                      <p className="text-xs text-emerald-700">
                        Our Head of Corporate Relations will share candidate portfolios via email.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleRecruiterSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={recruiterData.companyName}
                          onChange={(e) => setRecruiterData({ ...recruiterData, companyName: e.target.value })}
                          placeholder="e.g. Goldman Sachs / Zoho Corp"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={recruiterData.workEmail}
                            onChange={(e) => setRecruiterData({ ...recruiterData, workEmail: e.target.value })}
                            placeholder="talent@company.com"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Contact Phone *</label>
                          <input
                            type="tel"
                            required
                            value={recruiterData.phone}
                            onChange={(e) => setRecruiterData({ ...recruiterData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Domain of Interest</label>
                        <select
                          value={recruiterData.domain}
                          onChange={(e) => setRecruiterData({ ...recruiterData, domain: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] bg-white"
                        >
                          <option value="DeepTech">DeepTech (AI, Machine Learning, Cybersecurity)</option>
                          <option value="FinTech">FinTech (Algo Trading, Blockchain, WealthTech)</option>
                          <option value="MediaTech">MediaTech (UI/UX Design, 3D Motion)</option>
                          <option value="Languages">Bilingual Engineers (Japanese / German)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-sm shadow-md transition-all mt-2"
                      >
                        Request Candidate Profiles →
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <CareerTiQFooter />
    </div>
  );
}