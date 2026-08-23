'use client';

import React, { useState } from 'react';
import { 
  FileSearch, 
  UserCheck, 
  Calculator, 
  PlaneTakeoff, 
  Hospital, 
  HeartHandshake, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const steps = [
  {
    stepNumber: "Step 01",
    title: "Inquiry & Medical Records Submission",
    shortTitle: "1. Inquiry Submission",
    icon: FileSearch,
    color: "from-blue-500 to-cyan-500",
    description: "Submit your latest medical history, diagnostic reports, and doctor prescriptions online or visit our CPAC office in Banani, Dhaka."
  },
  {
    stepNumber: "Step 02",
    title: "Specialist Review & Doctor Selection",
    shortTitle: "2. Doctor Evaluation",
    icon: UserCheck,
    color: "from-emerald-500 to-teal-500",
    description: "We forward your medical records to top specialist doctors in Singapore, Malaysia, Thailand, Indonesia, China, or India for review."
  },
  {
    stepNumber: "Step 03",
    title: "Treatment Plan & Itemized Quotation",
    shortTitle: "3. Cost & Treatment Plan",
    icon: Calculator,
    color: "from-amber-500 to-orange-500",
    description: "Receive itemized hospital bill estimates, doctor credentials, expected length of stay, and complete treatment schedule."
  },
  {
    stepNumber: "Step 04",
    title: "Visa, Flight & Accommodation Logistics",
    shortTitle: "4. Visa & Travel Booking",
    icon: PlaneTakeoff,
    color: "from-indigo-500 to-purple-500",
    description: "IMIC issues official hospital invitation letters for expedited medical visas, discounted flights, and comfortable hotel apartments."
  },
  {
    stepNumber: "Step 05",
    title: "Airport Buggy & Direct Hospital Admission",
    shortTitle: "5. Airport & Admission",
    icon: Hospital,
    color: "from-rose-500 to-pink-500",
    description: "Upon landing, enjoy tarmac airport greeting, wheelchair/buggy escort, private ambulance transfer, and priority hospital admission."
  },
  {
    stepNumber: "Step 06",
    title: "In-Hospital Support & Translation Care",
    shortTitle: "6. In-Hospital Support",
    icon: HeartHandshake,
    color: "from-teal-500 to-emerald-600",
    description: "Dedicated Bangla/English medical interpreter support during doctor consultations, diagnostic tests, surgeries, and daily inpatient care."
  },
  {
    stepNumber: "Step 07",
    title: "Post-Discharge Care & Tele-Follow-up",
    shortTitle: "7. Post-Treatment Care",
    icon: PhoneCall,
    color: "from-sky-500 to-blue-600",
    description: "Post-discharge coordination, medication refills, medical report delivery, and seamless follow-up tele-consultations in Dhaka."
  }
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-imic-teal" />
            <span>End-to-End Patient Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy">
            How We Work — Step-by-Step
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Our structured 7-step process ensures complete transparency, peace of mind, and compassionate support for patients and their families.
          </p>
        </div>

        {/* Step Selector Horizontal Bar - Uniform Equal Dimensions Across All 7 Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10 items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-28 w-full p-3.5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between border ${
                  isActive
                    ? 'bg-imic-navy text-white border-imic-teal shadow-lg ring-2 ring-imic-teal/50'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-imic-teal/40 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isActive ? 'bg-imic-teal text-white shadow-md' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-imic-teal' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Step Name - Equal Height text container for 100% uniform button height */}
                <div className="h-8 flex items-center">
                  <span className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {step.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Step Detailed Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest bg-imic-teal/20 text-imic-navy px-3 py-1 rounded-lg">
                {steps[activeStep].stepNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-imic-navy">
                {steps[activeStep].title}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs font-bold">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="text-slate-500 hover:text-imic-navy transition"
                >
                  ← Previous Step
                </button>
              )}
              {activeStep < steps.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="text-imic-teal hover:text-imic-teal-hover transition flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-imic-teal/10 text-imic-teal flex items-center justify-center border border-imic-teal/20 shadow-sm">
              {React.createElement(steps[activeStep].icon, { className: "w-10 h-10" })}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-imic-navy">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>IMIC CARE GUARANTEE</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Assigned dedicated medical case officer from Dhaka CPAC to overseas hospital bedside.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
