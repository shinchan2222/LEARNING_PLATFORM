'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  ArrowRight
} from 'lucide-react';
import { CONTACT_LOCATIONS } from '@/data/seceonData';

interface FooterProps {
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  return (
    <footer className="bg-[#030913] text-slate-400 text-xs border-t border-slate-800">
      
      {/* Pre-Footer Action Banner */}
      <div className="bg-gradient-to-r from-[#0a1f38] via-[#08182b] to-[#040e1b] py-12 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                24/7 Access to Seceon&apos;s Cybersecurity Experts - Because Threats Don&apos;t Wait
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl">
                Ready to stop ransomware in under 90 seconds? Request your custom Proof of Value (POV) and see real threats in your environment within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-xl shadow-[#5A9955]/25 flex items-center gap-2 transition-all"
              >
                <span>Book An Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://cguard.seceon.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-colors"
              >
                Start CGuard 30-Day Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5A9955] to-[#1e4620] flex items-center justify-center border border-emerald-400/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-white tracking-wider">SECEON</span>
                  <span className="text-[10px] font-bold text-[#5A9955] px-1 py-0.2 rounded bg-[#5A9955]/10 border border-[#5A9955]/20">AI</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Autonomous Open Threat Management
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Pioneer in streaming AI-driven cybersecurity. Delivering unified SIEM, SOAR, EDR, NDR, and UEBA to protect modern enterprises, cloud environments, and MSSPs worldwide.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5A9955] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Global Headquarters:</strong>
                  {CONTACT_LOCATIONS.headquarters.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5A9955] flex-shrink-0" />
                <span>Hotline: <a href="tel:+19789230040" className="text-white hover:text-[#5A9955] font-semibold">{CONTACT_LOCATIONS.headquarters.phone}</a></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5A9955] flex-shrink-0" />
                <span>Email: <a href="mailto:info@seceon.com" className="text-slate-300 hover:text-[#5A9955]">{CONTACT_LOCATIONS.headquarters.email}</a></span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              <strong className="text-slate-300">R&amp;D Innovation Centers:</strong> Pune &amp; Noida, India
            </div>
          </div>

          {/* Col 2: Platform & Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              OTM Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-white transition-colors">aiSIEM™ (Next-Gen SIEM)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">aiXDR™-PMAX (Extended Detection)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">aiSIEM CGuard™ (Cloud Native)</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">aiTRiSM360™ (AI &amp; LLM Security)</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">aiBAS360™ (Breach Simulation)</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">aiCompliance CMX360™</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">aiSecurity Email360™</a></li>
              <li><a href="#roi-calculator" className="text-[#5A9955] font-semibold hover:underline">SecROI360™ Calculator</a></li>
            </ul>
          </div>

          {/* Col 3: Partner Led Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Partner Led Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Advisory Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Attack Surface Monitoring</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Audit Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Breach Attack Simulation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Incident Response &amp; Forensics</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Red Teaming Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Risk Management Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vulnerability Management</a></li>
            </ul>
          </div>

          {/* Col 4: Use Cases & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Use Cases &amp; Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#use-cases" className="hover:text-white transition-colors">Advanced Threat Detection</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Bruteforce Prevention</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Cloud Security</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Insider &amp; Credential Breaches</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Ransomware Detection</a></li>
              <li><a href="#leadership" className="hover:text-white transition-colors">About Us &amp; Leadership</a></li>
              <li><a href="#awards" className="hover:text-white transition-colors">Awards &amp; Recognition</a></li>
              <li>
                <button 
                  onClick={onOpenDemoModal}
                  className="text-[#037fff] hover:text-blue-300 font-semibold"
                >
                  Contact Us / Book Meeting
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright @Seceon Inc 2026. All Rights Reserved. Seceon®, aiSIEM™, aiXDR™, and OTM™ are registered trademarks.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Security &amp; Trust Center</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">ISO 27001 / SOC 2 Type II</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
