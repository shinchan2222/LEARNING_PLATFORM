'use client';

import React, { useState } from 'react';
import { COMPANY } from '@/data/devopsData';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Custom Software Development',
  'Website Development',
  'Mobile App Development',
  'UI/UX Design',
  'Cloud & DevOps',
  'API & Backend Development',
  'Other / Not Sure Yet',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold text-[#0B63E5] tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Tell us about your project and we'll get back to you within one business day
            with a free consultation call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email Us', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Phone, label: 'Call Us', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: MapPin, label: 'Location', value: COMPANY.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B63E5]/10 flex items-center justify-center text-[#0B63E5] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      {label}
                    </div>
                    <a
                      href={href}
                      className="text-sm font-semibold text-slate-900 hover:text-[#0B63E5] transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick bullets */}
            <div className="bg-[#0B63E5]/5 border border-[#0B63E5]/20 rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">What to Expect</h4>
              {[
                'Free 30-min discovery call',
                'Detailed technical proposal within 48 hours',
                'Fixed-price or time & materials engagements',
                'Dedicated project manager from day one',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-7 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-700">{formData.name}</span>!
                  We've received your enquiry and will get back to you at{' '}
                  <span className="text-[#0B63E5] font-semibold">{formData.email}</span> within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', service: '', message: '' }); }}
                  className="mt-4 px-6 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Service You Need
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors bg-white"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-blue-200 flex items-center justify-center gap-2 group transition-all"
                >
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  We respond within 1 business day. Your information is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
