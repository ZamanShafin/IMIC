'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

const slides = [
  {
    image: '/images/slider/slide1.jpg',
    badge: 'International Healthcare Facilitator',
    title: 'World-Class Healthcare Services Abroad',
    subtext: 'Connecting Bangladeshi patients to top accredited hospitals and renowned clinical specialists across Singapore, Malaysia, Thailand, Indonesia, China & India.',
  },
  {
    image: '/images/slider/slide2.jpg',
    badge: 'Fast-Track Medical Travel',
    title: 'Direct Admission & Emergency Visa Assistance',
    subtext: 'Expedited emergency visas within 24-48 hours, tarmac airport buggy & ambulance pickup, and full in-hospital translation support.',
  },
  {
    image: '/images/slider/slide3.jpg',
    badge: 'Affordable Patient Transfers',
    title: '60% Savings with Commercial Flight Stretcher',
    subtext: 'Cost-effective commercial flight medical transfers with qualified medical teams, oxygen, and critical care monitoring.',
  },
  {
    image: '/images/slider/slide4.jpg',
    badge: '24/7 CPAC Dhaka Assistance',
    title: 'One-Stop Patient Assistance Centre',
    subtext: 'From specialist doctor appointments and transparent hospital cost estimates to flights, hotel apartments, and post-discharge recovery.',
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
    <div className="relative w-full h-[540px] lg:h-[620px] overflow-hidden bg-slate-950">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Ultra-Sharp, Bright, High-Contrast Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center brightness-95 contrast-105 saturate-110"
              priority={index === 0}
            />
          </div>

          {/* Clean Gradient Overlay - Left-focused for text, keeping 70% of image luminous & clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

          {/* Slide Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 bg-imic-teal text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-white" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg">
                {slide.title}
              </h1>

              <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed drop-shadow-md font-medium">
                {slide.subtext}
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/book-appointment"
                  className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Doctor Appointment</span>
                </Link>

                <Link
                  href="/request-qu"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-white/50 shadow-lg backdrop-blur-md transition transform hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5 text-emerald-300" />
                  <span>Request Treatment Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-imic-teal text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-imic-teal text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-imic-teal shadow-md'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
