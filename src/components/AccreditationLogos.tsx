import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

const accreditationList = [
  { name: 'JCI Joint Commission International', logo: '/images/accreditations/accred1.jpg' },
  { name: 'ISO 9001 Certified Quality', logo: '/images/accreditations/accred2.jpg' },
  { name: 'MSQH Malaysian Society for Quality in Health', logo: '/images/accreditations/accred3.png' },
  { name: 'ACHS Australian Council on Healthcare Standards', logo: '/images/accreditations/accred4.png' },
  { name: 'NABH National Accreditation Board for Hospitals', logo: '/images/accreditations/accred5.png' },
  { name: 'HA Hospital Accreditation Thailand', logo: '/images/accreditations/accred6.png' },
  { name: 'TEMOS International Healthcare Accreditation', logo: '/images/accreditations/accred7.png' }
];

export default function AccreditationLogos() {
  // Multiply items for continuous dense loop
  const marqueeItems = [
    ...accreditationList,
    ...accreditationList,
    ...accreditationList,
    ...accreditationList,
    ...accreditationList,
    ...accreditationList
  ];

  return (
    <section className="py-10 bg-slate-900 text-white border-t border-slate-800">
      {/* Contained within maximum content container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-white block">
                International Quality & Accreditation Standards
              </span>
              <p className="text-[11px] text-slate-400">
                All affiliated medical institutions are certified by world-recognized healthcare regulatory bodies.
              </p>
            </div>
          </div>

          <div className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1 rounded-full shrink-0">
            100% Verified Quality
          </div>
        </div>

        {/* Infinite Marquee Track - Constrained within max-w-7xl container */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-800/80 p-2">
          {/* Subtle Edge Fades within container boundary */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-slate-900/90 via-slate-900/60 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-6 py-2 will-change-transform">
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="relative w-36 h-14 bg-slate-800/90 hover:bg-slate-700 p-2.5 rounded-2xl border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 group transition-all duration-300 cursor-pointer"
                title={item.name}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="144px"
                  className="object-contain p-1.5 brightness-95 contrast-105 group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
