'use client';

import React, { useState, useEffect } from 'react';
import { Internship, Domain } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2,
  FileText
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
  const [pendingEnrollment, setPendingEnrollment] = useState<Internship | null>(null);
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
      setPendingEnrollment(internship);
      setAuthRequiredModal(true);
      return;
    }
    setEnrollTarget(internship);
  };

  return (
    <section id="catalog" className="py-20 bg-[#fafaf9] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            RESEARCH COHORT DIRECTORY · AUTUMN 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Available Applied Engineering Specializations
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
            Each research cohort is limited to 30 active student seats to ensure dedicated, high-touch code reviews by Dr. Aris Thorne and Stanford lab evaluators.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-3 rounded-xl border border-neutral-200/80 mb-8 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
          
          {/* Domain Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDomain === domain
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Search & Level Selectors */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, skills, AI..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-neutral-50 focus:bg-white"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-700 font-medium outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Cohorts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-xl bg-neutral-200/50 animate-pulse" />
            ))}
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-neutral-200">
            <BookOpen className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-neutral-900">No matching research cohorts</h3>
            <p className="text-xs text-neutral-500 mt-1">Adjust your search parameters or reset the domain filter.</p>
            <button
              onClick={() => {
                setSelectedDomain('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-neutral-200/90 hover:border-neutral-400/90 shadow-2xs transition-all flex flex-col justify-between"
              >
                {/* Header & Meta */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                    <span className="text-neutral-500 font-semibold tracking-wide uppercase">
                      {item.domain}
                    </span>
                    <span className="text-neutral-600 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-neutral-800 text-neutral-900" />
                      <span className="font-semibold text-neutral-900">{item.rating}</span>
                      <span className="text-neutral-400">({item.reviewsCount})</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 leading-snug tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Program Scope Ledger */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600 font-mono">
                    <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
                      <span className="block font-bold text-neutral-900">{item.durationWeeks} Wks</span>
                      <span className="text-[10px] text-neutral-400 uppercase">Duration</span>
                    </div>
                    <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
                      <span className="block font-bold text-neutral-900">{item.level}</span>
                      <span className="text-[10px] text-neutral-400 uppercase">Level</span>
                    </div>
                    <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
                      <span className="block font-bold text-neutral-900">{item.seatsLeft} open</span>
                      <span className="text-[10px] text-neutral-400 uppercase">Capacity</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {item.skills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-700"
                      >
                        {s}
                      </span>
                    ))}
                    {item.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                        +{item.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Instructor & Action Footer */}
                <div className="p-5 pt-3 border-t border-neutral-100 bg-[#fbfbfa]/60">
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.instructor.avatar}
                        alt={item.instructor.name}
                        className="w-7 h-7 rounded-full border border-neutral-300 object-cover"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900 text-[11px] leading-none">
                          {item.instructor.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">
                          {item.instructor.institution}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 font-mono uppercase block">Tuition</span>
                      <span className="text-sm font-bold text-neutral-900 font-mono">
                        {formatCurrency(item.fee)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSyllabusTarget(item)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-medium border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Syllabus</span>
                    </button>

                    <button
                      onClick={() => handleEnrollClick(item)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Enroll & Pay</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          onClose={() => {
            setAuthRequiredModal(false);
            setPendingEnrollment(null);
          }}
          onSwitchMode={() => {}}
          onSuccess={() => {
            setAuthRequiredModal(false);
            if (pendingEnrollment) {
              setEnrollTarget(pendingEnrollment);
              setPendingEnrollment(null);
            }
          }}
        />
      )}
    </section>
  );
};

export default InternshipCatalog;
