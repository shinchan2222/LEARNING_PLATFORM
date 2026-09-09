'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Terminal, 
  GitBranch, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const HeroSection: React.FC = () => {
  const { user, switchUser } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fall & Spring Research Cohorts Now Enrolling</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Premier Online <br />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                Computer Science Internships
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Work on real-world systems under the direct mentorship of <span className="text-white font-semibold">Dr. Aris Thorne</span>. Master AI/ML architectures, high-scale distributed systems, cloud DevOps, and ethical penetration testing.
            </p>

            {/* Value badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct GitHub Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <Award className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Verifiable Certificates</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <GraduationCap className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Faculty Recommendations</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#catalog"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Explore Cohort Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/student"
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Student Portal</span>
              </Link>
            </div>
          </div>

          {/* Right Professor Credibility Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                    alt="Dr. Aris Thorne"
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 bg-indigo-600 p-1 rounded-full text-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    Lead Faculty & Mentor
                  </div>
                  <h3 className="text-xl font-bold text-white">Dr. Aris Thorne, Ph.D.</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Professor of Computer Science & Systems Lead
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Stanford AI & Distributed Computing Lab
                  </p>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="italic leading-relaxed text-slate-200">
                  “Our cohorts replicate top-tier industrial R&D lab environments. You write production code, undergo line-by-line PR reviews, and graduate with verifiable portfolio projects.”
                </p>
              </div>

              {/* Lab Stats */}
              <div className="grid grid-cols-3 gap-2 mt-5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-black text-indigo-400">1,400+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Intern Alumni</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-black text-emerald-400">98%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Pass Rate</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-black text-sky-400">40+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Lab Papers</div>
                </div>
              </div>

              {/* Alumni working at */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Alumni Placed At Leading Tech Firms:
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                  {['Google DeepMind', 'OpenAI', 'Meta', 'Amazon AWS', 'Microsoft', 'Databricks'].map((co) => (
                    <span key={co} className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                      {co}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
