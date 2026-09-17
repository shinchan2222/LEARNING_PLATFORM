'use client';

import React from 'react';
import { 
  Cpu, 
  Search, 
  Zap, 
  ShieldCheck, 
  Star, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';

interface AutonomousSOCProps {
  onOpenDemoModal: () => void;
}

export const AutonomousSOC: React.FC<AutonomousSOCProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="bg-[#071323] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      {/* Soft background ambient glow */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-[#5A9955]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-[#037fff]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Cyber Defense</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight leading-tight">
            Agentic AI-Driven SOC That Thinks, Investigates, and Responds
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Seceon&apos;s Autonomous SOC continuously detects, correlates, investigates, and responds to threats in real time while reducing analyst workload and accelerating threat response.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          
          {/* Pillar 1: Ingestion & Correlation */}
          <div className="bg-[#0b1b30] border border-slate-700/70 rounded-2xl p-7 hover:border-[#5A9955]/60 transition-all hover:shadow-xl hover:shadow-[#5A9955]/10 group relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#5A9955]/15 border border-[#5A9955]/30 flex items-center justify-center text-[#5A9955] mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Streaming Ingestion &amp; Dynamic Baselining
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ingests logs, raw flows, endpoint states, and cloud audits into a real-time memory stream. AI self-learns normal user and device behaviors with zero manual rule tuning.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9955]" />
                <span>350+ Ready-to-use Connectors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9955]" />
                <span>Eliminates index lag &amp; batch search delay</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Autonomous Investigation */}
          <div className="bg-[#0b1b30] border border-slate-700/70 rounded-2xl p-7 hover:border-[#037fff]/60 transition-all hover:shadow-xl hover:shadow-[#037fff]/10 group relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#037fff]/15 border border-[#037fff]/30 flex items-center justify-center text-[#037fff] mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                SERA AI™ Autonomous Investigation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Reconstructs full multi-stage attack narratives. Evaluates MITRE ATT&amp;CK tactics, correlates suspicious identity behaviors with network traffic, and weeds out 95% false positives.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#037fff]" />
                <span>Contextual incident graph generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#037fff]" />
                <span>Autonomous root-cause attribution</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Sub-90s SOAR Containment */}
          <div className="bg-[#0b1b30] border border-slate-700/70 rounded-2xl p-7 hover:border-emerald-400/60 transition-all hover:shadow-xl hover:shadow-emerald-500/10 group relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sub-90s Dynamic SOAR Containment
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Neutralizes active intrusions in under 90 seconds. Automatically instructs firewalls to block C2 IPs, terminates infected processes, locks compromised credentials, and isolates endpoints.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pre-built orchestrated SOAR playbooks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Immediate ransomware kill switch</span>
              </div>
            </div>
          </div>

        </div>

        {/* Gartner Peer Insights Banner Card */}
        <div className="mt-14 bg-gradient-to-r from-[#0d223f] via-[#0b1c31] to-[#071323] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-md text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Gartner® Peer Insights™</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-200 ml-1.5 font-mono">4.8 / 5.0 Rating</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Seceon Recognized in Gartner® Peer Insights™ Voice of the Customer for SIEM 2026
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Based on verified customer peer reviews, this report reflects real-world performance across rapid deployment, high usability, and autonomous security operations, helping organizations modernize defense with confidence.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 justify-center">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-lg shadow-[#5A9955]/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Download Report Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-slate-400 text-right">
                Verified Enterprise &amp; MSSP Reviews
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
