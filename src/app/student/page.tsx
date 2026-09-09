'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import StudentDashboardView from '@/components/student/StudentDashboardView';

export default function StudentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />
      <main className="flex-1">
        <StudentDashboardView />
      </main>
      
      {/* Unobtrusive minimal utility footer */}
      <footer className="border-t border-neutral-200/80 bg-[#fafaf9] py-8 text-xs text-neutral-500 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-neutral-600">
            <span className="font-medium text-neutral-800">Stanford AI & Systems Lab</span>
            <span className="text-neutral-300">•</span>
            <a 
              href="mailto:internships@cs.stanford.edu" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-2"
            >
              internships@cs.stanford.edu
            </a>
            <span className="text-neutral-300">•</span>
            <span>© 2026</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-neutral-500 text-[11px]">
            <a href="/#catalog" className="hover:text-neutral-900 transition-colors">
              Internship Catalog
            </a>
            <span className="text-neutral-300">•</span>
            <a href="/verify" className="hover:text-neutral-900 transition-colors">
              Verify Credential
            </a>
            <span className="text-neutral-300">•</span>
            <span className="font-mono text-neutral-400">v2.4.0-applied</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
