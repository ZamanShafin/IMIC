import React from 'react';
import Link from 'next/link';
import { 
  Globe2, 
  Building2, 
  FileCheck2, 
  Plane, 
  Hospital, 
  Ticket, 
  Home, 
  ShieldCheck, 
  ArrowRight, 
  HeartHandshake,
  Stethoscope,
  Sparkles
} from 'lucide-react';

const highlights = [
  {
    title: 'Multi-Country Network',
    subtitle: 'Singapore, Malaysia, Thailand, Indonesia, China & India',
    icon: Globe2,
    iconColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-700/50',
    desc: 'Access leading international healthcare systems across Asia through one dedicated office in Banani, Dhaka.',
  },
  {
    title: 'Foreign Hospitals Under One Roof',
    subtitle: '25+ Accredited Partner Hospitals',
    icon: Building2,
    iconColor: 'text-teal-400 bg-teal-950/60 border-teal-700/50',
    desc: 'Compare hospital facilities, doctor credentials, and cost estimates without needing to travel or hire multiple agents.',
  },
  {
    title: 'Emergency Medical Visa Support',
    subtitle: 'Expedited Approval in 24-48 Hours',
    icon: FileCheck2,
    iconColor: 'text-amber-400 bg-amber-950/60 border-amber-700/50',
    desc: 'Official medical invitation letters issued directly by foreign hospitals to guarantee swift visa approvals.',
  },
  {
    title: '24/7 Prompt Air Ambulance',
    subtitle: 'ICU Evacuation within 24 Hours',
    icon: Plane,
    iconColor: 'text-rose-400 bg-rose-950/60 border-rose-700/50',
    desc: 'Fully equipped airborne ICU charters with dedicated aeromedical doctors, ventilator support, and bed-to-bed transfers.',
  },
  {
    title: 'Direct Hospital Bed Admission',
    subtitle: 'Airport Buggy & Ambulance Liaison',
    icon: Hospital,
    iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50',
    desc: 'Tarmac ambulance pick-up directly from aircraft to hospital room, bypassing emergency room queues.',
  },
  {
    title: 'Medical Ticketing & Baggage Desk',
    subtitle: 'Best Fares & Flight Flexibility',
    icon: Ticket,
    iconColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-700/50',
    desc: 'Dedicated airline desk offering medical fare discounts, excess medical luggage allowances, and flexible re-routing.',
  },
  {
    title: 'Serviced Apartments & Hotels',
    subtitle: 'Convenient Stays Near Hospitals',
    icon: Home,
    iconColor: 'text-violet-400 bg-violet-950/60 border-violet-700/50',
    desc: 'Fully furnished apartments with kitchens and family amenities located within walking distance of treatment centres.',
  },
  {
    title: 'Commercial Flight Stretcher',
    subtitle: 'Save 60% Cost on Patient Transfers',
    icon: ShieldCheck,
    iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50',
    desc: 'A budget-friendly alternative to chartered air ambulance with specialized stretcher apparatus and flight medical escort.',
  },
];

export default function SpecialityHighlights() {
  return (
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-imic-teal/40">
            <Sparkles className="w-4 h-4 text-imic-teal" />
            <span>Why Choose IMIC Facilitation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Facilitation Capabilities
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Key advantages that make IMIC the most trusted medical tourism partner for thousands of Bangladeshi families seeking world-class medical treatment abroad.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-slate-800/90 hover:bg-slate-800 p-7 rounded-3xl border border-slate-700/80 hover:border-imic-teal transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-imic-teal transition">
                      {item.title}
                    </h3>
                    <span className="text-xs font-bold text-imic-teal block">
                      {item.subtitle}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/60">
                  <Link
                    href="/book-appointment"
                    className="text-xs font-bold text-slate-300 group-hover:text-imic-teal flex items-center gap-1 transition"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
