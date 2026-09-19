'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/devops/Navbar';
import { Footer } from '@/components/devops/Footer';
import {
  Briefcase, MapPin, Clock, DollarSign, ArrowRight, CheckCircle2,
  Sparkles, Globe2, Laptop, GraduationCap, X, Send, AlertCircle
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range: string;
  created_at: string;
}

const PERKS = [
  {
    icon: Globe2,
    title: 'Remote-First Freedom',
    desc: 'Work from where you are most productive. We care about high-impact output and client outcomes, not physical office seats.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    desc: 'Top-market base salary, annual performance bonuses, and transparent salary growth trajectories.',
  },
  {
    icon: Laptop,
    title: 'Top-Tier Tech Setup',
    desc: 'Latest MacBook Pro or high-end workstation, plus an ergonomic home office setup stipend upon joining.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'Annual stipend for technical certifications (AWS, GCP, CKA), software conferences, and online courses.',
  },
];

const DEPARTMENTS = ['All', 'Engineering', 'Cloud & DevOps', 'Design', 'Mobile'];

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('All');
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  // Application Modal state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    cover_letter: '',
    resume_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/careers/jobs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
      })
      .catch((err) => console.error('Error loading jobs:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = activeDept === 'All'
    ? jobs
    : jobs.filter((j) => j.department.toLowerCase() === activeDept.toLowerCase());

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: applyingJob.id,
          job_title: applyingJob.title,
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission');
    } finally {
      setSubmitting(false);
    }
  };

  const closeApplyModal = () => {
    setApplyingJob(null);
    setSubmitted(false);
    setSubmitError('');
    setForm({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      cover_letter: '',
      resume_url: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[#0B63E5]/90 text-white pt-20 pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We Are Hiring</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
              Build the Future of Software With Us
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We&apos;re an elite engineering and design agency crafting scalable digital products for global businesses. Join a culture of autonomy, craft, and continuous growth.
            </p>

            <div className="pt-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B63E5] hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                <span>Explore Open Roles</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Culture & Perks */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-widest">
              Why Work With DEVops
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Built Around Engineers & Designers
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              We believe great software comes from happy, empowered teams working with modern tools and zero red tape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B63E5]/10 text-[#0B63E5] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-widest">
                  Join Our Team
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Open Opportunities
                </h2>
                <p className="text-slate-500 text-sm">
                  {jobs.length} open position{jobs.length === 1 ? '' : 's'} available
                </p>
              </div>

              {/* Department Filters */}
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      activeDept === dept
                        ? 'bg-[#0B63E5] text-white shadow-md shadow-blue-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-400">Loading open positions...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl text-slate-500">
                No open positions currently listed under <strong>{activeDept}</strong>. Check back soon or send us an open application!
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const isExpanded = expandedJobId === job.id;
                  return (
                    <div
                      key={job.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 transition-all hover:border-blue-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 bg-[#0B63E5]/10 text-[#0B63E5] text-xs font-bold rounded-full">
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {job.type}
                            </span>
                            {job.salary_range && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                                {job.salary_range}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                            {job.title}
                          </h3>

                          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                            {job.description}
                          </p>
                        </div>

                        <div className="flex sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                          <button
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
                          >
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </button>
                          <button
                            onClick={() => setApplyingJob(job)}
                            className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B63E5] hover:bg-blue-600 rounded-xl shadow-md shadow-blue-200 transition-colors"
                          >
                            Apply Now →
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          {job.responsibilities?.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#0B63E5]" />
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm pl-2">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-[#0B63E5] font-bold">•</span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.requirements?.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[#0B63E5]" />
                                What We Look For
                              </h4>
                              <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm pl-2">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-[#0B63E5] font-bold">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={closeApplyModal}
              aria-label="Close application modal"
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-700">{form.name}</span>! We&apos;ve received your application for the{' '}
                  <span className="font-bold text-[#0B63E5]">{applyingJob.title}</span> role. Our hiring team will review your profile and respond via email.
                </p>
                <button
                  onClick={closeApplyModal}
                  className="mt-4 px-6 py-2.5 text-xs font-bold text-white bg-[#0B63E5] hover:bg-blue-600 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-wider">
                    Application Form
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Apply for {applyingJob.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {applyingJob.department} • {applyingJob.location} • {applyingJob.type}
                  </p>
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="app-name" className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      id="app-name"
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="app-email" className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      id="app-email"
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="app-phone" className="text-xs font-bold text-slate-700">Phone Number</label>
                    <input
                      id="app-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="app-linkedin" className="text-xs font-bold text-slate-700">LinkedIn Profile</label>
                    <input
                      id="app-linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="app-resume" className="text-xs font-bold text-slate-700">Portfolio / GitHub / Resume Link</label>
                  <input
                    id="app-resume"
                    type="text"
                    placeholder="https://github.com/... or Google Drive link"
                    value={form.resume_url}
                    onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="app-cover" className="text-xs font-bold text-slate-700">Quick Introduction / Cover Note</label>
                  <textarea
                    id="app-cover"
                    rows={3}
                    placeholder="Tell us briefly why you are interested in this position..."
                    value={form.cover_letter}
                    onChange={(e) => setForm({ ...form, cover_letter: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
