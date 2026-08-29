import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { UserCheck, Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: "Director",
    person: "Muntasir Mamun",
    designation: "Director",
    email: "info@imic.com.bd",
    phone: "+8801710802000",
    image: null
  },
  {
    name: "Managing Director",
    person: "Maruf Hassan",
    designation: "Managing Director",
    email: "info@imic.com.bd",
    phone: "+8801777995995",
    image: null
  }
];

export default function TeamMemberPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold">Our Leadership & Team</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Guiding International Medical Information Centre (IMIC) with dedication, empathy, and seamless access to world-class healthcare abroad.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-5"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-imic-navy/10 border-2 border-imic-teal flex items-center justify-center shrink-0 shadow-inner">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <UserCheck className="w-12 h-12 text-imic-teal" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-imic-navy">{member.name}</h3>
                  <p className="text-sm font-bold text-slate-700">{member.person}</p>
                  <span className="text-xs font-semibold text-imic-teal block uppercase tracking-wider">{member.designation}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 w-full space-y-2 text-xs sm:text-sm text-slate-600">
                  <a
                    href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-2 hover:text-imic-teal transition"
                  >
                    <Phone className="w-4 h-4 text-imic-teal shrink-0" />
                    <span className="font-semibold">{member.phone}</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 hover:text-imic-teal transition"
                  >
                    <Mail className="w-4 h-4 text-imic-teal shrink-0" />
                    <span>{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
