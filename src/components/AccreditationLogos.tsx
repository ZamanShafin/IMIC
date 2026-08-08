import React from 'react';
import Image from 'next/image';

const accreditations = [
  { name: 'JCI Accredited', logo: '/images/accreditations/accred1.jpg' },
  { name: 'ISO Certified', logo: '/images/accreditations/accred2.jpg' },
  { name: 'MSQH', logo: '/images/accreditations/accred3.png' },
  { name: 'ACHS', logo: '/images/accreditations/accred4.png' },
  { name: 'NABH', logo: '/images/accreditations/accred5.png' },
  { name: 'Healthcare Excellence', logo: '/images/accreditations/accred6.png' },
  { name: 'Global Quality', logo: '/images/accreditations/accred7.png' },
];

export default function AccreditationLogos() {
  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-imic-navy uppercase tracking-wider block">
              International Accreditation Standards
            </span>
            <p className="text-xs text-slate-500">
              All partner medical centres are certified by global healthcare quality boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {accreditations.map((acc, index) => (
              <div
                key={index}
                className="relative w-16 h-10 bg-white p-1 rounded-md border border-slate-200 shadow-sm flex items-center justify-center"
              >
                <Image
                  src={acc.logo}
                  alt={acc.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
