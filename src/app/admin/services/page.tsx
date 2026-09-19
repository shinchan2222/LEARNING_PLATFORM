'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, CheckCircle2 } from 'lucide-react';

interface Service { id: number; icon: string; title: string; short_desc: string; description: string; features: string[]; color: string; light_color: string; }
const EMPTY: Omit<Service, 'id'> = { icon: 'Code2', title: '', short_desc: '', description: '', features: [], color: '#0B63E5', light_color: '#EFF6FF' };

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: Omit<Service, 'id'> & { id?: number } }>({ open: false, data: EMPTY });
  const [saving, setSaving] = useState(false);
  const [featInput, setFeatInput] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/services')
      .then(r => { if (!r.ok) throw new Error('Failed to load services'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setModal({ open: true, data: { ...EMPTY } }); setFeatInput(''); };
  const openEdit = (s: Service) => { setModal({ open: true, data: { ...s } }); setFeatInput(''); };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const method = modal.data.id ? 'PUT' : 'POST';
      const url = modal.data.id ? `/api/services/${modal.data.id}` : '/api/services';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
      if (!res.ok) throw new Error('Failed to save service');
      setModal({ open: false, data: EMPTY });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      setError('');
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const addFeature = () => {
    if (!featInput.trim()) return;
    setModal(m => ({ ...m, data: { ...m.data, features: [...m.data.features, featInput.trim()] } }));
    setFeatInput('');
  };
  const removeFeature = (i: number) => setModal(m => ({ ...m, data: { ...m.data, features: m.data.features.filter((_, idx) => idx !== i) } }));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm">{items.length} services on your website</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(s => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold" style={{ backgroundColor: s.light_color, color: s.color }}>{s.icon}</div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B63E5] hover:bg-blue-50 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h3>
            <p className="text-xs text-slate-500 mb-3">{s.short_desc}</p>
            <div className="space-y-1">
              {(s.features || []).slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: s.color }} />{f}
                </div>
              ))}
              {s.features?.length > 3 && <div className="text-xs text-slate-400">+{s.features.length - 3} more</div>}
            </div>
          </div>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{modal.data.id ? 'Edit' : 'Add'} Service</h2>
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(['title', 'short_desc', 'icon', 'color', 'light_color'] as const).map(field => (
                <div key={field} className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{field.replace('_', ' ')}</label>
                  <input value={(modal.data as unknown as Record<string, string>)[field] || ''} onChange={e => setModal(m => ({ ...m, data: { ...m.data, [field]: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea rows={3} value={modal.data.description} onChange={e => setModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Features</label>
                <div className="flex gap-2">
                  <input value={featInput} onChange={e => setFeatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="Add feature, press Enter" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                  <button onClick={addFeature} className="px-3 py-2 text-sm font-bold text-white bg-[#0B63E5] rounded-xl hover:bg-blue-700"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-1">
                  {modal.data.features.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-1.5 text-sm">
                      <span className="text-slate-700">{f}</span>
                      <button onClick={() => removeFeature(i)} className="text-slate-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors">{saving ? 'Saving...' : 'Save Service'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
