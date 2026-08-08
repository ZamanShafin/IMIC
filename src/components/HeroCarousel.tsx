'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const slides = [
  {
    image: '/images/slider/slide1.jpg',
    title: 'World-Class Healthcare Services Abroad',
    subtext: 'Connecting Bangladeshi patients to top accredited hospitals and renowned specialists in Singapore, Malaysia, Thailand & India.',
  },
  {
    image: '/images/slider/slide2.jpg',
    title: 'Direct Admission & Emergency Visa Assistance',
    subtext: 'Fast-track emergency visas within 24 hours, tarmac ambulance pickup, and complete hospitalization support.',
  },
  {
    image: '/images/slider/slide3.jpg',
    title: '60% Savings with Commercial Flight Stretcher',
    subtext: 'Affordable commercial medical flight transfers with qualified medical teams and specialized equipment.',
  },
  {
    image: '/images/slider/slide4.jpg',
    title: 'One-Stop 24/7 Patient Assistance (CPAC)',
    subtext: 'From doctor appointments and cost estimates to hotel bookings and flight ticketing, we handle everything.',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] overflow-hidden bg-imic-navy">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover opacity-35"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-imic-navy/95 via-imic-navy/70 to-transparent" />

          {/* Slide Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 bg-imic-teal/20 border border-imic-teal/40 px-3 py-1 rounded-full text-imic-teal text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Trusted Medical Tourism Facilitator</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {slide.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {slide.subtext}
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book-appointment"
                  className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </Link>

                <Link
                  href="/request-qu"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-base px-6 py-3.5 rounded-xl border border-white/30 transition"
                >
                  <FileText className="w-5 h-5 text-imic-teal" />
                  <span>Request a Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-imic-teal w-8' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
