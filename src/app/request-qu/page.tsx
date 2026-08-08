'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FileText, Send, CheckCircle2, Upload } from 'lucide-react';

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Singapore',
    specialty: 'Heart & Vascular (Cardiovascular)',
    timeframe: 'Within 2 weeks',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">No-Obligation Estimate</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Request a Medical Treatment Quote</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Get transparent hospital bill estimates and doctor recommendations from Singapore, Malaysia, Thailand, and India within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-3xl mx-auto px-4">
          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h2 className="text-2xl font-bold text-emerald-900">Quote Request Received!</h2>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Our medical coordination desk in Dhaka is evaluating your file. We will contact you at <span className="font-bold">{formData.phone}</span> with itemized cost estimates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                    <FileText className="w-5 h-5 text-imic-teal" />
                    <span>Patient & Treatment Details</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jahangir Alam"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+8801710000000"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@example.com"
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Destination Country *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      >
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Thailand">Thailand</option>
                        <option value="India">India</option>
                        <option value="Undecided">Not sure yet, recommend best option</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Medical Speciality / Disease *</label>
                      <input
                        type="text"
                        required
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        placeholder="e.g. CABG, Knee replacement, Cancer..."
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Timeframe</label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    >
                      <option value="Immediate Emergency (Within 48h)">Immediate Emergency (Within 48h)</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Planning ahead (2+ months)">Planning ahead (2+ months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Medical History & Symptoms Summary *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Summarize diagnosis, existing medical reports, and specific questions..."
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>

                  <div className="p-4 bg-white border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Upload className="w-6 h-6 text-imic-teal mx-auto" />
                    <span className="text-xs font-bold text-imic-navy block">Attach Medical Reports / Prescriptions</span>
                    <span className="text-[11px] text-slate-400 block">PDF, JPG, PNG up to 10MB</span>
                    <input type="file" className="text-xs text-slate-500 mx-auto" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm py-4 rounded-xl shadow-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting File...' : 'Request Quotation Now'}</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
