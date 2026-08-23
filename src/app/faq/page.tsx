'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How does IMIC assist Bangladeshi patients in getting a doctor appointment abroad?",
    a: "IMIC acts as an official patient assistance center for partner hospitals in Singapore, Malaysia, Thailand, and India. You simply submit your medical reports to our Banani Dhaka office or via our online booking wizard. We match your case with leading specialists and secure prompt appointments."
  },
  {
    q: "Does IMIC charge any extra service markups on hospital bills?",
    a: "No. All medical treatments, consultations, and surgical bills are paid directly to the partner hospital at their standard published rates. IMIC facilitation service is 100% free of extra markups for patients."
  },
  {
    q: "How long does emergency medical visa processing take?",
    a: "With direct visa invitation letters issued by our partner accredited hospitals, medical emergency visas can be expedited within 24 to 48 hours for urgent surgeries."
  },
  {
    q: "How does commercial flight stretcher arrangement save up to 60% cost?",
    a: "Full chartered air ambulances can be expensive. For non-critical patients who require lying flat during flight, we modify commercial airline seats into a certified stretcher setup with onboard medical monitors and doctors, saving up to 60% compared to private air charters."
  },
  {
    q: "Can IMIC arrange tarmac ambulance and airport buggy escort?",
    a: "Yes. For high-dependency patients, we coordinate tarmac ambulance access right at Changi (Singapore), KLIA (Malaysia), Suvarnabhumi (Thailand), or Delhi (India), transferring the patient smoothly from aircraft door to hospital bed."
  },
  {
    q: "What medical reports do I need to submit for a cost quotation?",
    a: "Please provide your recent doctor diagnosis summary, MRI/CT scan reports, blood tests, and current prescription. You can upload these via our 'Request a Quote' form or email info@imic.com.bd."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold">Frequently Asked Questions</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Find detailed answers regarding overseas doctor appointments, hospital admissions, visas, and medical travel logistics.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-imic-teal focus:outline-none"
                  >
                    <span className="flex items-center gap-3 text-base sm:text-lg">
                      <HelpCircle className="w-5 h-5 text-imic-teal shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transform transition-transform ${
                        isOpen ? 'rotate-180 text-imic-teal' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
