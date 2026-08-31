'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ChevronDown, Menu, X, Calendar, Search, Facebook, Instagram, Youtube, Briefcase } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Info Bar */}
      <div className="bg-imic-navy text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+8801710802000" className="flex items-center gap-1 hover:text-imic-teal transition">
              <Phone className="w-3.5 h-3.5 text-imic-teal" />
              <span>+8801710802000</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a href="tel:+8801777995995" className="flex items-center gap-1 hover:text-imic-teal transition">
              <Phone className="w-3.5 h-3.5 text-imic-teal" />
              <span>+8801777995995</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a href="mailto:info@imic.com.bd" className="flex items-center gap-1 hover:text-imic-teal transition">
              <Mail className="w-3.5 h-3.5 text-imic-teal" />
              <span>info@imic.com.bd</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">24/7 Patient Hotline</span>
            <div className="flex items-center gap-2">
              <a href="https://web.facebook.com/InternationalMedicalInformationCentre" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1" title="IMIC Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1" title="IMIC Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.youtube.com/@IMICLimited" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1" title="IMIC YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Branded Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative h-12 sm:h-14 w-[130px] sm:w-[150px] shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="IMIC — International Medical Information Center"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="border-l-2 border-imic-teal/40 pl-3 hidden xl:flex flex-col justify-center py-0.5 shrink-0">
            <span className="text-xs xl:text-[13px] font-extrabold text-imic-navy uppercase tracking-wider block leading-tight group-hover:text-imic-teal transition">
              International Medical
            </span>
            <span className="text-xs xl:text-[13px] font-bold text-imic-teal uppercase tracking-wider block leading-tight">
              Information Center
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-[15px] font-semibold text-slate-800 whitespace-nowrap">
          <Link href="/" className="hover:text-imic-teal transition py-2 flex items-center">
            Home
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-imic-teal transition py-2 whitespace-nowrap">
              <span>About Us</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 w-52 bg-white border border-slate-100 shadow-xl rounded-xl py-2 z-50">
                <Link href="/about-us" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  About IMIC
                </Link>
                <Link href="/team-member" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  Team Members
                </Link>
                <Link href="/faq" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  FAQs
                </Link>
              </div>
            )}
          </div>

          <Link href="/service-specialities" className="hover:text-imic-teal transition py-2 whitespace-nowrap flex items-center">
            Services & Specialties
          </Link>

          <Link href="/our-hospitals" className="hover:text-imic-teal transition py-2 whitespace-nowrap flex items-center">
            Our Hospitals
          </Link>

          {/* Gallery Dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setGalleryDropdownOpen(true)}
            onMouseLeave={() => setGalleryDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-imic-teal transition py-2 whitespace-nowrap">
              <span>Gallery</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {galleryDropdownOpen && (
              <div className="absolute top-full left-0 w-52 bg-white border border-slate-100 shadow-xl rounded-xl py-2 z-50">
                <Link href="/photo-gallery" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  Photo Gallery
                </Link>
                <Link href="/event-gallery" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  Event Gallery
                </Link>
                <Link href="/videos" className="block px-4 py-2.5 hover:bg-slate-50 hover:text-imic-teal text-sm font-medium">
                  Video Gallery
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-imic-teal transition py-2 whitespace-nowrap flex items-center">
            Blog
          </Link>

          <Link href="/contact-us" className="hover:text-imic-teal transition py-2 whitespace-nowrap flex items-center">
            Contact Us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
          <Link
            href="/travel-kit"
            className="flex items-center gap-1.5 text-xs xl:text-sm font-semibold text-slate-700 hover:text-imic-teal border border-slate-200 hover:border-imic-teal/50 px-4 py-2.5 rounded-xl transition whitespace-nowrap bg-slate-50 hover:bg-white shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-imic-teal" />
            <span>Travel Kit</span>
          </Link>
          <Link
            href="/book-appointment"
            className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-xs xl:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden p-2 text-slate-700 hover:text-imic-teal"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 text-sm font-medium shadow-xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-imic-teal">
            Home
          </Link>
          <div className="space-y-1 pl-2 border-l-2 border-slate-200">
            <span className="text-xs font-bold text-slate-400 block uppercase">About Us</span>
            <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              About IMIC
            </Link>
            <Link href="/team-member" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              Team Members
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              FAQs
            </Link>
          </div>
          <Link href="/service-specialities" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-imic-teal">
            Services & Specialties
          </Link>
          <Link href="/our-hospitals" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-imic-teal">
            Our Hospitals
          </Link>
          <div className="space-y-1 pl-2 border-l-2 border-slate-200">
            <span className="text-xs font-bold text-slate-400 block uppercase">Gallery</span>
            <Link href="/photo-gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              Photo Gallery
            </Link>
            <Link href="/event-gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              Event Gallery
            </Link>
            <Link href="/videos" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs hover:text-imic-teal">
              Video Gallery
            </Link>
          </div>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-imic-teal">
            Blog
          </Link>
          <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-imic-teal">
            Contact Us
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/travel-kit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-center text-xs font-bold text-imic-navy bg-slate-50 border border-slate-200 py-2.5 rounded-xl hover:bg-white hover:border-imic-teal/50 transition"
            >
              <Briefcase className="w-4 h-4 text-imic-teal" />
              <span>Travel Kit & Visa Checklist</span>
            </Link>
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-imic-teal text-white font-bold text-sm py-3 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
