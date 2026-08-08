'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, FileText, CheckCircle2, Clock, Eye, X } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?status=${filterStatus}&search=${search}`);
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterStatus, search]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBookings();
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
            className="bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 focus:ring-2 focus:ring-imic-teal"
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
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-imic-navy">{b.refNumber}</td>
                  <td className="p-4 font-semibold text-slate-800">
                    <div>{b.patientName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{b.patientPhone}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{b.specialty?.name || 'General Inquiry'}</div>
                    <div className="text-[10px] text-imic-teal font-bold">{b.country}</div>
                  </td>
                  <td className="p-4 text-slate-600">{b.hospital?.name || b.hospitalId || 'Pending'}</td>
                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 focus:outline-none ${
                        b.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="VISA_IN_PROGRESS">VISA IN PROGRESS</option>
                      <option value="TRAVEL_SCHEDULED">TRAVEL SCHEDULED</option>
                      <option value="ADMITTED">ADMITTED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="p-2 bg-slate-100 hover:bg-imic-navy hover:text-white text-slate-700 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-imic-teal uppercase tracking-wider">Booking Details</span>
              <h2 className="text-xl font-mono font-extrabold text-imic-navy">{selectedBooking.refNumber}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div><span className="font-bold text-slate-500">Patient:</span> {selectedBooking.patientName}</div>
              <div><span className="font-bold text-slate-500">Phone:</span> {selectedBooking.patientPhone}</div>
              <div><span className="font-bold text-slate-500">Email:</span> {selectedBooking.patientEmail}</div>
              <div><span className="font-bold text-slate-500">Target Country:</span> {selectedBooking.country}</div>
              <div><span className="font-bold text-slate-500">Specialty:</span> {selectedBooking.specialty?.name || 'N/A'}</div>
              <div><span className="font-bold text-slate-500">Hospital:</span> {selectedBooking.hospital?.name || 'N/A'}</div>
            </div>

            {selectedBooking.notes && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700">Patient Medical Notes:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">{selectedBooking.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
