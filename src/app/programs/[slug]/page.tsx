'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Cpu, 
  Coins, 
  Layers, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Download, 
  Briefcase, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';
import { CAREERTIQ_PROGRAMS } from '@/data/careertiqData';

export default function DynamicProgramPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const program = CAREERTIQ_PROGRAMS.find((p) => p.slug === slug);

  const [openModule, setOpenModule] = useState<number | null>(0);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', college: '' });
  const [submitted, setSubmitted] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  if (!program) {
    notFound();
  }

  const getDomainIcon = (s: string) => {
    switch (s) {
      case 'deep-tech': return Cpu;
      case 'fin-tech': return Coins;
      case 'media-tech': return Layers;
      default: return Globe2;
    }
  };

  const Icon = getDomainIcon(program.slug);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLeadForm({ name: '', email: '', phone: '', college: '' });
    }, 4000);
  };

  const handleBrochureDownload = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      alert(`Syllabus brochure for ${program.domain} has been generated and sent to your email.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* PROGRAM HERO BANNER */}
        <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0B63E5]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/#programs" className="hover:text-white transition-colors">Graduate Programs</Link>
                  <span>/</span>
                  <span className="text-blue-400">{program.domain}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{program.domain} Flagship Track</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {program.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {program.description}
                </p>

                {/* Key Program Meta Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700">
                    <Clock className="w-4 h-4 text-[#0B63E5]" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Next Cohort: 1st of Next Month</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Guaranteed Placement Drive</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={handleBrochureDownload}
                    disabled={downloadingBrochure}
                    className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-600 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadingBrochure ? 'Generating PDF...' : 'Download Syllabus PDF'}</span>
                  </button>
                  <a
                    href="#curriculum"
                    className="px-6 py-3 rounded-full bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    View Curriculum ↓
                  </a>
                </div>
              </div>

              {/* Lead Capture Registration Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#0B63E5] font-mono">
                      Fast-Track Admission 2026
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Apply for Next Batch
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Limited to 35 seats per cohort to guarantee personalized code reviews.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-900">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                        ✓
                      </div>
                      <h4 className="font-bold text-base">Application Submitted!</h4>
                      <p className="text-xs text-emerald-700">
                        Our admissions dean will review your profile and send the entrance aptitude test link.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnrollSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="rahul@domain.com"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Current College / Company</label>
                        <input
                          type="text"
                          value={leadForm.college}
                          onChange={(e) => setLeadForm({ ...leadForm, college: e.target.value })}
                          placeholder="e.g. PSG Tech / Fresher 2025"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-sm shadow-md transition-all mt-2"
                      >
                        Submit Application →
                      </button>

                      <span className="block text-[10px] text-center text-slate-400">
                        Zero application fee. Merit-based scholarship test included.
                      </span>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TARGET ROLES & TECH STACK */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Target Roles */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0B63E5] font-bold text-xs uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Target Career Roles</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Positions You Will Be Hired For
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {program.targetRoles.map((role, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Frameworks */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0B63E5] font-bold text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Enterprise Tools Covered</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Production Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {program.toolsCovered.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  All cohorts work directly with Git repository branches, continuous integration workflows, and production cloud sandbox environments.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* DETAILED CURRICULUM SYLLABUS ACCORDION */}
        <section id="curriculum" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Weekly Step-By-Step Breakdown
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Curriculum Syllabus & Milestones
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore each sequential module designed to transition you from foundational engineering to production deployment.
              </p>
            </div>

            <div className="space-y-4">
              {program.curriculum.map((mod, idx) => {
                const isOpen = openModule === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs hover:border-[#0B63E5]"
                  >
                    <button
                      onClick={() => setOpenModule(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left gap-4 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#0B63E5] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {mod.moduleNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {mod.title}
                        </h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-5 sm:p-6 bg-white border-t border-slate-100 space-y-3 animate-fadeIn">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Key Deliverables & Topic Mastery:
                        </span>
                        <ul className="space-y-2.5">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <Check className="w-3.5 h-3.5 text-[#0B63E5] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      <CareerTiQFooter />
    </div>
  );
}