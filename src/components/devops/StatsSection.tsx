import React from 'react';
import { STATS } from '@/data/devopsData';

export const StatsSection: React.FC<{ stats?: typeof STATS }> = ({ stats = STATS }) => {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 group">
              <div className="text-4xl sm:text-5xl font-black text-white group-hover:text-[#0B63E5] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
