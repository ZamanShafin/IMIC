'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Tag, ZoomIn, X, Sparkles, Building2 } from 'lucide-react';
import eventsData from '@/data/events.json';

export default function EventGalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeEvent, setActiveEvent] = useState<any | null>(null);

  const categories = ['All', 'CME & Medical Seminar', 'MoU Signing & Partnership', 'Clinical Case Conference', 'Healthcare Facilitation'];

  const filteredEvents = selectedCategory === 'All'
    ? eventsData
    : eventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-imic-navy text-white shadow-md ring-2 ring-imic-teal'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id || index}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Event Image */}
              <div
                onClick={() => setActiveEvent(event)}
                className="relative h-60 w-full overflow-hidden bg-slate-100 cursor-pointer"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imic-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-white text-imic-navy flex items-center justify-center shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-6 h-6 text-imic-teal" />
                  </div>
                </div>

                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-imic-teal/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-imic-teal" />
                    <span>{event.date}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-imic-teal" />
                    <span>{event.location}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-imic-navy group-hover:text-imic-teal transition line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveEvent(event)}
                className="w-full text-xs font-bold text-imic-navy group-hover:text-imic-teal bg-slate-50 hover:bg-imic-teal/10 py-2.5 rounded-xl border border-slate-200 transition"
              >
                View Full Event Photo & Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveEvent(null)}
        >
          <div
            className="relative bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-7 border border-slate-800 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-imic-teal text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {activeEvent.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{activeEvent.date}</span>
              </div>
              <button
                onClick={() => setActiveEvent(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-80 sm:h-[450px] w-full bg-slate-950 rounded-2xl overflow-hidden">
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {activeEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeEvent.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-imic-teal font-semibold pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeEvent.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
