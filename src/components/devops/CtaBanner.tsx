import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { COMPANY } from '@/data/devopsData';

export const CtaBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#0B63E5] via-blue-700 to-indigo-800 py-16 sm:py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -right-8 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>Your Next Project Awaits</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Ready to Start Your Project?
        </h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Tell us your idea and we&apos;ll turn it into a powerful digital product. First
          consultation is completely free — no strings attached.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="/#contact"
            className="px-8 py-4 text-sm font-bold text-[#0B63E5] bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all flex items-center gap-2 group"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="px-8 py-4 text-sm font-bold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 rounded-xl transition-all"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>
    </section>
  );
};
