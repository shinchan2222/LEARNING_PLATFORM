'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Cpu, 
  Coins, 
  Layers, 
  Globe2, 
  Sparkles,
  Phone,
  Mail,
  Building2,
  Calendar,
  Users
} from 'lucide-react';
import { CAREERTIQ_PROGRAMS } from '@/data/careertiqData';

export const CareerTiQNavbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const getDomainIcon = (slug: string) => {
    switch (slug) {
      case 'deep-tech': return Cpu;
      case 'fin-tech': return Coins;
      case 'media-tech': return Layers;
      default: return Globe2;
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactModalOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#0B63E5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Admissions 2026
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Empowering Next-Gen Workforce • NASSCOM & Industry Aligned Skilling Cohorts
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="mailto:admissions@careertiq.com" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Mail className="w-3 h-3" />
              <span>admissions@careertiq.com</span>
            </a>
            <a href="tel:+919876543210" className="hover:text-white hidden md:flex items-center gap-1.5 transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 (0422) 498-2600</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Exact CareerTiQ Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://careertiq.com/wp-content/uploads/2023/12/careertiq-logo-1.png"
                alt="CareerTiQ"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Programs Mega Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                onMouseLeave={() => setProgramsDropdownOpen(false)}
              >
                <button 
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 ${
                    pathname.startsWith('/programs') ? 'text-[#007BC6]' : 'text-[#222222] hover:text-[#007BC6]'
                  }`}
                >
                  <span>Graduate Programs</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${programsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 w-[560px] bg-white rounded-xl shadow-2xl border border-slate-100 p-5 grid grid-cols-2 gap-3 animate-fadeIn z-50">
                    {CAREERTIQ_PROGRAMS.map((prog) => {
                      const Icon = getDomainIcon(prog.slug);
                      return (
                        <Link
                          key={prog.slug}
                          href={`/programs/${prog.slug}`}
                          onClick={() => setProgramsDropdownOpen(false)}
                          className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex flex-col group"
                        >
                          <div className="flex items-center gap-2.5 mb-1">
                            <div className="p-2 rounded-md bg-blue-50 text-[#007BC6] group-hover:bg-[#007BC6] group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-[#222222] group-hover:text-[#007BC6]">
                              {prog.domain}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {prog.tagline}
                          </p>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Live batches starting next month</span>
                      <Link 
                        href="/programs/deep-tech" 
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="text-[#007BC6] font-bold hover:underline flex items-center gap-1"
                      >
                        Browse All Tracks <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/about" 
                className={`text-sm font-semibold transition-colors ${
                  pathname === '/about' ? 'text-[#007BC6]' : 'text-[#222222] hover:text-[#007BC6]'
                }`}
              >
                About Us
              </Link>

              <Link 
                href="/events" 
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === '/events' ? 'text-[#007BC6]' : 'text-[#222222] hover:text-[#007BC6]'
                }`}
              >
                <span>Events & Masterclasses</span>
                <span className="w-2 h-2 rounded-full bg-[#FF7707] animate-pulse" />
              </Link>

              <Link 
                href="/hire-from-us" 
                className={`text-sm font-semibold transition-colors ${
                  pathname === '/hire-from-us' ? 'text-[#007BC6]' : 'text-[#222222] hover:text-[#007BC6]'
                }`}
              >
                Hire From Us
              </Link>
            </nav>

            {/* Right Action CTA - Exact CareerTiQ orange button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-[#FF7707] hover:bg-[#e06804] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 group"
              >
                <span>Get In Touch</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="#FFFFFF"/>
                </svg>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-2xl">
            <div className="py-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-3">
                Graduate Programs
              </span>
              <div className="grid grid-cols-1 gap-1">
                {CAREERTIQ_PROGRAMS.map((prog) => {
                  const Icon = getDomainIcon(prog.slug);
                  return (
                    <Link
                      key={prog.slug}
                      href={`/programs/${prog.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-800 text-sm font-medium"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-50 text-[#0B63E5]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{prog.domain}</div>
                        <div className="text-[11px] text-slate-500">{prog.duration}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                About Us
              </Link>
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Events & Masterclasses
              </Link>
              <Link
                href="/hire-from-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Hire From Us
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#0B63E5] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Get In Touch Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B63E5] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Direct Career Advisory
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Connect with CareerTiQ Advisors
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Receive personalized curriculum counseling, corporate batch pricing, or hiring partnership assistance.
              </p>
            </div>

            {contactSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h4 className="font-bold text-base">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Our academic counselor will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Program of Interest</label>
                  <select className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] text-slate-900 bg-white">
                    <option value="deep-tech">DeepTech (AI, Machine Learning, Cybersecurity)</option>
                    <option value="fin-tech">FinTech (Algo Trading, Blockchain, WealthTech)</option>
                    <option value="media-tech">MediaTech (UI/UX, 3D Motion, VFX)</option>
                    <option value="languages">International Languages (Japanese, German, French)</option>
                    <option value="corporate">Corporate Skilling / Recruiter Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message or Queries</label>
                  <textarea
                    rows={3}
                    placeholder="Ask about placement assistance, batch schedules, or fee structures..."
                    className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5] text-slate-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold shadow-lg shadow-blue-500/25 transition-all text-sm"
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
