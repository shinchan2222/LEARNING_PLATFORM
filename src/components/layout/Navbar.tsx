'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  GraduationCap, 
  Terminal, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  Award,
  ChevronDown
} from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const navLinks = [
    { href: '/', label: 'Internship Catalog', icon: BookOpen },
    { href: '/student', label: 'Student Portal', icon: Terminal },
    { href: '/verify', label: 'Verify Certificate', icon: Award },
  ];

  return (
    <>
      {/* Top Bar with Editorial Lab Notice */}
      <div className="bg-[#f4f4f2] text-neutral-600 text-xs px-4 py-1.5 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 font-semibold">
            Stanford CS Lab
          </span>
          <span className="text-neutral-300 hidden sm:inline">/</span>
          <span className="text-neutral-600 text-[11px] hidden sm:inline">
            Systems & Machine Learning Research Cohorts · Dr. Aris Thorne
          </span>
        </div>

        {/* Student Workspace Notice */}
        <div className="flex items-center gap-2">
          <Link
            href="/student"
            className="text-[11px] text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            Student Workspace →
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-[#fafaf9]/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs">
                ✦
              </div>
              <div>
                <div className="font-semibold text-neutral-900 text-sm tracking-tight leading-none group-hover:text-neutral-700 transition-colors">
                  Research<span className="text-neutral-500 font-normal">Intern</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono tracking-tight mt-0.5">
                  cs.stanford.edu/internships
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isStudentPortal = link.href === '/student';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && isStudentPortal && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right User Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-slate-300 object-cover"
                    />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-slate-900 leading-snug">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono capitalize flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {user.role === 'student' ? 'Enrolled Student' : 'Lab Researcher'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Student Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </div>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-200" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.role === 'student' ? 'Student Intern' : 'Researcher'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-medium px-2 py-1 rounded bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-sm font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Student Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </>
  );
};
