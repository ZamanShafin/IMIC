'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Calendar, Download, TrendingUp, Users, Clock, CheckCircle2, Loader2 } from 'lucide-react';

// Dynamically load heavy recharts modules on client side to eliminate blocking bundle size
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

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
          <h1 className="text-2xl font-extrabold text-imic-navy">Performance Analytics</h1>
          <p className="text-xs text-slate-500">In-depth insights into patient inquiries, conversions, and country trends</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-slate-300 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-imic-teal"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Past Year</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Overall Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-imic-navy">24.6%</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+3.2% from previous period</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Average Review Time</span>
            <Clock className="w-4 h-4 text-imic-teal" />
          </div>
          <div className="text-3xl font-black text-imic-navy">1.8 hrs</div>
          <p className="text-[11px] text-slate-500 font-semibold">Fastest: Singapore Desk (45 mins)</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Total Patients Served</span>
            <Users className="w-4 h-4 text-imic-navy" />
          </div>
          <div className="text-3xl font-black text-imic-navy">1,480+</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+18% MoM growth</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Patient Satisfaction</span>
            <CheckCircle2 className="w-4 h-4 text-imic-teal" />
          </div>
          <div className="text-3xl font-black text-imic-navy">99.2%</div>
          <p className="text-[11px] text-slate-500 font-semibold">Based on post-discharge reviews</p>
        </div>
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Volume */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Monthly Patient Inquiries & Quotes</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="bookings" name="Bookings" fill="#00A896" radius={[6, 6, 0, 0]} />
                <Bar dataKey="quotes" name="Quote Requests" fill="#0F2C59" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Destination Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Destination Market Share (%)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {countryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Specialties & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Specialties */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Top Clinical Disciplines (Cases)</h3>
          <div className="space-y-3 pt-2">
            {specialtyBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.specialty}</span>
                  <span className="text-imic-navy font-bold">{item.count} cases</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-imic-teal rounded-full"
                    style={{ width: `${(item.count / 40) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Inquiry Funnel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-imic-navy">Patient Conversion Funnel</h3>
          <div className="space-y-3 pt-2">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{step.step}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-imic-navy">{step.value}</span>
                  <span className="text-xs font-extrabold text-imic-teal bg-imic-teal/10 px-2 py-0.5 rounded-md">
                    {step.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
