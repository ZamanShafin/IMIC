import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const highlights = [
  {
    title: 'Countries Network',
    subtitle: 'Singapore, Malaysia, Thailand & India',
    icon: '/images/speciality-highlights/countries.png',
    desc: 'Access leading healthcare systems across Asia with one point of contact in Dhaka.',
  },
  {
    title: 'Foreign Hospital Under One Roof',
    subtitle: '15+ International Partner Hospitals',
    icon: '/images/speciality-highlights/foreign-hospitals.png',
    desc: 'Compare hospital options, doctor profiles, and costs without leaving Bangladesh.',
  },
  {
    title: 'Emergency Visa Assistance',
    subtitle: 'Expedited Medical Visas',
    icon: '/images/speciality-highlights/visa-assistance.png',
    desc: 'Official medical invitation letters to secure visas for urgent surgeries within 24-48 hrs.',
  },
  {
    title: 'Prompt Air Ambulance',
    subtitle: 'Air Evacuation within 24 Hours',
    icon: '/images/speciality-highlights/air-ambulance.png',
    desc: '24/7 ICU air ambulance charter equipped with advanced life support systems.',
  },
  {
    title: 'Direct Admission',
    subtitle: 'Ambulance & Airport Buggy Support',
    icon: '/images/speciality-highlights/direct-admission.png',
    desc: 'Tarmac ambulance pickup directly from flight to hospital bed.',
  },
  {
    title: 'Medical Ticketing',
    subtitle: 'Best Fare & Date Flexibility',
    icon: '/images/speciality-highlights/ticketing.png',
    desc: 'Dedicated travel desk providing medical concessions, extra baggage, and date changes.',
  },
  {
    title: 'Service Apartment & Hotel',
    subtitle: 'Family & Patient Stays',
    icon: '/images/speciality-highlights/accommodation.png',
    desc: 'Fully furnished apartments near medical hubs for long-term treatments & recovery.',
  },
  {
    title: 'Commercial Flight Stretcher',
    subtitle: 'Save 60% Cost on Transfers',
    icon: '/images/speciality-highlights/flight-stretcher.png',
    desc: 'A cost-effective alternative to full air ambulance charter with full medical team onboard.',
  },
];

export default function SpecialityHighlights() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Why Choose IMIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Specialized Facilitation Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Key advantages that make IMIC the preferred medical tourism partner for thousands of Bangladeshi families.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/80 hover:bg-slate-800 p-6 rounded-2xl border border-slate-700/80 hover:border-imic-teal transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 relative rounded-xl bg-slate-700/50 p-2.5 border border-slate-600">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-imic-teal block">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed pt-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60">
                <Link
                  href="/book-appointment"
                  className="text-xs font-medium text-slate-300 hover:text-imic-teal flex items-center gap-1 transition"
                >
                  <span>Learn details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
