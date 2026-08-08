import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';

const countryTiles = [
  {
    name: 'Singapore',
    flag: '🇸🇬',
    hospitalCount: '9 Premier Hospitals',
    highlights: 'Mount Elizabeth, Farrer Park, SGH, NUH, ICON Cancer',
    image: '/images/hospitals/farrer-park-1.jpg',
    href: '/our-hospitals?country=Singapore',
    badge: 'JCI Accredited Centres'
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    hospitalCount: '2 World-Class Hospitals',
    highlights: 'Sunway Medical Centre, Gleneagles Global',
    image: '/images/hospitals/sunway-medical-1.jpg',
    href: '/our-hospitals?country=Malaysia',
    badge: 'Affordable Advanced Care'
  },
  {
    name: 'Thailand',
    flag: '🇹🇭',
    hospitalCount: 'Samitivej Healthcare Network',
    highlights: 'Samitivej Hospitals Bangkok',
    image: '/images/hospitals/samitivej-1.jpg',
    href: '/our-hospitals?country=Thailand',
    badge: 'Leading Pediatric & Wellness'
  },
  {
    name: 'India',
    flag: '🇮🇳',
    hospitalCount: '4 Quaternary Hospitals',
    highlights: 'Fortis Gurugram, HCG Bangalore, Reliance Mumbai, Rajagiri Kochi',
    image: '/images/hospitals/fortis-1.jpg',
    href: '/our-hospitals?country=India',
    badge: 'Cost-Effective High Tech'
  },
];

export default function CountryGrid() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-imic-navy/5 text-imic-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-imic-teal" />
            <span>International Hospital Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-imic-navy">
            Our Associated Hospitals In
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a destination country to explore partner hospitals, medical specialties, and available doctors for your medical travel from Bangladesh.
          </p>
        </div>

        {/* 4 Country Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countryTiles.map((tile) => (
            <Link
              key={tile.name}
              href={tile.href}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={tile.image}
                  alt={`Hospitals in ${tile.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imic-navy/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-imic-navy shadow-sm">
                  {tile.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tile.flag}</span>
                    <h3 className="text-xl font-bold leading-tight">{tile.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-imic-teal uppercase tracking-wider block">
                    {tile.hospitalCount}
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {tile.highlights}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-imic-navy group-hover:text-imic-teal transition">
                  <span>View Hospitals & Doctors</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
