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
  Plane,
  ShieldCheck,
  AlertCircle,
  Clock,
  Download,
  Printer,
  Calendar,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  Briefcase,
  Stethoscope,
  CreditCard,
  Building2,
  CheckSquare,
  Square
} from 'lucide-react';

interface CountryVisaData {
  id: string;
  name: string;
  flagImg: string;
  visaType: string;
  processingTime: string;
  validity: string;
  partnerHospitals: string;
  overview: string;
  keyRequirements: {
    category: string;
    items: string[];
  }[];
  importantNotes: string[];
}

const countryVisaList: CountryVisaData[] = [
  {
    id: 'singapore',
    name: 'Singapore',
    flagImg: '/images/flags/singapore.png',
    visaType: 'Medical e-Visa / Short-Term Visit Pass (STVP) with Medical Extension',
    processingTime: '1 – 3 Working Days (Fast-track emergency assistance available)',
    validity: 'Initial 30 Days (Extendable based on doctor’s recommendation)',
    partnerHospitals: 'Farrer Park Hospital, Gleneagles, Mount Elizabeth Novena, Mount Elizabeth Orchard, NCCS, SNEC, ICON Cancer Centre',
    overview: 'Singapore requires an authentic hospital appointment letter and local sponsor/hospital coordination. IMIC provides direct liaison with partner hospitals for fast-track medical e-visa invitations and seamless ICA electronic submission.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Original Passport with at least 6 months validity from the planned date of arrival in Singapore.',
          'Two recent passport-sized studio photographs (35mm x 45mm, matte finish, pure white background, 80% face coverage).',
          'Completed and signed Singapore Visa Application Form (Form 14A).',
          'Copy of national NID card and previous Singapore visas (if applicable).'
        ]
      },
      {
        category: '2. Official Hospital & Medical Documentation',
        items: [
          'Official Medical Appointment Confirmation & Invitation Letter issued by MOH-accredited Singapore hospital.',
          'Attending specialist physician’s medical recommendation outlining estimated duration of treatment & hospitalization.',
          'Complete Bangladeshi medical files: recent diagnostic reports, biopsy, pathology summaries, CT/MRI films on CD, and current prescriptions translated into English.',
          'Bangladesh consulting doctor’s clinical summary letter explaining the medical necessity for treatment in Singapore.'
        ]
      },
      {
        category: '3. Financial & Logistics Proof',
        items: [
          'Original Bank Statement of the last 6 months along with Bank Solvency Certificate with official bank seal.',
          'Singapore Electronic Arrival Card (SGAC) with Health Declaration (submitted online 3 days prior to arrival).',
          'Confirmed return flight itinerary or travel booking.',
          'Hotel / Service Apartment or hospital room reservation confirmation.'
        ]
      },
      {
        category: '4. Medical Attendant / Companion Documents',
        items: [
          'Passport of medical attendant(s) with minimum 6 months validity.',
          'Proof of relationship with the patient (Marriage certificate, Birth certificate, or Family Relationship letter).',
          'Attendant employment / business proof and 6-month bank statement (if traveling independently).'
        ]
      }
    ],
    importantNotes: [
      'Singapore hospital international patient desks can apply for formal Medical Extension at ICA if treatment exceeds 30 days.',
      'Emergency medical evacuation or commercial stretcher transfers must be pre-coordinated with Changi Airport border control through IMIC.'
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    flagImg: '/images/flags/malaysia.png',
    visaType: 'Malaysia Healthcare Travel Council (MHTC) Medical e-Visa (eVisa Medical)',
    processingTime: '2 – 4 Working Days',
    validity: 'Single / Multiple Entry (30 Days, Extendable up to 90 days)',
    partnerHospitals: 'Sunway Medical Centre, Prince Court Medical Centre, Beacon Hospital, Subang Jaya Medical Centre (SJMC), Gleneagles KL',
    overview: 'Through our partnership with MHTC-accredited quaternary hospitals in Malaysia, patients receive an official Visa Approval Letter (VAL) and priority clearance upon arrival at KLIA Terminal 1 & 2 with dedicated international patient lounge support.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Valid Bangladeshi Passport with at least 6 months validity and minimum 2 blank pages.',
          'Two passport-size studio photos (35mm x 50mm, white background, no reflections/glasses).',
          'Completed online Medical e-Visa application form.',
          'Clear scanned copy of passport bio-data page.'
        ]
      },
      {
        category: '2. MHTC Hospital Invitation Letter',
        items: [
          'Official Visa Approval Letter (VAL) and Medical Appointment Letter issued by member hospital of Malaysia Healthcare Travel Council (MHTC).',
          'Estimated cost of medical treatment and expected hospitalization schedule.',
          'Comprehensive medical history reports, lab test results, imaging reports (MRI/PET-CT) in English.'
        ]
      },
      {
        category: '3. Financial & Arrival Compliance',
        items: [
          'Bank statement of the last 6 months with bank solvency certificate showing sufficient balance.',
          'Malaysia Digital Arrival Card (MDAC) submitted online within 3 days before travel.',
          'Round-trip flight booking and accommodation arrangement in Kuala Lumpur / Selangor.'
        ]
      },
      {
        category: '4. Medical Escort & Attendants',
        items: [
          'Maximum of 2 companions/attendants permitted under Medical eVisa.',
          'Passport copy and relationship proof with patient.',
          'Medical escort authorization letter if patient requires wheelchair or stretcher assistance.'
        ]
      }
    ],
    importantNotes: [
      'MHTC Concierge & Lounge at Kuala Lumpur International Airport (KLIA) provides free patient escort and immigration fast-track for IMIC patients.',
      'Hospital ambulance pick-up from KLIA directly to hospital can be pre-arranged 48 hours prior to arrival.'
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    flagImg: '/images/flags/thailand.png',
    visaType: 'Non-Immigrant “O” Medical Treatment Visa / Tourist Medical Visa (MT)',
    processingTime: '3 – 5 Working Days',
    validity: '60 – 90 Days (Extendable at Thai Immigration Bureau)',
    partnerHospitals: 'Samitivej Sukhumvit, Vejthani Hospital, BNH Hospital, Bangkok Hospital (BDMS), MedPark Hospital',
    overview: 'Thailand is renowned for international clinical excellence and holistic wellness. IMIC assists patients in acquiring authentic hospital confirmation letters required for Thai Royal Embassy Dhaka and VFS Global medical visa applications.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Original Passport valid for at least 6 months from arrival date with at least 2 blank pages.',
          'Two recent passport-sized color photos (3.5cm x 4.5cm, white background, taken within 6 months).',
          'Completed and signed Royal Thai Embassy visa application form.',
          'Copies of all previous Thai visas and renewal stamps.'
        ]
      },
      {
        category: '2. Thai Hospital Certification',
        items: [
          'Official Medical Invitation and Hospital Admission Confirmation signed by an authorized Thai medical director.',
          'Detailed clinical schedule and projected surgical/treatment itinerary.',
          'Recommendation letter from Bangladeshi consultant physician advocating treatment abroad.',
          'Recent investigation reports (Blood panels, Histopathology, CT/MRI, Coronary angiograms).'
        ]
      },
      {
        category: '3. Financial & Accommodation Evidence',
        items: [
          'Original 6-month Bank Statement with Bank Solvency Certificate (minimum closing balance BDT 150,000+ per applicant).',
          'Confirmed round-trip flight booking with Bangkok (BKK/DMK) arrival.',
          'Hotel booking or hospital inpatient admission confirmation voucher.'
        ]
      },
      {
        category: '4. Attendants / Family Companions',
        items: [
          'Valid passports and photographs for medical attendants (up to 3 family members).',
          'Notarized relationship certificate / Marriage or Birth certificate.',
          'No Objection Letter (NOC) from employer or trade license if business owner.'
        ]
      }
    ],
    importantNotes: [
      'Medical visas can be extended up to 90 days or 1 year in Bangkok with hospital medical cert for long-term oncology or rehabilitation cases.',
      'Bangla language interpreter assistance is provided at hospital bedside.'
    ]
  },
  {
    id: 'india',
    name: 'India',
    flagImg: '/images/flags/india.png',
    visaType: 'Indian Medical Visa (MED) & Medical Attendant Visa (MEDX)',
    processingTime: '2 – 5 Working Days (Emergency medical fast-track available)',
    validity: 'Up to 6 Months / 1 Year (Triple / Multiple Entry as approved)',
    partnerHospitals: 'Fortis Healthcare, Apollo Hospitals, Max Healthcare, Medanta The Medicity, Tata Memorial Hospital, Sankara Nethralaya, Kokilaben Dhirubhai Ambani, AIG Hospitals, KIMS',
    overview: 'India is the most frequent medical destination for Bangladeshi patients. IMIC works directly with premier hospital international desks across Kolkata, Delhi NCR, Chennai, Mumbai, Bangalore, and Hyderabad to dispatch official visa invitation letters with doctor registration details.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Original Current Passport (minimum 6 months validity) plus ALL old original passports.',
          'Two 2x2 inch (50mm x 50mm) studio photos (white background, matte paper, 80% face coverage).',
          'Online IVAC Visa Application Form with submitted barcode confirmation printout.',
          'National ID Card (NID) copy or Birth Certificate copy.'
        ]
      },
      {
        category: '2. Medical Records & Hospital Invitation',
        items: [
          'Official Medical Visa Invitation Letter from an accredited Indian hospital with authorized doctor’s medical council registration number.',
          'Bangladesh treating doctor’s formal medical prescription & recommendation letter advising treatment in India.',
          'All recent original clinical reports (Endoscopy, Biopsy, MRI/CT, ECHO, Blood tests) dated within last 3 months.'
        ]
      },
      {
        category: '3. Residence & Financial Proof',
        items: [
          'Recent Utility Bill copy (Electricity, Gas, or Water bill) of applicant’s current residence.',
          'Bank statement of the last 6 months with minimum balance of BDT 20,000+ or International Credit Card endorsement ($150+).',
          'Professional proof: Trade license for business, NOC & ID card for job holders, Student ID card for students.'
        ]
      },
      {
        category: '4. Medical Attendant (MEDX) Requirements',
        items: [
          'Maximum 2 medical attendants permitted per patient under MEDX visa category.',
          'Attendant passport, photos, utility bill, and professional proof matching patient’s application.',
          'Relationship proof document (Nikahnama, Marriage Certificate, or Birth Certificate).'
        ]
      }
    ],
    importantNotes: [
      'Registration with Foreigners Regional Registration Office (FRRO) is required if continuous stay exceeds 180 days.',
      'Port endorsement changes (Air/Rail/Land borders seperti Haridaspur/Gede/Ghojadanga) can be coordinated based on patient travel preferences.'
    ]
  },
  {
    id: 'china',
    name: 'China',
    flagImg: '/images/flags/china.png',
    visaType: 'China Medical Visa (S2 Short-Term Medical / S1 Long-Term Medical Treatment)',
    processingTime: '4 – 7 Working Days (Express priority available)',
    validity: '30 – 180 Days depending on treatment schedule',
    partnerHospitals: 'Modern Cancer Hospital Guangzhou (St. Stamford), Foshan Fosun Chancheng Hospital, Guangzhou Fosun Chancheng Hospital (Xinshi), Shenzhen Hengsheng Hospital, StarKids Shanghai',
    overview: 'China is a world leader in minimally invasive oncology (Cryotherapy, NanoKnife, Particle Implantation) and advanced robotic surgery. IMIC provides end-to-end guidance for Chinese Visa Application Service Centre (Dhaka) submissions.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Original Passport with at least 6 months validity and minimum 2 blank visa pages.',
          'Two passport photos (33mm x 48mm, white background, bare-headed, no jewelry/glasses).',
          'Completed China Online Visa Application (COVA) form with signature sheet.',
          'NID card and clear photocopy of previous Chinese visas (if any).'
        ]
      },
      {
        category: '2. Chinese Hospital Invitation with Official Seal',
        items: [
          'Official Medical Admission Letter & Treatment Plan issued by the hospital in China bearing official institutional red seal stamp.',
          'Detailed clinical summary describing the oncology / surgical protocol, estimated hospitalization days, and physician assignment.',
          'Bangladeshi doctor referral note and English translated biopsy, histopathology, and PET-CT scan reports.'
        ]
      },
      {
        category: '3. Financial Solvency Proof',
        items: [
          'Bank Statement of the last 6 months with Bank Solvency Certificate reflecting adequate treatment funds.',
          'Proof of round-trip air ticket reservation (e.g. Dhaka to Guangzhou CAN / Shanghai PVG).',
          'Hotel or hospital inpatient ward booking confirmation.'
        ]
      },
      {
        category: '4. Accompanying Family Members',
        items: [
          'Passports and photographs of medical attendants.',
          'Notarized proof of family relationship (Marriage Certificate, Birth Certificate) authenticated if required.',
          'Attendant employment / financial proof.'
        ]
      }
    ],
    importantNotes: [
      'IMIC partner hospitals in Guangzhou offer complimentary airport transfer and 24/7 Bangla and English speaking medical translator coordinators.',
      'Special visa extension support is provided directly by the hospital International Patient Office in Guangzhou / Foshan.'
    ]
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    flagImg: '/images/flags/indonesia.png',
    visaType: 'Indonesia Medical Treatment e-Visa (B211A / C13 Medical Treatment)',
    processingTime: '3 – 5 Working Days',
    validity: '60 Days (Extendable up to 180 days)',
    partnerHospitals: 'Medistra Hospital Jakarta, RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    overview: 'Indonesia offers top-tier quaternary clinical centers in Jakarta specializing in complex adult & pediatric surgery, cardiology, and liver transplants with streamlined electronic visa issuance.',
    keyRequirements: [
      {
        category: '1. Primary Patient Documents',
        items: [
          'Valid Passport with minimum 6 months validity.',
          'Recent color passport-size photograph (4cm x 6cm, white background).',
          'Completed Indonesian Medical e-Visa application form.',
          'National ID and COVID-19 health compliance certificates.'
        ]
      },
      {
        category: '2. Hospital Sponsorship & Guarantee',
        items: [
          'Official Guarantee & Medical Appointment Letter from partner hospital in Jakarta.',
          'Physician diagnosis summary and expected treatment schedule.',
          'Complete Bangladeshi medical records translated in English.'
        ]
      },
      {
        category: '3. Financial & Travel Documents',
        items: [
          'Bank statement of the last 3-6 months with bank solvency letter.',
          'Confirmed round-trip flight booking to Jakarta (CGK).',
          'Electronic Custom Declaration (e-CD) QR code prior to arrival.'
        ]
      },
      {
        category: '4. Medical Escort',
        items: [
          'Companion passport copies and relationship proof.',
          'Emergency contact details and travel insurance policy.'
        ]
      }
    ],
    importantNotes: [
      'Direct coordination with hospital international patient division for VIP airport pick-up and hospital admission.',
      'Visa extension can be processed online without leaving Jakarta.'
    ]
  }
];

