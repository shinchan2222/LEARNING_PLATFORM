'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Project { id: number; title: string; category: string; description: string; tech: string[]; color: string; }
const EMPTY: Omit<Project, 'id'> = { title: '', category: '', description: '', tech: [], color: '#0B63E5' };

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: Omit<Project, 'id'> & { id?: number } }>({ open: false, data: EMPTY });
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/portfolio')
      .then(r => { if (!r.ok) throw new Error('Failed to load portfolio items'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const method = modal.data.id ? 'PUT' : 'POST';
      const url = modal.data.id ? `/api/portfolio/${modal.data.id}` : '/api/portfolio';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
      if (!res.ok) throw new Error('Failed to save project');
      setModal({ open: false, data: EMPTY });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      setError('');
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setModal(m => ({ ...m, data: { ...m.data, tech: [...m.data.tech, techInput.trim()] } }));
    setTechInput('');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Portfolio</h1>
          <p className="text-slate-500 text-sm">{items.length} projects showcased</p>
        </div>
        <button onClick={() => { setModal({ open: true, data: { ...EMPTY } }); setTechInput(''); }} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="space-y-3">
        {items.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ backgroundColor: p.color + '20' }}>
                <div className="w-full h-full rounded-xl flex items-center justify-center text-lg">🚀</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: p.color }}>{p.category}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2 max-w-lg">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">{p.tech.map(t => <span key={t} className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg">{t}</span>)}</div>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => { setModal({ open: true, data: { ...p } }); setTechInput(''); }} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B63E5] hover:bg-blue-50"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{modal.data.id ? 'Edit' : 'Add'} Project</h2>
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(['title', 'category', 'color'] as const).map(field => (
                <div key={field}>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{field}</label>
                  <input value={(modal.data as unknown as Record<string, string>)[field] || ''} onChange={e => setModal(m => ({ ...m, data: { ...m.data, [field]: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Description</label>
                <textarea rows={3} value={modal.data.description} onChange={e => setModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="e.g. React, Node.js" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                  <button onClick={addTech} className="px-3 py-2 text-sm font-bold text-white bg-[#0B63E5] rounded-xl hover:bg-blue-700"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {modal.data.tech.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-lg">
                      {t} <button onClick={() => setModal(m => ({ ...m, data: { ...m.data, tech: m.data.tech.filter((_, idx) => idx !== i) } }))} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 rounded-xl">{saving ? 'Saving...' : 'Save Project'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
