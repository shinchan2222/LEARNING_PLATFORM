'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';

interface Testimonial { id: number; quote: string; name: string; role: string; initials: string; rating: number; color: string; }
const EMPTY: Omit<Testimonial, 'id'> = { quote: '', name: '', role: '', initials: '', rating: 5, color: '#0B63E5' };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: Omit<Testimonial, 'id'> & { id?: number } }>({ open: false, data: EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/testimonials')
      .then(r => { if (!r.ok) throw new Error('Failed to load testimonials'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const method = modal.data.id ? 'PUT' : 'POST';
      const url = modal.data.id ? `/api/testimonials/${modal.data.id}` : '/api/testimonials';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
      if (!res.ok) throw new Error('Failed to save testimonial');
      setModal({ open: false, data: EMPTY });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      setError('');
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Testimonials</h1>
          <p className="text-slate-500 text-sm">{items.length} client reviews</p>
        </div>
        <button onClick={() => setModal({ open: true, data: { ...EMPTY } })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="space-y-4">
        {items.map(t => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ backgroundColor: t.color }}>{t.initials}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Number.isInteger(t.rating) && t.rating > 0 && t.rating <= 5 && [...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-slate-700 italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => setModal({ open: true, data: { ...t } })} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B63E5] hover:bg-blue-50"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{modal.data.id ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={() => setModal({ open: false, data: EMPTY })}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Quote</label>
                <textarea rows={3} value={modal.data.quote} onChange={e => setModal(m => ({ ...m, data: { ...m.data, quote: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(['name', 'role', 'initials', 'color'] as const).map(field => (
                  <div key={field}>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{field}</label>
                    <input value={(modal.data as unknown as Record<string, string | number>)[field] as string || ''} onChange={e => setModal(m => ({ ...m, data: { ...m.data, [field]: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Rating (1-5)</label>
                <input type="number" min={1} max={5} value={modal.data.rating} onChange={e => setModal(m => ({ ...m, data: { ...m.data, rating: Number(e.target.value) } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
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
