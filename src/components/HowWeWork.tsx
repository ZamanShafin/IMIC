'use client';

import React, { useState } from 'react';
import { FileSearch, UserCheck, Calculator, PlaneTakeoff, Hospital, HeartHandshake, PhoneCall, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Submit Inquiry & Reports",
    icon: FileSearch,
    description: "Submit your latest medical history, scans, and doctor prescriptions online or visit our CPAC office in Banani, Dhaka."
  },
  {
    number: "02",
    title: "Doctor Review & Option",
    icon: UserCheck,
    description: "We forward your medical file to top specialists in Singapore, Malaysia, Thailand, or India for opinion & availability."
  },
  {
    number: "03",
    title: "Treatment Plan & Quote",
    icon: Calculator,
    description: "Receive itemized hospital cost estimates, doctor profiles, expected hospital stay duration, and treatment itineraries."
  },
  {
    number: "04",
    title: "Visa & Travel Booking",
    icon: PlaneTakeoff,
    description: "IMIC issues official hospital invitation letters for expedited medical visa processing, flights, and accommodation."
  },
  {
    number: "05",
    title: "Airport Buggy & Admission",
    icon: Hospital,
    description: "Upon arrival, enjoy tarmac airport greeting, buggy escort, private ambulance transfer, and direct hospital admission."
  },
  {
    number: "06",
    title: "In-Hospital Support",
    icon: HeartHandshake,
    description: "Dedicated Bangla/English medical interpreter support during consultations, surgeries, and daily inpatient rounds."
  },
  {
    number: "07",
    title: "Post-Discharge Follow-Up",
    icon: PhoneCall,
    description: "Assistance with follow-up tele-consultations, prescription refills, and rehabilitation guidance back in Bangladesh."
  }
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold text-imic-teal uppercase tracking-widest block">
            Seamless Patient Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy">
            How We Work — Step-by-Step
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Our structured 7-step process ensures complete transparency, peace of mind, and zero stress for patients and their families.
          </p>
        </div>

        {/* Steps Navigation Bar */}
        <div className="hidden lg:flex items-center justify-between relative mb-12">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 flex flex-col items-center group focus:outline-none`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-imic-teal text-white ring-4 ring-imic-teal/20 scale-110 shadow-lg'
                      : isCompleted
                      ? 'bg-imic-navy text-white'
                      : 'bg-white text-slate-500 border border-slate-300 group-hover:border-imic-teal'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className="text-[11px] font-bold text-slate-600 mt-2 max-w-[100px] text-center line-clamp-1">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Display Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-imic-teal">
                Step {steps[activeStep].number}
              </span>
              <span className="text-slate-300 font-light text-2xl">|</span>
              <h3 className="text-2xl font-bold text-imic-navy">
                {steps[activeStep].title}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="text-xs font-semibold text-slate-500 disabled:opacity-40 hover:text-imic-navy"
              >
                ← Previous Step
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="text-xs font-bold text-imic-teal flex items-center gap-1 hover:text-imic-teal-hover"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
            {React.createElement(steps[activeStep].icon, { className: "w-12 h-12 text-imic-teal" })}
            <span className="text-xs font-bold text-imic-navy uppercase tracking-wider">
              IMIC Guarantee
            </span>
            <p className="text-xs text-slate-500">
              24/7 dedicated case officer assigned to your file in Bangladesh and destination country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
