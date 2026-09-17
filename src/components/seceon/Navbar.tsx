'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ChevronDown, 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink,
  Search,
  Sparkles,
  Server,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { SECEON_NAVIGATION } from '@/data/seceonData';

interface NavbarProps {
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#030a13] border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a 
              href="tel:+19789230040" 
              className="flex items-center gap-1.5 hover:text-[#5A9955] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A9955]" />
              <span className="hidden sm:inline text-slate-400">SOC Hotline:</span>
              <span className="font-semibold text-slate-200">+1 (978)-923-0040</span>
            </a>
            <a 
              href="mailto:info@seceon.com" 
              className="flex items-center gap-1.5 hover:text-[#5A9955] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#5A9955]" />
              <span className="text-slate-300">info@seceon.com</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              OTM Engine v6.8 Active • 90s Containment Online
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5 text-slate-400">
            <a 
              href="https://partners.seceon.com/support/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Partner Portal</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://support.seceon.com/support/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Support Login
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://cguard.seceon.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#5A9955] font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>CGuard Console</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#071323]/95 backdrop-blur-md shadow-2xl border-b border-slate-800/80 py-3' 
          : 'bg-[#071323] border-b border-slate-800/50 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5A9955] to-[#1e4620] flex items-center justify-center shadow-lg shadow-[#5A9955]/20 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-wider text-white font-sans">
                    SECEON
                  </span>
                  <span className="text-xs font-bold text-[#5A9955] tracking-widest px-1 py-0.5 rounded bg-[#5A9955]/10 border border-[#5A9955]/20">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Autonomous Cybersecurity
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {SECEON_NAVIGATION.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  {item.hasDropdown ? (
                    <button 
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeDropdown === item.label 
                          ? 'text-white bg-slate-800/70' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180 text-[#5A9955]' : 'text-slate-400'
                      }`} />
                    </button>
                  ) : (
                    <a 
                      href={item.href || '#'}
                      className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-md transition-colors block"
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Mega Dropdown */}
                  {item.hasDropdown && item.dropdown && activeDropdown === item.label && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px] xl:w-[820px] z-50 animate-fadeIn"
                    >
                      <div className="bg-[#0b1b30] border border-slate-700/80 rounded-xl shadow-2xl p-6 backdrop-blur-xl ring-1 ring-white/10">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#5A9955]" />
                            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                              {item.dropdown.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#5A9955] font-mono">
                            Sub-90s Dynamic Containment
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {item.dropdown.columns.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
                                {col.category}
                              </h4>
                              <ul className="space-y-2">
                                {col.items.map((subItem) => (
                                  <li key={subItem.name}>
                                    <a 
                                      href={subItem.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group/item block p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-200 group-hover/item:text-[#5A9955] transition-colors">
                                          {subItem.name}
                                        </span>
                                        {subItem.badge && (
                                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#5A9955]/20 text-[#5A9955] border border-[#5A9955]/30">
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {subItem.description && (
                                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                                          {subItem.description}
                                        </p>
                                      )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9955]" />
                            SOC-Ready in 24 Hours • Zero Log Tax
                          </span>
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              onOpenDemoModal();
                            }}
                            className="text-[#5A9955] font-semibold hover:underline flex items-center gap-1"
                          >
                            Schedule Live Technical Briefing <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button 
                onClick={onOpenDemoModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Book An Appointment</span>
              </button>

              <button 
                onClick={onOpenDemoModal}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-lg transition-all shadow-lg shadow-[#5A9955]/25 flex items-center gap-1.5 group"
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <button 
                onClick={onOpenDemoModal}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#5A9955] rounded-lg"
              >
                Demo
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a182a] border-b border-slate-800 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-2">
              {SECEON_NAVIGATION.map((item) => (
                <div key={item.label} className="border-b border-slate-800/80 pb-2">
                  <a 
                    href={item.href || '#'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-semibold text-slate-200"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </a>
                  {item.dropdown && (
                    <div className="pl-3 space-y-2 py-1 text-xs text-slate-400">
                      {item.dropdown.columns.flatMap(c => c.items).slice(0, 5).map(sub => (
                        <a 
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-slate-300 hover:text-[#5A9955]"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-2.5 text-xs font-bold text-center text-white bg-[#5A9955] rounded-lg shadow-md"
              >
                Schedule Interactive Demo
              </button>
              <a 
                href="https://cguard.seceon.ai/"
                className="w-full block py-2 text-xs font-semibold text-center text-slate-300 bg-slate-800 rounded-lg border border-slate-700"
              >
                Start CGuard 30-Day Free Trial
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
