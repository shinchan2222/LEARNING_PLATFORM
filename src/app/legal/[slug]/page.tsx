'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Calendar, FileText, ArrowLeft } from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';
import { CAREERTIQ_LEGAL } from '@/data/careertiqData';

export default function LegalPolicyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const policy = CAREERTIQ_LEGAL[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B63E5] hover:underline mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to CareerTiQ Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#0B63E5]" />
                <span>Statutory Compliance Document</span>
                <span>•</span>
                <span>Last Updated: {policy.lastUpdated}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                {policy.title}
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                CareerTiQ Solutions Pvt Ltd • CIN: U80902TZ2024PTC039218
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              {policy.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Have questions about our compliance policies?</span>
              <a
                href="mailto:legal@careertiq.com"
                className="text-[#0B63E5] font-bold hover:underline"
              >
                Contact Legal Counsel →
              </a>
            </div>
          </div>

        </div>
      </main>

      <CareerTiQFooter />
    </div>
  );
}