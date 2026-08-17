import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { MapPin, Building2, ShieldCheck, ArrowRight, Stethoscope } from 'lucide-react';
import fallbackHospitals from '@/data/hospitals.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: { country?: string; specialty?: string; query?: string };
}

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
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { city: { contains: searchQuery, mode: 'insensitive' } }
      ];
    }

    hospitals = await db.hospital.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { name: 'asc' }
      ]
    });
  } catch (error) {
    console.error('Hospitals DB connection note:', error);
  }

  // Fallback to rich dataset if DB is empty or connecting
  if (!hospitals || hospitals.length === 0) {
    hospitals = fallbackHospitals.filter((h) => {
      if (selectedCountry && h.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
      if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }

  const countriesList = ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'China', 'India'];

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
              Explore premier JCI & internationally accredited medical institutions across Singapore, Malaysia, Thailand, Indonesia, China, and India.
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
                    selectedCountry.toLowerCase() === c.toLowerCase() ? 'bg-imic-teal text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
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
                  accs = typeof h.accreditations === 'string' ? JSON.parse(h.accreditations || '[]') : (h.accreditations || []);
                } catch (e) {
                  accs = [];
                }

                return (
                  <div
                    key={h.id || h.slug}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={h.image || '/images/hospitals/farrer-park-1.jpg'}
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

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <Link
                        href={`/book-appointment?hospital=${encodeURIComponent(h.name)}`}
                        className="text-xs font-bold text-imic-teal hover:text-imic-teal-hover flex items-center gap-1"
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>Book Doctor</span>
                      </Link>

                      <Link
                        href={`/hospitals/${h.slug}`}
                        className="text-xs font-bold text-imic-navy hover:text-imic-teal flex items-center gap-1 transition"
                      >
                        <span>Hospital Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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
