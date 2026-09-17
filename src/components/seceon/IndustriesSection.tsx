'use client';

import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '@/data/seceonData';
import { 
  Landmark, 
  HeartPulse, 
  Factory, 
  Building2, 
  GraduationCap, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface IndustriesSectionProps {
  onOpenDemoModal: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  HeartPulse,
  Factory,
  Building2,
  GraduationCap,
  ShoppingBag
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenDemoModal }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIndustry = INDUSTRIES_DATA[activeIdx];
  const ActiveIcon = iconMap[activeIndustry.icon] || ShieldCheck;

  return (
    <section id="industries" className="bg-[#050e1a] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
            Sector-Specific Cyber Defense
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            One Platform, Any Industry
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tailored compliance baselines, threat intelligence feeds, and automated containment rules for the world&apos;s most demanding regulated environments.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-12">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const IconComp = iconMap[ind.icon] || ShieldCheck;
            const isSelected = idx === activeIdx;
            return (
              <button
                key={ind.name}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#5A9955] text-white shadow-lg shadow-[#5A9955]/20'
                    : 'bg-[#091728] border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Card */}
        <div className="mt-8 bg-gradient-to-br from-[#0a1b2e] to-[#071323] border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#5A9955]/20 border border-[#5A9955]/40 flex items-center justify-center text-[#5A9955]">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {activeIndustry.name} Cyber Defense
                  </h3>
                  <div className="text-xs text-[#5A9955] font-mono font-semibold">
                    Target Metric: {activeIndustry.stats}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeIndustry.desc}
              </p>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-200">Key Threat Neutralized: </span>
                  <span className="text-slate-300">{activeIndustry.keyThreat}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenDemoModal}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore {activeIndustry.name} Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#050e18] p-6 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800 pb-2">
                Industry Compliance Mapping
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Continuous Auditing:</span>
                  <span className="text-emerald-400 font-bold">100% Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Zero-Trust Alignment:</span>
                  <span className="text-emerald-400 font-bold">Enforced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Evidence Export:</span>
                  <span className="text-[#037fff] font-bold">1-Click PDF</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
