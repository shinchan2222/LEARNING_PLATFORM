import React from 'react';
import { WHY_US } from '@/data/devopsData';
import { Zap, ShieldCheck, Headphones, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap, ShieldCheck, Headphones, TrendingUp,
};

export const WhyUsSection: React.FC = () => {
  return (
    <section
      id="why-us"
      className="bg-gradient-to-br from-[#0B63E5] to-blue-800 text-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left: Heading */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              Why DEVops
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Built Different, Delivered Better
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              We don&apos;t just write code — we build reliable products, lasting partnerships,
              and software that genuinely moves your business forward.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B63E5] text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Work With Us →
            </a>
          </div>

          {/* Right: 4 Pillars */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_US.map((item) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
