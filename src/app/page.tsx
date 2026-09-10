'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Cpu, 
  Coins, 
  Layers, 
  Globe2, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Award, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Mail, 
  Calendar,
  Building,
  TrendingUp,
  Download,
  GraduationCap
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';
import { 
  CAREERTIQ_PROGRAMS, 
  CAREERTIQ_PARTNERS, 
  CAREERTIQ_BLOGS, 
  CAREERTIQ_EVENTS 
} from '@/data/careertiqData';

export default function CareerTiQHomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const getDomainIcon = (slug: string) => {
    switch (slug) {
      case 'deep-tech': return Cpu;
      case 'fin-tech': return Coins;
      case 'media-tech': return Layers;
      default: return Globe2;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white pt-16 pb-20 lg:pt-24 lg:pb-28">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0B63E5] text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#0B63E5]" />
                <span>Next-Gen Skilling & Finishing School</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B63E5]" />
                <span className="text-slate-600 font-semibold">2026 Admissions Open</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.08]">
                Embrace Innovation! <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B63E5] via-blue-600 to-indigo-700">
                  Experience Transformation!
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
                CareerTiQ equips engineers, graduates, and working professionals with industry-ready mastery in DeepTech, FinTech, MediaTech, and Global Corporate Languages.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/programs/deep-tech"
                  className="px-8 py-3.5 rounded-full bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Graduate Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm sm:text-base shadow-xs transition-all hover:border-slate-400"
                >
                  Discover CareerTiQ
                </Link>
              </div>

              {/* High-Resolution Hero Banner Image */}
              <div className="pt-10 max-w-5xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
                    alt="CareerTiQ Collaborative Cohort"
                    className="w-full h-72 sm:h-96 md:h-[480px] object-cover object-center opacity-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 sm:p-10">
                    <div className="text-left text-white max-w-xl">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                        Corporate Skilling Ecosystem
                      </span>
                      <h3 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                        Live Project Sandboxes & Guaranteed Industry Interviews
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { value: '10,000+', label: 'Learners Trained', sub: 'Across Tier-1 & Tier-2 Colleges' },
                  { value: '94%', label: 'Placement Rate', sub: 'Within 90 Days of Graduation' },
                  { value: '120+', label: 'Hiring Partners', sub: 'FinTech, IT & Global MNCs' },
                  { value: '4 Core', label: 'Domain Verticals', sub: 'DeepTech, FinTech, Media, Lang' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 text-[#0B63E5]">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 4-CARD PROGRAM OVERVIEW GRID */}
        <section id="programs" className="py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Industry-Calibrated Curricula
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
                Our 4 Flagship Career Tracks
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Comprehensive practical training designed by engineering directors and corporate recruiters to fast-track career mobility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAREERTIQ_PROGRAMS.map((prog) => {
                const Icon = getDomainIcon(prog.slug);
                return (
                  <div
                    key={prog.slug}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#0B63E5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Domain Badge & Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] group-hover:bg-[#0B63E5] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${prog.badgeColor}`}>
                          {prog.domain}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0B63E5] transition-colors line-clamp-2">
                        {prog.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {prog.tagline}
                      </p>

                      <div className="pt-4 border-t border-slate-100 my-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Duration:</span>
                          <span className="font-semibold text-slate-800">{prog.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Format:</span>
                          <span className="font-semibold text-slate-800">Hybrid / Online</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {prog.toolsCovered.slice(0, 3).map((tool, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {tool}
                          </span>
                        ))}
                        {prog.toolsCovered.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                            +{prog.toolsCovered.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/programs/${prog.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B63E5] text-slate-800 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 group-hover:shadow-md"
                    >
                      <span>Read More & Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* PARTNERS & ACCREDITATIONS (INFINITE MARQUEE) */}
        <section className="py-16 bg-white overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              TRUSTED BY INDUSTRY ENTERPRISES & ACADEMIC INSTITUTIONS
            </span>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden">
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
              {[...CAREERTIQ_PARTNERS, ...CAREERTIQ_PARTNERS].map((partner, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs shrink-0 hover:border-[#0B63E5] transition-colors"
                >
                  <Building className="w-5 h-5 text-[#0B63E5]" />
                  <div className="text-left">
                    <span className="text-xs font-black text-slate-900 block font-mono">
                      {partner.logoText}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {partner.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CAREERTIQ / PEDAGOGY HIGHLIGHTS */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  The CareerTiQ Advantage
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Designed for Real Outcomes, Not Just Passive Certificates
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Traditional university programs often leave a gap between theory and actual enterprise workflows. At CareerTiQ, our cohorts simulate corporate engineering teams from day one.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      title: 'Live Production Sandboxes',
                      desc: 'Build real microservices, algorithmic trading backtests, and Figma design tokens rather than toy textbook code.'
                    },
                    {
                      title: 'Direct Corporate Mentorship',
                      desc: 'Weekly 1-on-1 code reviews and portfolio feedback sessions led by working senior engineers from Tier-1 tech companies.'
                    },
                    {
                      title: 'Guaranteed Hiring Drives',
                      desc: 'Exclusive recruitment pipelines with 120+ partnered enterprises in Chennai, Bengaluru, Hyderabad, and Coimbatore.'
                    },
                    {
                      title: 'Bilingual Global Placement Tracks',
                      desc: 'Optional Japanese (JLPT) and German (Goethe) modules designed to place engineers directly in Tokyo and European tech hubs.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                      <div className="p-2 rounded-xl bg-blue-50 text-[#0B63E5] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Card */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                        Placement Transparency Report
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                        2025–2026 Batch Milestones
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      Audited Record
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-2xl font-black text-slate-900">₹8.4 LPA</span>
                      <span className="text-[11px] text-slate-500 block mt-1">Average Graduate CTC</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-2xl font-black text-[#0B63E5]">₹24.5 LPA</span>
                      <span className="text-[11px] text-slate-500 block mt-1">Highest Domestic CTC</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-2xl font-black text-slate-900">¥4.8M</span>
                      <span className="text-[11px] text-slate-500 block mt-1">Starting Tokyo Placement CTC</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-2xl font-black text-emerald-600">18 Days</span>
                      <span className="text-[11px] text-slate-500 block mt-1">Median Time to First Offer</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#0B63E5]" />
                      <span>Corporate Skilling Partner for Colleges</span>
                    </div>
                    <p className="text-[11px] text-blue-900 leading-relaxed">
                      We partner directly with academic institutions across India to set up specialized DeepTech Centers of Excellence on campus.
                    </p>
                  </div>

                  <Link
                    href="/hire-from-us"
                    className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Request College MoU / Placement Brochure</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* UPCOMING MASTERCLASSES & EVENTS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Interactive Learning
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Free Live Masterclasses & Hackathons
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Join weekend sessions led by industry architects and experienced product leaders.
                </p>
              </div>

              <Link
                href="/events"
                className="self-start md:self-auto px-5 py-2.5 rounded-full border border-slate-300 hover:border-[#0B63E5] text-slate-800 hover:text-[#0B63E5] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>View All Masterclasses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAREERTIQ_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0B63E5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B63E5] bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                        {event.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                        {event.spotsLeft} seats remaining
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#0B63E5]" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#0B63E5]" />
                        <span>Speaker: <strong className="text-slate-800">{event.speaker}</strong> ({event.speakerRole})</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/events"
                    className="mt-6 w-full py-2.5 rounded-xl bg-white hover:bg-[#0B63E5] text-slate-800 hover:text-white border border-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Free Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* INSIGHTS / RESOURCES (3-COLUMN BLOG GRID) */}
        <section className="py-20 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Industry Perspectives
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Insights & Technology Trends
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Read deep-dives on the evolving technology landscape, engineering hiring benchmarks, and career blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {CAREERTIQ_BLOGS.map((blog) => (
                <div
                  key={blog.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 px-2.5 py-1 rounded-md shadow-xs">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{blog.date}</span>
                        <span>{blog.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B63E5] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B63E5] pt-4">
                    <span className="text-[11px] text-slate-400 font-normal">By {blog.author}</span>
                    <span className="flex items-center gap-1 group-hover:underline">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* NEWSLETTER / BROCHURE DOWNLOAD SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-[#0B63E5] to-indigo-900 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-xs">
              <Mail className="w-3.5 h-3.5" />
              <span>CareerTiQ Tech Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Stay Ahead of Emerging Tech Trends
            </h2>

            <p className="text-xs sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Subscribe to receive weekly curriculum insights, open-source AI architecture breakdowns, and invitations to exclusive hiring fairs.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl max-w-md mx-auto text-white text-xs sm:text-sm font-semibold border border-white/30 animate-fadeIn">
                ✓ Thank you for subscribing! Check your inbox for our latest DeepTech syllabus.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your corporate or personal email..."
                  className="flex-1 px-4 py-3 rounded-full bg-white text-slate-900 text-xs sm:text-sm outline-none shadow-md placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
                >
                  Subscribe Now
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 text-[11px] text-blue-200 pt-2 font-mono">
              <span>✓ Zero spam guaranteed</span>
              <span>•</span>
              <span>✓ Weekly engineering digests</span>
              <span>•</span>
              <span>✓ Unsubscribe anytime</span>
            </div>

          </div>
        </section>

      </main>

      <CareerTiQFooter />
    </div>
  );
}
