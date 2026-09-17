'use client';

import React from 'react';
import { TICKER_ITEMS } from '@/data/seceonData';

export const Ticker: React.FC = () => {
  return (
    <div className="bg-[#0b1d33] border-y border-slate-800 text-slate-200 py-3 overflow-hidden select-none">
      <div className="flex space-x-12 animate-marquee whitespace-nowrap">
        {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
          <span 
            key={idx} 
            className="text-xs font-semibold tracking-wide flex items-center gap-2 hover:text-[#5A9955] transition-colors"
          >
            {item}
            <span className="text-slate-600 font-bold ml-6">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
