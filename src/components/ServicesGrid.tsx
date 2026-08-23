import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const services = [
  {
    title: "Medical Visa Assistance",
    badge: "Fast-Track Approval",
    icon: "/images/services/visa-application.png",
    description: "Expedited medical e-Visas, hospital invitation letters, and visa extension support for patients and attendants for Singapore, Malaysia, Thailand, India, Indonesia & China."
  },
  {
    title: "Tourist & Family Travel Visa",
    badge: "Leisure & Attendants",
    icon: "/images/services/visa-application.png",
    description: "Complete tourist visa processing, hotel confirmation vouchers, customized holiday itineraries, and flight bookings for accompanying family members and vacation travelers."
  },
  {
    title: "Direct Admission Arrangement",
    badge: "24/7 Priority",
    icon: "/images/services/direct-admission.png",
    description: "Fast-track emergency and planned inpatient admissions with tarmac ambulance liaison and immediate bed allocation at leading overseas hospitals."
  },
  {
    title: "Doctor's Appointment Booking",
    badge: "Renowned Specialists",
    icon: "/images/services/doctor-appointment.png",
    description: "Direct priority consultations with leading Senior Consultants, Surgeons, and Professors across Singapore, Malaysia, Thailand, Indonesia, China & India."
  },
  {
    title: "Air Ambulance & Stretcher Cases",
    badge: "Save up to 60% Cost",
    icon: "/images/services/air-ambulance.png",
    description: "ICU air ambulance charters and cost-effective commercial airline stretcher arrangements with qualified flight medical doctors and oxygen systems."
  },
  {
    title: "Medical Flight Ticketing Desk",
    badge: "Flexible Dates & Baggage",
    icon: "/images/services/ticketing.png",
    description: "Dedicated medical airfare desks offering medical baggage allowances, flexible date changes, wheelchair assistance, and wheelchair/buggy bookings."
  },
  {
    title: "Treatment & Travel Cost Estimates",
    badge: "100% Transparent",
    icon: "/images/services/treatment-plan.png",
    description: "Detailed hospital package estimates, doctor fee schedules, pre-departure diagnostic reviews, and transparent financial planning."
  },
  {
    title: "Hotel & Serviced Apartments",
    badge: "Near Hospitals",
    icon: "/images/services/accommodation.png",
    description: "Fully furnished service apartments with kitchenettes and budget-friendly hotel stays within walking distance of partner hospitals."
  },
  {
    title: "Airport Meet & Greet / Buggy Transfer",
    badge: "VIP Welcome",
    icon: "/images/services/airport-meet.png",
    description: "Airport tarmac reception, wheelchair/buggy escort through customs, luggage assistance, and private chauffeur or ambulance transfer to hospital."
  },
  {
    title: "Multi-Language Medical Interpreter",
    badge: "Bangla & English",
    icon: "/images/services/interpreter.png",
    description: "Dedicated Bangla and English medical interpreters during doctor consultations, daily surgical rounds, and diagnostic procedures."
  },
  {
    title: "Billing, Currency & Insurance Liaison",
    badge: "Claims Support",
    icon: "/images/services/billing-financial.png",
    description: "Itemized billing clarification, overseas medical payment guidance, cashless insurance coordination, and medical claim documentation."
  },
  {
    title: "Post-Discharge Follow-up & Tele-Medicine",
    badge: "Continuous Care",
    icon: "/images/services/general-enquiries.png",
    description: "Post-surgery follow-up tele-consultations with your overseas surgeon from our CPAC Banani office, along with prescription refills."
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-imic-teal" />
            <span>End-to-End Medical & Travel Facilitation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy">
            Our Core Facilitation Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From medical & tourist visa facilitation in Dhaka to your successful overseas treatment, hotel accommodations, and recovery, IMIC provides 360-degree support.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-50 hover:bg-white p-7 rounded-3xl border border-slate-200/80 hover:border-imic-teal/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 relative rounded-2xl bg-white p-2.5 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <span className="text-[10px] font-extrabold bg-imic-navy/5 text-imic-navy px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    {service.badge}
                  </span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
