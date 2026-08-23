import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { UserCheck, Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: "CPAC Executive Director",
    designation: "Head of International Patient Operations",
    email: "info@imic.com.bd",
    phone: "+8801710802000"
  },
  {
    name: "Senior Medical Facilitation Manager",
    designation: "Singapore & Malaysia Desk Lead",
    email: "info@imic.com.bd",
    phone: "+8801777995995"
  },
  {
    name: "Patient Relations Officer",
    designation: "Thailand & India Desk Lead",
    email: "info@imic.com.bd",
    phone: "+8801710802000"
  },
  {
    name: "Emergency Evacuation Coordinator",
    designation: "Air Ambulance & Stretcher Specialist",
    email: "info@imic.com.bd",
    phone: "+8801777995995"
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
            <h1 className="text-3xl sm:text-5xl font-extrabold">Our Team Members</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Meet our compassionate medical coordinators, patient case officers, and international healthcare facilitation specialists.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-imic-navy/10 text-imic-navy flex items-center justify-center border-2 border-imic-teal">
                  <UserCheck className="w-10 h-10 text-imic-teal" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-imic-navy">{member.name}</h3>
                  <span className="text-xs font-semibold text-imic-teal block">{member.designation}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 w-full space-y-1 text-xs text-slate-600">
                  <div className="flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3 text-imic-teal" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Mail className="w-3 h-3 text-imic-teal" />
                    <span>{member.email}</span>
                  </div>
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
