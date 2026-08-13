import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhotoGalleryClient from '@/components/PhotoGalleryClient';

export const revalidate = 60;

export default function PhotoGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Visual Archive</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Photo Gallery</h1>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Explore authentic photos from partner hospital visits, CME seminars, media talk shows, and patient assistance operations.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <PhotoGalleryClient />
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
