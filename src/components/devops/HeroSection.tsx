import React from 'react';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white pt-16 pb-24 lg:pt-24 lg:pb-32"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(11,99,229,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-[#0B63E5] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Service Software Company</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              We Build Software{' '}
              <span className="text-[#0B63E5] relative">
                That Powers
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10 C 80 3, 220 3, 298 10"
                    stroke="#0B63E5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                  />
                </svg>
              </span>{' '}
              Your Business
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl">
              Custom software, stunning websites, powerful mobile apps, and everything in
              between — delivered on time, on budget, and built to scale.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="/#contact"
                className="px-7 py-4 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/#portfolio"
                className="px-7 py-4 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 text-[#0B63E5] fill-[#0B63E5]" />
                <span>View Our Work</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {[
                '200+ Projects Delivered',
                '5-Star Rated',
                '100% Client Satisfaction',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5]" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Panel */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/80 p-6 space-y-5">
                {/* Top bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">devops-project.tsx</span>
                </div>

                {/* Code snippet aesthetic */}
                <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-700">
                  <div>
                    <span className="text-purple-500">const</span>{' '}
                    <span className="text-[#0B63E5] font-bold">project</span>{' '}
                    <span className="text-slate-500">= {'{'}</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-amber-600">type</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-600">&apos;Custom Software&apos;</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-amber-600">stack</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-600">&apos;React + Node + AWS&apos;</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-amber-600">delivery</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-600">&apos;On Time, Every Time&apos;</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-amber-600">quality</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-purple-500">true</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{'}'}</span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-purple-500">await</span>
                    <span className="text-[#0B63E5] font-bold">DEVops</span>
                    <span className="text-slate-500">.</span>
                    <span className="text-amber-600">build</span>
                    <span className="text-slate-500">(project)</span>
                    <span className="inline-block w-2 h-4 bg-[#0B63E5] animate-pulse ml-0.5 rounded-sm" />
                  </div>
                </div>

                {/* Status footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Build Running...</span>
                  </div>
                  <span className="font-mono text-emerald-600 font-semibold">✓ 0 errors</span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-[#0B63E5] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <span role="img" aria-label="rocket">🚀</span> Est. 2019
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 shadow-lg rounded-xl px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="star">⭐</span>
                  <div>
                    <div className="font-bold text-slate-900">5.0 Rating</div>
                    <div className="text-slate-500">150+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
