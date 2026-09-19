'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Lock, Mail, KeyRound, Eye, EyeOff, CheckCircle2,
  AlertCircle, Server, Database, UserCheck, RefreshCw,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<{ id: number; email: string; created_at: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Visibility toggles
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const fetchProfile = async () => {
    try {
      setError('');
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      setProfile(data);
      setNewEmail(data.email);
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('Please enter your current password to authorize changes');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword: newPassword || undefined,
          email: newEmail !== profile?.email ? newEmail : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setSuccess(data.message || 'Settings updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (data.email) {
        setProfile((prev) => prev ? { ...prev, email: data.email } : null);
        setNewEmail(data.email);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-[#0B63E5]" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Admin Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account credentials, security preferences, and system configuration.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <KeyRound className="w-5 h-5 text-[#0B63E5]" />
              <h2 className="text-base font-bold text-slate-900">Account & Security</h2>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="settings-email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="settings-email"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                />
              </div>
            </div>

            {/* Change Password Section */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Change Password (leave blank to keep current)
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label htmlFor="settings-new-pw" className="text-xs font-semibold text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="settings-new-pw"
                    type={showNewPw ? 'text' : 'password'}
                    placeholder="Enter new password (min. 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    aria-label="Toggle new password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label htmlFor="settings-confirm-pw" className="text-xs font-semibold text-slate-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="settings-confirm-pw"
                    type={showConfirmPw ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    aria-label="Toggle confirm password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Authorization Section */}
            <div className="pt-4 border-t border-slate-100 space-y-3 bg-slate-50 p-4 rounded-xl">
              <div className="space-y-1.5">
                <label htmlFor="settings-curr-pw" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0B63E5]" />
                  Current Password (Required)
                </label>
                <p className="text-xs text-slate-500">
                  Enter your current password to authorize any changes to your email or password.
                </p>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="settings-curr-pw"
                    type={showCurrentPw ? 'text' : 'password'}
                    required
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-300 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    aria-label="Toggle current password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </form>
        </div>

        {/* Info Cards Sidebar */}
        <div className="space-y-6">
          {/* Admin Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#0B63E5]/10 flex items-center justify-center text-[#0B63E5] font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Admin Account</div>
                <div className="text-xs text-slate-500">Super Administrator</div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span className="text-slate-400">Account ID:</span>
                <span className="font-mono font-semibold">#{profile?.id}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="text-slate-400">Created:</span>
                <span>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="text-slate-400">Session Status:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active (JWT)
                </span>
              </div>
            </div>
          </div>

          {/* System & Architecture Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Server className="w-4 h-4 text-[#0B63E5]" />
              <h3>System Information</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Database className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">SQLite Database</div>
                  <div className="text-[11px] text-slate-400">WAL Mode, Foreign Keys enabled</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Security Architecture</div>
                  <div className="text-[11px] text-slate-400">Bcrypt-12 hashing + Jose HS256 tokens</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
