'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X, CheckCircle, ShieldAlert, Search, Save, Image as ImageIcon } from 'lucide-react';

interface CMSModuleClientProps {
  module: string;
  title: string;
  initialItems: any[];
  hospitals?: any[]; // for doctor hospital selector dropdown
}

export default function CMSModuleClient({ module, title, initialItems, hospitals = [] }: CMSModuleClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<any[]>(initialItems);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter items
  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase();
    const nameStr = (item.name || item.title || item.question || item.patientName || item.key || '').toLowerCase();
    const descStr = (item.description || item.summary || item.answer || item.value || item.quote || item.country || '').toLowerCase();
    return nameStr.includes(q) || descStr.includes(q);
  });

  // Open modal for NEW record
  const handleOpenNew = () => {
    setEditingItem(null);
    if (module === 'hospitals') {
      setFormData({ name: '', country: 'Singapore', city: '', description: '', image: '/images/hospitals/farrer-park-1.jpg', accreditations: '["JCI Accredited"]' });
    } else if (module === 'doctors') {
      setFormData({ name: '', title: 'Senior Consultant', hospitalId: hospitals[0]?.id || '', bio: '', availability: 'Mon - Fri', image: '/images/doctors/doctor-1.jpg' });
    } else if (module === 'specialties') {
      setFormData({ name: '', category: 'Surgical Specialty', description: '', icon: 'Stethoscope' });
    } else if (module === 'blog') {
      setFormData({ title: '', category: 'Medical Travel', author: 'IMIC Team', summary: '', content: '', coverImage: '/images/slider/slide1.jpg', published: true });
    } else if (module === 'testimonials') {
      setFormData({ patientName: '', country: 'Bangladesh', treatment: 'Cardiology', quote: '', rating: 5 });
    } else if (module === 'faqs') {
      setFormData({ question: '', answer: '', category: 'General' });
    } else if (module === 'team') {
      setFormData({ name: '', designation: 'Patient Coordinator', department: 'CPAC Dhaka', bio: '', image: '/images/team/member1.jpg' });
    } else if (module === 'settings') {
      setFormData({ key: '', value: '' });
    }
    setIsModalOpen(true);
  };

  // Open modal for EDIT record
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Handle Form Change
  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const isEdit = !!editingItem;
      const url = `/api/admin/cms/${module}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (isEdit) {
          setItems((prev) => prev.map((i) => ((i.id && i.id === data.item.id) || (i.key && i.key === data.item.key) ? data.item : i)));
          setFeedback({ type: 'success', message: 'Record updated successfully!' });
        } else {
          setItems((prev) => [data.item, ...prev]);
          setFeedback({ type: 'success', message: 'New record created successfully!' });
        }
        setIsModalOpen(false);
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save record' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Connection error' });
    } finally {
      setSaving(false);
    }
  };

  // Delete Item
  const handleDelete = async (item: any) => {
    const confirmName = item.name || item.title || item.question || item.patientName || item.key;
    if (!window.confirm(`Are you sure you want to delete "${confirmName}"?`)) return;

    const idOrKey = item.id || item.key;
    setDeletingId(idOrKey);

    try {
      const param = module === 'settings' ? `key=${encodeURIComponent(item.key)}` : `id=${encodeURIComponent(item.id)}`;
      const res = await fetch(`/api/admin/cms/${module}?${param}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok && data.success) {
        setItems((prev) => prev.filter((i) => (i.id ? i.id !== item.id : i.key !== item.key)));
        setFeedback({ type: 'success', message: 'Record deleted successfully!' });
        router.refresh();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete record' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Delete error' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-imic-navy">{title}</h1>
          <p className="text-xs text-slate-500">Add, edit, or remove live content published on the public website</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between transition ${
            feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <ShieldAlert className="w-4 h-4 text-red-600" />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="opacity-60 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={`Search ${title}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs bg-transparent focus:outline-none text-slate-700 font-medium"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-slate-600">
            Clear
          </button>
        )}
      </div>

      {/* Records Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-3">
            <p className="text-xs font-medium">No records found for "{search || module}".</p>
            <button onClick={handleOpenNew} className="text-xs font-bold text-imic-teal hover:underline inline-block">
              + Click here to add a new record
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item: any) => {
              const itemKey = item.id || item.key;
              const nameStr = item.name || item.title || item.question || item.patientName || item.key;
              const descStr = item.description || item.summary || item.answer || item.value || item.quote || item.designation || '';

              return (
                <div
                  key={itemKey}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-imic-teal/30 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-imic-navy line-clamp-1 group-hover:text-imic-teal transition">
                        {nameStr}
                      </h3>
                      {item.country && (
                        <span className="text-[10px] font-bold bg-imic-navy/10 text-imic-navy px-2 py-0.5 rounded-md shrink-0">
                          {item.country}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {descStr}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{module}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-imic-navy hover:text-imic-teal font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-imic-teal/10 transition flex items-center gap-1 text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === itemKey}
                        className="text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition flex items-center gap-1 text-xs disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-imic-navy">
                  {editingItem ? `Edit Record: ${editingItem.name || editingItem.title || editingItem.key}` : `Add New ${module.slice(0, -1).toUpperCase()} Record`}
                </h2>
                <p className="text-xs text-slate-500">Fill in the fields below to publish live changes</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Dynamic Module Input Fields */}
              {module === 'hospitals' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Hospital Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Country</label>
                      <select
                        value={formData.country || 'Singapore'}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      >
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Thailand">Thailand</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city || ''}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => handleChange('image', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {module === 'doctors' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Doctor Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Title / Role</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Associated Hospital</label>
                      <select
                        value={formData.hospitalId || ''}
                        onChange={(e) => handleChange('hospitalId', e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      >
                        <option value="">Select Hospital</option>
                        {hospitals.map((h) => (
                          <option key={h.id} value={h.id}>{h.name} ({h.country})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Bio / Qualifications</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ''}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {module === 'specialties' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Specialty Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category || ''}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {module === 'blog' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Blog Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={formData.category || ''}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Author</label>
                      <input
                        type="text"
                        required
                        value={formData.author || ''}
                        onChange={(e) => handleChange('author', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Summary</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.summary || ''}
                      onChange={(e) => handleChange('summary', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Article Content</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.content || ''}
                      onChange={(e) => handleChange('content', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {module === 'testimonials' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name</label>
                      <input
                        type="text"
                        required
                        value={formData.patientName || ''}
                        onChange={(e) => handleChange('patientName', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={formData.country || ''}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Treatment / Procedure</label>
                    <input
                      type="text"
                      required
                      value={formData.treatment || ''}
                      onChange={(e) => handleChange('treatment', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Quote / Review</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.quote || ''}
                      onChange={(e) => handleChange('quote', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {module === 'settings' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Setting Key</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingItem}
                      value={formData.key || ''}
                      onChange={(e) => handleChange('key', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Setting Value</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.value || ''}
                      onChange={(e) => handleChange('value', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : editingItem ? 'Update Record' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
