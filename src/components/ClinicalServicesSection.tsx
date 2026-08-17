import React from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Dna, 
  Activity, 
  Brain, 
  Eye, 
  Bone, 
  Baby, 
  Sparkles, 
  Stethoscope, 
  ShieldPlus, 
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const clinicalSpecialties = [
  {
    title: 'Cardiovascular & Thoracic Surgery',
    icon: HeartPulse,
    color: 'text-rose-500 bg-rose-50 border-rose-200',
    description: 'Minimally invasive cardiac surgery (MICS), TAVI valve replacement, complex CABG, pediatric cardiology, and arrhythmia ablations.',
    keyTreatments: ['TAVI & Valve Repair', 'Complex CABG Bypass', 'Pediatric Heart Surgery', 'Electrophysiology']
  },
  {
    title: 'Comprehensive Oncology & Cancer Care',
    icon: Dna,
    color: 'text-purple-500 bg-purple-50 border-purple-200',
    description: 'Proton beam radiation therapy, CyberKnife radiosurgery, CAR-T cell immunotherapy, precision genomic sequencing, and surgical oncology.',
    keyTreatments: ['Proton Beam Therapy', 'CyberKnife Radiosurgery', 'CAR-T & Immunotherapy', 'Bone Marrow Transplant']
  },
  {
    title: 'Advanced Orthopedics & Spine Surgery',
    icon: Bone,
    color: 'text-amber-500 bg-amber-50 border-amber-200',
    description: 'Robotic total knee and hip replacement (Mako/ROSA), endoscopic spinal decompression, scoliosis correction, and sports medicine.',
    keyTreatments: ['Robotic Knee Replacement', 'Endoscopic Spine Surgery', 'Scoliosis Correction', 'Hip Resurfacing']
  },
  {
    title: 'Neurosciences & Neurosurgery',
    icon: Brain,
    color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
    description: 'Awake craniotomy for brain tumors, Deep Brain Stimulation (DBS) for Parkinson’s, neuro-endovascular coiling for aneurysms, and stroke care.',
    keyTreatments: ['Awake Brain Surgery', 'Deep Brain Stimulation', 'Aneurysm Coiling', 'Epilepsy Surgery']
  },
  {
    title: 'Multi-Organ Transplantation',
    icon: ShieldPlus,
    color: 'text-teal-500 bg-teal-50 border-teal-200',
    description: 'High-success living-donor liver and kidney transplants, pediatric organ transplants, and autologous/allogeneic bone marrow transplantation.',
    keyTreatments: ['Living Donor Liver Transplant', 'Kidney Transplantation', 'Allogeneic BMT', 'Corneal Transplant']
  },
  {
    title: 'Reproductive Medicine, Fertility & IVF',
    icon: Baby,
    color: 'text-pink-500 bg-pink-50 border-pink-200',
    description: 'Advanced In-Vitro Fertilization (IVF), ICSI, Pre-implantation Genetic Testing (PGT-A/M), egg freezing, and reproductive endocrinology.',
    keyTreatments: ['IVF & ICSI Cycles', 'PGT Genetic Screening', 'Recurrent Miscarriage Clinic', 'Fertility Preservation']
  }
];

export default function ClinicalServicesSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200" id="clinical-services-preview">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-imic-teal/10 text-imic-teal px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-imic-teal" />
            <span>Clinical Centres of Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-imic-navy tracking-tight">
            Our Clinical Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            In partnership with premier tertiary medical centers across Singapore, Malaysia, Thailand, Indonesia, China, and India, IMIC connects patients directly with leading specialists across all key medical disciplines.
          </p>
        </div>

        {/* 6 Preview Clinical Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalSpecialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-imic-teal/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${item.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-imic-navy group-hover:text-imic-teal transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Key Treatments */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-imic-navy block uppercase tracking-wider">
                      Specialized Interventions:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {item.keyTreatments.map((t, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-1 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-imic-teal shrink-0" />
                          <span className="truncate">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/book-appointment?specialty=${encodeURIComponent(item.title)}`}
                    className="text-xs font-bold text-imic-teal hover:text-imic-teal-hover flex items-center gap-1 transition"
                  >
                    <span>Consult Doctor</span>
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

        {/* View All Clinical Services Button linking to /service-specialities#clinical-services */}
        <div className="mt-12 text-center">
          <Link
            href="/service-specialities#clinical-services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-imic-navy via-slate-800 to-imic-navy hover:from-imic-teal hover:to-imic-navy text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base group"
          >
            <span>Explore All 15+ Clinical Disciplines & Detailed Procedures</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </Link>
          <p className="text-xs text-slate-500 mt-2.5">
            Includes Orthopaedics, Neurology, ENT, Oncology, Organ Transplants, Cardiology, Urology, Gynaecology & more
          </p>
        </div>
      </div>
    </section>
  );
}
