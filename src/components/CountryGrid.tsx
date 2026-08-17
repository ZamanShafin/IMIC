import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';

const countryTiles = [
  {
    name: 'Singapore',
    flagImg: '/images/flags/singapore.png',
    hospitalCount: '11 Premier Hospitals',
    highlights: 'Gleneagles, NCCS, SNEC, Farrer Park, Mount Elizabeth Novena, Mount Elizabeth Orchard, ICON Cancer',
    image: '/images/hospitals/farrer-park-1.jpg',
    href: '/our-hospitals?country=Singapore',
    badge: 'JCI Accredited Centres'
  },
  {
    name: 'Malaysia',
    flagImg: '/images/flags/malaysia.png',
    hospitalCount: '5 Quaternary Medical Centres',
    highlights: 'Sunway Medical, Prince Court, Beacon, SJMC, Gleneagles KL',
    image: '/images/hospitals/sunway-medical-1.jpg',
    href: '/our-hospitals?country=Malaysia',
    badge: 'ACHS & MHTC Elite Partner'
  },
  {
    name: 'Thailand',
    flagImg: '/images/flags/thailand.png',
    hospitalCount: '5 Top International Hospitals',
    highlights: 'Samitivej Sukhumvit, BNH, Vejthani, Bangkok Hospital, MedPark',
    image: '/images/hospitals/samitivej-1.jpg',
    href: '/our-hospitals?country=Thailand',
    badge: 'Award-Winning Care & Wellness'
  },
  {
    name: 'Indonesia',
    flagImg: '/images/flags/indonesia.png',
    hospitalCount: '2 National Apex Hospitals',
    highlights: 'Medistra Hospital Jakarta, RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    image: '/images/hospitals/medistra-jakarta.jpg',
    href: '/our-hospitals?country=Indonesia',
    badge: 'Apex Quaternary Centres'
  },
  {
    name: 'China',
    flagImg: '/images/flags/china.png',
    hospitalCount: '7 Premier Tertiary Hospitals',
    highlights: 'Modern Cancer Hospital Guangzhou, Foshan Chancheng, Guangzhou Xinshi, Shenzhen Hengsheng, StarKids Shanghai, Zhuhai Chancheng, Xuzhou Star',
    image: '/images/hospitals/modern-cancer-guangzhou.jpg',
    href: '/our-hospitals?country=China',
    badge: 'Minimally Invasive Oncology & Surgery'
  },
  {
    name: 'India',
    flagImg: '/images/flags/india.png',
    hospitalCount: '39+ Super Speciality Hospitals',
    highlights: 'Kokilaben, Jaslok, Apollo, Fortis, Max, Medanta, Manipal, Global, Sankara Nethralaya, AIG & KIMS across Mumbai, Delhi, Kolkata, Chennai, Bangalore & Hyderabad',
    image: '/images/hospitals/fortis-1.jpg',
    href: '/our-hospitals?country=India',
    badge: 'Pan-India Super Specialty Network'
  },
];

export default function CountryGrid() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-navy/5 text-imic-navy px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-imic-teal" />
            <span>International Hospital Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy tracking-tight">
            Our Associated Hospitals In
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a destination country to explore accredited partner hospitals, specialized clinical faculties, and available doctors for your medical travel from Bangladesh.
          </p>
        </div>

        {/* 6 Country Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryTiles.map((tile) => (
            <Link
              key={tile.name}
              href={tile.href}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-imic-teal/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={tile.image}
                  alt={`Hospitals in ${tile.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imic-navy/95 via-imic-navy/40 to-transparent" />
                
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-imic-navy shadow-sm">
                  {tile.badge}
                </div>

                {/* Country Logo Flag Image Badge + Name */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-6 rounded-md overflow-hidden shadow-md border border-white/80 shrink-0 bg-white/10 flex items-center justify-center">
                      <Image
                        src={tile.flagImg}
                        alt={`${tile.name} Flag`}
                        width={36}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-white drop-shadow-md">
                      {tile.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-imic-teal uppercase tracking-wider block">
                    {tile.hospitalCount}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tile.highlights}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-imic-navy group-hover:text-imic-teal transition">
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
