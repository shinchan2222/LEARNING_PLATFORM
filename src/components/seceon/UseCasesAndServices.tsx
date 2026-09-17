'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  KeyRound, 
  Cloud, 
  Radio, 
  ArrowUpRight, 
  FileWarning, 
  UserX, 
  Bug, 
  Lock, 
  Flame, 
  Globe, 
  ArrowRight,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface UseCasesAndServicesProps {
  onOpenDemoModal: () => void;
}

export const UseCasesAndServices: React.FC<UseCasesAndServicesProps> = ({ onOpenDemoModal }) => {
  const [activeTab, setActiveTab] = useState<'useCases' | 'services'>('useCases');

  const useCases = [
    {
      title: 'Ransomware Detection & Kill',
      icon: Lock,
      desc: 'Detects precursor indicators (shadow copy deletion, mass file renaming, C2 check-ins) and auto-terminates the ransomware process before encryption propagates.',
      stat: '&lt; 90s Kill'
    },
    {
      title: 'Advanced Threat Detection (APTs)',
      icon: ShieldAlert,
      desc: 'Correlates multi-stage stealth techniques across network flows, DNS requests, and endpoints to pinpoint nation-state actors and living-off-the-land binaries.',
      stat: 'Zero-Day Shield'
    },
    {
      title: 'Insider & Credential Breaches',
      icon: UserX,
      desc: 'Monitors behavioral baselines of privileged users. Flags impossible travel, sudden bulk file downloads, and abnormal lateral access attempts.',
      stat: 'Dynamic UEBA'
    },
    {
      title: 'Bruteforce & Password Spray',
      icon: KeyRound,
      desc: 'Stops automated credential stuffing campaigns against VPNs, SSH, RDP, and SaaS portals with instantaneous dynamic IP blocking.',
      stat: 'Auto-Blocklist'
    },
    {
      title: 'Cloud & Hybrid Security',
      icon: Cloud,
      desc: 'Detects IAM privilege escalations, unencrypted S3 buckets, rogue cloud instances, and malicious API activity across AWS, Azure, and GCP.',
      stat: 'Multi-Cloud'
    },
    {
      title: 'Data Exfiltration Defense',
      icon: ArrowUpRight,
      desc: 'Monitors egress traffic volume and encrypted DNS tunnels to halt intellectual property leakage and unauthorized external data transfers.',
      stat: 'Zero Leakage'
    },
    {
      title: 'DNS Protection & C2 Severing',
      icon: Radio,
      desc: 'Intercepts malicious domain lookups, fast-flux DNS queries, and domain generation algorithms (DGA) used by botnets.',
      stat: 'DGA Detection'
    },
    {
      title: 'Web Application Security',
      icon: Globe,
      desc: 'Protects critical customer-facing portals and APIs against SQL injection, cross-site scripting (XSS), and zero-day web exploits.',
      stat: 'WAF Telemetry'
    }
  ];

  const partnerServices = [
    {
      title: 'Advisory & Strategy Services',
      desc: 'Strategic executive guidance to establish cyber resilience, align with modern frameworks (NIST, CIS), and optimize security operations.',
      tag: 'CISO Advisory'
    },
    {
      title: 'Attack Surface Monitoring',
      desc: 'Continuous non-intrusive discovery and risk scoring of exposed public IPs, rogue domain names, certificates, and leaked credentials.',
      tag: 'External Posture'
    },
    {
      title: 'Audit & Compliance Assurance',
      desc: 'Comprehensive compliance assessments mapping operational telemetry to PCI-DSS 4.0, HIPAA, SOC 2 Type II, and ISO 27001 standards.',
      tag: 'Continuous Audit'
    },
    {
      title: 'Breach Attack Simulation (BAS)',
      desc: 'Non-disruptive adversary emulation exercising production defenses against real-world MITRE ATT&CK techniques.',
      tag: 'Active Emulation'
    },
    {
      title: 'Incident Response & Forensics',
      desc: '24/7 rapid incident containment, reverse engineering, digital evidence recovery, and formal post-mortem reporting.',
      tag: 'Emergency Response'
    },
    {
      title: 'Red Teaming & Pen-Testing',
      desc: 'Realistic adversary attack simulations testing organizational defenses, incident response speed, and human security awareness.',
      tag: 'Red Team Ops'
    },
    {
      title: 'Risk Management Services',
      desc: 'Quantitative cyber risk assessments aligning organizational risk tolerance with defensive controls and capital investments.',
      tag: 'Risk Scoring'
    },
    {
      title: 'Vulnerability Lifecycle Management',
      desc: 'Contextual risk-based vulnerability prioritization that filters out low-impact noise and focuses remediation on weaponized CVEs.',
      tag: 'Risk Prioritization'
    }
  ];

  return (
    <section id="use-cases" className="bg-[#071323] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
              Proven Protection &amp; Strategic Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
              Featured Use Cases &amp; Partner-Led Services
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Solve critical cybersecurity challenges with autonomous AI software or engage certified Seceon partners for hands-on operational excellence.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('useCases')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'useCases'
                  ? 'bg-[#5A9955] text-white shadow-md shadow-[#5A9955]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Featured Use Cases (8)
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#5A9955] text-white shadow-md shadow-[#5A9955]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Partner-Led Services (8)
            </button>
          </div>
        </div>

        {/* Content Grids */}
        {activeTab === 'useCases' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {useCases.map((uc, idx) => {
              const Icon = uc.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#091728] border border-slate-800 rounded-xl p-6 hover:border-[#5A9955]/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5A9955]/10 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[#5A9955] group-hover:bg-[#5A9955]/20 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {uc.stat}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#5A9955] transition-colors">
                      {uc.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={onOpenDemoModal}
                      className="text-xs font-semibold text-[#037fff] hover:text-blue-300 flex items-center gap-1"
                    >
                      See Playbook <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {partnerServices.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#091728] border border-slate-800 rounded-xl p-6 hover:border-[#037fff]/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#037fff]/10 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[#037fff] group-hover:bg-[#037fff]/20 transition-colors">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#037fff] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={onOpenDemoModal}
                    className="text-xs font-semibold text-[#5A9955] hover:text-emerald-300 flex items-center gap-1"
                  >
                    Engage Partner <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
