import React from 'react';
import Image from 'next/image';

const partners = [
  { name: 'ULAB Partner', logo: '/images/partners/ulab.gif' },
  { name: 'Partner 1', logo: '/images/partners/partner1.png' },
  { name: 'Partner 2', logo: '/images/partners/partner2.png' },
  { name: 'Partner 3', logo: '/images/partners/partner3.png' },
  { name: 'Partner 4', logo: '/images/partners/partner4.jpg' },
  { name: 'Partner 5', logo: '/images/partners/partner5.png' },
  { name: 'Partner 6', logo: '/images/partners/partner6.png' },
  { name: 'Partner 7', logo: '/images/partners/partner7.png' },
  { name: 'Partner 8', logo: '/images/partners/partner8.jpg' },
];

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Healthcare & Institutional Partners
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative w-28 h-14 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
