'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, FileText, CheckCircle2, Send, Upload, MessageCircle, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const initialHospital = searchParams.get('hospital') || '';
  const initialSpecialty = searchParams.get('specialty') || '';
  const initialCountry = searchParams.get('country') || 'Singapore';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: initialCountry,
    hospital: initialHospital,
    specialty: initialSpecialty,
    timeframe: 'Within 2 weeks',
    message: ''
  });

  useEffect(() => {
    if (initialHospital && !formData.hospital) {
      setFormData((prev) => ({ ...prev, hospital: initialHospital }));
    }
    if (initialSpecialty && !formData.specialty) {
      setFormData((prev) => ({ ...prev, specialty: initialSpecialty }));
    }
    if (initialCountry && formData.country === 'Singapore' && initialCountry !== 'Singapore') {
      setFormData((prev) => ({ ...prev, country: initialCountry }));
    }
  }, [initialHospital, initialSpecialty, initialCountry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookingRef(data.refNumber);
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit appointment request. Please check your information.');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error submitting appointment request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      {submitted ? (
        <div className="p-8 sm:p-12 bg-white border border-emerald-200 rounded-3xl text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              Appointment Request Submitted
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-imic-navy">
              Booking Received Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your international medical coordination request has been assigned to our Dhaka CPAC patient assistance desk.
            </p>
          </div>

          {bookingRef && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Your Booking Reference Code
              </span>
              <span className="text-2xl font-mono font-black text-imic-navy tracking-wider block">
                {bookingRef}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/8801710802000?text=Hello%20IMIC%2C%20I%20just%20submitted%20appointment%20request%20${bookingRef}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp (+8801710802000)</span>
            </a>

            <Link
              href={`/booking/track?ref=${bookingRef}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition"
            >
              <span>Track Booking Status</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-imic-navy flex items-center gap-2">
                <Calendar className="w-5 h-5 text-imic-teal" />
                <span>Patient & Appointment Details</span>
              </h2>
              <span className="text-[11px] font-semibold text-imic-teal bg-imic-teal/10 px-2.5 py-1 rounded-full">
                Free CPAC Assistance
              </span>
            </div>

            {formData.hospital && (
              <div className="p-3.5 bg-imic-teal/10 border border-imic-teal/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-imic-teal shrink-0" />
                  <span className="text-xs font-bold text-imic-navy">
                    Selected Hospital: {formData.hospital}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hospital: '' })}
                  className="text-[11px] font-semibold text-slate-400 hover:text-red-500"
                >
                  Change
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mohammad Rahim"
                  className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile / WhatsApp Number *
                </label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patient@example.com"
                  className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preferred Destination Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                >
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Undecided">Not sure yet, recommend best hospital</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Medical Speciality / Disease *
                </label>
                <input
                  type="text"
                  required
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="e.g. Cardiology, Oncology, Orthopaedics..."
                  className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preferred Timeframe / Travel Date
                </label>
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
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Medical History, Symptoms & Inquiries *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe current medical diagnosis, previous treatments, and any specific doctor or hospital preferences..."
                className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal focus:outline-none"
              />
            </div>

            <div className="p-4 bg-white border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
              <Upload className="w-6 h-6 text-imic-teal mx-auto" />
              <span className="text-xs font-bold text-imic-navy block">
                Attach Medical Reports / Prescriptions (Optional)
              </span>
              <span className="text-[11px] text-slate-400 block">
                PDF, JPG, PNG up to 10MB (You can also send via WhatsApp)
              </span>
              <input type="file" className="text-xs text-slate-500 mx-auto" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm py-4 rounded-xl shadow-xl transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting Appointment Request...' : 'Confirm & Book Appointment'}</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">
              Direct Doctor Consultations & Admissions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Book Appointment</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Schedule your doctor consultation with accredited hospital specialists across Singapore, Malaysia, Thailand, India, China, and Indonesia.
            </p>
          </div>
        </section>

        <section className="py-14 max-w-3xl mx-auto px-4">
          <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400 bg-slate-50 rounded-3xl animate-pulse">Loading Appointment Desk...</div>}>
            <BookAppointmentForm />
          </Suspense>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
