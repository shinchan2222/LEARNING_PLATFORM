'use client';

import React from 'react';
import { Users, Shield, Building, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';

interface PartnersSectionProps {
  onOpenDemoModal: () => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="partners" className="bg-[#050e1a] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
            Partner-First Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Built for Service Providers &amp; Modern Enterprises
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Over 500 MSPs and MSSPs build high-margin managed detection and response (MDR) practices powered by Seceon&apos;s multi-tenant architecture.
          </p>
        </div>

        {/* 3 Partner Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          
          {/* Pillar 1: MSP */}
          <div className="bg-[#091728] border border-slate-800 rounded-2xl p-8 hover:border-[#5A9955]/70 transition-all hover:shadow-xl hover:shadow-[#5A9955]/10 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#5A9955]/15 border border-[#5A9955]/30 flex items-center justify-center text-[#5A9955] group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#5A9955] uppercase">
                  Service Provider Growth
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Managed Service Provider (MSP)
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Elevate your IT managed services into recurring cybersecurity revenue. Seceon provides an all-in-one platform eliminating the need to manage 6 different security vendors.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Turnkey transition from MSP to MSSP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Sub-minute automated tenant provisioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5A9955]" />
                  <span>Co-branded reports &amp; client dashboards</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Join MSP Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2: MSSP */}
          <div className="bg-[#0b1c31] border border-[#5A9955]/40 rounded-2xl p-8 hover:border-[#5A9955] transition-all hover:shadow-2xl hover:shadow-[#5A9955]/20 flex flex-col justify-between group relative ring-1 ring-[#5A9955]/30">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black uppercase tracking-wider text-black">
              High Margin
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  Advanced 24x7 SOC Platform
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Managed Security Service Provider (MSSP)
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Supercharge your SOC analyst efficiency by 77%. Ingest hundreds of millions of events daily per client with under 1% false positive rate and full SOAR automation.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>True hierarchical multi-tenancy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Role-based access &amp; segregated client data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Predictable margins with no per-GB tax</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#5A9955]/30"
              >
                <span>Request MSSP Partner Kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Enterprise */}
          <div className="bg-[#091728] border border-slate-800 rounded-2xl p-8 hover:border-[#037fff]/70 transition-all hover:shadow-xl hover:shadow-[#037fff]/10 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#037fff]/15 border border-[#037fff]/30 flex items-center justify-center text-[#037fff] group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#037fff] uppercase">
                  Global Distributed Defense
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Enterprise Cyber Defense
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Empower your internal security team with an autonomous SOC that isolates threats in 90 seconds. Protect on-prem data centers, hybrid multi-cloud, and remote workforces.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#037fff]" />
                  <span>Sub-second dwell time containment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#037fff]" />
                  <span>350+ out-of-the-box infrastructure connectors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#037fff]" />
                  <span>Zero-friction 30-Day Proof of Value</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enterprise Architecture Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
