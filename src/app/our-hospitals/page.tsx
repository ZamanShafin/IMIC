import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  MapPin, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Stethoscope, 
  Search, 
  Sparkles, 
  ArrowUpDown,
  X,
  Compass
} from 'lucide-react';
import fallbackHospitals from '@/data/hospitals.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: { 
    country?: string; 
    city?: string;
    region?: string;
    specialty?: string; 
    query?: string;
    sort?: string;
  };
}

const indianRegions = [
  { label: 'All Cities', value: '' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Kolkata', value: 'Kolkata' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi NCR', value: 'Delhi' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Kochi', value: 'Kochi' },
];

function matchCityRegion(hospitalCity: string, targetRegion: string): boolean {
  if (!targetRegion) return true;
  const c = (hospitalCity || '').toLowerCase();
  const r = targetRegion.toLowerCase();

  if (r === 'chennai') return c.includes('chennai');
  if (r === 'kolkata') return c.includes('kolkata') || c.includes('calcutta');
  if (r === 'bangalore') return c.includes('bangalore') || c.includes('bengaluru');
  if (r === 'mumbai') return c.includes('mumbai') || c.includes('thane');
  if (r === 'delhi') return c.includes('delhi') || c.includes('gurugram') || c.includes('gurgaon') || c.includes('ncr');
  if (r === 'hyderabad') return c.includes('hyderabad') || c.includes('secunderabad');
  if (r === 'kochi') return c.includes('kochi') || c.includes('cochin') || c.includes('kerala');

  return c.includes(r);
}

export default async function OurHospitalsPage({ searchParams }: PageProps) {
  const selectedCountry = searchParams.country || '';
  const selectedCity = searchParams.city || searchParams.region || '';
  const searchQuery = searchParams.query || '';
  const sortBy = searchParams.sort || 'featured';

  let rawHospitals: any[] = [];

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

    rawHospitals = await db.hospital.findMany({
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
  if (!rawHospitals || rawHospitals.length === 0) {
    rawHospitals = fallbackHospitals.filter((h) => {
      if (selectedCountry && h.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || (h.description && h.description.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }

  // Filter by selected Indian region/city if applicable
  let hospitals = rawHospitals.filter((h) => {
    if (selectedCity) {
      return matchCityRegion(h.city, selectedCity);
    }
    return true;
  });

  // Apply Sorting
  if (sortBy === 'name') {
    hospitals.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'city') {
    hospitals.sort((a, b) => (a.city || '').localeCompare(b.city || '') || a.name.localeCompare(b.name));
  } else {
    // Default featured
    hospitals.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
  }

  const countriesList = ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'China', 'India'];

  // Count per Indian region for badges
  const allIndiaHospitals = fallbackHospitals.filter(h => h.country === 'India');
  const regionCounts: Record<string, number> = {
    '': allIndiaHospitals.length,
    'Chennai': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Chennai')).length,
    'Kolkata': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Kolkata')).length,
    'Bangalore': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Bangalore')).length,
    'Mumbai': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Mumbai')).length,
    'Delhi': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Delhi')).length,
    'Hyderabad': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Hyderabad')).length,
    'Kochi': allIndiaHospitals.filter(h => matchCityRegion(h.city, 'Kochi')).length,
  };

  const isIndiaActive = selectedCountry.toLowerCase() === 'india' || !!selectedCity;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-imic-teal uppercase tracking-wider border border-white/10">
              <Sparkles className="w-4 h-4 text-imic-teal" />
              <span>International Partner Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Our Associated Hospitals
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore premier JCI & internationally accredited medical institutions across Singapore, Malaysia, Thailand, Indonesia, China, and India.
            </p>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <section className="bg-white border-b border-slate-200 py-4 px-4 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Top Row: Country Selector & Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Country Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                  Country:
                </span>
                <Link
                  href="/our-hospitals"
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
                    !selectedCountry && !selectedCity 
                      ? 'bg-imic-teal text-white shadow-md' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Countries
                </Link>
                {countriesList.map((c) => {
                  const isActive = selectedCountry.toLowerCase() === c.toLowerCase() && !selectedCity;
                  return (
                    <Link
                      key={c}
                      href={`/our-hospitals?country=${encodeURIComponent(c)}`}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-imic-teal text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{c}</span>
                      {c === 'India' && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {allIndiaHospitals.length}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Counter and Sort Dropdown */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <ArrowUpDown className="w-3.5 h-3.5 text-imic-teal" />
                  <span className="hidden sm:inline">Sort:</span>
                  <Link
                    href={`/our-hospitals?${new URLSearchParams({
                      ...(selectedCountry && { country: selectedCountry }),
                      ...(selectedCity && { city: selectedCity }),
                      ...(searchQuery && { query: searchQuery }),
                      sort: sortBy === 'city' ? 'featured' : 'city'
                    }).toString()}`}
                    className={`hover:text-imic-teal transition ${sortBy === 'city' ? 'text-imic-teal font-extrabold' : ''}`}
                  >
                    City / Region
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link
                    href={`/our-hospitals?${new URLSearchParams({
                      ...(selectedCountry && { country: selectedCountry }),
                      ...(selectedCity && { city: selectedCity }),
                      ...(searchQuery && { query: searchQuery }),
                      sort: sortBy === 'name' ? 'featured' : 'name'
                    }).toString()}`}
                    className={`hover:text-imic-teal transition ${sortBy === 'name' ? 'text-imic-teal font-extrabold' : ''}`}
                  >
                    A - Z
                  </Link>
                </div>

                <div className="text-xs font-bold text-imic-navy bg-imic-teal/10 border border-imic-teal/30 px-3 py-1.5 rounded-xl whitespace-nowrap">
                  Showing <span className="text-imic-teal font-extrabold">{hospitals.length}</span> Hospitals
                </div>
              </div>
            </div>

            {/* Sub-Filter: India Region / City Selector */}
            {isIndiaActive && (
              <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-imic-navy mr-2 shrink-0">
                  <Compass className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>Indian Region / City:</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {indianRegions.map((region) => {
                    const isSelected = selectedCity.toLowerCase() === region.value.toLowerCase();
                    const count = regionCounts[region.value] || 0;

                    return (
                      <Link
                        key={region.label}
                        href={`/our-hospitals?country=India${region.value ? `&city=${encodeURIComponent(region.value)}` : ''}${searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''}${sortBy !== 'featured' ? `&sort=${sortBy}` : ''}`}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-md scale-102 ring-2 ring-rose-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70'
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rose-500'}`} />
                        <span>{region.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </Link>
                    );
                  })}

                  {selectedCity && (
                    <Link
                      href={`/our-hospitals?country=India${searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''}`}
                      className="text-xs font-bold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 px-2.5 py-1.5 rounded-xl transition flex items-center gap-1 ml-1"
                      title="Clear city filter"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Clear City Filter</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Hospitals Grid */}
        <section className="py-14 max-w-7xl mx-auto px-4">
          {/* Active Filter Indicator */}
          {(selectedCity || selectedCountry || searchQuery) && (
            <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <span>Filtering by:</span>
                {selectedCountry && (
                  <span className="bg-imic-teal/10 text-imic-teal font-bold px-2.5 py-1 rounded-lg border border-imic-teal/30">
                    Country: {selectedCountry}
                  </span>
                )}
                {selectedCity && (
                  <span className="bg-rose-50 text-rose-600 font-bold px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    City: {selectedCity}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                    Search: "{searchQuery}"
                  </span>
                )}
              </div>

              <Link
                href="/our-hospitals"
                className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </Link>
            </div>
          )}

          {hospitals.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto p-8">
              <Building2 className="w-14 h-14 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-imic-navy">No hospitals match your filter criteria</h3>
              <p className="text-slate-500 text-xs">
                Try selecting "All Cities" or resetting your search to explore all available international partner hospitals.
              </p>
              <Link 
                href="/our-hospitals?country=India" 
                className="inline-block bg-imic-teal text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
              >
                View All India Hospitals
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
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-imic-teal/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Image Header with Location Badge */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={h.image || '/images/hospitals/farrer-park-1.jpg'}
                          alt={h.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                          <span className="bg-imic-navy/90 text-white text-[11px] font-bold px-3 py-1 rounded-xl backdrop-blur-md shadow-sm border border-white/10">
                            {h.country}
                          </span>
                        </div>

                        {/* City / State Pin Badge */}
                        <div className="absolute bottom-3 left-3.5 right-3.5">
                          <span className="inline-flex items-center gap-1 text-white text-xs font-bold drop-shadow-md bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                            <MapPin className="w-3.5 h-3.5 text-imic-teal shrink-0" />
                            <span className="truncate">{h.city}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 pt-2 space-y-3">
                        <h3 className="text-xl font-bold text-imic-navy group-hover:text-imic-teal transition line-clamp-1 leading-snug">
                          {h.name}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {h.description}
                        </p>

                        {/* Accreditations Badges */}
                        {accs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {accs.map((acc, aIdx) => (
                              <span 
                                key={aIdx} 
                                className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200/80"
                              >
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                <span>{acc}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <Link
                        href={`/book-appointment?hospital=${encodeURIComponent(h.name)}`}
                        className="text-xs font-bold text-imic-teal hover:text-imic-teal-hover flex items-center gap-1.5 transition"
                      >
                        <Stethoscope className="w-4 h-4" />
                        <span>Book Doctor</span>
                      </Link>

                      <Link
                        href={`/hospitals/${h.slug}`}
                        className="text-xs font-bold text-imic-navy group-hover:text-imic-teal flex items-center gap-1 transition"
                      >
                        <span>Hospital Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
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
