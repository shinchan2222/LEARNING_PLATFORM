'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Maya Chen',
    academicBackground: 'M.S. Artificial Intelligence, MIT',
    currentRole: 'Member of Technical Staff @ OpenAI',
    credentialId: 'CS-STANFORD-2026-89412',
    capstone: 'Custom FlashAttention Kernel & Distributed Model Sharding',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    quote:
      'Unlike online video courses where you watch someone else code, Dr. Thorne’s weekly PR reviews forced me to justify thread safety and memory allocation patterns. The personalized letter of recommendation directly accelerated my admission and subsequent engineering interviews.',
    domain: 'AI/ML'
  },
  {
    name: 'Marcus Vance',
    academicBackground: 'B.S. Computer Science, Georgia Tech',
    currentRole: 'Cloud Systems Engineer @ Amazon AWS',
    credentialId: 'CS-STANFORD-2026-51204',
    capstone: 'Multi-Region Kubernetes Controller with Raft State Replication',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote:
      'The Kubernetes and GitOps track provided hands-on production chaos testing. We diagnosed memory leaks under synthetic network partitions. Recruiters specifically pulled up my capstone PRs during technical phone screens.',
    domain: 'Cloud & DevOps'
  },
  {
    name: 'Samantha Roy',
    academicBackground: 'B.S. Software Engineering, UC Berkeley',
    currentRole: 'Distributed Infrastructure @ Bloomberg',
    credentialId: 'CS-STANFORD-2026-64190',
    capstone: 'High-Throughput Order Ledger with Event Sourcing & ACID Guarantees',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote:
      'Building idempotent transaction pipelines with microsecond latency targets taught me engineering rigor. The cryptographic certificate and public verification URL gave hiring managers verifiable proof of my systems programming ability.',
    domain: 'Full Stack Development'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            PROVEN CAREER TRAJECTORIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Verified Alumni Placements & Research Capstones
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
            Our alumni publish thesis-grade code repositories that demonstrate mastery to elite hiring committees and graduate school admissions officers.
          </p>
        </div>

        {/* 3-Column Placement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#fafaf9] border border-neutral-200/80 hover:border-neutral-400 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                  <span className="text-neutral-500 uppercase font-semibold">
                    {t.domain}
                  </span>
                  <Link
                    href={`/verify?id=${t.credentialId}`}
                    className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                    title="Inspect Verifiable Credential"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>

                {/* Capstone Project Focus */}
                <div className="mb-4 p-2.5 rounded bg-white border border-neutral-200/60 text-[11px]">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase block mb-0.5">
                    Capstone Specification
                  </span>
                  <span className="font-semibold text-neutral-900 line-clamp-1">
                    {t.capstone}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-neutral-700 leading-relaxed italic mb-6">
                  “{t.quote}”
                </p>
              </div>

              {/* Student Bio */}
              <div className="pt-4 border-t border-neutral-200/80 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-300 flex-shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {t.academicBackground}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-900 font-mono mt-0.5">
                    → {t.currentRole}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential Verification Banner */}
        <div className="mt-12 p-5 rounded-xl border border-neutral-200 bg-[#fbfbfa] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <div className="font-bold text-neutral-900">
                Are you an employer, recruiter, or academic admissions officer?
              </div>
              <div className="text-neutral-500 text-[11px]">
                Instantly audit student credentials, milestone grades, and faculty review signatures with our public verification ledger.
              </div>
            </div>
          </div>

          <Link
            href="/verify"
            className="px-4 py-2 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Open Verification Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
