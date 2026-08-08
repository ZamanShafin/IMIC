import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function FounderMessagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Leadership Vision</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Founder's Message</h1>
          </div>
        </section>

        <section className="py-16 max-w-4xl mx-auto px-4 space-y-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative">
            <Quote className="w-12 h-12 text-imic-teal/20 absolute top-6 right-6" />

            <h2 className="text-xl sm:text-2xl font-bold text-imic-navy">
              "Empowering Bangladeshi Patients with Seamless Global Healthcare Access"
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to International Medical Information Center (IMIC). Over the past decade, we have observed the immense anxiety and logistical hurdles that Bangladeshi families experience when seeking advanced medical treatment overseas.
              </p>
              <p>
                Whether it is securing an urgent appointment with a top specialist in Singapore, navigating complex visa documentation, or arranging specialized air ambulance transport, IMIC was founded with a singular purpose: to act as your compassionate, reliable, and transparent healthcare partner.
              </p>
              <p>
                Our Patient Assistance Centre (CPAC) in Banani, Dhaka works around the clock to bridge the gap between our local patients and world-renowned hospital networks across Singapore, Malaysia, Thailand, and India.
              </p>
              <p>
                We remain deeply committed to ethical standards, transparent costs, and uncompromised patient care. Thank you for placing your trust in IMIC.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <span className="text-base font-bold text-imic-navy block">Founder & Managing Director</span>
              <span className="text-xs text-imic-teal font-semibold block">International Medical Information Center (IMIC)</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
