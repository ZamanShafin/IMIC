'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Search, Clock, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const statusSteps = [
  { key: 'PENDING', label: 'Pending Review' },
  { key: 'CONFIRMED', label: 'Slot Confirmed' },
  { key: 'VISA_IN_PROGRESS', label: 'Visa In Progress' },
  { key: 'TRAVEL_SCHEDULED', label: 'Travel Scheduled' },
  { key: 'ADMITTED', label: 'Admitted' },
  { key: 'COMPLETED', label: 'Completed' },
];

function TrackBookingForm() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [refNumber, setRefNumber] = useState(initialRef);
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!refNumber) return;

    setLoading(true);
    setError('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/track?refNumber=${encodeURIComponent(refNumber)}&contact=${encodeURIComponent(contact)}`);
      const data = await res.json();
      if (res.ok && data.booking) {
        setBooking(data.booking);
      } else {
        setError(data.error || 'Booking reference not found. Please check your reference number.');
      }
    } catch (err) {
      setError('Error checking booking status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      handleSearch();
    }
  }, [initialRef]);

  const getStepIndex = (status: string) => {
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="space-y-8">
      {/* Lookup Card */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Booking Reference Number *</label>
            <input
              type="text"
              required
              placeholder="IMIC-YYYYMMDD-XXXX"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              className="w-full bg-white border border-slate-200 text-sm font-mono font-bold rounded-xl p-3.5 focus:ring-2 focus:ring-imic-teal focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Track Status'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Booking Details & Stepper */}
      {booking && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
            <div>
              <span className="text-xs font-bold text-imic-teal uppercase tracking-wider block">Reference Code</span>
              <span className="text-xl font-extrabold font-mono text-imic-navy">{booking.refNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Created On</span>
              <span className="text-xs font-bold text-slate-700">{new Date(booking.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-imic-navy">Live Status Timeline</h3>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center">
              {statusSteps.map((step, idx) => {
                const currentIdx = getStepIndex(booking.status);
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="space-y-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCompleted ? 'bg-imic-teal' : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-[11px] font-bold block ${
                        isCurrent ? 'text-imic-teal' : isCompleted ? 'text-imic-navy' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail summary */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div><span className="font-bold text-slate-500">Patient:</span> {booking.patientName}</div>
            <div><span className="font-bold text-slate-500">Contact:</span> {booking.patientPhone}</div>
            <div><span className="font-bold text-slate-500">Specialty:</span> {booking.specialty?.name || 'General Inquiry'}</div>
            <div><span className="font-bold text-slate-500">Destination:</span> {booking.country || 'Flexible'}</div>
            <div><span className="font-bold text-slate-500">Hospital:</span> {booking.hospital?.name || booking.hospitalId || 'Pending Recommendation'}</div>
            <div><span className="font-bold text-slate-500">Current Status:</span> <span className="font-bold text-imic-teal">{booking.status}</span></div>
          </div>

          {/* Case Documents */}
          {booking.documents && booking.documents.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-imic-navy uppercase tracking-wider">Case Documents & Letters</h4>
              <div className="space-y-2">
                {booking.documents.map((doc: any) => (
                  <div key={doc.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-imic-teal" />
                      <span className="font-bold text-slate-800">{doc.title}</span>
                    </div>
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-imic-teal font-bold flex items-center gap-1 hover:underline">
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackBookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-14 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Live Case Lookup</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Track Booking Status</h1>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Enter your booking reference number (e.g. IMIC-20260808-1234) to check live status updates.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-4xl mx-auto px-4">
          <Suspense fallback={<div className="text-center text-slate-500 py-10">Loading tracking portal...</div>}>
            <TrackBookingForm />
          </Suspense>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
