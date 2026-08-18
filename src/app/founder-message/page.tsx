import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, Sparkles, Building2, Phone, Mail, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FounderMessagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-imic-teal uppercase tracking-wider border border-white/10">
              <Sparkles className="w-4 h-4 text-imic-teal" />
              <span>Leadership & Vision</span>
            </div>
            
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
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
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

              {/* Quick Contact & Credentials Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-imic-navy uppercase tracking-wider">
                  <Award className="w-4 h-4 text-imic-teal" />
                  <span>Executive Office</span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-imic-teal shrink-0" />
                    <span>CPAC Headquarters, Banani, Dhaka</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-imic-teal shrink-0" />
                    <span className="font-semibold">+8801710802000, +8801777995995</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-imic-teal shrink-0" />
                    <span>info@imic.com.bd</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    href="/book-appointment"
                    className="w-full text-center bg-imic-navy hover:bg-imic-teal text-white text-xs font-bold py-2.5 rounded-xl transition duration-300 shadow-sm"
                  >
                    Consult Our Team
                  </Link>
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
                  At <strong>International Medical Information Centre (IMIC)</strong>, we understand that seeking medical treatment overseas can be overwhelming for patients and their families. Our mission has always been to eliminate those barriers by providing trusted, transparent, and prompt healthcare facilitation.
                </p>
                <p>
                  Whether you require specialist doctor evaluations, itemized treatment cost estimates, fast-track medical visa processing, or bedside coordination in Singapore, Malaysia, Thailand, Indonesia, China, or India, our team is dedicated to standing beside you every step of the journey.
                </p>
                <p>
                  We are deeply grateful for the trust thousands of Bangladeshi patients continue to place in IMIC. We promise to uphold the highest ethical standards and clinical excellence as we expand our international partner network.
                </p>
              </div>

              {/* Signoff */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-imic-navy">
                    Farzana Wali Liza
                  </h4>
                  <p className="text-xs font-bold text-imic-teal">
                    Chairman
                  </p>
                  <p className="text-xs text-slate-500">
                    International Medical Information Centre (IMIC)
                  </p>
                </div>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition shrink-0"
                >
                  <span>Contact CPAC Dhaka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
