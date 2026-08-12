import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Building2, Stethoscope, BookOpen, MessageSquare, Users, Settings, Plus, Edit3, ShieldCheck, HelpCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { module: string };
}

export default async function CMSModulePage({ params }: PageProps) {
  const { module } = params;

  let items: any[] = [];
  let title = '';

  if (module === 'hospitals') {
    title = 'Hospitals Directory CMS';
    items = await db.hospital.findMany({ orderBy: { name: 'asc' } });
  } else if (module === 'doctors') {
    title = 'Doctors & Specialists CMS';
    items = await db.doctor.findMany({ include: { hospital: true }, orderBy: { name: 'asc' } });
  } else if (module === 'specialties') {
    title = 'Medical Specialties Taxonomy CMS';
    items = await db.specialty.findMany({ include: { procedures: true }, orderBy: { name: 'asc' } });
  } else if (module === 'blog') {
    title = 'Blog & Articles CMS';
    items = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  } else if (module === 'testimonials') {
    title = 'Patient Testimonials CMS';
    items = await db.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  } else if (module === 'faqs') {
    title = 'FAQs CMS';
    items = await db.fAQ.findMany({ orderBy: { sortOrder: 'asc' } });
  } else if (module === 'team') {
    title = 'Team Members CMS';
    items = await db.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });
  } else if (module === 'settings') {
    title = 'Site Settings & Contact Phone Numbers';
    items = await db.siteSetting.findMany();
  } else {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-imic-navy">{title}</h1>
          <p className="text-xs text-slate-500">Manage, edit, or publish items live on the public website</p>
        </div>

        <button className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Item List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs font-medium">No records found. Click "Add New Record" to create one.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item: any) => (
              <div key={item.id || item.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-imic-navy">{item.name || item.title || item.question || item.patientName || item.key}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description || item.summary || item.answer || item.value || item.quote || item.designation}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-imic-teal uppercase">{module}</span>
                  <button className="text-slate-600 hover:text-imic-navy font-bold flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
