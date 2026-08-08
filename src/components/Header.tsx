'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ChevronDown, Menu, X, Calendar, Search, Facebook, Instagram, Youtube } from 'lucide-react';

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
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-imic-teal p-1">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
            <Image
              src="/images/logo/logo.jpeg"
              alt="IMIC Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="font-bold text-lg text-imic-navy block leading-tight">IMIC</span>
            <span className="text-xs text-slate-500 block">International Medical Information Center</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-imic-teal transition">
            Home
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-imic-teal transition py-2">
              <span>About Us</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-lg py-2 z-50">
                <Link href="/about-us" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  About IMIC
                </Link>
                <Link href="/founder-message" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  Founder Message
                </Link>
                <Link href="/team-member" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  Team Members
                </Link>
                <Link href="/faq" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  FAQs
                </Link>
              </div>
            )}
          </div>

          <Link href="/service-specialities" className="hover:text-imic-teal transition">
            Services & Specialties
          </Link>

          <Link href="/our-hospitals" className="hover:text-imic-teal transition">
            Our Hospitals
          </Link>

          {/* Gallery Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGalleryDropdownOpen(true)}
            onMouseLeave={() => setGalleryDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-imic-teal transition py-2">
              <span>Gallery</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {galleryDropdownOpen && (
              <div className="absolute top-full left-0 w-44 bg-white border border-slate-100 shadow-xl rounded-lg py-2 z-50">
                <Link href="/photo-gallery" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  Photo Gallery
                </Link>
                <Link href="/videos" className="block px-4 py-2 hover:bg-slate-50 hover:text-imic-teal">
                  Video Gallery
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-imic-teal transition">
            Blog
          </Link>

          <Link href="/contact-us" className="hover:text-imic-teal transition">
            Contact Us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/booking/track"
            className="text-xs text-slate-600 hover:text-imic-navy border border-slate-200 hover:border-slate-400 px-3 py-2 rounded-lg font-medium transition"
          >
            Track Booking
          </Link>
          <Link
            href="/book-appointment"
            className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Calendar className="w-4 h-4" />
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Home
          </Link>
          <div className="border-t pt-2 space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">About Us</span>
            <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">About IMIC</Link>
            <Link href="/founder-message" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">Founder Message</Link>
            <Link href="/team-member" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">Team Members</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">FAQs</Link>
          </div>
          <Link href="/service-specialities" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium border-t">
            Services & Specialties
          </Link>
          <Link href="/our-hospitals" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium border-t">
            Our Hospitals
          </Link>
          <div className="border-t pt-2 space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gallery</span>
            <Link href="/photo-gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">Photo Gallery</Link>
            <Link href="/videos" onClick={() => setMobileMenuOpen(false)} className="block py-1 pl-3 text-sm text-slate-700">Video Gallery</Link>
          </div>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium border-t">
            Blog
          </Link>
          <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium border-t">
            Contact Us
          </Link>
          <div className="pt-3 border-t space-y-2">
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 bg-imic-teal text-white py-2.5 rounded-lg font-semibold"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <Link
              href="/booking/track"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium"
            >
              <span>Track Your Booking</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
