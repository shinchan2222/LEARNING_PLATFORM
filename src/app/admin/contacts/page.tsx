'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Mail, Clock, CheckCircle2, MessageSquare, Download } from 'lucide-react';

interface Contact { id: number; name: string; email: string; service: string; message: string; status: string; created_at: string; }

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: '#DC2626', bg: '#FEF2F2' },
  read: { label: 'Read', color: '#0891B2', bg: '#ECFEFF' },
  replied: { label: 'Replied', color: '#059669', bg: '#ECFDF5' },
};

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Contact | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/contacts')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load contacts');
        return r.json();
      })
      .then(d => {
        if (Array.isArray(d)) setItems(d);
        else setItems([]);
      })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      setError('');
      const res = await fetch(`/api/contacts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error('Failed to update status');
      load();
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    } catch (e: any) {
      setError(e.message);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      setError('');
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete message');
      if (selected?.id === id) setSelected(null);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const exportToCSV = () => {
    if (items.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Service', 'Status', 'Message'];
    const rows = items.map(item => [
      item.id,
      `"${new Date(item.created_at).toISOString().replace('T', ' ').substring(0, 19)}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.service || '').replace(/"/g, '""')}"`,
      `"${(item.status || 'new').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `devops-contacts-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = filter === 'all' ? items : items.filter(c => c.status === filter);
  const counts = { all: items.length, new: items.filter(c => c.status === 'new').length, read: items.filter(c => c.status === 'read').length, replied: items.filter(c => c.status === 'replied').length };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Contact Inbox</h1>
          <p className="text-slate-500 text-sm">{counts.new} new messages waiting</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={items.length === 0}
          aria-label="Export contacts to CSV"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#0B63E5] hover:text-[#0B63E5] rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          <Download className="w-4 h-4 text-[#0B63E5]" />
          <span>Export to CSV</span>
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'read', 'replied'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors capitalize ${filter === f ? 'bg-[#0B63E5] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-[#0B63E5]'}`}>
              {f} ({counts[f as keyof typeof counts]})
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2">
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">No messages</div>}
          {filtered.map(c => {
            const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.new;
            return (
              <button key={c.id} onClick={() => setSelected(c)} className={`w-full text-left bg-white border rounded-2xl p-4 transition-all hover:shadow-md ${selected?.id === c.id ? 'border-[#0B63E5] shadow-md' : 'border-slate-200'}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-bold text-sm text-slate-900 truncate">{c.name}</div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: s.color, backgroundColor: s.bg }}>{s.label}</span>
                </div>
                <div className="text-xs text-slate-500 truncate mb-1">{c.email}</div>
                <div className="text-xs text-slate-600 truncate">{c.message}</div>
                <div className="text-[10px] text-slate-400 mt-2">{new Date(c.created_at).toLocaleDateString()}</div>
              </button>
            );
          })}
        </div>
        <div className="lg:col-span-3">
          {!selected ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a message to view details</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-[#0B63E5] hover:underline">{selected.email}</a>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
              {selected.service && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>Service needed: <strong>{selected.service}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(selected.created_at).toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</div>
              <div className="flex gap-2 flex-wrap">
                {['new', 'read', 'replied'].map(s => {
                  const cfg = STATUS_CONFIG[s];
                  return (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-colors ${selected.status === s ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'}`} style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark as {cfg.label}
                    </button>
                  );
                })}
                <a href={`mailto:${selected.email}`} className="ml-auto flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Reply via Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
