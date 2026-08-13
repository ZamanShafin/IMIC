'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import galleryData from '@/data/gallery.json';

export default function PhotoGalleryClient() {
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  return (
    <div className="space-y-8">
      {/* Pure High-Resolution Photo Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {galleryData.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 relative h-64 w-full"
          >
            <Image
              src={photo.url}
              alt="IMIC Photo Gallery Asset"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-imic-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full bg-white/90 text-imic-navy flex items-center justify-center shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <ZoomIn className="w-6 h-6 text-imic-teal" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-slate-900 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4 sm:p-6 border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-imic-teal uppercase tracking-wider">
                IMIC Photo Gallery Asset
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-[75vh] w-full bg-slate-950 rounded-2xl overflow-hidden">
              <Image
                src={activePhoto.url}
                alt="IMIC Photo Gallery Asset"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
