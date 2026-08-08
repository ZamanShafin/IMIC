import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Direct Admission Arrangement",
    icon: "/images/services/direct-admission.png",
    description: "Fast-track emergency & routine admissions with tarmac ambulance pickup & hospital liaison."
  },
  {
    title: "Doctor's Appointment",
    icon: "/images/services/doctor-appointment.png",
    description: "Priority appointments with renowned medical specialists in Singapore, Malaysia, Thailand & India."
  },
  {
    title: "Visa Application / Extension",
    icon: "/images/services/visa-application.png",
    description: "Official hospital invitation letters & medical emergency visa extensions for patients and attendants."
  },
  {
    title: "Ticketing (Flight Reservation)",
    icon: "/images/services/ticketing.png",
    description: "Flexible airline booking with medical baggage allowance & date re-issuance assistance."
  },
  {
    title: "Air Ambulance & Stretcher",
    icon: "/images/services/air-ambulance.png",
    description: "Chartered air ambulance & commercial flight stretcher cases (save up to 60% transfer costs)."
  },
  {
    title: "Treatment & Travel Plan",
    icon: "/images/services/treatment-plan.png",
    description: "Transparent cost estimations, treatment timeline, and pre-departure medical report reviews."
  },
  {
    title: "Accommodation Arrangement",
    icon: "/images/services/accommodation.png",
    description: "Serviced apartments and budget-friendly hotel stays conveniently located near partner hospitals."
  },
  {
    title: "Airport Meet & Greet / Transfer",
    icon: "/images/services/airport-meet.png",
    description: "Changi / KLIA / Suvarnabhumi / Delhi airport reception, wheelchair/buggy escort & private transfer."
  },
  {
    title: "Multi-Language Interpreter",
    icon: "/images/services/interpreter.png",
    description: "Bangla & English medical translation during doctor consultations & inpatient stays."
  },
  {
    title: "Full Hospitalization Support",
    icon: "/images/services/hospitalization-support.png",
    description: "Dedicated IMIC case managers assisting before, during, and after hospital discharge."
  },
  {
    title: "Billing & Financial Enquiries",
    icon: "/images/services/billing-financial.png",
    description: "Itemized billing clarification, overseas payment guidance, and insurance claim paperwork."
  },
  {
    title: "General Enquiries",
    icon: "/images/services/general-enquiries.png",
    description: "24/7 hotline support at CPAC Banani Dhaka for any medical tourism queries."
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-extrabold text-imic-teal uppercase tracking-widest block">
            End-To-End Medical Facilitation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy">
            Our Facilitation Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From your initial medical record review in Dhaka to your successful treatment and return home, IMIC provides comprehensive assistance every step of the way.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-imic-teal/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 relative rounded-xl bg-white p-2.5 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-imic-navy group-hover:text-imic-teal transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  href="/book-appointment"
                  className="text-xs font-bold text-imic-navy group-hover:text-imic-teal flex items-center gap-1 transition"
                >
                  <span>Inquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] font-semibold text-slate-400">
                  Service #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
