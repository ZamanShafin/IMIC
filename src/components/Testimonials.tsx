'use client';

import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import googleReviewsData from '@/data/testimonials.json';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? googleReviewsData.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev + 1) % googleReviewsData.length);

  const item = googleReviewsData[current];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-imic-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-imic-teal">
            <span className="text-amber-400">Google Reviews ⭐⭐⭐⭐⭐</span>
            <span className="text-slate-300">| 5.0 Rating</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Patient Stories & Google Reviews
          </h2>
          <p className="text-slate-400 text-sm">
            Authentic experiences shared by patients who received international treatment assistance through IMIC Banani, Dhaka.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-slate-800/90 rounded-3xl p-8 md:p-12 border border-slate-700 max-w-4xl mx-auto shadow-2xl relative">
          <Quote className="w-16 h-16 text-imic-teal/20 absolute top-6 right-6" />

          <div className="space-y-6">
            {/* Stars & Verified Badge (Unified Left Alignment) */}
            <div className="flex items-center justify-start border-b border-slate-700/80 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="ml-1.5 text-xs font-extrabold text-white bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                    5.0 / 5.0
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Google Review</span>
                </div>
              </div>
            </div>

            {/* Quote details */}
            <p className="text-slate-100 text-base md:text-lg italic leading-relaxed">
              "{item.quote}"
            </p>

            <div className="pt-2">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>{item.patientName}</span>
                <span className="text-xs font-normal text-slate-400">({item.country})</span>
              </h3>
              <p className="text-xs font-bold text-imic-teal mt-0.5">
                {item.treatment} — <span className="text-slate-300 font-semibold">{item.hospital}</span>
              </p>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400">
              Review {current + 1} of {googleReviewsData.length}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="p-2.5 rounded-full bg-slate-700 hover:bg-imic-teal text-white transition shadow-md"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-full bg-slate-700 hover:bg-imic-teal text-white transition shadow-md"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
