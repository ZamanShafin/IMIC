import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { MapPin, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const revalidate = 60;

interface PageProps {
  searchParams: { country?: string; specialty?: string; query?: string };
}

const fallbackHospitals = [
  {
    id: 'farrer-park',
    name: 'Farrer Park Hospital',
    slug: 'farrer-park-hospital',
    country: 'Singapore',
    city: 'Singapore',
    description: 'Premier tertiary hospital integrated with a 5-star hotel and medical centre in Singapore.',
    image: '/images/hospitals/farrer-park-1.jpg',
    accreditations: '["JCI Accredited"]'
  },
  {
    id: 'icon-cancer',
    name: 'ICON Cancer Centre',
    slug: 'icon-cancer-centre',
    country: 'Singapore',
    city: 'Singapore',
    description: "Singapore's leading private oncology provider offering comprehensive cancer care.",
    image: '/images/hospitals/icon-cancer-1.jpg',
    accreditations: '["JCI Accredited"]'
  },
  {
    id: 'sunway-medical',
    name: 'Sunway Medical Centre',
    slug: 'sunway-medical-centre',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    description: "One of Asia's largest private tertiary healthcare institutions in Malaysia.",
    image: '/images/hospitals/sunway-medical-1.jpg',
    accreditations: '["ACHS Accredited", "JCI Accredited"]'
  },
  {
    id: 'samitivej',
    name: 'Samitivej Hospitals',
    slug: 'samitivej-hospitals',
    country: 'Thailand',
    city: 'Bangkok',
    description: 'Award-winning private medical group in Bangkok recognized for pediatric and specialized care.',
    image: '/images/hospitals/samitivej-1.jpg',
    accreditations: '["JCI Accredited"]'
  },
  {
    id: 'fortis-gurugram',
    name: 'Fortis Memorial Research Institute',
    slug: 'fortis-memorial-research-institute',
    country: 'India',
    city: 'Gurugram',
    description: 'Multi-super speciality quaternary care hospital with international clinical faculty in Delhi NCR.',
    image: '/images/hospitals/fortis-1.jpg',
    accreditations: '["JCI Accredited", "NABH Accredited"]'
  }
];

export default async function OurHospitalsPage({ searchParams }: PageProps) {
  const selectedCountry = searchParams.country || '';
  const selectedSpecialty = searchParams.specialty || '';
  const searchQuery = searchParams.query || '';

  let hospitals: any[] = [];

  try {
    const whereClause: any = {};
    if (selectedCountry) {
      whereClause.country = selectedCountry;
    }
    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
        { city: { contains: searchQuery } }
      ];
    }

    hospitals = await db.hospital.findMany({
      where: whereClause,
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Hospitals DB connection note:', error);
    hospitals = fallbackHospitals.filter((h) => {
      if (selectedCountry && h.country !== selectedCountry) return false;
      if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }

  if (hospitals.length === 0 && !selectedCountry && !searchQuery) {
    hospitals = fallbackHospitals;
  }

  const countriesList = ['Singapore', 'Malaysia', 'Thailand', 'India'];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">
              International Partner Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Our Associated Hospitals</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore premier JCI & accredited medical institutions across Singapore, Malaysia, Thailand, and India.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-slate-100 border-b border-slate-200 py-6 px-4 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Country:</span>
              <Link
                href="/our-hospitals"
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  !selectedCountry ? 'bg-imic-teal text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Countries
              </Link>
              {countriesList.map((c) => (
                <Link
                  key={c}
                  href={`/our-hospitals?country=${encodeURIComponent(c)}`}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                    selectedCountry === c ? 'bg-imic-teal text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>

            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="text-imic-navy font-bold">{hospitals.length}</span> Partner Hospitals
            </div>
          </div>
        </section>

        {/* Hospitals Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          {hospitals.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-600 font-medium">No hospitals match your filter criteria.</p>
              <Link href="/our-hospitals" className="inline-block bg-imic-teal text-white font-bold text-xs px-5 py-2.5 rounded-xl">
                Reset Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hospitals.map((h) => {
                let accs: string[] = [];
                try {
                  accs = JSON.parse(h.accreditations || '[]');
                } catch (e) {
                  accs = [];
                }

                return (
                  <div
                    key={h.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={h.image}
                          alt={h.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-imic-navy/90 text-white text-[11px] font-bold px-3 py-1 rounded-lg backdrop-blur-md">
                          {h.country}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-imic-teal" />
                          <span>{h.city}, {h.country}</span>
                        </div>

                        <h3 className="text-xl font-bold text-imic-navy group-hover:text-imic-teal transition line-clamp-1">
                          {h.name}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {h.description}
                        </p>

                        {accs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {accs.map((acc, aIdx) => (
                              <span key={aIdx} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                                <ShieldCheck className="w-3 h-3" />
                                <span>{acc}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                      <Link
                        href={`/hospitals/${h.slug}`}
                        className="text-xs font-bold text-imic-navy hover:text-imic-teal flex items-center gap-1 transition"
                      >
                        <span>View Details & Doctors</span>
                        <ArrowRight className="w-3.5 h-3.5 text-imic-teal" />
                      </Link>

                      <Link
                        href={`/book-appointment?hospital=${encodeURIComponent(h.name)}`}
                        className="bg-imic-teal hover:bg-imic-teal-hover text-white text-[11px] font-bold px-3.5 py-2 rounded-xl transition"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
