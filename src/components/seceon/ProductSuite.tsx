'use client';

import React from 'react';
import { Shield, Eye, Lock, Zap, Server, Cloud, Cpu, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProductSuiteProps {
  onOpenDemoModal: () => void;
}

export const ProductSuite: React.FC<ProductSuiteProps> = ({ onOpenDemoModal }) => {
  const products = [
    {
      name: 'aiSIEM™',
      tagline: 'Streaming Next-Gen SIEM & Compliance',
      description: 'Replaces antiquated batch-query log aggregators with in-memory streaming AI analytics. Unifies log management, UEBA, and 1-click compliance reporting without index storage penalties.',
      badge: 'Core Flagship',
      icon: Server,
      color: '#5A9955',
      features: [
        'Real-time log ingestion with zero indexing delay',
        'Automatic baseline creation for every user and host',
        'Continuous compliance mapping (PCI-DSS, HIPAA, GDPR, NIST)',
        'Built-in UEBA eliminating separate licenses'
      ]
    },
    {
      name: 'aiXDR™-PMAX',
      tagline: 'Extended Detection & Automated Response',
      description: 'Extends visibility deep into multi-cloud workloads, hybrid network flows, identity providers, and endpoints. Correlates indicators across disparate domains to neutralize complex APT campaigns.',
      badge: 'High Performance',
      icon: Cpu,
      color: '#037fff',
      features: [
        'Endpoint, cloud, network, and identity cross-telemetry',
        'Sub-90s automated multi-point threat remediation',
        'Integrated MITRE ATT&CK kill-chain mapping',
        'Multi-tenant single-pane-of-glass operations'
      ]
    },
    {
      name: 'aiSIEM CGuard™',
      tagline: 'SaaS Cloud-Native Rapid Defense',
      description: 'Cloud-native managed SIEM delivered directly as a turnkey SaaS service. Enables enterprises and mid-market organizations to gain enterprise-grade SOC capabilities within 60 minutes.',
      badge: '30-Day Free Trial',
      icon: Cloud,
      color: '#10b981',
      features: [
        'Zero on-premise hardware or server footprint required',
        'Self-onboarding wizard with 350+ cloud connectors',
        'Instant visibility into Microsoft 365, AWS, and Google Cloud',
        'Includes 24/7 emergency response escalation support'
      ]
    },
    {
      name: 'SERA AI™',
      tagline: 'Autonomous AI Security Investigator',
      description: 'Seceon Expert Remediation and Autonomous AI agent. Automatically evaluates security telemetry, synthesizes root cause hypotheses, runs triage playbooks, and summarizes incidents for security analysts.',
      badge: 'Agentic AI',
      icon: Zap,
      color: '#8b5cf6',
      features: [
        'Autonomous attack timeline and root-cause reconstruction',
        'Natural-language incident explanations and guidance',
        'Proactive threat hunting across historical telemetry',
        'Eliminates 95% of Tier-1 repetitive SOC grunt work'
      ]
    }
  ];

  return (
    <section id="products" className="bg-[#050d18] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#5A9955]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
            The Seceon Product Family
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Autonomous Cybersecurity Built for Speed and Scale
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Deploy individually or leverage as a unified Open Threat Management (OTM) platform. Protect your enterprise, cloud workloads, and clients with zero complexity.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.name}
                className="bg-[#09182b] border border-slate-700/80 rounded-2xl p-7 sm:p-8 hover:border-[#5A9955]/70 transition-all hover:shadow-2xl hover:shadow-[#5A9955]/10 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-[#5A9955]/50 transition-all text-[#5A9955]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#5A9955]/20 text-emerald-400 border border-[#5A9955]/40 uppercase tracking-wider">
                      {prod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#5A9955] transition-colors">
                      {prod.name}
                    </h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                      {prod.tagline}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {prod.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#5A9955] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={onOpenDemoModal}
                    className="text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-md shadow-[#5A9955]/20"
                  >
                    <span>Request Technical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="https://cguard.seceon.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>Live Console</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
