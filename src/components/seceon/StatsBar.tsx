'use client';

import React from 'react';
import { SECEON_STATS } from '@/data/seceonData';

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-[#050e1a] border-b border-slate-800/80 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {SECEON_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="text-center group p-3 rounded-xl hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
            >
              <div className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white group-hover:text-[#5A9955] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug hidden sm:block">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
