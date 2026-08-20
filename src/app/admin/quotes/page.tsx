import React from 'react';
import { db } from '@/lib/db';
import { FileText, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminQuotesPage() {
  let quotes: any[] = [];

  try {
    const fetchPromise = db.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500));
    quotes = await Promise.race([fetchPromise, timeoutPromise]) as any[];
  } catch (error) {
    console.error('Quotes fetch note:', error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-imic-navy">Treatment Quote Requests</h1>
        <p className="text-xs text-slate-500">Inbound quote submissions requiring medical evaluation and cost estimates</p>
      </div>

      <div className="space-y-4">
        {quotes.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
            No quote requests currently recorded.
          </div>
        ) : (
          quotes.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-imic-navy">{q.name}</h3>
                  <span className="text-xs text-imic-teal font-semibold">
                    {q.medicalSpecialty || q.specialty || 'General Inquiry'} — Target: {q.preferredCountry || q.country || 'International'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(q.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-imic-teal" /> {q.phone}</div>
                <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-imic-teal" /> {q.email || 'N/A'}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-imic-teal" /> Timeframe: {q.timeframe || 'Flexible'}</div>
              </div>

              {q.message && (
                <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-200">
                  {q.message}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
