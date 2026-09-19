'use client';

import React, { useState } from 'react';
import { TECH_TABS } from '@/data/devopsData';

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = TECH_TABS[activeTab] || TECH_TABS[0];

  return (
    <section id="technologies" className="bg-slate-50 py-20 lg:py-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
            Technologies We Use
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Modern Stack, Proven Results
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            We work with the best modern technologies across frontend, backend, mobile, and
            cloud — chosen for performance, scalability, and developer productivity.
          </p>
        </div>

        {/* Tab Pills */}
        <div role="tablist" aria-label="Technology Categories" className="flex flex-wrap justify-center gap-2 mb-10">
          {TECH_TABS.map((tab, idx) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === idx
                  ? 'bg-[#0B63E5] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-[#0B63E5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {currentTab.techs.map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center gap-2 hover:border-[#0B63E5] hover:shadow-md transition-all group text-center"
            >
              <span className="text-2xl" aria-hidden="true">{tech.icon}</span>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0B63E5] transition-colors leading-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
