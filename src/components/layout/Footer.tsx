import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Institutional Credibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-white text-neutral-950 flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                S
              </div>
              <span className="font-bold text-white text-sm tracking-tight font-mono">
                STANFORD CS LAB
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Systems & Applied AI Research Cohorts directed by Dr. Aris Thorne. Educating and mentoring the next generation of systems architects, AI researchers, and security specialists.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Public Cryptographic Verification Available</span>
            </div>
          </div>

          {/* Col 2: Research Domains */}
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-200 mb-4">
              Research Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/?domain=AI/ML" className="hover:text-white transition-colors">
                  Artificial Intelligence & LLM Kernels
                </Link>
              </li>
              <li>
                <Link href="/?domain=Full%20Stack%20Development" className="hover:text-white transition-colors">
                  Distributed Systems & Microservices
                </Link>
              </li>
              <li>
                <Link href="/?domain=Cloud%20%26%20DevOps" className="hover:text-white transition-colors">
                  Cloud Infrastructure & Kubernetes
                </Link>
              </li>
              <li>
                <Link href="/?domain=Cybersecurity" className="hover:text-white transition-colors">
                  Offensive Security & Cryptography
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verification & Portals */}
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-200 mb-4">
              Student & Verification Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/student" className="hover:text-white transition-colors">
                  Student Workspace & Grading Ledger
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student Portal Authentication
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  New Intern Registration
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">
                  Public Credential Verification Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Faculty & Lab Coordinates */}
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-200 mb-4">
              Faculty Lab Coordinates
            </h4>
            <p className="text-neutral-400 text-xs mb-3">
              Department of Computer Science
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 mt-0.5 flex-shrink-0" />
                <span>Gates Computer Science Building, 353 Jane Stanford Way, Stanford, CA 94305</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                <a href="mailto:internships@cs.stanford.edu" className="hover:text-white transition-colors font-mono text-[11px]">
                  internships@cs.stanford.edu
                </a>
              </div>
            </div>
            <div className="mt-4 p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
              ⚡ Sandbox environment: Razorpay UPI & Stripe simulator enabled for instant enrollment.
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Stanford CS Systems Research. Directed by Dr. Aris Thorne.</p>
          <div className="flex items-center gap-4">
            <span>Production Peer Review</span>
            <span>·</span>
            <span>Verifiable Capstone</span>
            <span>·</span>
            <span>Academic LoR Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
