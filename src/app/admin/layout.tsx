'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Code2, LayoutDashboard, Layers, Briefcase, MessageSquare,
  Mail, Users, BarChart2, FileText, UserPlus, Settings, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  { label: 'Careers', href: '/admin/careers', icon: UserPlus },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Stats', href: '/admin/stats', icon: BarChart2 },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function SidebarContent({ pathname, adminEmail, onClose, onLogout }: { pathname: string; adminEmail: string; onClose: () => void; onLogout: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-700/60 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0B63E5] flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-black text-white">DEV<span className="text-[#0B63E5]">ops</span></span>
        </Link>
        <button onClick={onClose} aria-label="Close Sidebar" className="lg:hidden text-slate-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-[#0B63E5] text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-700/60 space-y-2">
        <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-white hover:bg-slate-700/60 transition-colors">
          <Code2 className="w-4 h-4" />
          <span>View Website</span>
        </a>
        <div className="px-3 py-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0B63E5]/20 flex items-center justify-center text-[#0B63E5] text-xs font-bold flex-shrink-0">
            {adminEmail[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-white font-semibold truncate">{adminEmail}</div>
            <div className="text-[10px] text-slate-500">Administrator</div>
          </div>
          <button onClick={onLogout} aria-label="Logout" className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    let cancelled = false;
    fetch('/api/auth/me')
      .then(async (r) => {
        if (!r.ok) {
          if (!cancelled) { router.replace('/admin/login'); setLoading(false); }
          return null;
        }
        return r.json();
      })
      .then(d => {
        if (cancelled || !d) return;
        if (d?.email) { setAdminEmail(d.email); setAuthed(true); }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) { router.replace('/admin/login'); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (isLoginPage) return <>{children}</>;

  if (loading || !authed) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center fixed inset-0 z-[9999]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#0B63E5] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading admin panel...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 flex-shrink-0 fixed inset-y-0 left-0 z-40">
        <SidebarContent pathname={pathname} adminEmail={adminEmail} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      </aside>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-slate-900 z-10">
            <SidebarContent pathname={pathname} adminEmail={adminEmail} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open Mobile Menu" className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-slate-900">Admin Panel</span>
          <button onClick={handleLogout} aria-label="Logout" className="p-2 rounded-lg text-slate-600 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </button>
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
