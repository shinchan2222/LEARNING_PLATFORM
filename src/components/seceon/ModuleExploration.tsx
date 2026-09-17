'use client';

import React, { useState } from 'react';
import { 
  EXPLORATION_MODULES 
} from '@/data/seceonData';
import { 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

interface ModuleExplorationProps {
  onOpenDemoModal: () => void;
}

export const ModuleExploration: React.FC<ModuleExplorationProps> = ({ onOpenDemoModal }) => {
  const [selectedId, setSelectedId] = useState('01');
  const activeModule = EXPLORATION_MODULES.find(m => m.id === selectedId) || EXPLORATION_MODULES[0];

  return (
    <section id="modules" className="bg-[#050d18] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#5A9955]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#037fff]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
            Security Intelligence In Action
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Seceon Platform Live Module Exploration
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Select any module below to inspect real-time AI security controls, telemetry signals, and automated posture remediation.
          </p>
        </div>

        {/* 01 to 05 Module Selectors */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-10">
          {EXPLORATION_MODULES.map((m) => {
            const isSelected = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                  isSelected 
                    ? 'bg-[#0e223d] border-[#5A9955] shadow-lg shadow-[#5A9955]/20 ring-1 ring-[#5A9955]' 
                    : 'bg-[#091524] border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`text-xs font-mono font-black ${isSelected ? 'text-[#5A9955]' : 'text-slate-500'}`}>
                  {m.id}
                </span>
                <span className="text-sm font-bold tracking-wide">
                  {m.code}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase Card */}
        <div className="mt-10 bg-gradient-to-br from-[#09182b] to-[#06101d] border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Module Details (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#5A9955]/20 text-emerald-400 border border-[#5A9955]/40 uppercase tracking-wider">
                  MODULE {activeModule.id} // {activeModule.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  STATUS: LIVE &amp; OPERATIONAL
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeModule.name}
                </h3>
                <h4 className="text-base sm:text-lg font-semibold text-[#5A9955] mt-1">
                  {activeModule.subtitle}
                </h4>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeModule.desc}
              </p>

              {/* Feature Bullet Points */}
              <div className="space-y-2.5 pt-2">
                {activeModule.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#5A9955] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenDemoModal}
                  className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-lg shadow-[#5A9955]/25 flex items-center gap-2 transition-all"
                >
                  <span>Watch {activeModule.code} Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#roi-calculator"
                  className="px-6 py-3 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-colors"
                >
                  Calculate TCO Savings
                </a>
              </div>
            </div>

            {/* Live Telemetry Card (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0b1b30] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#5A9955]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Telemetry Stream
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    REAL-TIME AI
                  </span>
                </div>

                {/* Key Live Metrics */}
                <div className="space-y-3 font-mono">
                  {Object.entries(activeModule.liveMetrics).map(([k, val], idx) => (
                    <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400 capitalize">
                        {k.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-[#050e18] border border-slate-800/80 text-[11px] text-slate-400 font-mono space-y-1">
                  <div className="text-emerald-400 font-bold">
                    &gt; AI BEHAVIORAL MODEL STATUS: OPTIMAL
                  </div>
                  <div>&gt; Zero False Positives detected in previous 24h</div>
                  <div>&gt; MITRE ATT&amp;CK Matrix Correlation: 100% Active</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
