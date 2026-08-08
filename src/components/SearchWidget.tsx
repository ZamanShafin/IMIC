'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Stethoscope, ChevronRight } from 'lucide-react';

const countries = ['Singapore', 'Malaysia', 'Thailand', 'India'];

const specialties = [
  'Bones (Orthopaedics)',
  'Brain Nerves (Neurology)',
  'Ear, Nose, Throat (ENT)',
  'Eyes (Ophthalmology)',
  'Heart & Vascular (Cardiovascular)',
  'Cancer (Oncology)',
  'General Surgery',
  'Transplant & Cellular Therapy',
  'Hormone Disorder (Endocrinology)',
  'Urinary & Reproductive System (Urology)',
  'Women (Obstetrics & Gynaecology)',
  'Kidneys (Renal Medicine)',
  'Lungs (Respiratory Medicine)',
  'Paediatrics',
  'Stomach & Digestive System (Gastroenterology)',
  'Addiction Treatment',
  'Allergy',
];

export default function SearchWidget() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedSpecialty) params.set('specialty', selectedSpecialty);
    if (query) params.set('query', query);
    router.push(`/our-hospitals?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto -mt-10 relative z-30 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-imic-teal/10 text-imic-teal rounded-xl">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-imic-navy">Find Hospitals & Doctors Abroad</h2>
            <p className="text-xs text-slate-500">Filter partner medical facilities by country or specialty</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Country Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-imic-teal" />
              <span>Destination Country</span>
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imic-teal"
            >
              <option value="">All Countries (Singapore, MY, TH, IN)</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-imic-teal" />
              <span>Medical Speciality</span>
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imic-teal"
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Search Keyword */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-imic-teal" />
              <span>Hospital Name or Treatment</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Farrer Park, CABG, Transplant..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-imic-teal"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-imic-navy hover:bg-imic-navy-dark text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Search Options</span>
              <ChevronRight className="w-4 h-4 text-imic-teal" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
