'use client';

import React from 'react';
import { Internship } from '@/types';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SyllabusModalProps {
  internship: Internship;
  onClose: () => void;
  onEnroll: (internship: Internship) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  internship,
  onClose,
  onEnroll
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Sticky Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                {internship.domain}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {internship.level} Level
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {internship.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                {internship.durationWeeks} Weeks
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Starts {internship.startDate}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                {internship.seatsLeft} of {internship.seatsTotal} Seats Left
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Program Description
            </h3>
            <p className="text-slate-700 leading-relaxed">{internship.description}</p>
          </div>

          {/* Instructor Card */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={internship.instructor.avatar}
              alt={internship.instructor.name}
              className="w-14 h-14 rounded-full border-2 border-indigo-300 object-cover shadow-xs"
            />
            <div>
              <div className="font-bold text-slate-900 text-base">
                {internship.instructor.name}
              </div>
              <div className="text-xs font-medium text-indigo-700">
                {internship.instructor.title} • {internship.instructor.institution}
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {internship.instructor.bio}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Core Highlights
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {internship.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Prerequisites
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {internship.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Week-by-Week Syllabus */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Week-by-Week Milestone Curriculum
            </h3>

            <div className="space-y-3">
              {internship.syllabus.map((mod) => (
                <div
                  key={mod.week}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[11px] font-bold font-mono">
                        WEEK {mod.week}
                      </span>
                      <h4 className="font-semibold text-slate-900 text-sm">{mod.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{mod.description}</p>
                  
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-bold text-slate-800">Deliverable: </span>
                    <span className="text-slate-600">{mod.deliverables}</span>
                  </div>

                  {mod.resources && mod.resources.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {mod.resources.map((res, ri) => (
                        <a
                          key={ri}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {res.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Covered */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {internship.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Program Tuition Fee:</span>
            <div className="text-2xl font-extrabold text-slate-900">
              {formatCurrency(internship.fee)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(internship);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 hover:scale-[1.02] transition-all"
            >
              Enroll & Checkout Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusModal;
