import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { CalendarCheck, FileText, Inbox, BarChart3, Clock, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const totalBookings = await db.booking.count();
  const pendingBookings = await db.booking.count({ where: { status: 'PENDING' } });
  const totalQuotes = await db.quoteRequest.count();
  const totalMessages = await db.contactMessage.count();

  const recentBookings = await db.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { hospital: true }
  });

  const recentQuotes = await db.quoteRequest.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-imic-navy">Dashboard Overview</h1>
          <p className="text-xs text-slate-500">Real-time stats and pending patient requests</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/analytics"
            className="bg-imic-navy hover:bg-imic-navy-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5 text-imic-teal" />
            <span>View Analytics</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <div className="p-2 bg-imic-teal/10 text-imic-teal rounded-xl">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">{totalBookings}</span>
            <span className="text-xs text-slate-500 font-medium">patient requests</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-3 bg-gradient-to-br from-amber-50/50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Review</span>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">{pendingBookings}</span>
            <span className="text-xs text-amber-600 font-medium">requires action</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quote Requests</span>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">{totalQuotes}</span>
            <span className="text-xs text-slate-500 font-medium">submitted</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Messages</span>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">{totalMessages}</span>
            <span className="text-xs text-slate-500 font-medium">inquiries</span>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-imic-navy">Recent Patient Bookings</h3>
            <Link href="/admin/bookings" className="text-xs font-bold text-imic-teal hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-imic-navy">{b.patientName}</span>
                    <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border">{b.refNumber}</span>
                  </div>
                  <span className="text-slate-500 block">{b.hospital?.name || b.country || 'Target Country'}</span>
                </div>

                <div className="text-right">
                  <span className={`font-bold px-2.5 py-1 rounded-full text-[10px] ${
                    b.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-imic-navy">Recent Quote Requests</h3>
            <Link href="/admin/quotes" className="text-xs font-bold text-imic-teal hover:underline flex items-center gap-1">
              <span>View Inbox</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentQuotes.map((q) => (
              <div key={q.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-imic-navy block">{q.name}</span>
                  <span className="text-slate-500 block">{q.specialty} ({q.country})</span>
                </div>
                <span className="text-slate-400 text-[10px]">
                  {new Date(q.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
