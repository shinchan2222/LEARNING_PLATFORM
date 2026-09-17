'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Lock } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    phone: '',
    interest: 'aiSIEM',
    role: 'CISO / Security Director',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0b1c31] border border-slate-700/90 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#5A9955]/20 border border-[#5A9955]/40 flex items-center justify-center text-[#5A9955] mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Appointment Request Confirmed
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. A Seceon Senior Cybersecurity Solutions Architect has received your request and will connect with you at <span className="text-emerald-400">{formData.workEmail}</span> within 15 minutes.
            </p>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 max-w-sm mx-auto text-left space-y-1">
              <div>&gt; Organization: {formData.company || 'Enterprise'}</div>
              <div>&gt; Platform Scope: {formData.interest}</div>
              <div>&gt; Status: In Priority Dispatch Queue</div>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#5A9955] hover:bg-emerald-600 rounded-lg transition-colors"
            >
              Return to Platform Overview
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-1.5 mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#5A9955]/20 text-[#5A9955] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Book Technical Briefing</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Schedule a 1-on-1 Seceon Demo
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                See live sub-90s threat containment, streaming behavioral AI, and ask our engineers technical questions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Company / MSSP Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Security Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Primary Platform of Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5A9955]"
                  >
                    <option value="aiSIEM">Seceon aiSIEM™ (Log &amp; Behavioral AI)</option>
                    <option value="aiXDR">Seceon aiXDR™-PMAX (Extended Detection &amp; Response)</option>
                    <option value="aiSIEM CGuard">CGuard 30-Day Free Trial</option>
                    <option value="MSSP Partner Program">MSSP Partner Program (Multi-Tenant)</option>
                    <option value="aiTRiSM">aiTRiSM360™ (AI Governance &amp; LLM Security)</option>
                    <option value="SecROI">SecROI360™ Assessment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5A9955]"
                  >
                    <option>CISO / Security Director</option>
                    <option>SOC Manager / Lead Analyst</option>
                    <option>CIO / VP of IT</option>
                    <option>MSP / MSSP Business Owner</option>
                    <option>Compliance / Risk Officer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Specific Requirements or Inquiries</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your environment or migration timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#071323] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#5A9955]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#5A9955] to-[#457649] hover:from-[#65ac5f] hover:to-[#4e8553] rounded-xl shadow-lg shadow-[#5A9955]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Submit Appointment Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center pt-2">
                <Lock className="w-3 h-3 text-[#5A9955]" />
                <span>Your information is encrypted &amp; never shared with third parties.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
