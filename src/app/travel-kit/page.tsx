'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Clock,
  Calendar,
  MessageCircle,
  Briefcase,
  User,
  GraduationCap,
  Building2,
  Phone,
  Mail
} from 'lucide-react';

interface CountryVisaData {
  id: string;
  name: string;
  flagImg: string;
  title: string;
  badge?: string;
  validity: string;
  processingTime: string;
  hospitalPartner: string;
  overview: string;
  basicDocuments: string[];
  professionRequirements: {
    profession: string;
    items: string[];
  }[];
  onlineApplicationFields?: string[];
  additionalNotes?: string[];
}

const officialVisaData: CountryVisaData[] = [
  {
    id: 'singapore',
    name: 'Singapore',
    flagImg: '/images/flags/singapore.png',
    title: 'Singapore Medical Visa Information',
    badge: 'Medical Travel',
    validity: 'Initial 30 Days (Extendable based on doctor’s recommendation)',
    processingTime: '1 – 3 Working Days (Fast-track emergency assistance available)',
    hospitalPartner: 'Farrer Park Hospital, Gleneagles, Mount Elizabeth Novena & Orchard, NCCS, SNEC, ICON Cancer',
    overview: 'Official Farrer Park Hospital & IMIC visa requirements for Bangladeshi patients and accompanying medical attendants traveling to Singapore for treatment.',
    basicDocuments: [
      'Passport with at least 07 Months validity along with all Old Passport/s.',
      'Two (2) Copies Recent 35mm x 45mm Size Photograph with white background on Matt Paper.',
      'Original Bank Statement For Last Six Months & Bank Solvency Certificate with bank seal.',
      'NID Card (Adult), Birth Certificate (Child).',
      'Medical Reports, recent diagnostic scans (CD/DVD), biopsy/pathology summaries, and doctor prescriptions.',
      'Hotel & Air Ticket Booking Confirmation.',
      'Singapore Electronic Arrival Card (SGAC) with Health Declaration (within 3 days prior to arrival).'
    ],
    professionRequirements: [
      {
        profession: 'For Business Person',
        items: [
          'Updated Trade License (English translated & notarized if applicable).',
          'Company Letterhead Pad.',
          'Business Visiting Card.'
        ]
      },
      {
        profession: 'For Service Holder / Job',
        items: [
          'No Objection Certificate (NOC) / Leave Letter from Employer.',
          'Office ID Card copy.',
          'Official Business Visiting Card.'
        ]
      },
      {
        profession: 'For Student',
        items: [
          'Valid Student ID Card copy.',
          'Leave Letter or NOC from Educational Institute.'
        ]
      }
    ],
    additionalNotes: [
      'Patients and family attendants submit identical basic financial and identity proofs.',
      'Official MOH-accredited hospital invitation is arranged directly through IMIC Banani Dhaka office.',
      'Follow-up / Old Patients: Submit previous Singapore medical reports & doctor appointment letter.'
    ]
  },
  {
    id: 'india',
    name: 'India',
    flagImg: '/images/flags/india.png',
    title: 'Indian Medical Visa Information (MED & MEDX for Attendants)',
    badge: 'High Frequency',
    validity: '6 Months to 1 Year (Triple / Multiple Entry)',
    processingTime: '2 – 5 Working Days (Emergency fast-track available)',
    hospitalPartner: 'Fortis Healthcare, Apollo Hospitals, Max Healthcare, Medanta, Tata Memorial, Sankara Nethralaya, Kokilaben, AIG Hospitals, KIMS',
    overview: 'Official IMIC visa documentation requirements for Indian Medical Visa (MED) for patients and Medical Attendant Visa (MEDX) for companions submitted via IVAC Bangladesh.',
    basicDocuments: [
      'Current Medical reports (Biopsy, MRI/CT, Discharge summary, Doctor prescription).',
      'Bank statements 6 months with adequate balance (minimum BDT 20,000+ or International Credit Card endorsement).',
      'The passport validity minimum 7 months.',
      'All old passports should be submitted with application form.',
      'One 2X2 inch color photograph with white background, having full face & ears (matte paper).',
      'A copy of National ID Card (NID).',
      'Recent Utility Bill copy (electricity, water, or gas bill) of applicant’s current residence.',
      'Official Medical Visa Invitation Letter from Indian hospital with doctor’s registration number.'
    ],
    professionRequirements: [
      {
        profession: 'Job Holder / Service',
        items: ['No Objection Certificate (NOC)', 'Visiting Card', 'Office ID Card copy']
      },
      {
        profession: 'Business Person',
        items: ['Trade License copy (Renewed)', 'Visiting Card']
      },
      {
        profession: 'Student',
        items: ['Student ID card copy', 'Birth Certificate copy']
      }
    ],
    onlineApplicationFields: [
      '1. Email Address & Active Mobile Phone Number',
      '2. Educational Qualification',
      '3. Countries Visited in the last 10 Years (If any)',
      '4. Port of Arrival / Port of Exit in India (Air or Land Ports)',
      '5. Address Where You Stayed In India previously (If visited earlier)',
      '6. Address where you will stay upon arrival (Hospital / Hotel address in India)',
      '7. Previous Indian Visa page/s (If any)',
      '8. Present Occupation & Past Occupation with Designation',
      '9. Guardian Information (Spouse or Parents full name & nationality)',
      '10. Employer Name, Office Address, and Phone Number'
    ],
    additionalNotes: [
      'Maximum 2 attendants are permitted under MEDX medical attendant category per patient.',
      'Registration with FRRO is required if continuous stay in India exceeds 180 days.'
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    flagImg: '/images/flags/malaysia.png',
    title: 'Malaysia Medical Visa Requirements (MHTC / eVisa Medical)',
    badge: 'Sunway Medical Centre Partner',
    validity: '30 – 90 Days (Single/Multiple Entry)',
    processingTime: '2 – 4 Working Days',
    hospitalPartner: 'Sunway Medical Centre, Prince Court Medical Centre, Beacon Hospital, SJMC, Gleneagles KL',
    overview: 'Official requirements verified with Sunway Medical Centre & Malaysia Healthcare Travel Council (MHTC) for Bangladeshi medical travelers.',
    basicDocuments: [
      '1. A valid passport with minimum six months validity.',
      '2. One color-sized photo (3.5 x 5.0cm) taken against a white background.',
      '3. Original Bank Statement Last Six Months & Solvency Certificate.',
      '4. Medical Report & clinical investigation summaries.',
      '5. NID (Adult), Birth Certificate (Child).',
      '6. Forwarding Letter & Visiting Card.',
      '7. Malaysia Digital Arrival Card (MDAC) submitted online 3 days prior to flight.'
    ],
    professionRequirements: [
      {
        profession: 'For Business Person',
        items: [
          'Trade License in English with Notarized translation.',
          'Memorandum of Article & Form XII (If limited company).',
          'Visiting Card & Letterhead Pad.'
        ]
      },
      {
        profession: 'For Service / Job Holder',
        items: [
          'No Objection Certificate (NOC) from employer.',
          'Office ID Card copy.',
          'Visiting Card.'
        ]
      },
      {
        profession: 'For Student',
        items: [
          'Student ID Card copy (Only For Student).',
          'Leave letter from school/college/university.'
        ]
      }
    ],
    additionalNotes: [
      'MHTC Concierge & Lounge at KLIA (Terminal 1 & 2) provides complimentary meet-and-greet and immigration escort for IMIC patients.',
      'Hospital ambulance transport from KLIA directly to hospital can be scheduled in advance.'
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    flagImg: '/images/flags/thailand.png',
    title: 'Thailand Medical Visa Information (Patients & Attendants)',
    badge: 'Samitivej Hospital Partner',
    validity: '60 – 90 Days (Extendable in Bangkok)',
    processingTime: '3 – 5 Working Days',
    hospitalPartner: 'Samitivej Sukhumvit Hospital, Vejthani Hospital, BNH Hospital, Bangkok Hospital (BDMS), MedPark',
    overview: 'Official requirements issued in partnership with Samitivej Hospital Bangkok for patients and family attendants applying through Royal Thai Embassy Dhaka / VFS Global.',
    basicDocuments: [
      '1. A valid passport with minimum six months validity.',
      '2. Thai visa page & renewal page (if any previous visits).',
      '3. Two (2) color passport-sized photos (3.5 x 4.5cm) taken against a white background on matt paper.',
      '4. Original Bank Statement Last Six Months & Solvency Certificate (minimum BDT 150,000+ balance).',
      '5. Medical Reports, scan reports, and prescription from Bangladesh.',
      '6. Forwarding Letter & Visiting Card.',
      '7. Utility Bill (recent electricity/water/gas copy).',
      '8. Official Hospital Invitation & Appointment Letter from Samitivej / Thai partner hospital.'
    ],
    professionRequirements: [
      {
        profession: 'For Business Person',
        items: [
          'Trade License in English with Notarized copy.',
          'Business Letterhead Pad & Business Card.',
          'Memorandum of Article (If limited company).'
        ]
      },
      {
        profession: 'For Service Holder',
        items: [
          'No Objection Certificate (NOC) from office.',
          'Office ID Card copy.',
          'Business Visiting Card.'
        ]
      },
      {
        profession: 'For Student',
        items: [
          'Student ID Card (Only For Student).',
          'Leave approval from educational institution.'
        ]
      }
    ],
    additionalNotes: [
      'Medical visa extension for long-term treatments can be renewed at Thai Immigration Bureau in Bangkok with hospital certification.',
      'Bangla & English interpreter services provided at hospital admission.'
    ]
  },
  {
    id: 'china',
    name: 'China',
    flagImg: '/images/flags/china.png',
    title: 'China Tourist & Medical Visa Information',
    badge: 'Explore Holidays & IMIC',
    validity: '30 – 90 Days / Two-Year Multiple-Entry Visa Available',
    processingTime: '4 – 7 Working Days (Express priority available: Extra 5,500/- BDT)',
    hospitalPartner: 'Modern Cancer Hospital Guangzhou, Foshan Fosun Chancheng Hospital, Guangzhou Xinshi, Shenzhen Hengsheng',
    overview: 'Mandatory documentation guidelines for Bangladeshi patients and travelers applying for Chinese Visas at Chinese Visa Application Service Centre Dhaka.',
    basicDocuments: [
      'Valid passport (minimum 6 month valid) & all Old passport/s.',
      'Two (2) Copies Recent photos ("33mm x 48mm" size) with White Background (bare-headed, no glasses/jewelry).',
      'Previous visa & Other country E-visa Copies with Entry-Exit seal (If Have).',
      'Last 6 months Bank Statement & Bank Solvency Certificate with Bank Seal (Balance Minimum: 300,000/- BDT).',
      'TIN Certificate copy.',
      'Confirmed Air-Ticket booking.',
      'Completed China Visa Information Page (Work history, education & family details).',
      'Special Note: Two-Year Multiple-Entry Visa available (No fingerprint required for applicants under 14 or over 70 years of age).'
    ],
    professionRequirements: [
      {
        profession: 'For Business Person',
        items: [
          'Company Updated Trade License.',
          'Memorandum of Article for limited company & Form XII.',
          'Company Letterhead Pad.',
          'Visiting Card.'
        ]
      },
      {
        profession: 'For Job Holder',
        items: [
          'Office ID Card copy.',
          'Leave letter or No Objection Certificate (NOC).',
          'Visiting Card.',
          'BMDC Certificate (for Doctors).',
          'BAR Council Certificate (for Advocates).',
          'Retirement Certificate (for Retired Persons).'
        ]
      },
      {
        profession: 'For Student',
        items: [
          'Student valid ID Card copy.',
          'Leave letter or NOC from Educational Institute.'
        ]
      }
    ],
    onlineApplicationFields: [
      'Applicant Name & Passport Number',
      'Work Experience in the Last/Past 5 Years (From/To dates, Company Name, Address, Supervisor Name & Phone Number)',
      'Family Information (Spouse DOB, Children Names & DOBs, Father DOB, Mother DOB)',
      'Education History (School & Group, College & Group, Graduation Institute & Major, Post-graduation Institute & Major)',
      'Tentative Stay in China (Tentative Departure & Arrival Dates)'
    ],
    additionalNotes: [
      'Urgent delivery fee: Extra BDT 5,500/- if urgent processing is required.',
      'Consular officer reserves the right to request additional documentation as deemed necessary.',
      'China Business Visa also requires Trade License, TIN, and Official Invitation Letter & TE verification letter.'
    ]
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    flagImg: '/images/flags/indonesia.png',
    title: 'Indonesia Medical Treatment e-Visa Information (B211A / C13)',
    badge: 'Quaternary Care Jakarta',
    validity: '60 Days (Extendable online)',
    processingTime: '3 – 5 Working Days',
    hospitalPartner: 'Medistra Hospital Jakarta, RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    overview: 'Document guidelines for patients and attendants traveling for quaternary medical procedures in Jakarta.',
    basicDocuments: [
      'Valid Bangladeshi Passport with at least 6 months validity.',
      'Two color passport-size photos (4cm x 6cm, white background).',
      'Original 6-month Bank Statement & Bank Solvency Certificate.',
      'Official Hospital Letter of Guarantee & Doctor Appointment Confirmation from Jakarta hospital.',
      'Complete Bangladeshi medical files & English translated diagnostic reports.',
      'Confirmed return flight booking and electronic customs declaration (e-CD).'
    ],
    professionRequirements: [
      {
        profession: 'Business Person',
        items: ['Trade License copy', 'Visiting Card', 'Bank Solvency']
      },
      {
        profession: 'Service Holder',
        items: ['NOC from employer', 'Office ID Card', 'Visiting Card']
      },
      {
        profession: 'Student',
        items: ['Student ID Card', 'Birth Certificate']
      }
    ]
  }
];

export default function TravelKitPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('singapore');

  const activeCountry = officialVisaData.find((c) => c.id === selectedCountry) || officialVisaData[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-14 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-5xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal border border-imic-teal/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Patient Travel Kit & Visa Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Medical & Travel Visa Information
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-xs sm:text-base leading-relaxed">
              Official visa requirements, document criteria by profession, hospital invitation letter protocols, and essential pre-departure guidelines for Singapore, India, Malaysia, Thailand, China & Indonesia.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Hospital Invitation Letter</span>
              </Link>
              <a
                href="https://wa.me/8801710802000?text=Hello%20IMIC%2C%20I%20need%20visa%20information%20support"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Visa Helpdesk</span>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Country Selection */}
        <section className="py-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-imic-navy">
              Select Destination Country
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Click a destination below to view official visa categories, required documents, and processing guidelines.
            </p>
          </div>

          {/* 6 Country Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {officialVisaData.map((country) => {
              const isSelected = country.id === selectedCountry;
              return (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.id)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2.5 text-center ${
                    isSelected
                      ? 'bg-imic-navy text-white border-imic-navy shadow-lg ring-2 ring-imic-teal'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-imic-teal/50 hover:shadow-md'
                  }`}
                >
                  <div className="relative w-8 h-5 rounded overflow-hidden shadow-sm border border-slate-200 shrink-0">
                    <Image
                      src={country.flagImg}
                      alt={`${country.name} Flag`}
                      width={32}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-imic-navy'}`}>
                    {country.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Official Information Container Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Header / Brand Banner */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-10 h-6 rounded-md overflow-hidden shadow border border-white/40 shrink-0">
                    <Image
                      src={activeCountry.flagImg}
                      alt={`${activeCountry.name} Flag`}
                      width={40}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeCountry.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {activeCountry.overview}
                </p>

                <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-imic-teal shrink-0" />
                    <span><strong className="text-white">Processing Time:</strong> {activeCountry.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-imic-teal shrink-0" />
                    <span><strong className="text-white">Validity:</strong> {activeCountry.validity}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <a
                  href={`https://wa.me/8801710802000?text=Hello%20IMIC%2C%20I%20need%20visa%20information%20for%20${encodeURIComponent(activeCountry.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Visa Helpdesk</span>
                </a>
                <Link
                  href="/book-appointment"
                  className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get Hospital Invitation</span>
                </Link>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Section 1: Mandatory Basic Documents */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-sm sm:text-base font-black text-imic-navy uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-imic-teal" />
                    <span>Mandatory Basic Documents</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeCountry.basicDocuments.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-imic-teal/10 text-imic-teal flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {dIdx + 1}
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Profession Specific Proofs */}
              {activeCountry.professionRequirements && activeCountry.professionRequirements.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm sm:text-base font-black text-imic-navy uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-imic-teal" />
                    <span>Required Proof of Profession</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeCountry.professionRequirements.map((prof, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                          <div className="w-7 h-7 rounded-lg bg-imic-teal/10 text-imic-teal flex items-center justify-center shrink-0">
                            {prof.profession.includes('Business') ? (
                              <Briefcase className="w-3.5 h-3.5" />
                            ) : prof.profession.includes('Student') ? (
                              <GraduationCap className="w-3.5 h-3.5" />
                            ) : (
                              <User className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <h5 className="text-xs sm:text-sm font-bold text-imic-navy">
                            {prof.profession}
                          </h5>
                        </div>

                        <ul className="space-y-2">
                          {prof.items.map((it, itIdx) => (
                            <li
                              key={itIdx}
                              className="flex items-start gap-2 text-xs text-slate-700"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-imic-teal shrink-0 mt-1.5" />
                              <span className="font-medium">{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Online Application Fields (For India & China) */}
              {activeCountry.onlineApplicationFields && activeCountry.onlineApplicationFields.length > 0 && (
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[11px] font-black text-imic-teal uppercase tracking-widest block mb-1">
                      Online Form Preparation Guide
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-imic-teal" />
                      <span>Required Information For Online Application Portal</span>
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Have these exact details ready before filling out the online visa submission form or when submitting your case to the IMIC visa desk:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {activeCountry.onlineApplicationFields.map((field, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-200 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Associated Partner Hospitals & Important Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Associated Network */}
                <div className="bg-teal-50/60 p-5 rounded-2xl border border-teal-100 space-y-2">
                  <div className="flex items-center gap-2 text-imic-teal font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>Associated Network Hospitals in {activeCountry.name}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {activeCountry.hospitalPartner}
                  </p>
                </div>

                {/* Important Notes */}
                {activeCountry.additionalNotes && activeCountry.additionalNotes.length > 0 && (
                  <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Important Travel Notes</span>
                    </div>
                    <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                      {activeCountry.additionalNotes.map((note, nIdx) => (
                        <li key={nIdx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Official Footer Verification Banner */}
            <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="relative w-28 h-8 shrink-0">
                  <Image
                    src="/images/imic-logo.png"
                    alt="IMIC Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-bold text-imic-navy block">International Medical Information Centre (IMIC)</span>
                  <span className="text-[11px] text-slate-500">Level: 2, House: 108, Road: 11, Block: C, Banani, Dhaka - 1213</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a href="tel:+8801710802000" className="hover:text-imic-teal flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-imic-teal" />
                  <span>+8801710 80 2000</span>
                </a>
                <a href="mailto:info@imic.com.bd" className="hover:text-imic-teal flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-imic-teal" />
                  <span>info@imic.com.bd</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Universal Pre-Departure Guidelines Section */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3 py-1 rounded-full text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Pre-Departure Guidelines</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-imic-navy">
                Essential Patient Travel Guidelines
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Before boarding your flight from Shahjalal International Airport (DAC) or any Bangladeshi port, ensure you have reviewed these four essential travel pillars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-imic-navy border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span>🩺 Medical Records & Diagnostics</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Original diagnostic reports, biopsy summaries, and doctor prescription copies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>High-resolution imaging files on CD/DVD/USB (MRI, CT, PET-CT, Angiograms).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Clinical case summary translated in English.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-imic-navy border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span>✈️ Travel & Passports</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Passports with minimum 6–7 months validity for all traveling persons.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Printed copies of Hospital Invitation & Doctor Appointment Confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Confirmed round-trip flight booking & hospital/hotel voucher.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-imic-navy border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span>💊 Prescription Medicines</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Minimum 2–4 weeks supply of current prescription medicine in original packaging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Doctor’s prescription letter explaining medicines carried for customs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Fit-to-Fly medical certificate from treating doctor if wheelchair/stretcher required.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-imic-navy border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span>💳 Currency & Payment</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Bank statement (6 months) & Bank Solvency Certificate with bank seal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>International dual-currency Credit/Debit cards endorsed with foreign currency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                    <span>Hospital billing estimate and wire transfer instructions from IMIC.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Need Assistance CTA */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Zero Visa Coordination Markup
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need Help With Hospital Invitation or Medical Visa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Visit our Banani Dhaka office or call our 24/7 helpline. IMIC team provides direct doctor coordination, hospital invitation letter dispatch within 24–48 hours, and flight logistics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/book-appointment"
                className="bg-imic-teal hover:bg-imic-teal-hover text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-center"
              >
                Book Appointment & Visa Letter
              </Link>
              <a
                href="tel:+8801710802000"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl border border-white/20 transition text-center"
              >
                Call Hotline: +8801710802000
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
