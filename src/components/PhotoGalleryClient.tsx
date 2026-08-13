'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, ZoomIn, X, Image as ImageIcon } from 'lucide-react';
import galleryData from '@/data/gallery.json';

export default function PhotoGalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  // Categorize items dynamically
  const categorizedPhotos = galleryData.map((item) => {
    const titleLower = item.title.toLowerCase();
    let cat = 'CPAC Operations & Events';

    if (titleLower.includes('tv') || titleLower.includes('talk show') || titleLower.includes('media')) {
      cat = 'Media & TV Shows';
    } else if (titleLower.includes('farrer') || titleLower.includes('hospital') || titleLower.includes('cme') || titleLower.includes('bsmmu')) {
      cat = 'Hospital Partners & Visits';
    }

    return { ...item, category: cat };
  });

  const categories = ['All', 'Hospital Partners & Visits', 'Media & TV Shows', 'CPAC Operations & Events'];

  const filteredPhotos = selectedCategory === 'All'
    ? categorizedPhotos
    : categorizedPhotos.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => {
          const count = c === 'All' ? categorizedPhotos.length : categorizedPhotos.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs font-bold px-4 py-2.5 rounded-xl transition ${
                selectedCategory === c
                  ? 'bg-imic-teal text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{c}</span>
              <span className="ml-1.5 opacity-80 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-imic-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-10 h-10 rounded-full bg-white/90 text-imic-navy flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5 text-imic-teal" />
                </div>
              </div>
              <span className="absolute top-2.5 left-2.5 bg-imic-navy/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
                {photo.category}
              </span>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <h3 className="text-xs font-bold text-imic-navy line-clamp-2 leading-snug group-hover:text-imic-teal transition">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-imic-teal uppercase tracking-wider">{activePhoto.category}</span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-[65vh] w-full bg-slate-900 rounded-2xl overflow-hidden">
              <Image
                src={activePhoto.url}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="pt-2">
              <h2 className="text-sm sm:text-base font-bold text-imic-navy">{activePhoto.title}</h2>
              <p className="text-xs text-slate-500">Official IMIC Event & Patient Assistance Gallery Asset</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
