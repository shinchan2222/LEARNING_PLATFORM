import React from 'react';
import { PORTFOLIO } from '@/data/devopsData';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const PortfolioSection: React.FC<{ portfolio?: typeof PORTFOLIO }> = ({ portfolio = PORTFOLIO }) => {
  return (
    <section id="portfolio" className="bg-slate-50 py-20 lg:py-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              A snapshot of work we&apos;re proud of — crafted with care, built to perform.
            </p>
          </div>
          <a
            href="/#contact"
            className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-[#0B63E5] hover:text-blue-700 transition-colors"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolio.map((project, idx) => (
            <div
              key={project.title || idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              {/* Project Header / Visual */}
              <div
                className="h-40 relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: (project.color || '#0B63E5') + '15' }}
              >
                {/* Abstract visual */}
                <div
                  className="w-24 h-24 rounded-2xl opacity-20 rotate-12 group-hover:rotate-6 transition-transform"
                  style={{ backgroundColor: project.color || '#0B63E5' }}
                />
                <div
                  className="absolute w-16 h-16 rounded-xl opacity-30 -rotate-6 group-hover:-rotate-3 transition-transform"
                  style={{ backgroundColor: project.color || '#0B63E5' }}
                />
                <div className="absolute top-4 right-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: project.color || '#0B63E5' }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B63E5] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="/#contact"
                  className="flex items-center gap-1.5 text-xs font-bold transition-colors"
                  style={{ color: project.color || '#0B63E5' }}
                >
                  <span>Build Something Similar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
