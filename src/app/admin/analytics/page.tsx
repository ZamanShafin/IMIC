'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, Download, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';

const volumeData = [
  { month: 'Jan', bookings: 45, quotes: 68 },
  { month: 'Feb', bookings: 52, quotes: 75 },
  { month: 'Mar', bookings: 61, quotes: 88 },
  { month: 'Apr', bookings: 78, quotes: 95 },
  { month: 'May', bookings: 85, quotes: 110 },
  { month: 'Jun', bookings: 92, quotes: 125 },
  { month: 'Jul', bookings: 110, quotes: 140 },
  { month: 'Aug', bookings: 125, quotes: 160 },
];

const countryBreakdown = [
  { name: 'Singapore', value: 45, color: '#0F2C59' },
  { name: 'Malaysia', value: 30, color: '#00A896' },
  { name: 'India', value: 15, color: '#0284C7' },
  { name: 'Thailand', value: 10, color: '#E5A93C' },
];

const specialtyBreakdown = [
  { specialty: 'Cardiology', count: 38 },
  { specialty: 'Orthopaedics', count: 29 },
  { specialty: 'Oncology', count: 24 },
  { specialty: 'Neurosurgery', count: 18 },
  { specialty: 'Transplant', count: 12 },
  { specialty: 'Gastroenterology', count: 9 },
];

const funnelSteps = [
  { step: '1. Finder Search', value: 1000, pct: '100%' },
  { step: '2. Started Form', value: 450, pct: '45%' },
  { step: '3. Submitted Booking', value: 180, pct: '18%' },
  { step: '4. Hospital Confirmed', value: 135, pct: '13.5%' },
  { step: '5. Treatment Completed', value: 120, pct: '12%' },
];

export default function AnalyticsDashboardPage() {
  const [dateRange, setDateRange] = useState('30d');

  const handleExportCSV = () => {
    window.open('/api/admin/analytics/export', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-imic-navy">Analytics & Performance Reports</h1>
          <p className="text-xs text-slate-500">Monitor booking funnel conversion, hospital trends, and staff response times</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 text-xs">
            <Calendar className="w-3.5 h-3.5 text-imic-teal ml-2" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 p-1.5 focus:outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
              <option value="1y">This Year</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">18.4%</span>
            <span className="text-xs font-bold text-emerald-600">↑ +2.1%</span>
          </div>
          <p className="text-[11px] text-slate-500">Inquiry to confirmed booking ratio</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Response Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-teal">38 mins</span>
            <span className="text-xs font-bold text-emerald-600">Fast CPAC</span>
          </div>
          <p className="text-[11px] text-slate-500">Inquiry submit to staff phone outreach</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Top Destination</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">Singapore</span>
            <span className="text-xs font-bold text-slate-500">45% share</span>
          </div>
          <p className="text-[11px] text-slate-500">Mount Elizabeth & Farrer Park lead</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Emergency Visas</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-imic-navy">42 Cases</span>
            <span className="text-xs font-bold text-emerald-600">100% Issued</span>
          </div>
          <p className="text-[11px] text-slate-500">Issued within 24 hours</p>
        </div>
      </div>

      {/* Funnel & Volume Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Funnel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Patient Conversion Funnel</h3>
          <p className="text-xs text-slate-500">Step-by-step drop-off from hospital search to completed treatment</p>

          <div className="space-y-3 pt-2">
            {funnelSteps.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{f.step}</span>
                  <span className="font-bold text-imic-teal">{f.value} patients ({f.pct})</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-imic-navy to-imic-teal rounded-full"
                    style={{ width: f.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Over Time Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Bookings & Quote Volume</h3>
          <p className="text-xs text-slate-500">Monthly breakdown of patient requests</p>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#00A896" strokeWidth={3} name="Bookings" />
                <Line type="monotone" dataKey="quotes" stroke="#0F2C59" strokeWidth={3} name="Quote Requests" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Country Distribution & Specialty Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Country Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Destination Country Share</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={countryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {countryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialty Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Top Requested Medical Specialties</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="specialty" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0F2C59" radius={[8, 8, 0, 0]} name="Patient Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
