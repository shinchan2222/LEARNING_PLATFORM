'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CAREERTIQ_PROGRAMS } from '@/data/careertiqData';

export const CareerTiQFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner / Skilling Statement */}
      <div className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B63E5] font-bold">
              CAREERTIQ CORPORATE SKILLING & FINISHING SCHOOL
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Career in Tech & Global Markets?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Join thousands of engineers and professionals transforming their careers across DeepTech, FinTech, MediaTech, and International Languages.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/programs/deep-tech"
              className="px-6 py-3 rounded-full bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/hire-from-us"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
            >
              Recruiter Partnerships
            </Link>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Corporate Identity & Address */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B63E5] to-blue-700 text-white flex items-center justify-center font-black text-xl shadow-md">
                C
              </div>
              <div className="text-2xl font-black tracking-tight text-white">
                Career<span className="text-[#0B63E5]">TiQ</span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              CareerTiQ Solutions Pvt Ltd is an institutional EdTech and corporate finishing school enabling students and mid-career professionals with next-generation high-growth competencies.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B63E5] shrink-0 mt-0.5" />
                <span>
                  CareerTiQ Solutions Pvt Ltd, Tech Park Campus, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0B63E5] shrink-0" />
                <span>admissions@careertiq.com • partnerships@careertiq.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0B63E5] shrink-0" />
                <span>+91 (0422) 498-2600 / +91 98402 11984</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              {[
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.57 1.57 0 1 0 0 3.14 1.57 1.57 0 0 0 0-3.14z" />
                    </svg>
                  )
                },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )
                },
                {
                  label: 'X (Twitter)',
                  href: 'https://twitter.com',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )
                },
                {
                  label: 'YouTube',
                  href: 'https://youtube.com',
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-[#0B63E5] border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Graduate Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Graduate Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {CAREERTIQ_PROGRAMS.map((prog) => (
                <li key={prog.slug}>
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {prog.domain} Program
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/programs/deep-tech" className="text-slate-400 hover:text-white transition-colors block py-0.5">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/programs/fin-tech" className="text-slate-400 hover:text-white transition-colors block py-0.5">
                  Quantitative FinTech
                </Link>
              </li>
              <li>
                <Link href="/programs/media-tech" className="text-slate-400 hover:text-white transition-colors block py-0.5">
                  Enterprise UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Initiatives */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  About CareerTiQ
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Masterclasses & Events
                </Link>
              </li>
              <li>
                <Link href="/hire-from-us" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Hire From Us (Recruiters)
                </Link>
              </li>
              <li>
                <Link href="/about#transparency" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Corporate Transparency Block
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/legal/terms" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/whistleblower" className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5">
                  Whistleblower Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@careertiq.com" className="text-slate-400 hover:text-white transition-colors block py-0.5">
                  Student Support Desk
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Accreditation Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              © {new Date().getFullYear()} CareerTiQ Solutions Pvt Ltd. All rights reserved. CIN: U80902TZ2024PTC039218.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/legal/terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/legal/privacy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/legal/refund" className="hover:underline">Refunds</Link>
            <span>•</span>
            <Link href="/legal/whistleblower" className="hover:underline">Whistleblower</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};