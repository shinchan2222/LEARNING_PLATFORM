'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ShieldCheck, GraduationCap, Lock, Mail, User as UserIcon, Building } from 'lucide-react';
import { Role } from '@/types';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onSuccess
}) => {
  const { login, register, switchUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const user = await login({ email });
        if (user) {
          if (onSuccess) onSuccess();
          onClose();
        } else {
          setError('User not found. Try one of the 1-click demo logins below.');
        }
      } else {
        const user = await register({ name, email, college, role });
        if (user) {
          if (onSuccess) onSuccess();
          onClose();
        } else {
          setError('Registration failed. Email might already exist.');
        }
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = async (demoRole: Role) => {
    setLoading(true);
    await switchUser(demoRole);
    setLoading(false);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-600/20">
            {mode === 'login' ? <Lock className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {mode === 'login' ? 'Sign in to Platform' : 'Create Student Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access curriculum milestones, submit GitHub projects, and track certification.
          </p>
        </div>

        {/* 1-Click Demo Buttons for Student Login */}
        <div className="p-6 pb-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            🎓 Instant Student Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => handleDemoSelect('student')}
              disabled={loading}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Alex (Enrolled Student)</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                await login({ demoUserId: 'usr_student_2' });
                setLoading(false);
                if (onSuccess) onSuccess();
                onClose();
              }}
              disabled={loading}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Maya (Certified Graduate)</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-xs uppercase">Or sign in with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Lee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">University / College</label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Georgia Tech"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                  >
                    <option value="student">Student / Intern</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm shadow-md shadow-indigo-600/20 transition-all hover:shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account & Continue'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-600">
          {mode === 'login' ? (
            <span>
              New student?{' '}
              <button
                onClick={() => onSwitchMode('register')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register here
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                onClick={() => onSwitchMode('login')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
