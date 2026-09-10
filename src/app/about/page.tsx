'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  FileCheck
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3 py-1 rounded-full">
              About CareerTiQ
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Bridging the Chasm Between Campus & Corporate Reality
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              CareerTiQ Solutions Pvt Ltd was founded with a singular conviction: engineering and business talent must be trained with production workflows, cutting-edge tech stacks, and global corporate etiquette.
            </p>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To democratize access to elite corporate skilling across emerging domains—DeepTech, FinTech, MediaTech, and International Languages—empowering Tier-1 and Tier-2 students to compete on a global playing field.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To become India’s premier finishing school and talent supply ecosystem, producing 50,000+ globally deployable bilingual engineers and product leaders by 2030.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* PEDAGOGY PILLARS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B63E5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Core Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                The CareerTiQ Finishing School Model
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: 'Production-First Codebases',
                  desc: 'Students push code to GitHub branches, configure CI/CD pipelines, and resolve real-world bug tickets.'
                },
                {
                  icon: Users,
                  title: 'Senior Practitioner Mentorship',
                  desc: 'Courses are designed and delivered exclusively by architects and tech leads from top enterprise companies.'
                },
                {
                  icon: Award,
                  title: 'Bilingual Mobility',
                  desc: 'Pairing deep software skills with Japanese (JLPT) or German (Goethe) unlocks international job offers in Tokyo and Europe.'
                }
              ].map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B63E5] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CORPORATE TRANSPARENCY BLOCK */}
        <section id="transparency" className="py-16 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                LEGAL ENTITY & STATUTORY TRANSPARENCY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                Corporate Governance & Identity
              </h3>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-mono text-[10px]">Registered Legal Entity</span>
                <p className="text-sm font-bold text-white">CareerTiQ Solutions Private Limited</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-mono text-[10px]">Corporate Identification Number (CIN)</span>
                <p className="text-sm font-bold font-mono text-blue-400">U80902TZ2024PTC039218</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-mono text-[10px]">Registered Headquarters</span>
                <p className="text-xs text-slate-300">
                  Tech Park Campus, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004, India.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-mono text-[10px]">Accreditation Standards</span>
                <p className="text-xs text-slate-300">
                  Aligned with NASSCOM FutureSkills Prime & NSDC National Skilling Framework.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <CareerTiQFooter />
    </div>
  );
}