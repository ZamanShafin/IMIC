'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { Search, ChevronRight, Stethoscope, Activity, Calendar, ArrowRight } from 'lucide-react';

const specialtiesTaxonomy = [
  {
    category: "Bones (Orthopaedics)",
    slug: "orthopaedics",
    description: "Bone health, joint replacement, complex spinal surgeries, and sports traumatology.",
    procedures: ["Ankle Foot Surgery", "Hand Wrist Surgery", "Hip Surgery", "Knee Surgery", "Musculoskeletal Tumour", "Shoulder Elbow Surgery", "Spine Surgery", "Sports Medicine"]
  },
  {
    category: "Brain Nerves (Neurology)",
    slug: "neurology",
    description: "Neurosurgery, stereotactic radiosurgery, brain aneurysm clipping, and sleep disorder therapies.",
    procedures: ["Brain Aneurysm", "Brain Tumor", "Neuro Surgery", "Stereotactic Radiosurgery", "Sleep Disorders"]
  },
  {
    category: "Ear, Nose, Throat (Otorhinolaryngology)",
    slug: "ent",
    description: "Advanced ENT surgery, sinuplasty, cochlear implants, and head-neck thyroid oncology.",
    procedures: ["Balloon Sinuplasty", "Cochlear Implantation", "Head Neck Surgery", "Laryngeal Surgery", "Parotid Surgery", "Submandibular Gland Surgery", "Thyroid Surgery"]
  },
  {
    category: "Eyes (Ophthalmology)",
    slug: "ophthalmology",
    description: "Cornea transplantation, micro-incision cataract surgery, LASIK, and glaucoma management.",
    procedures: ["Amblyopia (Lazy Eye)", "Cataracts", "Cornea Transplant", "Glaucoma", "Neuro-ophthalmology", "Refractive Surgery (LASIK)"]
  },
  {
    category: "Heart & Vascular (Cardiovascular)",
    slug: "cardiovascular",
    description: "Coronary bypass (CABG), TAVR valve replacement, pacemakers, and pediatric congenital repairs.",
    procedures: ["Catheter Ablation for Atrial Fibrillation", "CABG", "Heart Valve Repair/Replacement", "LVAD", "Pacemaker Implantation", "Paediatric/Congenital Heart Repair", "PTCA", "Surgery for Heart Failure", "Thoracic Aortic Vascular Surgery & Endovascular Aneurysm Repair", "TAVR/TAVI"]
  },
  {
    category: "Cancer (Oncology)",
    slug: "oncology",
    description: "Targeted therapy, radiation oncology, surgical oncology, and haematological malignancies.",
    procedures: ["Haematology", "Medical Oncology", "Radiation Oncology", "Surgical Oncology"]
  },
  {
    category: "General Surgery",
    slug: "general-surgery",
    description: "Robotic surgery, laparoscopic hepatobiliary, breast, colorectal, and vascular procedures.",
    procedures: ["Breast Surgery", "Colorectal Surgery", "Head and Neck Surgery", "Hepatobiliary and Pancreatic Surgery", "Minimally Invasive Surgery", "Robotic Surgery", "Upper GI Surgery", "Vascular Surgery"]
  },
  {
    category: "Transplant & Cellular Therapy",
    slug: "transplant",
    description: "Living donor liver & kidney transplants, split-liver surgery, and stem cell therapy.",
    procedures: ["Cadaveric Liver Transplant", "Complicated Kidney Transplant", "Complicated Liver Transplant", "Kidney Sparing Surgery", "Living Donor Kidney Transplant", "Living Donor Liver Transplant", "Split-Liver Transplant", "Stem Cell Transplant"]
  },
  {
    category: "Hormone Disorder (Endocrinology)",
    slug: "endocrinology",
    description: "Management of diabetes, thyroid nodules, adrenal disorders, and metabolic health.",
    procedures: ["Adrenal Disorder", "Diabetes", "High Cholesterol", "Obesity", "Osteoporosis", "Thyroid Disorder"]
  },
  {
    category: "Urinary & Reproductive System (Urology)",
    slug: "urology",
    description: "Greenlight laser prostatectomy, TURP, kidney stone laser lithotripsy, and reconstructive urology.",
    procedures: ["Greenlight Laser Therapy", "Kidney Surgery and Transplant", "Prostate Surgery", "TURP", "Urinary Incontinence"]
  },
  {
    category: "Women (Obstetrics & Gynaecology)",
    slug: "gynaecology",
    description: "High-risk pregnancy management, laparoscopic hysterectomy, cystectomy, and pelvic floor repair.",
    procedures: ["Cystectomy", "Hysterectomy", "Myomectomy", "Neonatology (Pregnancy)", "Oophorectomy", "Pelvic Floor Reconstruction/Incontinence Surgery"]
  },
  {
    category: "Kidneys (Renal Medicine)",
    slug: "renal-medicine",
    description: "Nephrology care for end-stage renal disease, hemodialysis, and kidney cancer.",
    procedures: ["End-Stage Kidney Disease", "Glomerulonephritis", "Kidney Cancer", "Kidney Failure", "Kidney Stones", "Polycystic Kidney Disease"]
  },
  {
    category: "Lungs (Respiratory Medicine)",
    slug: "respiratory-medicine",
    description: "Pulmonary oncology, severe asthma, COPD management, and interventional pulmonology.",
    procedures: ["Asthma", "COPD", "Lung Cancer", "Pneumonia", "Tuberculosis"]
  },
  {
    category: "Paediatrics",
    slug: "paediatrics",
    description: "Comprehensive pediatric surgery, pediatric cardiology, ENT, and developmental care.",
    procedures: ["Child Development", "Paediatric Cardiology", "Paediatric ENT", "Paediatric General Surgery", "Paediatric Medicine", "Paediatric Oncology", "Paediatric Ophthalmology", "Paediatric Orthopaedics"]
  },
  {
    category: "Stomach & Digestive System (Gastroenterology)",
    slug: "gastroenterology",
    description: "Endoscopic procedures, liver cirrhosis, GI oncology, IBD, and GERD therapies.",
    procedures: ["Colorectal Cancer", "Gallstones", "Gastritis", "GERD", "Hepatitis (A/B/C)", "IBD", "IBS", "Liver Cirrhosis", "Pancreatic Cancer", "Peptic Ulcers", "Stomach Cancer"]
  },
  {
    category: "Addiction Treatment",
    slug: "addiction-treatment",
    description: "Structured inpatient rehabilitation and psychological therapy programs.",
    procedures: ["Drug Addiction Treatment", "Nicotine Addiction Treatment", "Alcohol Addiction Treatment", "Perfectionism Treatment"]
  },
  {
    category: "Allergy",
    slug: "allergy",
    description: "Immunotherapy and allergen identification testing.",
    procedures: ["Immunotherapy", "Food Allergy Testing", "Skin Prick Testing", "Desensitization Therapy"]
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
              Complete Medical Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Services & Specialties</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore 16 medical departments and their sub-procedures offered across our partner hospitals in Singapore, Malaysia, Thailand, and India.
            </p>

            {/* Search Filter */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search procedure (e.g. CABG, LASIK, TAVR, Knee)..."
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
                        {item.procedures.length} Procedures
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
                    <span>Book For This Specialty</span>
                  </Link>

                  <Link
                    href={`/our-hospitals?specialty=${encodeURIComponent(item.category)}`}
                    className="text-xs font-semibold text-slate-400 hover:text-imic-navy flex items-center gap-0.5"
                  >
                    <span>Hospitals</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
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