const generalChecklistItems = [
  {
    category: '🩺 Medical Records & Diagnostics',
    items: [
      'Original and digital copies of all recent medical records, biopsy reports, and doctor prescriptions.',
      'High-resolution imaging files on CD/DVD/USB (MRI, CT, PET-CT, Angiograms, X-rays).',
      'Doctor recommendation and case summary written or translated into English.',
      'List of all current medications, allergies, and dosage schedules.'
    ]
  },
  {
    category: '✈️ Travel & Immigration Documents',
    items: [
      'Passports valid for at least 6 months from travel date for all travelers.',
      'Printed copies of Official Hospital Invitation Letter & Doctor Appointment Confirmation.',
      'Approved Medical Visa grant notice / eVisa printouts.',
      'Confirmed return or onward flight tickets and lodging/hospital room confirmation.',
      'Relationship certificates (Marriage, Birth) for accompanying attendants.'
    ]
  },
  {
    category: '💊 Medications & Health Essentials',
    items: [
      'Carry minimum 2–4 weeks supply of current prescription medicines in original pharmacy packaging.',
      'Doctor’s signed prescription letter justifying the carried medications for airport customs.',
      'Fit-to-Fly medical certificate from treating physician if traveling with reduced mobility.',
      'Wheelchair or oxygen assistance requested on flight booking through airline in advance.'
    ]
  },
  {
    category: '💳 Financial & Payment Preparedness',
    items: [
      'Bank statement (6 months) & Bank Solvency Certificate with bank seal.',
      'International dual-currency Credit/Debit cards endorsed with foreign currency.',
      'Sufficient foreign currency cash for initial out-of-pocket expenses and local transportation.',
      'Hospital billing estimate and overseas wire transfer guidelines from IMIC.'
    ]
  }
];

