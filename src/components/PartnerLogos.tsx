import React from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

const partnerLogos = [
  { name: 'ULAB Healthcare Partner', logo: '/images/partners/ulab.gif' },
  { name: 'Farrer Park Hospital Singapore', logo: '/images/partners/partner1.png' },
  { name: 'Mount Elizabeth Hospitals', logo: '/images/partners/partner2.png' },
  { name: 'Sunway Medical Centre Malaysia', logo: '/images/partners/partner3.png' },
  { name: 'Samitivej Hospitals Thailand', logo: '/images/partners/partner4.jpg' },
  { name: 'Fortis Healthcare Network', logo: '/images/partners/partner5.png' },
  { name: 'Gleneagles Hospitals', logo: '/images/partners/partner6.png' },
  { name: 'Bangkok Hospital BDMS', logo: '/images/partners/partner7.png' },
  { name: 'Icon Cancer Centre', logo: '/images/partners/partner8.jpg' },
  { name: 'Prince Court Medical Centre', logo: '/images/partners/partner1.png' },
  { name: 'Medistra Hospital Jakarta', logo: '/images/partners/partner2.png' },
  { name: 'BNH Hospital Bangkok', logo: '/images/partners/partner3.png' }
];

export default function PartnerLogos() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-12 bg-white border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
          <Building2 className="w-4 h-4 text-imic-teal" />
          <span>Global Healthcare & Institutional Partners</span>
        </div>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden mask-gradient">
        {/* Subtle Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-12 py-2">
          {marqueeItems.map((partner, index) => (
            <div
              key={index}
              className="relative w-36 h-16 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-imic-teal/50 hover:shadow-md transition-all duration-300 flex items-center justify-center p-3 shrink-0 group cursor-pointer"
              title={partner.name}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain p-2 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
