'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Video,
  Search,
  Filter
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';
import { CAREERTIQ_EVENTS } from '@/data/careertiqData';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [attendee, setAttendee] = useState({ name: '', email: '', phone: '' });

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setAttendee({ name: '', email: '', phone: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0B63E5] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-slate-900 text-white py-16 lg:py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold">
              <Video className="w-3.5 h-3.5" />
              <span>CareerTiQ Tech Masterclasses & Sprints</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Live Workshops & Tech Masterclasses
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Accelerate your engineering skills with free live weekend hackathons and masterclasses led by principal architects and quant fund managers.
            </p>
          </div>
        </section>

        {/* EVENTS LIST */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black text-slate-900">Upcoming Live Sessions</h3>
              <span className="text-xs font-mono text-[#0B63E5] font-bold">All sessions include verifiable participation e-certificates</span>
            </div>

            <div className="space-y-6">
              {CAREERTIQ_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-[#0B63E5] shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-[#0B63E5] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {event.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                        {event.spotsLeft} seats left
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                      {event.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0B63E5]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0B63E5]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0B63E5]" />
                        <span>{event.speaker} ({event.speakerRole})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(event.id)}
                    className="w-full md:w-auto px-6 py-3 rounded-full bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Reserve Free Seat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP MODAL */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B63E5] font-mono">
                  Masterclass Registration
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Reserve Your Webinar Link
                </h3>
              </div>

              {rsvpSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-900">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h4 className="font-bold text-base">Seat Reserved!</h4>
                  <p className="text-xs text-emerald-700">
                    Zoom details and calendar invite have been dispatched to {attendee.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={attendee.name}
                      onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                      placeholder="e.g. Meera Krishnan"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email for Zoom Passcode *</label>
                    <input
                      type="email"
                      required
                      value={attendee.email}
                      onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                      placeholder="meera@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={attendee.phone}
                      onChange={(e) => setAttendee({ ...attendee, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0B63E5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0952be] text-white font-bold text-sm shadow-md transition-all mt-2"
                  >
                    Confirm Free RSVP →
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      <CareerTiQFooter />
    </div>
  );
}