export default function TravelKitPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('singapore');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const activeCountry = countryVisaList.find((c) => c.id === selectedCountry) || countryVisaList[0];

  const toggleCheck = (itemKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-5xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-imic-teal/20 text-imic-teal border border-imic-teal/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Patient Travel Kit</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Medical Visa Checklist & Travel Guide
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Complete, verified visa documentation checklists, hospital invitation guidelines, and pre-departure preparation kits for patients traveling from Bangladesh to Singapore, Malaysia, Thailand, India, China & Indonesia.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-sm transition"
              >
                <Printer className="w-4 h-4 text-imic-teal" />
                <span>Print Checklist</span>
              </button>
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 bg-imic-teal hover:bg-imic-teal-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Get Fast-Track Visa Invitation</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Country Tabs Section */}
        <section className="py-12 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-imic-navy">
              Select Destination Country
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Click a country below to view its specific medical visa category, required documents, hospital invitation letters, and processing times.
            </p>
          </div>

          {/* 6 Country Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {countryVisaList.map((country) => {
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

          {/* Selected Country Checklist Details */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Country Header Info Banner */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
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
                    {activeCountry.name} Medical Visa Checklist
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {activeCountry.overview}
                </p>

                <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-imic-teal shrink-0" />
                    <span><strong className="text-white">Visa:</strong> {activeCountry.visaType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-imic-teal shrink-0" />
                    <span><strong className="text-white">Time:</strong> {activeCountry.processingTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <a
                  href={`https://wa.me/8801710802000?text=Hello%20IMIC%2C%20I%20need%20assistance%20for%20a%20Medical%20Visa%20to%20${encodeURIComponent(activeCountry.name)}`}
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
                  <span>Request Hospital Invitation</span>
                </Link>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCountry.keyRequirements.map((reqGroup, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4"
                  >
                    <h4 className="text-sm font-black text-imic-navy uppercase tracking-wider border-b border-slate-200 pb-2">
                      {reqGroup.category}
                    </h4>

                    <div className="space-y-3">
                      {reqGroup.items.map((item, itemIdx) => {
                        const itemKey = `${activeCountry.id}-${idx}-${itemIdx}`;
                        const isChecked = !!checkedItems[itemKey];

                        return (
                          <div
                            key={itemIdx}
                            onClick={() => toggleCheck(itemKey)}
                            className="flex items-start gap-3 cursor-pointer group select-none"
                          >
                            <div className="mt-0.5 shrink-0 text-imic-teal">
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-imic-teal" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 group-hover:text-imic-teal" />
                              )}
                            </div>
                            <span
                              className={`text-xs sm:text-sm leading-relaxed transition ${
                                isChecked
                                  ? 'line-through text-slate-400 font-medium'
                                  : 'text-slate-700 font-medium group-hover:text-slate-900'
                              }`}
                            >
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Partner Hospitals & Important Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                {/* Associated Hospitals */}
                <div className="bg-teal-50/60 p-5 rounded-2xl border border-teal-100 space-y-2">
                  <div className="flex items-center gap-2 text-imic-teal font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>Associated Network Hospitals in {activeCountry.name}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {activeCountry.partnerHospitals}
                  </p>
                </div>

                {/* Important Notes */}
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Important Travel Notes</span>
                  </div>
                  <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                    {activeCountry.importantNotes.map((note, nIdx) => (
                      <li key={nIdx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Universal Pre-Departure Kit Checklist Section */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3 py-1 rounded-full text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Universal Preparation Kit</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-imic-navy">
                Essential Pre-Departure Checklist for All Destinations
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Make sure you and your accompanying family members have covered these 4 critical pillars before departing Shahjalal International Airport (DAC) or any Bangladeshi port of departure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {generalChecklistItems.map((cat, cIdx) => (
                <div
                  key={cIdx}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4"
                >
                  <h3 className="text-sm font-bold text-imic-navy border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span>{cat.category}</span>
                  </h3>

                  <ul className="space-y-3">
                    {cat.items.map((it, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Assistance CTA */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Zero Visa Coordination Fee
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need Help With Hospital Invitation or Medical Visa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Our Banani Dhaka patient support team assists patients with doctor recommendations, official hospital invitation letters, emergency visa invitation dispatch, and flight ambulance coordination.
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
