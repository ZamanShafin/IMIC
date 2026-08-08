import React from 'react';
import { db } from '@/lib/db';
import { FileText, Phone, Mail, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminQuotesPage() {
  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-imic-navy">Treatment Quote Requests</h1>
        <p className="text-xs text-slate-500">Inbound quote submissions requiring medical evaluation and cost estimates</p>
      </div>

      <div className="space-y-4">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-imic-navy">{q.name}</h3>
                <span className="text-xs text-imic-teal font-semibold">{q.specialty} — Target: {q.country}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {new Date(q.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-imic-teal" /> {q.phone}</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-imic-teal" /> {q.email}</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-imic-teal" /> Timeframe: {q.timeframe}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-200">
              {q.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
