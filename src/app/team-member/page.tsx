import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { Mail, Phone, ShieldCheck, User } from 'lucide-react';

interface TeamMember {
  role: string;
  name: string;
  email?: string;
  phone: string;
  image?: string;
  objectPosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    role: "Managing Director",
    name: "Maruf Hassan",
    email: "maruf@imic.com.bd",
    phone: "+8801777995995",
    image: "/images/team/maruf-hassan.png",
    objectPosition: "object-top"
  },
  {
    role: "Director",
    name: "Muntasir Mamun",
    email: "muntasir@imic.com.bd",
    phone: "+8801711100306",
    image: "/images/team/muntasir-mamun.jpg",
    objectPosition: "object-top"
  },
  {
    role: "Executive",
    name: "MD Mahfuzur Rahman",
    phone: "+8801329669757"
  },
  {
    role: "Executive",
    name: "Tawhid Hassan",
    phone: "+8801329669750"
  }
];

export default function TeamMemberPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal border border-imic-teal/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Executive Leadership & Team</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Our Leadership & Team</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Guiding International Medical Information Centre (IMIC) with dedication, empathy, and seamless access to world-class healthcare abroad.
            </p>
          </div>
        </section>

        {/* Team Cards Grid */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center space-y-5 group"
              >
                {/* Profile Image / Blank Placeholder */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100 shadow-md flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      priority={i < 2}
                      className={`object-cover ${member.objectPosition || 'object-top'} group-hover:scale-105 transition-transform duration-500`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-400 group-hover:text-imic-teal transition-colors duration-300">
                      <div className="w-20 h-20 rounded-full bg-white/80 border border-slate-200/80 flex items-center justify-center shadow-inner mb-2">
                        <User className="w-10 h-10 text-slate-400 group-hover:text-imic-teal transition-colors duration-300" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        IMIC Team
                      </span>
                    </div>
                  )}
                </div>

                {/* Profile Information */}
                <div className="space-y-1 w-full">
                  <h3 className="text-2xl font-black text-imic-navy tracking-tight">
                    {member.name}
                  </h3>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-imic-teal uppercase tracking-wider block">
                      {member.role}
                    </span>
                    <p className="text-xs font-semibold text-slate-500">
                      International Medical Information Centre
                    </p>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="pt-4 border-t border-slate-100 w-full space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-imic-teal p-3 rounded-xl border border-slate-200/80 hover:border-imic-teal/50 transition font-semibold"
                    >
                      <Phone className="w-4 h-4 text-imic-teal shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-imic-teal p-3 rounded-xl border border-slate-200/80 hover:border-imic-teal/50 transition font-semibold"
                    >
                      <Mail className="w-4 h-4 text-imic-teal shrink-0" />
                      <span>{member.email}</span>
                    </a>
                  )}
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
