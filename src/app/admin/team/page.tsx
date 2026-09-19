'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Member { id: number; name: string; role: string; bio: string; initials: string; color: string; }
const EMPTY: Omit<Member, 'id'> = { name: '', role: '', bio: '', initials: '', color: '#0B63E5' };

export default function AdminTeamPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: Omit<Member, 'id'> & { id?: number } }>({ open: false, data: EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/team')
      .then(r => { if (!r.ok) throw new Error('Failed to load team members'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const method = modal.data.id ? 'PUT' : 'POST';
      const url = modal.data.id ? `/api/team/${modal.data.id}` : '/api/team';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
      if (!res.ok) throw new Error('Failed to save team member');
      setModal({ open: false, data: EMPTY });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (!confirm('Delete team member?')) return;
    try {
      setError('');
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete team member');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Team Members</h1>
          <p className="text-slate-500 text-sm">{items.length} people on your team</p>
        </div>
        <button onClick={() => setModal({ open: true, data: { ...EMPTY } })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(m => (
          <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-black mx-auto mb-3" style={{ backgroundColor: m.color }}>{m.initials}</div>
            <h3 className="font-bold text-slate-900">{m.name}</h3>
            <p className="text-xs text-[#0B63E5] font-semibold mb-2">{m.role}</p>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">{m.bio}</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setModal({ open: true, data: { ...m } })} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B63E5] hover:bg-blue-50"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{modal.data.id ? 'Edit' : 'Add'} Member</h2>
              <button onClick={() => setModal({ open: false, data: EMPTY })}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(['name', 'role', 'initials', 'color'] as const).map(field => (
                <div key={field}>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{field}</label>
                  <input value={(modal.data as unknown as Record<string, string>)[field] || ''} onChange={e => setModal(m => ({ ...m, data: { ...m.data, [field]: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Bio</label>
                <textarea rows={3} value={modal.data.bio} onChange={e => setModal(m => ({ ...m, data: { ...m.data, bio: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 rounded-xl">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
