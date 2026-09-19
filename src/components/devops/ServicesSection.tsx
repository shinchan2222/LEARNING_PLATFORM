'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/data/devopsData';
import {
  Code2, Globe, Smartphone, Palette, Cloud, Server, ArrowRight, CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code2, Globe, Smartphone, Palette, Cloud, Server,
};

export const ServicesSection: React.FC<{ services?: typeof SERVICES }> = ({ services = SERVICES }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="services" className="bg-white py-20 lg:py-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            End-to-End Software Services
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Whether you need a brand-new product built from scratch or want to modernize
            existing software — we&apos;ve got you covered from design to deployment.
          </p>
        </div>

        {/* 3 x 2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            const isActive = activeId === service.id;
            const color = service.color || '#0B63E5';
            const lightColor = service.lightColor || '#EFF6FF';
            const features = service.features || [];

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`relative group rounded-2xl p-7 border-2 transition-all duration-300 cursor-default flex flex-col ${
                  isActive
                    ? 'border-[#0B63E5] shadow-2xl shadow-blue-100 -translate-y-1'
                    : 'border-slate-100 shadow-sm hover:shadow-md'
                }`}
                style={{ backgroundColor: isActive ? lightColor : '#ffffff' }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{
                    backgroundColor: isActive ? color : '#F1F5F9',
                    color: isActive ? '#ffffff' : color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title & Short Desc */}
                <h3
                  className={`text-xl font-bold mb-2 transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-800'
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Feature List */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Link */}
                <a
                  href="/#contact"
                  className="text-xs font-bold flex items-center gap-1 transition-colors"
                  style={{ color }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
