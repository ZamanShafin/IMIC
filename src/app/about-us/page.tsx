'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { ShieldCheck, Award } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Banner Header */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">About IMIC</h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base">
              Your trusted partner for accessing world-class healthcare beyond borders across Singapore, Malaysia, China, Thailand, Indonesia, and India.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3 py-1 rounded-full text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>About IMIC</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-imic-navy leading-tight">
              Bringing World-Class Healthcare Closer to You
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>International Medical Information Centre (IMIC)</strong> is your trusted partner for accessing world-class healthcare beyond borders. We connect patients with leading hospitals, experienced specialists, and advanced treatment options across <em>Singapore, Malaysia, China, Thailand, Indonesia, and India</em>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From choosing the right doctor and hospital to coordinating appointments and supporting your medical journey, IMIC is committed to making healthcare access <em>simpler, smoother, and more reassuring</em>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              With our promise of <strong className="text-imic-teal bg-imic-teal/10 px-2 py-0.5 rounded font-bold">“Premium Healthcare – Personal Touch,”</strong> we combine trusted guidance, professional expertise, and personalized care—because when it comes to your health, every decision matters.
            </p>

            <p className="text-imic-navy font-bold text-sm sm:text-base italic">
              IMIC — Bringing World-Class Healthcare Closer to You.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-imic-teal block">
                  <AnimatedCounter target={44} suffix="+" duration={1500} />
                </span>
                <span className="text-xs text-slate-600 font-medium">Partner Hospitals</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-imic-navy block">
                  <AnimatedCounter target={6} duration={1200} />
                </span>
                <span className="text-xs text-slate-600 font-medium">Asian Destination Countries</span>
              </div>
            </div>
          </div>

          {/* Highlights Box */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-imic-teal" />
              <span>Our Core Commitments</span>
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-imic-teal mt-1.5 shrink-0" />
                <span>Zero service markups on official hospital billings and surgical quotes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-imic-teal mt-1.5 shrink-0" />
                <span>Fast-track emergency medical visa invitation letters within 24-48 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-imic-teal mt-1.5 shrink-0" />
                <span>Comprehensive air ambulance evacuation & commercial stretcher transfers.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-imic-teal mt-1.5 shrink-0" />
                <span>Bangla & English medical interpreter support during hospital stay.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/book-appointment"
                className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold py-3 px-6 rounded-xl transition"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact-us"
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
