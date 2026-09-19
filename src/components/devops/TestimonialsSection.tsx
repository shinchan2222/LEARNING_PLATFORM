'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '@/data/devopsData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC<{ testimonials?: typeof TESTIMONIALS }> = ({
  testimonials = TESTIMONIALS,
}) => {
  const items = testimonials.length > 0 ? testimonials : TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const t = items[current] || items[0];

  const renderStars = (rating: number) => {
    const count = Math.max(1, Math.min(5, Math.floor(Number(rating)) || 5));
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ));
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
            Client Love
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Real feedback from real clients who&apos;ve experienced the DEVops difference.
          </p>
        </div>

        {/* Testimonial cards — all 3 visible on desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {items.map((test, idx) => (
            <div
              key={test.name ? `${test.name}-${idx}` : idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-[#0B63E5]/20" />
              <p className="text-slate-700 text-sm leading-relaxed italic flex-grow">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-1">
                {renderStars(test.rating)}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shadow-md"
                  style={{ backgroundColor: test.color || '#0B63E5' }}
                >
                  {test.initials || 'CL'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{test.name}</div>
                  <div className="text-xs text-slate-500">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4">
            <Quote className="w-8 h-8 text-[#0B63E5]/20" />
            <p className="text-slate-700 text-sm leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-1">
              {renderStars(t.rating)}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black"
                  style={{ backgroundColor: t.color || '#0B63E5' }}
                >
                  {t.initials || 'CL'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
