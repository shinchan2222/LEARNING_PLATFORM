'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function StudentLoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, show quick redirect or continue
  if (user && user.role === 'student') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Already Signed In</h2>
            <p className="text-xs text-slate-500">
              You are currently logged in as <span className="font-bold text-slate-800">{user.name}</span> ({user.email}).
            </p>
            <button
              onClick={() => router.push('/student')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <span>Go to My Student Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedUser = await login({ email });
      if (loggedUser) {
        router.push('/student');
      } else {
        setError('Invalid student credentials. Please check your email or try the 1-click student demo logins.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStudentLogin = async (demoUserId: string) => {
    setLoading(true);
    setError('');
    try {
      const loggedUser = await login({ demoUserId });
      if (loggedUser) {
        router.push('/student');
      }
    } catch {
      setError('Failed to log in with demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-600/30 border border-indigo-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Student Portal Sign In</h1>
            <p className="text-xs text-slate-400 mt-1">
              Access your weekly milestones, GitHub review feedback, and certificates.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Quick Demo Student Logins */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  🎓 Instant Student Demo Login
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
                  1-Click
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickStudentLogin('usr_student_1')}
                  disabled={loading}
                  className="flex flex-col items-start p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left transition-all hover:scale-[1.01]"
                >
                  <span className="text-xs font-bold text-emerald-900">Alex Rivera</span>
                  <span className="text-[10px] text-emerald-700">Enrolled Intern</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStudentLogin('usr_student_2')}
                  disabled={loading}
                  className="flex flex-col items-start p-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-left transition-all hover:scale-[1.01]"
                >
                  <span className="text-xs font-bold text-purple-900">Maya Chen</span>
                  <span className="text-[10px] text-purple-700">Certified Graduate</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[11px] uppercase">Or Sign In with Email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.rivera@cs.edu"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  <span className="text-[10px] text-indigo-600 font-medium cursor-pointer hover:underline">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In as Student'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Footer Sign Up Link */}
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              <span>Don&apos;t have a student account yet? </span>
              <Link
                href="/signup"
                className="text-indigo-600 font-bold hover:underline ml-1"
              >
                Create Account Here →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
