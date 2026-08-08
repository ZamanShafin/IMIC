import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-imic-navy text-slate-300 text-sm">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Get In Touch / CPAC Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white p-1">
              <Image
                src="/images/logo/logo.jpeg"
                alt="IMIC Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-white font-bold text-lg block">IMIC</span>
              <span className="text-xs text-slate-400">Patient Assistance Centre (CPAC)</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            Our Patient Assistance Centre (CPAC) provides a seamless and one-stop 24-hour service to our patients connecting them to a comprehensive choice of medical services and doctors across Singapore, Malaysia, Thailand & India.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-imic-teal shrink-0 mt-0.5" />
              <span>Suite – B1, Level – 2, House – 108, Road – 11, Block – C, Banani – 11, Dhaka -1213</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-imic-teal shrink-0" />
              <span>+8801710802000, +8801777995995</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-imic-teal shrink-0" />
              <span>info@imic.com.bd</span>
            </div>
          </div>
        </div>

        {/* Column 2: Partner Countries & Destinations */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-base border-b border-slate-700 pb-2">Medical Destinations</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/our-hospitals?country=Singapore" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in Singapore</span>
              </Link>
            </li>
            <li>
              <Link href="/our-hospitals?country=Malaysia" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in Malaysia</span>
              </Link>
            </li>
            <li>
              <Link href="/our-hospitals?country=Thailand" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in Thailand</span>
              </Link>
            </li>
            <li>
              <Link href="/our-hospitals?country=India" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in India</span>
              </Link>
            </li>
            <li>
              <Link href="/service-specialities" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Medical Specialties Directory</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-base border-b border-slate-700 pb-2">Useful Links</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about-us" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>About IMIC</span>
              </Link>
            </li>
            <li>
              <Link href="/founder-message" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Founder Message</span>
              </Link>
            </li>
            <li>
              <Link href="/team-member" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Our Team Members</span>
              </Link>
            </li>
            <li>
              <Link href="/book-appointment" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Book Doctor Appointment</span>
              </Link>
            </li>
            <li>
              <Link href="/request-qu" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Request Treatment Quote</span>
              </Link>
            </li>
            <li>
              <Link href="/booking/track" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Track Booking Status</span>
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Frequently Asked Questions</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Facebook Page & Accreditations */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-base border-b border-slate-700 pb-2">Connect With Us</h3>
          <p className="text-xs text-slate-400">
            Follow IMIC Bangladesh on social media for international hospital updates and medical news.
          </p>

          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-imic-teal" />
              <span>Official Facebook Page</span>
            </div>
            <a
              href="https://facebook.com/imic.com.bd"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
            >
              Visit @IMICLimited on Facebook
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition"
            >
              <Lock className="w-3 h-3" />
              <span>Staff & Admin Portal Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© International Medical Information Center (IMIC). All Rights Reserved.</span>
          <span>Banani-11, Dhaka, Bangladesh</span>
        </div>
      </div>
    </footer>
  );
}
