import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function FounderMessagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Founder & Chairman's Message
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Guiding International Medical Information Centre (IMIC) with dedication, empathy, and seamless access to world-class healthcare abroad.
            </p>
          </div>
        </section>

        {/* Founder Profile & Message Content */}
        <section className="py-16 max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Founder Photo & Profile Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group mx-auto max-w-sm lg:max-w-none">
                {/* Glow & Border Accent */}
                <div className="absolute -inset-1.5 bg-gradient-to-br from-imic-teal to-imic-navy rounded-3xl opacity-30 group-hover:opacity-60 transition duration-500 blur-sm" />
                
                <div className="relative rounded-3xl overflow-hidden bg-slate-100 border-2 border-white shadow-lg aspect-[4/5] w-full">
                  <Image
                    src="/images/team/farzana-wali-liza.jpg"
                    alt="Farzana Wali Liza - Chairman IMIC"
                    fill
                    priority
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-imic-navy/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-imic-teal text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm inline-block mb-1.5">
                      Chairman & Founder
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-white drop-shadow">
                      Farzana Wali Liza
                    </h3>
                    <p className="text-xs text-slate-200 font-medium">
                      International Medical Information Centre (IMIC)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Founder Message */}
            <div className="lg:col-span-7 space-y-6 relative">
              <Quote className="w-16 h-16 text-imic-teal/15 absolute -top-4 right-0 pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-imic-teal block">
                  Official Statement
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-imic-navy tracking-tight leading-snug">
                  "Empowering Patients with Compassionate Guidance and World-Class Global Healthcare"
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
                <p className="font-semibold text-imic-navy text-base">
                  Assalamualaikum Warahmatullah!
                </p>
                <p>
                  Firstly, thank you for visiting our company website.
                </p>
                <p>
                  Our employees and healthcare partners are the future of our company. We dedicate ourselves to providing an environment that welcomes creativity, innovation, and unwavering commitment to compassionate patient care.
                </p>
                <p>
                  At <strong>International Medical Information Centre (IMIC)</strong>, we believe that when it comes to healthcare, every patient deserves the right guidance, trusted support, and access to quality medical care.
                </p>
                <p>
                  With our commitment to <strong className="text-imic-teal bg-imic-teal/10 px-2 py-0.5 rounded font-bold">“Premium Healthcare – Personal Touch,”</strong> we strive to make every healthcare journey simpler, smoother, and more reassuring. From connecting patients with renowned hospitals and experienced specialists to supporting them throughout their medical journey, IMIC stands beside patients and their families when they need us most.
                </p>
                <p>
                  Our mission is built on <em>trust, compassion, and professionalism</em>. We are committed to providing personalized healthcare assistance and helping patients make informed decisions with confidence.
                </p>
                <p>
                  Together with our valued healthcare partners and dedicated team, we look forward to continuing our journey of bringing trusted international healthcare closer to the people of Bangladesh.
                </p>
                <p className="font-semibold italic text-imic-navy pt-2">
                  "Your health deserves the best care and IMIC is here to help you find it."
                </p>
                <div className="pt-4 border-t border-slate-200 text-slate-800 space-y-0.5">
                  <p className="font-bold text-imic-navy text-sm sm:text-base">Chairman</p>
                  <p className="text-xs text-slate-500 font-medium">International Medical Information Centre (IMIC)</p>
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
