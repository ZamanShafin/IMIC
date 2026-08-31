import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Lock, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-imic-navy text-slate-300 text-sm border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Get In Touch / CPAC Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-[120px] shrink-0">
              <Image
                src="/images/logo/logo.png"
                alt="IMIC Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            Our Patient Assistance Centre (CPAC) in Banani, Dhaka provides a seamless and one-stop 24-hour service connecting Bangladeshi patients to accredited hospitals and leading doctors across Singapore, Malaysia, Thailand, Indonesia, China & India.
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
              <Link href="/our-hospitals?country=Indonesia" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in Indonesia</span>
              </Link>
            </li>
            <li>
              <Link href="/our-hospitals?country=China" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Hospitals in China</span>
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
              <Link href="/team-member" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Our Team Members</span>
              </Link>
            </li>
            <li>
              <Link href="/book-appointment" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Book Appointment</span>
              </Link>
            </li>
            <li>
              <Link href="/travel-kit" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Travel Kit & Visa Checklist</span>
              </Link>
            </li>
            <li>
              <Link href="/event-gallery" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Event Gallery & Seminars</span>
              </Link>
            </li>
            <li>
              <Link href="/photo-gallery" className="hover:text-imic-teal transition flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-imic-teal" />
                <span>Photo & Video Archives</span>
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

        {/* Column 4: Social Channels & Admin */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-base border-b border-slate-700 pb-2">Connect With Us</h3>
          <p className="text-xs text-slate-400">
            Follow IMIC Bangladesh on our official social channels for international medical news, hospital updates, and patient recovery stories.
          </p>

          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href="https://web.facebook.com/InternationalMedicalInformationCentre"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#1877F2]/40 transition group"
            >
              <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white" />
              <span>Facebook Page</span>
            </a>

            <a
              href="https://www.youtube.com/@IMICLimited"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-[#FF0000]/20 hover:bg-[#FF0000] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#FF0000]/40 transition group"
            >
              <Youtube className="w-4 h-4 text-[#FF0000] group-hover:text-white" />
              <span>YouTube Channel</span>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-[#E1306C]/20 hover:bg-[#E1306C] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#E1306C]/40 transition group"
            >
              <Instagram className="w-4 h-4 text-[#E1306C] group-hover:text-white" />
              <span>Instagram Profile</span>
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
