import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroCarousel from '@/components/HeroCarousel';
import SearchWidget from '@/components/SearchWidget';
import CountryGrid from '@/components/CountryGrid';
import ServicesGrid from '@/components/ServicesGrid';
import ClinicalServicesSection from '@/components/ClinicalServicesSection';
import SpecialityHighlights from '@/components/SpecialityHighlights';
import HowWeWork from '@/components/HowWeWork';
import PartnerLogos from '@/components/PartnerLogos';
import Testimonials from '@/components/Testimonials';
import AccreditationLogos from '@/components/AccreditationLogos';
import Link from 'next/link';
import { FileText, PhoneCall, ArrowRight, Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroCarousel />

        {/* Search & Filter Finder Widget */}
        <SearchWidget />

        {/* 6 Destination Country Grid (Singapore, Malaysia, Thailand, Indonesia, China, India) */}
        <CountryGrid />

        {/* Facilitation Services Grid (Including Medical Visa & Tourist Visa) */}
        <ServicesGrid />

        {/* Dedicated Clinical Services Section */}
        <ClinicalServicesSection />

        {/* Speciality Highlight Capabilities */}
        <SpecialityHighlights />

        {/* "We understand your needs" Quote Banner */}
        <section className="bg-gradient-to-r from-imic-navy via-imic-navy-dark to-imic-navy py-14 text-white">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                We Understand Your Needs for Overseas Medical Consultation
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Get custom cost estimates, doctor profiles, and hospital recommendations within 24 hours. No hidden fees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/book-appointment"
                className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:+8801710802000"
                className="flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition"
              >
                <PhoneCall className="w-4 h-4 text-imic-teal" />
                <span>Call +8801710802000</span>
              </a>
            </div>
          </div>
        </section>

        {/* 7-Step Process with Full Step Names */}
        <HowWeWork />

        {/* Patient Testimonials */}
        <Testimonials />

        {/* Partner Logos Infinite Marquee */}
        <PartnerLogos />

        {/* Accreditation Logos Infinite Marquee */}
        <AccreditationLogos />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
