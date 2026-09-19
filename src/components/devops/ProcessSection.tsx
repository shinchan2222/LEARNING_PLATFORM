import React from 'react';
import { PROCESS_STEPS } from '@/data/devopsData';
import { Search, Palette, Code2, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search, Palette, Code2, Rocket,
};

export const ProcessSection: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How We Work
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            A transparent, collaborative process designed to deliver exceptional results —
            from your first idea to successful launch and beyond.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#0B63E5]/20 via-[#0B63E5]/60 to-[#0B63E5]/20 z-0" />

          {PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Code2;
            return (
              <div
                key={step.step}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step number + Icon circle */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B63E5] flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0B63E5] text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
