'use client';

import React, { useState } from 'react';
import { TESTIMONIALS, AWARDS_LIST } from '@/data/seceonData';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Play, 
  ExternalLink,
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';

interface TestimonialsAndAwardsProps {
  onOpenDemoModal: () => void;
}

export const TestimonialsAndAwards: React.FC<TestimonialsAndAwardsProps> = ({ onOpenDemoModal }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentTestimonial];

  return (
    <section className="bg-[#071323] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#5A9955]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Testimonials Carousel Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
              Proven In Production
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
              Don&apos;t Just Take Our Word For It: Hear From the Experts
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Industry CISOs, CIOs, and MSSP leaders rely on Seceon daily to defend critical infrastructure and eradicate active attacks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0a182a] border border-slate-700/80 rounded-2xl p-8 sm:p-12 shadow-2xl relative">
            <Quote className="w-12 h-12 text-[#5A9955]/20 absolute top-6 right-8 pointer-events-none" />

            <div className="space-y-6">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {current.author}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {current.title}, <span className="text-[#5A9955] font-semibold">{current.company}</span> ({current.location})
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-1">
                    {currentTestimonial + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Interview Spotlight */}
        <div className="bg-gradient-to-r from-[#0c2038] via-[#091728] to-[#06101d] border border-slate-700/80 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A9955]/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Leadership</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                From Vision to Reality: AI-Powered Cybersecurity in Action
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Discover how Seceon&apos;s AI-powered cybersecurity platform is transforming threat detection, automation, and cyber resilience through insights from Founder and CEO Chandra Shekhar Pandey.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>AI-powered threat detection and automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Unified SIEM, SOAR, XDR, UEBA &amp; NDR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Simplifying security with a single platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Building resilient, future-ready organizations</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDemoModal}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Executive Briefing</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#050e18] p-6 rounded-xl border border-slate-800 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#5A9955] to-emerald-800 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                CSP
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Chandra Shekhar Pandey
                </h4>
                <p className="text-xs text-[#5A9955] font-semibold">
                  Founder &amp; Chief Executive Officer
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Seceon Inc. • Westford, MA
                </p>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                &ldquo;Our mission is to eliminate the human latency gap in stopping active cyber attacks.&rdquo;
              </div>
            </div>

          </div>
        </div>

        {/* Industry Awards & Honors Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
              Global Validation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Awards and Recognition
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {AWARDS_LIST.map((award, idx) => (
              <div
                key={idx}
                className="bg-[#091728] border border-slate-800 rounded-xl p-4 text-center hover:border-[#5A9955]/50 transition-colors flex flex-col justify-between"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-100">
                  {award.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                  {award.subtitle}
                </div>
                <div className="text-[10px] font-mono text-[#5A9955] font-semibold mt-2 pt-2 border-t border-slate-800/80">
                  {award.org}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
