import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EventGalleryClient from '@/components/EventGalleryClient';
import { Calendar, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Event Gallery | IMIC - International Medical Information Center',
  description: 'Visual chronicle of medical seminars, MoU signings with premier foreign hospitals, CME symposiums, and cancer awareness events organized by IMIC.',
};

export default function EventGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal border border-imic-teal/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-imic-teal" />
              <span>Conferences & Collaborations</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Event Gallery</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Memorable moments from our international healthcare summits, partner hospital MoU signings, specialized doctor seminars, and patient outreach programs.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <EventGalleryClient />
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
