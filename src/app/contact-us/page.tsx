'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
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
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">24/7 Support</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Contact Us</h1>
            <p className="text-slate-300 text-sm">Visit our Patient Assistance Centre in Banani, Dhaka or drop us a message.</p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-imic-navy">Patient Assistance Centre (CPAC)</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect with our medical coordinators in Dhaka for inquiries regarding Singapore, Malaysia, Thailand, and India hospital admissions, visas, and flight arrangements.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-6 h-6 text-imic-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-imic-navy block">Dhaka CPAC Office Address</span>
                  <span>Suite – B1, Level – 2, House – 108, Road – 11, Block – C, Banani – 11, Dhaka -1213, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Phone className="w-6 h-6 text-imic-teal shrink-0" />
                <div>
                  <span className="font-bold text-imic-navy block">Hotline Numbers</span>
                  <span>+8801710802000, +8801777995995</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Mail className="w-6 h-6 text-imic-teal shrink-0" />
                <div>
                  <span className="font-bold text-imic-navy block">Official Email</span>
                  <span>info@imic.com.bd</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Clock className="w-6 h-6 text-imic-teal shrink-0" />
                <div>
                  <span className="font-bold text-imic-navy block">Office Hours</span>
                  <span>Saturday – Thursday: 9:30 AM – 7:30 PM (24/7 Hotline Available)</span>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 h-64 relative shadow-sm">
              <iframe
                title="IMIC Banani Office Map"
                src="https://maps.google.com/maps?q=Banani%20Road%2011%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-imic-navy">Send Us a Message</h3>
              <p className="text-xs text-slate-500">We respond to all patient inquiries within 2 hours.</p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700">Thank you for reaching out to IMIC. One of our patient coordinators will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mohammad Rahaman"
                    className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+8801700000000"
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Inquiry about cardiac surgery in Singapore"
                    className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Message / Medical Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe patient condition, preferred treatment country, or questions..."
                    className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Send Message'}</span>
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
