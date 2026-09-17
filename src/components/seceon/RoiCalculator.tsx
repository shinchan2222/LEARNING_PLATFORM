'use client';

import React, { useState } from 'react';
import { DollarSign, Clock, Users, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemoModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemoModal }) => {
  const [endpoints, setEndpoints] = useState(1500);
  const [logVolumeGb, setLogVolumeGb] = useState(250);
  const [socAnalysts, setSocAnalysts] = useState(4);

  // Approximate industry model for legacy SIEM (log ingestion fee + separate SOAR/EDR + analyst headcount) vs Seceon unified pricing
  const legacyAnnualCost = Math.round(
    (logVolumeGb * 365 * 2.8) + // Log ingestion tax
    (endpoints * 45) +          // Separate EDR/NDR licenses
    (socAnalysts * 115000)      // Tier 1/2 SOC headcount
  );

  const seceonAnnualCost = Math.round(
    (endpoints * 28) +          // All-inclusive unlimited log ingestion + SOAR + EDR + NDR
    (Math.max(1, socAnalysts * 0.4) * 115000) // 60% workload reduction
  );

  const annualSavings = Math.max(0, legacyAnnualCost - seceonAnnualCost);
  const percentSavings = Math.round((annualSavings / legacyAnnualCost) * 100);
  const hoursSavedPerWeek = Math.round(socAnalysts * 22);

  return (
    <section id="roi-calculator" className="bg-[#071323] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A9955]/15 text-[#5A9955] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tool: SecROI360™</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Quantify Your Security ROI &amp; TCO Reduction
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            See how much your organization can save by replacing multi-vendor tool sprawl and per-GB log taxes with Seceon&apos;s unified AI cybersecurity platform.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="mt-14 bg-[#091728] border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Sliders (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Endpoints */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Protected Endpoints / Assets:</span>
                  <span className="text-emerald-400 font-mono text-base font-bold">
                    {endpoints.toLocaleString()} endpoints
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="100"
                  value={endpoints}
                  onChange={(e) => setEndpoints(Number(e.target.value))}
                  className="w-full accent-[#5A9955] h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>200</span>
                  <span>10,000</span>
                  <span>20,000+</span>
                </div>
              </div>

              {/* Slider 2: Daily Log Volume (GB/day) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Daily Log Volume Ingestion:</span>
                  <span className="text-emerald-400 font-mono text-base font-bold">
                    {logVolumeGb.toLocaleString()} GB / day
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="20"
                  value={logVolumeGb}
                  onChange={(e) => setLogVolumeGb(Number(e.target.value))}
                  className="w-full accent-[#5A9955] h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>20 GB</span>
                  <span>1,000 GB</span>
                  <span>2,000+ GB</span>
                </div>
              </div>

              {/* Slider 3: SOC Analysts */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Current Security / SOC Team Size:</span>
                  <span className="text-emerald-400 font-mono text-base font-bold">
                    {socAnalysts} analysts
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={socAnalysts}
                  onChange={(e) => setSocAnalysts(Number(e.target.value))}
                  className="w-full accent-[#5A9955] h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1</span>
                  <span>10</span>
                  <span>20+</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5A9955]" />
                <span>Includes full aiSIEM, aiXDR, aiSOAR, UEBA, and MITRE correlations with zero hidden add-ons.</span>
              </div>
            </div>

            {/* Calculated Output (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#0e243f] to-[#0a182b] border border-[#5A9955]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
                
                <div>
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                    Estimated Annual Savings
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono mt-2">
                    ${annualSavings.toLocaleString()}
                  </div>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {percentSavings}% Total Cost Reduction
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/60 text-left font-mono">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Analyst Hours Saved</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      ~{hoursSavedPerWeek} hrs/wk
                    </div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Payback Period</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">
                      &lt; 90 Days
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenDemoModal}
                  className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-lg shadow-[#5A9955]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Custom SecROI360 Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
