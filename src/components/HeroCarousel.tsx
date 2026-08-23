'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    image: '/images/slider/slide1.jpg',
    badge: 'International Healthcare Facilitator',
    title: 'World-Class Healthcare Services Abroad',
    subtext: 'Connecting Bangladeshi patients to premier JCI accredited hospitals and renowned specialist doctors across Singapore, Malaysia, Thailand, Indonesia, China & India.',
  },
  {
    image: '/images/slider/slide2.jpg',
    badge: 'Cutting-Edge Surgical Care',
    title: 'Advanced Robotic Surgery & Critical Interventions',
    subtext: 'Expedited doctor appointments, minimally invasive robotic procedures, itemized hospital bill estimates, and emergency visa assistance within 24-48 hours.',
  },
  {
    image: '/images/slider/slide3.jpg',
    badge: 'Compassionate Patient Support',
    title: 'Dedicated Bedside Assistance & Translation',
    subtext: 'Experienced international patient coordinators and language interpreters supporting you from Dhaka CPAC to overseas hospital bedside.',
  },
  {
    image: '/images/slider/slide4.jpg',
    badge: '24/7 CPAC Dhaka Assistance',
    title: 'One-Stop Patient Assistance Centre',
    subtext: 'Complete peace of mind from specialist evaluations and transparent hospital cost quotations to flights, hotel apartments, and post-discharge recovery.',
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
          {/* Authentic, Crisp, Bright Slider Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center brightness-95 contrast-105"
              priority={index === 0}
            />
          </div>

          {/* Clean Left-Side Text Readability Gradient - Keeps 70% of Hospital Visuals Crystal Clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent/10" />
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

              {/* Primary CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/book-appointment"
                  prefetch={true}
                  className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
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
