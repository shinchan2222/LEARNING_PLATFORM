'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface Post { id: number; title: string; slug: string; excerpt: string; content: string; published: number; created_at: string; }
const EMPTY: Omit<Post, 'id' | 'created_at'> = { title: '', slug: '', excerpt: '', content: '', published: 0 };

export default function AdminBlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: Omit<Post, 'id' | 'created_at'> & { id?: number } }>({ open: false, data: EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/blog')
      .then(r => { if (!r.ok) throw new Error('Failed to load blog posts'); return r.json(); })
      .then(data => { if (Array.isArray(data)) setItems(data); else setItems([]); })
      .catch(e => setError(e.message));
  };
  useEffect(() => { load(); }, []);

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const method = modal.data.id ? 'PUT' : 'POST';
      const url = modal.data.id ? `/api/blog/${modal.data.id}` : '/api/blog';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
      if (!res.ok) throw new Error('Failed to save post');
      setModal({ open: false, data: EMPTY });
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      setError('');
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };
  
  const togglePublish = async (post: Post) => {
    try {
      setError('');
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, published: post.published ? 0 : 1 }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 text-sm">{items.filter(p => p.published).length} published, {items.filter(p => !p.published).length} drafts</p>
        </div>
        <button onClick={() => setModal({ open: true, data: { ...EMPTY } })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <div className="space-y-3">
        {items.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-sm truncate">{p.title}</h3>
                <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {p.published ? '● Published' : '○ Draft'}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mb-1">{p.excerpt}</p>
              <div className="text-[10px] text-slate-400 font-mono">/{p.slug} · {new Date(p.created_at).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => togglePublish(p)} title={p.published ? 'Unpublish' : 'Publish'} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
                {p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button onClick={() => setModal({ open: true, data: { ...p } })} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B63E5] hover:bg-blue-50"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{modal.data.id ? 'Edit' : 'New'} Post</h2>
              <button onClick={() => setModal({ open: false, data: EMPTY })}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Title</label>
                <input value={modal.data.title} onChange={e => {
                  const title = e.target.value;
                  if (!modal.data.id) {
                    setModal(m => ({ ...m, data: { ...m.data, title, slug: autoSlug(title) } }));
                  } else {
                    setModal(m => ({ ...m, data: { ...m.data, title } }));
                  }
                }} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Slug</label>
                <input value={modal.data.slug} onChange={e => setModal(m => ({ ...m, data: { ...m.data, slug: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Excerpt</label>
                <textarea rows={2} value={modal.data.excerpt} onChange={e => setModal(m => ({ ...m, data: { ...m.data, excerpt: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Content</label>
                <textarea rows={8} value={modal.data.content} onChange={e => setModal(m => ({ ...m, data: { ...m.data, content: e.target.value } }))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5] resize-none font-mono" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={!!modal.data.published} onChange={e => setModal(m => ({ ...m, data: { ...m.data, published: e.target.checked ? 1 : 0 } }))} className="w-4 h-4 rounded text-[#0B63E5]" />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">Publish immediately</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setModal({ open: false, data: EMPTY })} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B63E5] hover:bg-blue-700 disabled:opacity-50 rounded-xl">{saving ? 'Saving...' : 'Save Post'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
