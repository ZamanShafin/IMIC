'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesGrid from '@/components/ServicesGrid';
import ClinicalServicesSection from '@/components/ClinicalServicesSection';
import Link from 'next/link';
import { Search, ChevronRight, Stethoscope, Activity, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const specialtiesTaxonomy = [
  {
    category: "Bones & Joints (Orthopaedics)",
    slug: "orthopaedics",
    description: "Robotic joint replacement, bone health, complex spinal surgeries, and sports traumatology.",
    procedures: ["Robotic Knee Replacement", "Hip Arthroplasty", "Spine Surgery", "Sports Medicine", "Arthroscopy", "Musculoskeletal Oncology", "Ankle & Foot Surgery", "Hand & Wrist Surgery"]
  },
  {
    category: "Brain & Nerves (Neurology & Neurosurgery)",
    slug: "neurology",
    description: "Awake craniotomy, Deep Brain Stimulation (DBS), stereotactic radiosurgery, brain aneurysm coiling, and epilepsy surgery.",
    procedures: ["Brain Aneurysm Coiling", "Brain Tumor Resection", "Deep Brain Stimulation (DBS)", "Stereotactic Radiosurgery", "Spine Decompression", "Sleep Disorders"]
  },
  {
    category: "Heart & Vascular (Cardiovascular Sciences)",
    slug: "cardiovascular",
    description: "Minimally invasive cardiac surgery (MICS), TAVI valve replacement, complex CABG, pacemakers, and pediatric congenital repairs.",
    procedures: ["TAVI / TAVR Valve Replacement", "CABG Bypass Surgery", "Heart Valve Repair", "Electrophysiology & Ablation", "Pacemaker Implantation", "Pediatric Heart Surgery", "PTCA & Stenting", "Vascular Surgery"]
  },
  {
    category: "Cancer Care (Comprehensive Oncology)",
    slug: "oncology",
    description: "Targeted therapy, proton beam radiation, CyberKnife radiosurgery, immunotherapy, and bone marrow transplants.",
    procedures: ["Proton Beam Therapy", "CyberKnife Radiosurgery", "CAR-T & Immunotherapy", "Bone Marrow Transplant (BMT)", "Medical Oncology", "Surgical Oncology", "Hematology"]
  },
  {
    category: "Organ Transplant & Cellular Therapy",
    slug: "transplant",
    description: "Living donor liver & kidney transplants, pediatric organ transplants, split-liver surgery, and stem cell therapy.",
    procedures: ["Living Donor Liver Transplant", "Kidney Transplantation", "Split-Liver Surgery", "Allogeneic Stem Cell Transplant", "Autologous BMT", "Cornea Transplantation"]
  },
  {
    category: "Reproductive Medicine & IVF",
    slug: "ivf-fertility",
    description: "Advanced IVF, ICSI, Pre-implantation Genetic Testing (PGT-A/M), egg freezing, and reproductive endocrinology.",
    procedures: ["IVF & ICSI Cycles", "PGT-A / PGT-M Genetic Screening", "Egg Freezing & Preservation", "Recurrent Miscarriage Clinic", "Reproductive Surgery"]
  },
  {
    category: "Eyes (Ophthalmology)",
    slug: "ophthalmology",
    description: "Corneal endothelial transplants (DMEK), micro-incision cataract surgery, SMILE / LASIK, and vitreo-retinal surgery.",
    procedures: ["SMILE & Femto-LASIK", "Corneal Grafting (DMEK/DSAEK)", "Micro-Incision Cataract", "Vitreo-Retina Detachment Care", "Glaucoma Shunt Surgery", "Pediatric Ophthalmology"]
  },
  {
    category: "Stomach & Digestive System (Gastroenterology)",
    slug: "gastroenterology",
    description: "Endoscopic Ultrasound (EUS), therapeutic ERCP, liver cirrhosis care, GI oncology, and bariatric metabolic surgery.",
    procedures: ["Therapeutic ERCP & EUS", "Liver Cirrhosis Management", "Bariatric Metabolic Surgery", "Colorectal Surgery", "Laparoscopic GI Surgery", "GERD & IBD Clinic"]
  },
  {
    category: "Ear, Nose, Throat (Otorhinolaryngology)",
    slug: "ent",
    description: "Advanced ENT surgery, balloon sinuplasty, cochlear implants, and head-neck thyroid oncology.",
    procedures: ["Balloon Sinuplasty", "Cochlear Implantation", "Head & Neck Cancer Surgery", "Laryngeal Surgery", "Thyroid Surgery", "Parotid Surgery"]
  },
  {
    category: "Urinary & Reproductive System (Urology)",
    slug: "urology",
    description: "Greenlight laser prostatectomy, TURP, kidney stone laser lithotripsy, and reconstructive urology.",
    procedures: ["Greenlight Laser Prostatectomy", "Laser Stone Lithotripsy (RIRS)", "Robotic Prostate Surgery", "Reconstructive Urology", "Urinary Incontinence"]
  },
  {
    category: "Kidneys (Renal Medicine)",
    slug: "renal-medicine",
    description: "Nephrology care for end-stage renal disease, hemodialysis, glomerulonephritis, and kidney cancer.",
    procedures: ["End-Stage Kidney Disease", "Glomerulonephritis Clinic", "Kidney Stones", "Peritoneal & Hemodialysis", "Polycystic Kidney Disease"]
  },
  {
    category: "Lungs & Respiratory Medicine",
    slug: "respiratory-medicine",
    description: "Pulmonary oncology, severe asthma, COPD management, interventional bronchoscopy, and lung rehabilitation.",
    procedures: ["Interventional Pulmonology", "Severe Asthma & COPD", "Lung Cancer Evaluation", "Pneumonia Care", "Pleural Effusion Management"]
  },
  {
    category: "Paediatrics & Neonatal Care",
    slug: "paediatrics",
    description: "Comprehensive pediatric surgery, pediatric cardiology, pediatric oncology, and neonatal intensive care.",
    procedures: ["Paediatric Surgery", "Paediatric Cardiology", "Paediatric Oncology", "Child Development & NICU", "Paediatric Orthopaedics"]
  },
  {
    category: "Executive Health Screening & Wellness",
    slug: "health-screening",
    description: "Same-day full-body executive health screening, coronary CT calcium scoring, low-dose lung cancer CT, and genetic risk profiling.",
    procedures: ["Comprehensive Whole-Body Scan", "Cardiac Calcium Scoring", "Low-Dose Chest CT", "Cancer Tumor Markers", "Genetic Risk Profiling"]
  }
];

export default function ServiceSpecialitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTaxonomy = specialtiesTaxonomy.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.category.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.procedures.some((p) => p.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Banner Header */}
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">
              Complete Medical Directory & Travel Assistance
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Services & Specialties</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore medical specialties, clinical procedures, medical visas, and end-to-end travel facilitation offered across our partner hospitals in Singapore, Malaysia, Thailand, Indonesia, China, and India.
            </p>

            {/* Search Filter */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search specialty or procedure (e.g. CABG, TAVI, Proton Beam, Knee, LASIK)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-imic-teal shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Directory Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-imic-navy">
              Medical Specialties & Surgical Procedures
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a clinical specialty to view available treatments and book consultations with leading surgeons abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTaxonomy.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
                    <div className="p-2.5 bg-imic-teal/10 text-imic-teal rounded-xl">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-imic-navy">{item.category}</h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {item.procedures.length} Clinical Procedures
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-imic-teal block uppercase tracking-wider">
                      Available Procedures:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.procedures.map((proc, pIdx) => (
                        <span
                          key={pIdx}
                          className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
                        >
                          {proc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <Link
                    href={`/book-appointment?specialty=${encodeURIComponent(item.category)}`}
                    className="flex items-center gap-1 text-xs font-bold text-imic-navy hover:text-imic-teal transition"
                  >
                    <Calendar className="w-3.5 h-3.5 text-imic-teal" />
                    <span>Book Appointment</span>
                  </Link>

                  <Link
                    href={`/our-hospitals?specialty=${encodeURIComponent(item.category)}`}
                    className="text-xs font-semibold text-slate-400 hover:text-imic-navy flex items-center gap-0.5"
                  >
                    <span>View Hospitals</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilitation Services Grid (Medical Visa & Tourist Visa) */}
        <ServicesGrid />

        {/* Clinical Services Section */}
        <ClinicalServicesSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
