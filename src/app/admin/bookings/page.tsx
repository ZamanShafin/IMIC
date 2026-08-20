'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Calendar, FileText, CheckCircle2, Clock, Eye, X, Loader2 } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?status=${encodeURIComponent(filterStatus)}&search=${encodeURIComponent(search)}`, {
        cache: 'no-store'
      });
      const data = await res.json();
      if (res.ok && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Bookings fetch note:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchBookings]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-imic-navy">Bookings & Case Management</h1>
          <p className="text-xs text-slate-500">Track and manage patient hospital appointments & travel progress</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name or ref code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:ring-2 focus:ring-imic-teal"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 focus:ring-2 focus:ring-imic-teal font-medium"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="VISA_IN_PROGRESS">VISA_IN_PROGRESS</option>
            <option value="TRAVEL_SCHEDULED">TRAVEL_SCHEDULED</option>
            <option value="ADMITTED">ADMITTED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Patient</th>
                <th className="p-4">Specialty & Country</th>
                <th className="p-4">Hospital</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                // Instant Skeleton Rows
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="h-4 w-32 bg-slate-200 rounded mb-1"></div><div className="h-3 w-24 bg-slate-100 rounded"></div></td>
                    <td className="p-4"><div className="h-4 w-28 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="h-4 w-36 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="h-6 w-20 bg-slate-200 rounded-full"></div></td>
                    <td className="p-4"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
                    <td className="p-4 text-right"><div className="h-7 w-16 bg-slate-200 rounded-lg ml-auto"></div></td>
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    No bookings found matching your search.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-imic-navy">{b.refNumber}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{b.patientName}</div>
                      <div className="text-[11px] text-slate-500">{b.patientPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{b.medicalSpecialty || b.specialty?.name || 'General'}</div>
                      <div className="text-[11px] text-imic-teal font-bold">{b.destinationCountry}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {b.hospital?.name || 'Assigned by CPAC'}
                    </td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-transparent uppercase cursor-pointer ${
                          b.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800 hover:border-amber-300'
                            : b.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800 hover:border-emerald-300'
                            : b.status === 'VISA_IN_PROGRESS'
                            ? 'bg-indigo-100 text-indigo-800 hover:border-indigo-300'
                            : b.status === 'TRAVEL_SCHEDULED'
                            ? 'bg-cyan-100 text-cyan-800 hover:border-cyan-300'
                            : b.status === 'ADMITTED'
                            ? 'bg-purple-100 text-purple-800 hover:border-purple-300'
                            : b.status === 'COMPLETED'
                            ? 'bg-slate-100 text-slate-800 hover:border-slate-300'
                            : 'bg-red-100 text-red-800 hover:border-red-300'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="VISA_IN_PROGRESS">VISA_IN_PROGRESS</option>
                        <option value="TRAVEL_SCHEDULED">TRAVEL_SCHEDULED</option>
                        <option value="ADMITTED">ADMITTED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="bg-slate-100 hover:bg-imic-teal hover:text-white text-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ml-auto shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over / Modal Detail View */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-imic-teal uppercase">Patient Booking File</span>
                <h3 className="text-xl font-black text-imic-navy">{selectedBooking.refNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Patient Name</span>
                <span className="font-bold text-slate-800 text-sm">{selectedBooking.patientName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Phone Number</span>
                <span className="font-bold text-slate-800 text-sm">{selectedBooking.patientPhone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Email</span>
                <span className="font-bold text-slate-800">{selectedBooking.patientEmail || 'Not provided'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Preferred Country</span>
                <span className="font-bold text-imic-teal">{selectedBooking.destinationCountry}</span>
              </div>
            </div>

            {selectedBooking.medicalNotes && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Medical History & Symptoms</span>
                <p className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-100">
                  {selectedBooking.medicalNotes}
                </p>
              </div>
            )}

            {selectedBooking.documents && selectedBooking.documents.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Uploaded Reports</span>
                <div className="space-y-1">
                  {selectedBooking.documents.map((doc: any, i: number) => (
                    <a
                      key={i}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-imic-teal transition border border-slate-200"
                    >
                      <span className="truncate">{doc.fileName || `Medical Document ${i + 1}`}</span>
                      <FileText className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
