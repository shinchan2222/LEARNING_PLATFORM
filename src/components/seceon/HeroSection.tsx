'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Zap, 
  Activity, 
  Terminal, 
  Cpu, 
  Lock, 
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Layers,
  Network
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemoModal }) => {
  const [activeTab, setActiveTab] = useState<'governance' | 'traffic' | 'tools' | 'policies'>('traffic');
  const [containmentTime, setContainmentTime] = useState(18.4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [attackStep, setAttackStep] = useState(3);

  const simulateNewAttack = () => {
    setIsSimulating(true);
    setAttackStep(0);
    setContainmentTime(90.0);

    const step1 = setTimeout(() => {
      setAttackStep(1);
      setContainmentTime(64.2);
    }, 800);

    const step2 = setTimeout(() => {
      setAttackStep(2);
      setContainmentTime(31.5);
    }, 1800);

    const step3 = setTimeout(() => {
      setAttackStep(3);
      setContainmentTime(17.8);
      setIsSimulating(false);
    }, 2800);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071323] via-[#08172c] to-[#0a192f] text-white pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/80">
      {/* Background Cyber Grid Lines and Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5A9955]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#037fff]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A9955]/15 border border-[#5A9955]/40 text-[#5A9955] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#5A9955] animate-ping" />
              <span>Gartner® Peer Insights™ Voice of the Customer for SIEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white font-sans">
              Our AI Kills Active Attacks in{' '}
              <span className="bg-gradient-to-r from-[#5A9955] via-emerald-400 to-[#037fff] bg-clip-text text-transparent underline decoration-[#5A9955]/40 decoration-wavy">
                90 Seconds
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl">
              While You&apos;re Reading This Alert, We&apos;ve Already Contained It. 
              <span className="text-white font-semibold block mt-1">
                The Threat Doesn&apos;t Wait. Neither Do We.
              </span>
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://cguard.seceon.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#3f6d3c] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-xl shadow-[#5A9955]/25 border border-emerald-400/30 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Start CGuard 30-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-[#037fff] fill-[#037fff]" />
                <span>Interactive Product Demo</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                <span>Setup in 60 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                <span>Zero Log Volume Tax</span>
              </div>
            </div>
          </div>

          {/* Right Graphic: Interactive Cyber SOC Simulator */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#0b1b30] border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden">
              
              {/* Top Bar of SOC Simulator */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Interactive Product Demo
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Target Containment: &lt; 90s
                  </span>
                  <button
                    onClick={simulateNewAttack}
                    disabled={isSimulating}
                    className="px-2.5 py-1 text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className={`w-3 h-3 ${isSimulating ? 'animate-spin text-emerald-400' : ''}`} />
                    <span>Re-test AI Kill</span>
                  </button>
                </div>
              </div>

              {/* Tab Navigation for Simulator */}
              <div className="flex flex-wrap gap-1.5 mb-4 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
                {[
                  { id: 'traffic', label: 'AI Traffic Map' },
                  { id: 'governance', label: 'Governance Dashboard' },
                  { id: 'tools', label: 'AI Tool Monitor' },
                  { id: 'policies', label: 'AI Policies' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-[#5A9955] text-white shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Simulator Content Screen */}
              <div className="space-y-3">
                {/* Active Attack Banner */}
                <div className="bg-slate-900/90 border border-red-500/30 rounded-xl p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                        <ShieldAlert className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-red-400 uppercase">
                            Active Cyber Incursion
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 font-mono border border-red-800">
                            CRITICAL
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-mono mt-0.5">
                          T1021.002: Cobalt Strike Beaconing & Shadow AI Exfil
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        Time to Kill
                      </div>
                      <div className="text-lg font-black text-emerald-400 font-mono">
                        {containmentTime.toFixed(1)}s
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar of 90-sec containment */}
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, ((90 - containmentTime) / 90) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Real-time SOAR Playbook Execution Steps */}
                <div className="bg-[#08121f] rounded-xl p-3 border border-slate-800 text-[11px] font-mono space-y-2">
                  <div className="text-slate-400 flex items-center justify-between text-[10px] uppercase tracking-wider border-b border-slate-800/80 pb-1.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Terminal className="w-3 h-3 text-[#5A9955]" />
                      Seceon Autonomous SOAR Playbook #901
                    </span>
                    <span className="text-emerald-400">ENGINE: SERA AI</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <div className={`flex items-center gap-2 transition-opacity ${attackStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>[T+01.4s] Discovered anomalous TLS beacon to 193.142.12.8</span>
                    </div>

                    <div className={`flex items-center gap-2 transition-opacity ${attackStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>[T+07.2s] Correlated endpoint memory injection in wmiprvse.exe</span>
                    </div>

                    <div className={`flex items-center gap-2 transition-opacity ${attackStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-300 font-bold">
                        [T+18.4s] AUTO-CONTAINED: Host isolated, AD token revoked, C2 blocked
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Events Correlated</div>
                    <div className="text-xs font-bold text-slate-100">14.2M / sec</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Dwell Reduction</div>
                    <div className="text-xs font-bold text-emerald-400">-99.8%</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Human Lag</div>
                    <div className="text-xs font-bold text-[#037fff]">0 Seconds</div>
                  </div>
                </div>
              </div>

              {/* Status footer badge */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#5A9955]" />
                  Zero Black Box • Auditable Playbooks
                </span>
                <button
                  onClick={onOpenDemoModal}
                  className="text-[#5A9955] hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  Explore aiTRiSM Screen ↗
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
