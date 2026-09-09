'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import AdminDashboardView from '@/components/admin/AdminDashboardView';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, ArrowRight, Lock, Mail, KeyRound, Sparkles } from 'lucide-react';

export default function AdminPage() {
  const { user, login, switchUser } = useAuth();
  const [email, setEmail] = useState('professor@stanford.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login({ email });
      if (u && u.role === 'admin') {
        // logged in as admin
      } else {
        setError('Invalid faculty credentials or insufficient administrative permissions.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFacultyAccess = async () => {
    setLoading(true);
    await switchUser('admin');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        {user?.role === 'admin' ? (
          <AdminDashboardView />
        ) : (
          <div className="max-w-md mx-auto my-16 px-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 text-white p-6 text-center relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-600/30 border border-indigo-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black tracking-tight">
                  Faculty & Administrative Gateway
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Restricted portal for Dr. Aris Thorne & CS Lab Evaluators
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* 1-Click Fast Faculty Access */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    ⚡ Quick Faculty Access
                  </span>
                  <button
                    type="button"
                    onClick={handleQuickFacultyAccess}
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enter as Dr. Aris Thorne (Lead Faculty)</span>
                  </button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-slate-400 text-[11px] uppercase">Or Sign In with Credentials</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Faculty Login Form */}
                <form onSubmit={handleAdminLogin} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Faculty Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="professor@stanford.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Security Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-100 text-center text-[11px] text-slate-400">
                  Default faculty email: <span className="font-mono text-slate-600">professor@stanford.edu</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
