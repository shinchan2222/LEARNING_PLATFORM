'use client';

import React from 'react';
import { COMPARISON_DATA } from '@/data/seceonData';
import { CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles, Zap } from 'lucide-react';

interface WhySeceonComparisonProps {
  onOpenDemoModal: () => void;
}

export const WhySeceonComparison: React.FC<WhySeceonComparisonProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="why-seceon" className="bg-[#050e1a] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A9955]/15 text-[#5A9955] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Differentiation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Why Modern Enterprises Choose Seceon Over Legacy SIEM
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Compare Seceon&apos;s all-in-one autonomous OTM architecture against traditional fragmented security stacks like Splunk, IBM QRadar, and Microsoft Sentinel.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[760px] bg-[#091728] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#0c1e34] border-b border-slate-700/80 py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-300">
              <div className="col-span-4">Capability / Requirement</div>
              <div className="col-span-4 text-[#5A9955] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5A9955] animate-ping" />
                <span>Seceon Autonomous OTM Platform</span>
              </div>
              <div className="col-span-4 text-slate-400">Legacy SIEM &amp; Point Solutions</div>
            </div>

            <div className="divide-y divide-slate-800">
              {COMPARISON_DATA.map((row, idx) => (
                <div 
                  key={idx} 
                  className="grid grid-cols-12 py-4 px-6 items-center hover:bg-slate-800/40 transition-colors text-xs sm:text-sm"
                >
                  <div className="col-span-4 font-semibold text-slate-200 pr-4">
                    {row.feature}
                  </div>

                  <div className="col-span-4 pr-4 text-emerald-300 font-medium flex items-start gap-2 bg-[#5A9955]/5 py-2 px-3 rounded-lg border border-[#5A9955]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#5A9955] flex-shrink-0 mt-0.5" />
                    <span>{row.seceon}</span>
                  </div>

                  <div className="col-span-4 pl-2 text-slate-400 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400/80 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">{row.legacy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Card Below Comparison */}
        <div className="mt-12 bg-gradient-to-r from-[#0d2340] to-[#071323] border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              Ready to Stop Alert Fatigue and Overpaying for Logs?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Start a 30-Day Proof of Value (POV). We connect to your live environment, baseline activity in 24 hours, and demonstrate real attack containment.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenDemoModal}
              className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-lg shadow-[#5A9955]/20 flex items-center gap-2 transition-all"
            >
              <span>Schedule 30-Day POV</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
