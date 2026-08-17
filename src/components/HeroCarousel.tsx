'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, ChevronLeft, ChevronRight, CheckCircle2, ShieldPlus } from 'lucide-react';

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
    <div className="relative w-full h-[540px] lg:h-[620px] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Vivid, Clear, High-Contrast Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center brightness-90 contrast-105"
              priority={index === 0}
            />
          </div>

          {/* Balanced Readability Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Slide Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 bg-imic-teal/90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed drop-shadow">
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
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-white/40 shadow-lg backdrop-blur-md transition"
                >
                  <FileText className="w-5 h-5 text-imic-teal" />
                  <span>Request Treatment Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-imic-teal text-white backdrop-blur-md transition shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-imic-teal text-white backdrop-blur-md transition shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-imic-teal w-8' : 'bg-white/50 hover:bg-white/80 w-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
