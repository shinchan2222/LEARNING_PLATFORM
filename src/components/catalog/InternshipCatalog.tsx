'use client';

import React, { useState, useEffect } from 'react';
import { Internship, Domain } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  Filter, 
  Clock, 
  Sparkles, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Calendar,
  Layers,
  ShieldCheck,
  Award
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import SyllabusModal from './SyllabusModal';
import PaymentModal from '@/components/payment/PaymentModal';
import AuthModal from '@/components/auth/AuthModal';

const DOMAINS: (Domain | 'All')[] = [
  'All',
  'AI/ML',
  'Full Stack Development',
  'Cloud & DevOps',
  'Cybersecurity'
];

export const InternshipCatalog: React.FC = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [syllabusTarget, setSyllabusTarget] = useState<Internship | null>(null);
  const [enrollTarget, setEnrollTarget] = useState<Internship | null>(null);
  const [authRequiredModal, setAuthRequiredModal] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/internships');
        const data = await res.json();
        if (data.internships) {
          setInternships(data.internships);
        }
      } catch (err) {
        console.error('Failed to load internships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((item) => {
    const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDomain && matchesLevel && matchesSearch;
  });

  const handleEnrollClick = (internship: Internship) => {
    if (!user) {
      setAuthRequiredModal(true);
      return;
    }
    setEnrollTarget(internship);
  };

  return (
    <section id="catalog" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Curated CS Lab Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic & Industry Research Internships
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Rigorous cohorts designed by Dr. Aris Thorne. Build verifiable production systems, conduct peer code reviews, and earn faculty credentials.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDomain === domain
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Search & Level Filter */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, skills, AI..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Level */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Internships Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200/70 animate-pulse" />
            ))}
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No internships match your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the domain or search query.</p>
            <button
              onClick={() => {
                setSelectedDomain('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((item) => {
              const domainColors = {
                'AI/ML': 'bg-purple-100 text-purple-800 border-purple-200',
                'Full Stack Development': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                'Cloud & DevOps': 'bg-sky-100 text-sky-800 border-sky-200',
                'Cybersecurity': 'bg-rose-100 text-rose-800 border-rose-200',
                'Data Science': 'bg-amber-100 text-amber-800 border-amber-200'
              }[item.domain] || 'bg-slate-100 text-slate-800 border-slate-200';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4 border-b border-slate-100 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${domainColors}`}>
                        {item.domain}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{item.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({item.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {item.durationWeeks} Weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        {item.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        {item.seatsLeft} seats open
                      </span>
                    </div>

                    {/* Skills Chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                      {item.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                          +{item.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Instructor Mini Badge */}
                  <div className="px-6 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.instructor.avatar}
                      alt={item.instructor.name}
                      className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 leading-tight">
                        {item.instructor.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.instructor.institution}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA Footer */}
                  <div className="p-5 pt-4 bg-white flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tuition Fee</span>
                      <div className="text-xl font-extrabold text-slate-900 leading-none">
                        {formatCurrency(item.fee)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSyllabusTarget(item)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                      >
                        Syllabus
                      </button>

                      <button
                        onClick={() => handleEnrollClick(item)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 flex items-center gap-1.5 hover:scale-105 transition-all"
                      >
                        <span>Enroll & Pay</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Syllabus Modal */}
      {syllabusTarget && (
        <SyllabusModal
          internship={syllabusTarget}
          onClose={() => setSyllabusTarget(null)}
          onEnroll={(item) => {
            setSyllabusTarget(null);
            handleEnrollClick(item);
          }}
        />
      )}

      {/* Payment Gateway Checkout Modal */}
      {enrollTarget && (
        <PaymentModal
          internship={enrollTarget}
          user={user}
          onClose={() => setEnrollTarget(null)}
          onSuccess={() => {
            // refresh data
          }}
        />
      )}

      {/* Auth Prompt Modal for guests */}
      {authRequiredModal && (
        <AuthModal
          mode="login"
          onClose={() => setAuthRequiredModal(false)}
          onSwitchMode={() => {}}
          onSuccess={() => {
            setAuthRequiredModal(false);
          }}
        />
      )}
    </section>
  );
};

export default InternshipCatalog;
