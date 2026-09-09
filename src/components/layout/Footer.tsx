import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Mail, Globe, Award, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Research<span className="text-indigo-400">Intern</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mentored academic and applied engineering internships directed by Dr. Aris Thorne. Building the next generation of systems architects, AI researchers, and security specialists.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Accredited Research Verification Available
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Internship Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/?domain=AI/ML" className="hover:text-white transition-colors">
                  Artificial Intelligence & LLMs
                </Link>
              </li>
              <li>
                <Link href="/?domain=Full%20Stack%20Development" className="hover:text-white transition-colors">
                  Full Stack Distributed Systems
                </Link>
              </li>
              <li>
                <Link href="/?domain=Cloud%20%26%20DevOps" className="hover:text-white transition-colors">
                  Cloud Infrastructure & Kubernetes
                </Link>
              </li>
              <li>
                <Link href="/?domain=Cybersecurity" className="hover:text-white transition-colors">
                  Cybersecurity & Cryptography
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Portals & Verification
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/student" className="hover:text-white transition-colors">
                  Student Task Workspace & Progress
                </Link>
              </li>
              <li>
                <span className="text-slate-500">
                  Stanford AI & Systems Research Labs
                </span>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">
                  Credential & Certificate Verification
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Research Paper Preprints (ArXiv)</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Faculty Contact
            </h4>
            <p className="text-xs text-slate-400 mb-2">
              Stanford AI & Distributed Systems Laboratory
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>internships@cs.stanford.edu</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Gates Computer Science Building</span>
              </div>
            </div>
            <div className="mt-4 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              ⚡ Instant enrollment with simulated Razorpay & Stripe test checkout.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CS Research Internships. Directed by Dr. Aris Thorne. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Academic Rigor</span>
            <span>•</span>
            <span>Code Review Guarantee</span>
            <span>•</span>
            <span>Verifiable Certificates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
