import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { MapPin, ShieldCheck, Calendar, FileText, UserCheck, ChevronLeft, Building2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

const fallbackDetailMap: Record<string, any> = {
  'farrer-park-hospital': {
    name: 'Farrer Park Hospital',
    slug: 'farrer-park-hospital',
    country: 'Singapore',
    city: 'Singapore',
    description: 'A premier tertiary hospital integrated with a 5-star hotel and medical centre, offering state-of-the-art diagnostic and surgical technology in Singapore.',
    image: '/images/hospitals/farrer-park-1.jpg',
    photos: '["/images/hospitals/farrer-park-1.jpg", "/images/hospitals/farrer-park-2.jpg"]',
    accreditations: '["JCI Accredited", "Singapore Service Excellence"]',
    doctors: [
      { id: 'd1', name: 'Dr. K. S. Tan', title: 'Senior Consultant Cardiologist', availability: 'Mon, Wed, Fri' }
    ]
  },
  'sunway-medical-centre': {
    name: 'Sunway Medical Centre',
    slug: 'sunway-medical-centre',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    description: "One of Asia's largest private tertiary healthcare institutions, renowned for cancer therapy, robotics, and paediatric care.",
    image: '/images/hospitals/sunway-medical-1.jpg',
    photos: '["/images/hospitals/sunway-medical-1.jpg"]',
    accreditations: '["ACHS Accredited", "JCI Accredited"]',
    doctors: []
  }
};

export default async function HospitalDetailPage({ params }: PageProps) {
  let hospital: any = null;

  try {
    hospital = await db.hospital.findUnique({
      where: { slug: params.slug },
      include: { doctors: true }
    });
  } catch (error) {
    console.error('Hospital detail DB connection note:', error);
    hospital = fallbackDetailMap[params.slug] || fallbackDetailMap['farrer-park-hospital'];
  }

  if (!hospital) {
    hospital = fallbackDetailMap[params.slug] || fallbackDetailMap['farrer-park-hospital'];
  }

  let photos: string[] = [];
  try {
    photos = JSON.parse(hospital.photos || '[]');
  } catch (e) {
    photos = [hospital.image];
  }
  if (photos.length === 0) photos = [hospital.image];

  let accreditations: string[] = [];
  try {
    accreditations = JSON.parse(hospital.accreditations || '[]');
  } catch (e) {
    accreditations = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Top Header */}
        <section className="bg-imic-navy text-white py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-4">
            <Link
              href="/our-hospitals"
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-imic-teal transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Hospitals Directory</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-imic-teal/20 text-imic-teal text-xs font-bold px-3 py-1 rounded-full uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hospital.city}, {hospital.country}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{hospital.name}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/book-appointment?hospital=${encodeURIComponent(hospital.name)}`}
                  className="flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Here</span>
                </Link>
                <Link
                  href={`/request-qu?hospital=${encodeURIComponent(hospital.name)}`}
                  className="flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white text-sm font-bold px-5 py-3 rounded-xl transition"
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
              <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src={photos[0]}
                  alt={hospital.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((p, i) => (
                    <div key={i} className="relative h-24 rounded-xl overflow-hidden border border-slate-200">
                      <Image src={p} alt={`${hospital.name} photo ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                <Building2 className="w-5 h-5 text-imic-teal" />
                <span>About {hospital.name}</span>
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {hospital.description}
              </p>

              {accreditations.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-imic-navy block uppercase tracking-wider">
                    Accreditations & Certifications:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {accreditations.map((acc, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>{acc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Published Doctors */}
            {hospital.doctors && hospital.doctors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-imic-navy">Available Doctors & Specialists</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.doctors.map((d: any) => (
                    <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                      <div className="w-14 h-14 rounded-full bg-imic-navy/10 text-imic-navy flex items-center justify-center font-bold text-lg border border-imic-teal shrink-0">
                        <UserCheck className="w-6 h-6 text-imic-teal" />
                      </div>
                      <div>
                        <h4 className="font-bold text-imic-navy text-sm">{d.name}</h4>
                        <span className="text-xs font-semibold text-imic-teal block">{d.title}</span>
                        <span className="text-[11px] text-slate-500 block">Availability: {d.availability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA & Contact */}
          <div className="space-y-6">
            <div className="bg-imic-navy text-white p-6 rounded-3xl space-y-6 shadow-xl sticky top-24">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Need Assistance at this Hospital?</h3>
                <p className="text-xs text-slate-300">
                  Our CPAC Dhaka team coordinates directly with {hospital.name} international patient department.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/book-appointment?hospital=${encodeURIComponent(hospital.name)}`}
                  className="w-full flex justify-center items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm py-3.5 rounded-xl transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </Link>

                <Link
                  href={`/request-qu?hospital=${encodeURIComponent(hospital.name)}`}
                  className="w-full flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 rounded-xl border border-white/20 transition"
                >
                  <FileText className="w-4 h-4 text-imic-teal" />
                  <span>Request Treatment Estimate</span>
                </Link>
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>24/7 Hotline:</span>
                  <span className="font-bold text-white">+8801710802000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>WhatsApp:</span>
                  <span className="font-bold text-imic-teal">+8801777995995</span>
                </div>
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
