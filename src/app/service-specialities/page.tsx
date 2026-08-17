'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesGrid from '@/components/ServicesGrid';
import Link from 'next/link';
import { 
  Search, 
  ChevronRight, 
  Stethoscope, 
  Activity, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  HeartPulse,
  Brain,
  Eye,
  Bone,
  Baby,
  ShieldPlus,
  Dna,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const clinicalSpecialtiesDirectory = [
  {
    category: "Bones (Orthopaedics)",
    icon: Bone,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    description: "Advanced joint replacement, robotic arthroplasty, complex spine surgery, and sports medicine.",
    procedures: [
      "Ankle Foot Surgery",
      "Hand Wrist Surgery",
      "Hip Surgery",
      "Knee Surgery",
      "Musculoskeletal Tumour",
      "Shoulder Elbow Surgery",
      "Spine Surgery",
      "Sports Medicine"
    ]
  },
  {
    category: "Brain Nerves (Neurology)",
    icon: Brain,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    description: "Expert neurosurgery, cerebrovascular interventions, awake craniotomy, and neurological rehabilitation.",
    procedures: [
      "Brain Aneurysm",
      "Brain Tumor",
      "Neuro Surgery",
      "Stereotactic Radiosurgery",
      "Sleep Disorders"
    ]
  },
  {
    category: "Ear, Nose Throat (Otorhinolaryngology)",
    icon: Stethoscope,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    description: "Micro-endoscopic ENT surgery, hearing restoration, thyroidectomy, and head-neck oncologic resections.",
    procedures: [
      "Balloon Sinuplasty",
      "Cochlear Implantation",
      "Head Neck Surgery",
      "Laryngea Surgery",
      "Parotid Surgery",
      "Submandibular Gland Surgery",
      "Thyroid Surgery"
    ]
  },
  {
    category: "Eyes (Ophthalmology)",
    icon: Eye,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    description: "Pioneering ophthalmic microsurgery, corneal transplantation, laser vision correction, and retinal surgery.",
    procedures: [
      "Amblyopia (Lazy Eye)",
      "Cataracts",
      "Cornea Transplant (Artificial and Conventional)",
      "Glaucoma",
      "Neuro-ophthalmology",
      "Refractive Surgery (LASIK)"
    ]
  },
  {
    category: "Heart Vascular (Cardiovascular)",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50 border-rose-200",
    description: "Minimally invasive cardiac surgeries, complex CABG, structural heart interventions, and congenital repairs.",
    procedures: [
      "Catheter Ablation for Atrial Fibrillation",
      "Coronary Artery Bypass Grafting (CABG)",
      "Heart Valve Repair/ Replacement Surgery",
      "Left Ventricular Assist Device (LVAD)",
      "Pacemaker Implantation",
      "Paediatric/Congenital Heart Repair Surgery",
      "Percutaneous Transluminal Coronary Angioplasty",
      "Surgery for Heart Failure",
      "Thoracic Aortic Vascular Surgery and Endovascular Aneurysm Repair",
      "Transcatheter Aortic Valve Replacement/Implantation (TAVR/TAVI)"
    ]
  },
  {
    category: "Cancer (Oncology)",
    icon: Dna,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    description: "Comprehensive multidisciplinary oncology, proton therapy, targeted chemotherapy, and surgical resections.",
    procedures: [
      "Haematology",
      "Medical Oncology",
      "Radiation Oncology",
      "Surgical Oncology"
    ]
  },
  {
    category: "General Surgery",
    icon: Activity,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description: "Advanced laparoscopic and robotic surgical procedures across hepatobiliary, colorectal, and endocrine systems.",
    procedures: [
      "Breast Surgery",
      "Colorectal Surgery",
      "Head and Neck Surgery",
      "Hepatobiliary and Pancreatic Surgery",
      "Minimally Invasive Surgery",
      "Robotic Surgery",
      "Upper Gastrointestinal Surgery",
      "Vascular Surgery"
    ]
  },
  {
    category: "Transplant Cellular Therapy",
    icon: ShieldPlus,
    color: "text-teal-600 bg-teal-50 border-teal-200",
    description: "High-success living and cadaveric donor organ transplants and regenerative cellular therapeutics.",
    procedures: [
      "Cadaveric Liver Transplant",
      "Complicated Kidney Transplant",
      "Complicated Liver Transplant",
      "Kidney Sparing Surgery",
      "Living Donor Kidney Transplant",
      "Living Donor Liver Transplant",
      "Split-Liver Transplant",
      "Stem Cell Transplant"
    ]
  },
  {
    category: "Hormone Disorder (Endocrinology)",
    icon: Sparkles,
    color: "text-orange-600 bg-orange-50 border-orange-200",
    description: "Comprehensive metabolic, thyroid, pituitary, and hormonal disorder management protocols.",
    procedures: [
      "Adrenal disorder",
      "Diabetes",
      "High Cholesterol",
      "Obesity",
      "Osteoporosis",
      "Thyroid disorder"
    ]
  },
  {
    category: "Urinary Reproductive System (Urology)",
    icon: ShieldCheck,
    color: "text-sky-600 bg-sky-50 border-sky-200",
    description: "Laser prostatectomy, robotic urologic oncology, stone retrieval, and reconstructive urology.",
    procedures: [
      "Greenlight Laser Therapy",
      "Kidney Surgery and Transplant",
      "Prostate Surgery",
      "Transurethral Resection of Prostate (TURP)",
      "Urinary incontinence"
    ]
  },
  {
    category: "Women (Obstetrics Gynaecology)",
    icon: Baby,
    color: "text-pink-600 bg-pink-50 border-pink-200",
    description: "Minimally invasive gynecologic surgery, fertility enhancement, maternity, and pelvic floor reconstruction.",
    procedures: [
      "Cystectomy (Ovarian Cyst Removal)",
      "Hysterectomy (Womb Removal)",
      "Myomectomy (Fibroid Removal)",
      "Neonatology (Pregnancy)",
      "Oophorectomy (Removal of the Ovaries)",
      "Pelvic Floor Reconstruction Incontinence Surgery"
    ]
  },
  {
    category: "Kidneys (Renal Medicine)",
    icon: Activity,
    color: "text-lime-600 bg-lime-50 border-lime-200",
    description: "Nephrology care for acute and chronic renal failure, glomerulonephritis, and dialysis management.",
    procedures: [
      "End-Stage Kidney Disease",
      "Glomerulonephritis",
      "Kidney Cancer",
      "Kidney Failure",
      "Kidney Stones",
      "Polycystic Kidney Disease"
    ]
  },
  {
    category: "Lungs (Respiratory Medicine)",
    icon: Stethoscope,
    color: "text-teal-600 bg-teal-50 border-teal-200",
    description: "Advanced pulmonology, interventional bronchoscopy, chronic airway diseases, and thoracic medicine.",
    procedures: [
      "Asthma",
      "Chronic Obstructive Pulmonary Diseases (COPD)",
      "Lung Cancer",
      "Pneumonia",
      "Tuberculosis"
    ]
  },
  {
    category: "Paediatrics",
    icon: Baby,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    description: "Comprehensive pediatric medical, surgical, developmental, and neonatal intensive care specialties.",
    procedures: [
      "Child Development",
      "Paediatric Cardiology",
      "Paediatric ENT",
      "Paediatric General Surgery",
      "Paediatric Medicine",
      "Paediatric Oncology",
      "Paediatric Ophthalmology",
      "Paediatric Orthopaedics"
    ]
  },
  {
    category: "Stomach Digestive System (Gastroenterology)",
    icon: Activity,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description: "Therapeutic endoscopy, liver cirrhosis management, gastrointestinal oncology, and inflammatory bowel diseases.",
    procedures: [
      "Colorectal Cancer",
      "Gallstones",
      "Gastritis",
      "Gastro-Oesophageal Reflux Diseases (GERD)",
      "Hepatitis (A,B,C)",
      "Inflammatory Bowel Diseases",
      "Irritable Bowel Syndrome",
      "Liver Cirrhosis",
      "Pancreatic Cancer",
      "Peptic Ulcers",
      "Stomach Cancer"
    ]
  }
];

export default function ServiceSpecialitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredSpecialties = clinicalSpecialtiesDirectory.filter(spec => {
    const matchesCategory = activeCategory === 'ALL' || spec.category === activeCategory;
    const matchesSearch = 
      spec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.procedures.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-imic-teal uppercase tracking-wider border border-white/10">
              <Sparkles className="w-4 h-4 text-imic-teal" />
              <span>Full Medical Directory & Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-sm">
              Our Services & Clinical Specialities
            </h1>
            
            <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              IMIC offers end-to-end medical facilitation, visas, appointments, second opinions, and direct access to 15+ specialized clinical disciplines across our global hospital network in Singapore, Malaysia, Thailand, Indonesia, China, and India.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#clinical-services"
                className="bg-imic-teal hover:bg-imic-teal-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-imic-teal/30 transition flex items-center gap-2"
              >
                <span>View All 15+ Clinical Disciplines</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <Link
                href="/book-appointment"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm backdrop-blur-md transition"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Facilitation Services Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 bg-imic-navy/5 text-imic-navy px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-imic-teal" />
                <span>Patient Facilitation Ecosystem</span>
              </div>
              <h2 className="text-3xl font-extrabold text-imic-navy">
                Complete End-to-End Medical Travel Services
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                From your initial doctor evaluation in Bangladesh to medical visas, airport transfers, and post-discharge recovery.
              </p>
            </div>

            <ServicesGrid />
          </div>
        </section>

        {/* Complete 15-Category Clinical Services Directory */}
        <section id="clinical-services" className="py-20 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4 text-imic-teal" />
                <span>Specialized Medical Directory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy tracking-tight">
                Our Clinical Services & Procedures
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Explore comprehensive sub-specialty procedures, advanced surgeries, and treatments provided by our partner medical centers.
              </p>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search any condition, surgery or specialty (e.g. CABG, IVF, Knee, Liver, Cataract)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-imic-teal/50 focus:border-imic-teal text-slate-800 text-sm font-medium transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* 15 Clinical Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecialties.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-imic-teal/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${spec.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {spec.procedures.length} Procedures
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-imic-navy group-hover:text-imic-teal transition">
                          {spec.category}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {spec.description}
                        </p>
                      </div>

                      {/* Procedures List */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[11px] font-extrabold text-imic-navy uppercase tracking-wider block">
                          Treatments & Surgeries:
                        </span>
                        <div className="space-y-1.5">
                          {spec.procedures.map((proc, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-imic-teal shrink-0 mt-0.5" />
                              <span className="font-medium leading-snug">{proc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Links */}
                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/book-appointment?specialty=${encodeURIComponent(spec.category)}`}
                        className="text-xs font-bold text-imic-teal hover:text-imic-teal-hover flex items-center gap-1 transition"
                      >
                        <span>Book Doctor</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/request-qu"
                        className="text-xs font-semibold text-slate-500 hover:text-imic-navy transition"
                      >
                        <span>Get Cost Estimate</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSpecialties.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-imic-navy">No procedures found</h4>
                <p className="text-xs text-slate-500 mt-1">Try searching for another keyword or clear your filter.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-imic-navy text-white text-xs font-bold rounded-xl"
                >
                  Show All 15 Categories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Global Hospital Network CTA */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal p-8 sm:p-12 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Need Help Selecting the Right Specialist or Hospital?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our medical coordinators will review your clinical reports, recommend top doctors across Singapore, Malaysia, Thailand, Indonesia, China, and India, and provide transparent cost estimates free of charge.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/book-appointment"
                  className="bg-imic-teal hover:bg-imic-teal-hover text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition text-center"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/request-qu"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition text-center"
                >
                  Request Quote
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
