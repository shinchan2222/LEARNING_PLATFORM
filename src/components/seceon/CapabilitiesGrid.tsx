'use client';

import React, { useState } from 'react';
import { OTM_CAPABILITIES } from '@/data/seceonData';
import { 
  ShieldCheck, 
  FileText, 
  Database, 
  Eye, 
  Crosshair, 
  Activity, 
  AlertTriangle, 
  Users, 
  Network, 
  Cloud, 
  Search, 
  Server, 
  Zap, 
  Laptop, 
  Lock, 
  RefreshCw,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CapabilitiesGridProps {
  onOpenDemoModal: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  FileText,
  Database,
  Eye,
  Crosshair,
  Activity,
  AlertTriangle,
  Users,
  Network,
  Cloud,
  Search,
  Server,
  Zap,
  Laptop,
  Lock,
  RefreshCw
};

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ onOpenDemoModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Platform', 'Network', 'Endpoint', 'Detection', 'Containment', 'Cloud', 'Governance'];

  const filteredCapabilities = OTM_CAPABILITIES.filter((cap) => {
    const matchesCategory = selectedCategory === 'All' || cap.category === selectedCategory;
    const matchesSearch = 
      cap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cap.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="platform" className="bg-[#071323] text-white py-20 lg:py-28 relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-[#5A9955] tracking-widest uppercase">
              Open Threat Management Platform
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
              Capabilities of OTM Platform
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              A single unified architecture replacing 10+ legacy point tools. Real-time streaming correlation across every asset, identity, flow, and cloud resource.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="text-xs font-bold text-[#5A9955] hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Data Connectors (350+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href="#roi-calculator"
              className="text-xs font-bold text-[#037fff] hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Quantify Your Security ROI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#5A9955] text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b1b30] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
            />
          </div>
        </div>

        {/* 16 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredCapabilities.map((cap) => {
            const IconComponent = iconMap[cap.icon] || ShieldCheck;
            return (
              <div
                key={cap.id}
                className="bg-[#0a182a] border border-slate-800/80 rounded-xl p-5 hover:border-[#5A9955]/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5A9955]/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0e223d] border border-slate-700 flex items-center justify-center text-[#5A9955] group-hover:scale-110 group-hover:text-emerald-400 group-hover:bg-[#5A9955]/15 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {cap.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#5A9955] transition-colors mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
                    Sub-90s Response
                  </span>
                  <button
                    onClick={onOpenDemoModal}
                    className="text-[#037fff] group-hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5A9955]/20 flex items-center justify-center text-[#5A9955]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Looking to Replace Splunk, QRadar, or Sentinel?
              </div>
              <div className="text-xs text-slate-400">
                Experience seamless 1-day migration with automated data parsers and zero EPS licensing fees.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDemoModal}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 rounded-lg transition-colors flex-shrink-0"
          >
            Request Migration Assessment
          </button>
        </div>

      </div>
    </section>
  );
};
