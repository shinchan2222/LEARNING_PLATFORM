'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layers, Briefcase, MessageSquare, Mail, Users, BarChart2, FileText, TrendingUp } from 'lucide-react';

interface Stats { services: number; portfolio: number; testimonials: number; contacts: number; newContacts: number; team: number; stats: number; blog: number; }

const CARDS = [
  { label: 'Services', key: 'services', icon: Layers, href: '/admin/services', color: '#0B63E5' },
  { label: 'Portfolio Items', key: 'portfolio', icon: Briefcase, href: '/admin/portfolio', color: '#7C3AED' },
  { label: 'Testimonials', key: 'testimonials', icon: MessageSquare, href: '/admin/testimonials', color: '#059669' },
  { label: 'New Contacts', key: 'newContacts', icon: Mail, href: '/admin/contacts', color: '#DC2626', badge: true },
  { label: 'Team Members', key: 'team', icon: Users, href: '/admin/team', color: '#F59E0B' },
  { label: 'Stats', key: 'stats', icon: BarChart2, href: '/admin/stats', color: '#0891B2' },
  { label: 'Blog Posts', key: 'blog', icon: FileText, href: '/admin/blog', color: '#7C3AED' },
];

export default function DashboardPage() {
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(r => r.ok ? r.json() : []),
      fetch('/api/portfolio').then(r => r.ok ? r.json() : []),
      fetch('/api/testimonials').then(r => r.ok ? r.json() : []),
      fetch('/api/contacts').then(r => r.ok ? r.json() : []),
      fetch('/api/team').then(r => r.ok ? r.json() : []),
      fetch('/api/stats').then(r => r.ok ? r.json() : []),
      fetch('/api/blog').then(r => r.ok ? r.json() : []),
    ]).then(([sv, po, te, co, tm, st, bl]) => {
      const contactsArr = Array.isArray(co) ? co : [];
      setData({
        services: Array.isArray(sv) ? sv.length : 0, 
        portfolio: Array.isArray(po) ? po.length : 0, 
        testimonials: Array.isArray(te) ? te.length : 0,
        contacts: contactsArr.length, 
        newContacts: contactsArr.filter((c: { status: string }) => c.status === 'new').length,
        team: Array.isArray(tm) ? tm.length : 0, 
        stats: Array.isArray(st) ? st.length : 0, 
        blog: Array.isArray(bl) ? bl.length : 0,
      });
    }).catch(err => {
      console.error(err);
      setError('Failed to load dashboard data');
    });
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s an overview of your website content.</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CARDS.map(({ label, key, icon: Icon, href, color, badge }) => (
          <Link key={key} href={href} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '15', color }}><Icon className="w-5 h-5" /></div>
              {badge && data && (data.newContacts > 0) && <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">{data.newContacts} new</span>}
            </div>
            <div className="text-3xl font-black text-slate-900 group-hover:text-[#0B63E5] transition-colors">{data ? (data as unknown as Record<string, number>)[key] : '—'}</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">{label}</div>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#0B63E5]" />
          <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: '+ Add Service', href: '/admin/services' },
            { label: '+ Add Project', href: '/admin/portfolio' },
            { label: '+ Write Blog Post', href: '/admin/blog' },
            { label: '📩 View Contacts', href: '/admin/contacts' },
          ].map(a => <Link key={a.label} href={a.href} className="text-center py-3 text-xs font-bold text-[#0B63E5] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">{a.label}</Link>)}
        </div>
      </div>
    </div>
  );
}
