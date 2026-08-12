import React from 'react';
import { db } from '@/lib/db';
import { Inbox, Phone, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminContactsPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-imic-navy">Contact Messages Inbox</h1>
        <p className="text-xs text-slate-500">General patient inquiries submitted through the contact page</p>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-imic-navy">{m.name}</h3>
                <span className="text-xs text-slate-500 font-semibold">{m.subject || 'General Inquiry'}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-imic-teal" /> {m.phone}</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-imic-teal" /> {m.email}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-200">
              {m.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
