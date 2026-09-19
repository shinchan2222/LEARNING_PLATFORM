'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

interface Stat { id: number; value: string; label: string; }

export default function AdminStatsPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [saving, setSaving] = useState<number | null>(null);
  const [newStat, setNewStat] = useState({ value: '', label: '' });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/stats')
      .then(r => { if (!r.ok) throw new Error('Failed to load stats'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const handleUpdate = async (stat: Stat) => {
    try {
      setSaving(stat.id);
      setError('');
      const res = await fetch(`/api/stats/${stat.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stat) });
      if (!res.ok) throw new Error('Failed to update stat');
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(null);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this stat?')) return;
    try {
      setError('');
      const res = await fetch(`/api/stats/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete stat');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };
  
  const handleAdd = async () => {
    if (!newStat.value || !newStat.label) return;
    try {
      setAdding(true);
      setError('');
      const res = await fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newStat) });
      if (!res.ok) throw new Error('Failed to add stat');
      setNewStat({ value: '', label: '' });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const updateLocal = (id: number, field: 'value' | 'label', val: string) => {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Stats</h1>
        <p className="text-slate-500 text-sm">Edit the numbers shown on your homepage</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="space-y-3">
        {items.map(stat => (
          <div key={stat.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Value</label>
                <input value={stat.value} onChange={e => updateLocal(stat.id, 'value', e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B63E5] focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Label</label>
                <input value={stat.label} onChange={e => updateLocal(stat.id, 'label', e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => handleUpdate(stat)} disabled={saving === stat.id} className="p-2 rounded-xl text-[#0B63E5] bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50"><Save className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(stat.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Add New Stat</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input value={newStat.value} onChange={e => setNewStat(n => ({ ...n, value: e.target.value }))} placeholder="e.g. 500+" className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
          <input value={newStat.label} onChange={e => setNewStat(n => ({ ...n, label: e.target.value }))} placeholder="e.g. Projects Delivered" className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
        </div>
        <button onClick={handleAdd} disabled={adding || !newStat.value || !newStat.label} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl disabled:opacity-50 transition-colors">
          <Plus className="w-4 h-4" /> {adding ? 'Adding...' : 'Add Stat'}
        </button>
      </div>
    </div>
  );
}
