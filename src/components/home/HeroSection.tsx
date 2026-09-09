'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  GitPullRequest,
  BookOpen,
  Award,
  Building2,
  ExternalLink,
  Code
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-[#fafaf9] border-b border-neutral-200/80 text-neutral-900 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lab Attribution Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-200/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              S
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 font-semibold">
                Stanford Systems & Artificial Intelligence Laboratory
              </div>
              <div className="text-xs font-semibold text-neutral-800">
                Department of Computer Science · Gates Computer Science Building
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-600 font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Autumn 2026 Cohorts Enrolling
            </span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="hidden sm:inline text-neutral-500">Mentorship directed by Dr. Aris Thorne</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium bg-neutral-100 border border-neutral-200/80 text-neutral-700">
                <span>ACADEMIC RIGOR</span>
                <span className="text-neutral-300">·</span>
                <span>PRODUCTION STANDARDS</span>
                <span className="text-neutral-300">·</span>
                <span>1-ON-1 CODE REVIEWS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.18]">
                Mentored Computer Science Research Internships
              </h1>
              
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
                Work directly with <strong className="text-neutral-900 font-semibold">Dr. Aris Thorne</strong> on industrial-scale systems. Master distributed consensus, LLM inference optimization, cloud architectures, and offensive security through line-by-line pull request reviews.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-1">
                  <GitPullRequest className="w-4 h-4 text-neutral-700" />
                  <span>Direct PR Reviews</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  No automated multiple-choice tests. Code is reviewed line-by-line on GitHub.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-1">
                  <Award className="w-4 h-4 text-neutral-700" />
                  <span>Verifiable Honors</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Cryptographically hashed credentials publicly verifiable by recruiters.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-1">
                  <Building2 className="w-4 h-4 text-neutral-700" />
                  <span>Faculty LoRs</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Personalized Letters of Recommendation for top graduate programs & employers.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="px-5 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs shadow-xs flex items-center gap-2 transition-colors"
              >
                <span>Browse Research Cohorts</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/student"
                className="px-5 py-3 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-xs border border-neutral-300 shadow-xs flex items-center gap-2 transition-colors"
              >
                <Terminal className="w-4 h-4 text-neutral-600" />
                <span>Student Workspace</span>
              </Link>

              <Link
                href="/verify"
                className="px-4 py-3 rounded-lg text-neutral-600 hover:text-neutral-950 font-medium text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Verify a Credential</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Code Review Workbench */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-neutral-300/80 bg-white shadow-sm overflow-hidden font-sans">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-2.5 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <span className="ml-2 font-mono text-[10px] text-neutral-500 font-semibold tracking-wide uppercase">
                    GitHub PR Review · Evaluation Ledger
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Approved · 98/100
                </span>
              </div>

              {/* PR Metadata */}
              <div className="p-4 border-b border-neutral-100 bg-[#fbfbfa]">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono mb-1">
                  <span>PR #42 · raft-distributed/consensus</span>
                  <span>Commit: 8f4a1c9</span>
                </div>
                <div className="text-xs font-bold text-neutral-900">
                  Sub-millisecond Log Compaction & Heartbeat Quorum
                </div>
              </div>

              {/* Diff Code Snippet */}
              <div className="p-3.5 bg-neutral-900 text-neutral-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <div className="text-neutral-500 select-none text-[10px]">// raft/consensus.go — line 142</div>
                <div className="text-rose-400 bg-rose-950/40 px-1.5 -mx-1.5 rounded-xs">
                  - mu.Lock() // Global mutex bottleneck under high throughput
                </div>
                <div className="text-emerald-400 bg-emerald-950/40 px-1.5 -mx-1.5 rounded-xs">
                  + atomic.StoreInt64(&currentTerm, nextTerm)
                </div>
                <div className="text-emerald-400 bg-emerald-950/40 px-1.5 -mx-1.5 rounded-xs">
                  + broadcastHeartbeat(ctx, peers) // 4.2ms p99 verified
                </div>
              </div>

              {/* Dr. Thorne's Review Comment */}
              <div className="p-4 bg-white space-y-3">
                <div className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Dr. Aris Thorne"
                    className="w-9 h-9 rounded-full object-cover border border-neutral-300 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">Dr. Aris Thorne</span>
                      <span className="text-[10px] font-mono text-neutral-400">Lead Faculty Reviewer</span>
                    </div>
                    <p className="text-xs text-neutral-700 mt-1.5 leading-relaxed">
                      “Clean transition to atomic state tracking. Your load test shows steady 4.2ms latency under 30% synthetic network drops. Approved with honors.”
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>Rubric: Algorithmic Efficiency</span>
                  <span className="font-bold text-neutral-900">Score: 49/50 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Placement Ribbon */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80">
          <div className="text-center mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
              Research Alumni Placed At World-Class Engineering Organizations
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-neutral-600">
            {['Google DeepMind', 'OpenAI', 'Meta FAIR', 'Amazon AWS', 'Microsoft Research', 'Anthropic', 'Databricks'].map((org) => (
              <span key={org} className="hover:text-neutral-950 transition-colors">
                {org}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
