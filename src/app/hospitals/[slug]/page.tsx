import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck, Calendar, FileText, ChevronLeft, Building2 } from 'lucide-react';
import fallbackHospitals from '@/data/hospitals.json';

// Static generation of all 69 hospital pages for instantaneous 0ms page transitions
export const revalidate = 3600;

export async function generateStaticParams() {
  return fallbackHospitals.map((hospital) => ({
    slug: hospital.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default async function HospitalDetailPage({ params }: PageProps) {
  const hospital = fallbackHospitals.find((h) => h.slug === params.slug) || fallbackHospitals[0];

  let photos: string[] = [];
  try {
    photos = typeof hospital.photos === 'string' ? JSON.parse(hospital.photos || '[]') : (hospital.photos || []);
  } catch (e) {
    photos = [hospital.image];
  }
  if (photos.length === 0) photos = [hospital.image];

  let accreditations: string[] = [];
  try {
    accreditations = typeof hospital.accreditations === 'string' ? JSON.parse(hospital.accreditations || '[]') : (hospital.accreditations || []);
  } catch (e) {
    accreditations = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Top Header */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto space-y-4 relative z-10">
            <Link
              href="/our-hospitals"
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-imic-teal transition font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Hospitals Directory</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-imic-teal/20 text-imic-teal text-xs font-bold px-3 py-1 rounded-full uppercase border border-imic-teal/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hospital.city}, {hospital.country}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{hospital.name}</h1>
                {hospital.address && (
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-imic-teal" />
                    <span>{hospital.address}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/book-appointment?hospital=${encodeURIComponent(hospital.name)}`}
                  className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Here</span>
                </Link>
                <Link
                  href={`/request-qu?hospital=${encodeURIComponent(hospital.name)}`}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl transition"
                >
                  <FileText className="w-4 h-4 text-imic-teal" />
                  <span>Request Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content & Gallery */}
        <section className="py-12 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Details (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Photo Gallery */}
            <div className="space-y-3">
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <Image
                  src={hospital.image || '/images/hospitals/farrer-park-1.jpg'}
                  alt={hospital.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <Image
                        src={p}
                        alt={`${hospital.name} gallery ${idx + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Specialization */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-imic-navy">Hospital Overview & Clinical Excellence</h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {hospital.description}
              </p>

              {/* Accreditations */}
              {accreditations.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-imic-navy uppercase tracking-wider block">
                    Quality Accreditations & Certifications:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {accreditations.map((acc, aIdx) => (
                      <span
                        key={aIdx}
                        className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 border border-emerald-200"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>{acc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar CTA & Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5 sticky top-24">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-imic-teal uppercase tracking-widest block">
                  CPAC Patient Support
                </span>
                <h3 className="text-lg font-bold text-imic-navy">Planning Treatment at {hospital.name}?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  IMIC provides free doctor appointment scheduling, official visa invitation letters, and itemized hospital cost quotations.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <Link
                  href={`/book-appointment?hospital=${encodeURIComponent(hospital.name)}`}
                  className="w-full flex items-center justify-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Doctor Appointment</span>
                </Link>

                <Link
                  href={`/request-qu?hospital=${encodeURIComponent(hospital.name)}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-imic-navy font-bold text-xs py-3.5 rounded-xl transition"
                >
                  <FileText className="w-4 h-4 text-imic-teal" />
                  <span>Request Hospital Bill Estimate</span>
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-imic-navy block">📞 Immediate Dhaka Hotline:</span>
                <p>+8801710802000, +8801777995995</p>
                <span className="text-[11px] text-slate-400 block pt-1">
                  IMIC Patient Assistance Centre, Banani, Dhaka
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
