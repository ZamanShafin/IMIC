'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Quote, Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    patientName: "Mr. Jahangir Alam",
    treatment: "Complex Cardiac Surgery (CABG)",
    hospital: "Mount Elizabeth Hospital",
    country: "Singapore",
    quote: "IMIC arranged my emergency visa within 24 hours and had an ambulance waiting for me at Changi airport. Dr. Tan saved my life. Forever grateful to the IMIC team in Banani!",
    photo: "/images/testimonials/patient1.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    patientName: "Mrs. Rehana Parveen",
    treatment: "Oncology Radiotherapy",
    hospital: "Sunway Medical Centre",
    country: "Malaysia",
    quote: "The service apartment arranged by IMIC was right across the hospital. Their interpreter was with us every step of the way. Highly recommend IMIC to all Bangladeshi patients.",
    photo: "/images/testimonials/patient2.png",
    videoUrl: ""
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold text-imic-teal uppercase tracking-widest block">
            Patient Stories & Recoveries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What Our Patients Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-slate-800/90 rounded-3xl p-8 md:p-12 border border-slate-700 max-w-4xl mx-auto shadow-2xl relative">
          <Quote className="w-16 h-16 text-imic-teal/20 absolute top-6 right-6" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Patient Photo */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-imic-teal shrink-0 shadow-lg">
              <Image
                src={item.photo}
                alt={item.patientName}
                fill
                className="object-cover"
              />
            </div>

            {/* Quote details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-200 text-base md:text-lg italic leading-relaxed">
                "{item.quote}"
              </p>

              <div>
                <h3 className="text-lg font-bold text-white">{item.patientName}</h3>
                <p className="text-xs text-imic-teal font-semibold">
                  {item.treatment} — {item.hospital}, {item.country}
                </p>
              </div>

              {item.videoUrl && (
                <div className="pt-2">
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Video Testimonial</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-slate-700 hover:bg-imic-teal text-white transition"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-full bg-slate-700 hover:bg-imic-teal text-white transition"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
