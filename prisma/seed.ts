const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const specialtiesData = [
  {
    name: "Bones (Orthopaedics)",
    slug: "orthopaedics",
    department: "Orthopaedics",
    icon: "Activity",
    description: "Comprehensive care for bones, joints, ligaments, tendons, and spine.",
    procedures: [
      "Ankle Foot Surgery", "Hand Wrist Surgery", "Hip Surgery", "Knee Surgery",
      "Musculoskeletal Tumour", "Shoulder Elbow Surgery", "Spine Surgery", "Sports Medicine"
    ]
  },
  {
    name: "Brain Nerves (Neurology)",
    slug: "neurology",
    department: "Neurology & Neurosurgery",
    icon: "Brain",
    description: "Advanced surgical and non-surgical treatment for brain and neurological conditions.",
    procedures: [
      "Brain Aneurysm", "Brain Tumor", "Neuro Surgery", "Stereotactic Radiosurgery", "Sleep Disorders"
    ]
  },
  {
    name: "Ear, Nose, Throat (Otorhinolaryngology)",
    slug: "ent",
    department: "ENT",
    icon: "Ear",
    description: "Specialized treatment for ears, nose, throat, head, and neck surgeries.",
    procedures: [
      "Balloon Sinuplasty", "Cochlear Implantation", "Head Neck Surgery", "Laryngeal Surgery",
      "Parotid Surgery", "Submandibular Gland Surgery", "Thyroid Surgery"
    ]
  },
  {
    name: "Eyes (Ophthalmology)",
    slug: "ophthalmology",
    department: "Ophthalmology",
    icon: "Eye",
    description: "Leading eye care including cornea transplants, glaucoma, and LASIK surgery.",
    procedures: [
      "Amblyopia (Lazy Eye)", "Cataracts", "Cornea Transplant", "Glaucoma",
      "Neuro-ophthalmology", "Refractive Surgery (LASIK)"
    ]
  },
  {
    name: "Heart & Vascular (Cardiovascular)",
    slug: "cardiovascular",
    department: "Cardiology & Cardiac Surgery",
    icon: "Heart",
    description: "World-class cardiology, CABG bypass, TAVR/TAVI, and heart failure treatments.",
    procedures: [
      "Catheter Ablation for Atrial Fibrillation", "CABG", "Heart Valve Repair/Replacement", "LVAD",
      "Pacemaker Implantation", "Paediatric/Congenital Heart Repair", "PTCA", "Surgery for Heart Failure",
      "Thoracic Aortic Vascular Surgery & Endovascular Aneurysm Repair", "TAVR/TAVI"
    ]
  },
  {
    name: "Cancer (Oncology)",
    slug: "oncology",
    department: "Oncology",
    icon: "ShieldAlert",
    description: "Holistic cancer care including medical, surgical, radiation, and haematology treatments.",
    procedures: [
      "Haematology", "Medical Oncology", "Radiation Oncology", "Surgical Oncology"
    ]
  },
  {
    name: "General Surgery",
    slug: "general-surgery",
    department: "Surgery",
    icon: "Scissors",
    description: "Minimally invasive, robotic, breast, colorectal, and upper GI surgical procedures.",
    procedures: [
      "Breast Surgery", "Colorectal Surgery", "Head and Neck Surgery", "Hepatobiliary and Pancreatic Surgery",
      "Minimally Invasive Surgery", "Robotic Surgery", "Upper GI Surgery", "Vascular Surgery"
    ]
  },
  {
    name: "Transplant & Cellular Therapy",
    slug: "transplant",
    department: "Transplant Surgery",
    icon: "GitFork",
    description: "Living donor liver, kidney transplants, split-liver, and stem cell therapy.",
    procedures: [
      "Cadaveric Liver Transplant", "Complicated Kidney Transplant", "Complicated Liver Transplant",
      "Kidney Sparing Surgery", "Living Donor Kidney Transplant", "Living Donor Liver Transplant",
      "Split-Liver Transplant", "Stem Cell Transplant"
    ]
  },
  {
    name: "Hormone Disorder (Endocrinology)",
    slug: "endocrinology",
    department: "Endocrinology",
    icon: "Thermometer",
    description: "Endocrinology care for diabetes, thyroid disorders, osteoporosis, and adrenal health.",
    procedures: [
      "Adrenal Disorder", "Diabetes", "High Cholesterol", "Obesity", "Osteoporosis", "Thyroid Disorder"
    ]
  },
  {
    name: "Urinary & Reproductive System (Urology)",
    slug: "urology",
    department: "Urology",
    icon: "Target",
    description: "Laser therapies, prostate surgery, kidney transplant, and incontinence solutions.",
    procedures: [
      "Greenlight Laser Therapy", "Kidney Surgery and Transplant", "Prostate Surgery", "TURP", "Urinary Incontinence"
    ]
  },
  {
    name: "Women (Obstetrics & Gynaecology)",
    slug: "gynaecology",
    department: "Gynaecology & Obstetrics",
    icon: "Users",
    description: "Comprehensive care for pregnancy, hysterectomy, cystectomy, and pelvic floor repair.",
    procedures: [
      "Cystectomy", "Hysterectomy", "Myomectomy", "Neonatology (Pregnancy)", "Oophorectomy", "Pelvic Floor Reconstruction/Incontinence Surgery"
    ]
  },
  {
    name: "Kidneys (Renal Medicine)",
    slug: "renal-medicine",
    department: "Nephrology",
    icon: "Filter",
    description: "Advanced nephrology for kidney failure, dialysis, stones, and renal cancer.",
    procedures: [
      "End-Stage Kidney Disease", "Glomerulonephritis", "Kidney Cancer", "Kidney Failure", "Kidney Stones", "Polycystic Kidney Disease"
    ]
  },
  {
    name: "Lungs (Respiratory Medicine)",
    slug: "respiratory-medicine",
    department: "Pulmonology",
    icon: "Wind",
    description: "Pulmonology care for asthma, COPD, lung cancer, and respiratory infections.",
    procedures: [
      "Asthma", "COPD", "Lung Cancer", "Pneumonia", "Tuberculosis"
    ]
  },
  {
    name: "Paediatrics",
    slug: "paediatrics",
    department: "Paediatrics",
    icon: "Baby",
    description: "Specialized medical and surgical care for infants, children, and adolescents.",
    procedures: [
      "Child Development", "Paediatric Cardiology", "Paediatric ENT", "Paediatric General Surgery",
      "Paediatric Medicine", "Paediatric Oncology", "Paediatric Ophthalmology", "Paediatric Orthopaedics"
    ]
  },
  {
    name: "Stomach & Digestive System (Gastroenterology)",
    slug: "gastroenterology",
    department: "Gastroenterology",
    icon: "Compass",
    description: "Diagnostic and therapeutic care for liver, stomach, gallbladder, and digestive organs.",
    procedures: [
      "Colorectal Cancer", "Gallstones", "Gastritis", "GERD", "Hepatitis (A/B/C)", "IBD", "IBS",
      "Liver Cirrhosis", "Pancreatic Cancer", "Peptic Ulcers", "Stomach Cancer"
    ]
  },
  {
    name: "Addiction Treatment",
    slug: "addiction-treatment",
    department: "Psychiatry & Rehabilitation",
    icon: "HeartPulse",
    description: "Structured recovery and rehabilitation programs for addictions.",
    procedures: [
      "Drug Addiction Treatment", "Nicotine Addiction Treatment", "Alcohol Addiction Treatment", "Perfectionism Treatment"
    ]
  },
  {
    name: "Allergy",
    slug: "allergy",
    department: "Immunology & Allergy",
    icon: "Sparkles",
    description: "Diagnostic testing and therapy for environmental, drug, and food allergies.",
    procedures: [
      "Immunotherapy", "Food Allergy Testing", "Skin Prick Testing", "Desensitization Therapy"
    ]
  }
];

const hospitalsData = [
  // Singapore
  {
    name: "Farrer Park Hospital",
    slug: "farrer-park-hospital",
    country: "Singapore",
    city: "Singapore",
    description: "A premier tertiary hospital integrated with a 5-star hotel and medical centre, offering state-of-the-art diagnostic and surgical technology.",
    image: "/images/hospitals/farrer-park-1.jpg",
    photos: JSON.stringify(["/images/hospitals/farrer-park-1.jpg", "/images/hospitals/farrer-park-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "Singapore Service Excellence"]),
  },
  {
    name: "ICON Cancer Centre",
    slug: "icon-cancer-centre",
    country: "Singapore",
    city: "Singapore",
    description: "Singapore's leading private oncology provider offering comprehensive cancer care including radiation, medical oncology, and clinical trials.",
    image: "/images/hospitals/icon-cancer-1.jpg",
    photos: JSON.stringify(["/images/hospitals/icon-cancer-1.jpg", "/images/hospitals/icon-cancer-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "Excellence in Oncology Care"]),
  },
  {
    name: "Mount Alvernia Hospital",
    slug: "mount-alvernia-hospital",
    country: "Singapore",
    city: "Singapore",
    description: "Singapore's only independent not-for-profit private acute care tertiary hospital providing holistic medical care.",
    image: "/images/hospitals/mount-alvernia-2.jpg",
    photos: JSON.stringify(["/images/hospitals/mount-alvernia-2.jpg", "/images/hospitals/mount-alvernia-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "ISO Certified"]),
  },
  {
    name: "Mount Elizabeth Hospitals",
    slug: "mount-elizabeth-hospitals",
    country: "Singapore",
    city: "Singapore",
    description: "Renowned across Asia-Pacific for multi-organ transplants, cardiac care, and neurosurgery.",
    image: "/images/hospitals/mount-elizabeth-1.jpg",
    photos: JSON.stringify(["/images/hospitals/mount-elizabeth-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "Asia-Pacific Healthcare Winner"]),
  },
  {
    name: "Mount Elizabeth Novena Hospital",
    slug: "mount-elizabeth-novena-hospital",
    country: "Singapore",
    city: "Singapore",
    description: "Modern luxury facility equipped with single-room accommodations and cutting-edge surgical suites.",
    image: "/images/hospitals/mount-elizabeth-novena-1.jpg",
    photos: JSON.stringify(["/images/hospitals/mount-elizabeth-novena-1.jpg", "/images/hospitals/mount-elizabeth-novena-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "Green Mark Platinum"]),
  },
  {
    name: "Parkway East Hospital",
    slug: "parkway-east-hospital",
    country: "Singapore",
    city: "Singapore",
    description: "Comprehensive general acute care hospital serving eastern Singapore with high-quality maternal and surgical care.",
    image: "/images/hospitals/parkway-east-1.jpg",
    photos: JSON.stringify(["/images/hospitals/parkway-east-1.jpg", "/images/hospitals/parkway-east-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited"]),
  },
  {
    name: "Singapore General Hospital",
    slug: "singapore-general-hospital",
    country: "Singapore",
    city: "Singapore",
    description: "Singapore's flagship tertiary academic health centre, ranked among the world's top hospitals.",
    image: "/images/hospitals/sgh-1.jpg",
    photos: JSON.stringify(["/images/hospitals/sgh-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "Magnet Recognized"]),
  },
  {
    name: "Singapore National University Hospital (NUH)",
    slug: "nuh-singapore",
    country: "Singapore",
    city: "Singapore",
    description: "Major referral health institute providing comprehensive paediatric and adult organ transplant services.",
    image: "/images/hospitals/nuh-1.jpg",
    photos: JSON.stringify(["/images/hospitals/nuh-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited"]),
  },

  // Malaysia
  {
    name: "Sunway Medical Centre",
    slug: "sunway-medical-centre",
    country: "Malaysia",
    city: "Kuala Lumpur",
    description: "One of Asia's largest private tertiary healthcare institutions, renowned for cancer therapy, robotics, and paediatric care.",
    image: "/images/hospitals/sunway-medical-1.jpg",
    photos: JSON.stringify(["/images/hospitals/sunway-medical-1.jpg"]),
    accreditations: JSON.stringify(["ACHS Accredited", "JCI Accredited", "MSQH"]),
  },
  {
    name: "Gleneagles Global Hospitals",
    slug: "gleneagles-global-hospitals",
    country: "Malaysia",
    city: "Kuala Lumpur",
    description: "Premier tertiary healthcare provider specializing in cardiology, oncology, and orthopaedic surgery.",
    image: "/images/hospitals/gleneagles-1.jpg",
    photos: JSON.stringify(["/images/hospitals/gleneagles-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "MSQH Certified"]),
  },

  // Thailand
  {
    name: "Samitivej Hospitals",
    slug: "samitivej-hospitals",
    country: "Thailand",
    city: "Bangkok",
    description: "Award-winning private medical group in Bangkok recognized by WHO and UNICEF for pediatric and specialized care.",
    image: "/images/hospitals/samitivej-1.jpg",
    photos: JSON.stringify(["/images/hospitals/samitivej-1.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "MTQUA Top Medical Tourism Hospital"]),
  },

  // India
  {
    name: "Fortis Memorial Research Institute (Gurugram)",
    slug: "fortis-memorial-research-institute",
    country: "India",
    city: "Gurugram, Delhi NCR",
    description: "Multi-super speciality quaternary care hospital with international clinical faculty and advanced robotic surgery centers.",
    image: "/images/hospitals/fortis-1.jpg",
    photos: JSON.stringify(["/images/hospitals/fortis-1.jpg", "/images/hospitals/fortis-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "NABH Accredited"]),
  },
  {
    name: "HCG Hospitals",
    slug: "hcg-hospitals",
    country: "India",
    city: "Bengaluru",
    description: "India's largest cancer care network featuring cyberknife, PET-CT, and bone marrow transplantation units.",
    image: "/images/hospitals/hcg-1.jpg",
    photos: JSON.stringify(["/images/hospitals/hcg-1.jpg", "/images/hospitals/hcg-2.png"]),
    accreditations: JSON.stringify(["NABH Accredited", "CAP Certified"]),
  },
  {
    name: "Sir H. N. Reliance Foundation Hospital and Research Centre",
    slug: "reliance-foundation-hospital",
    country: "India",
    city: "Mumbai",
    description: "State-of-the-art 345-bed multi-speciality tertiary hospital in South Mumbai.",
    image: "/images/hospitals/reliance-1.jpg",
    photos: JSON.stringify(["/images/hospitals/reliance-1.jpg", "/images/hospitals/reliance-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "NABH Accredited"]),
  },
  {
    name: "Rajagiri Hospital",
    slug: "rajagiri-hospital",
    country: "India",
    city: "Kochi, Kerala",
    description: "Premier multi-speciality tertiary hospital in Kochi providing affordable high-end healthcare.",
    image: "/images/hospitals/rajagiri-1.jpg",
    photos: JSON.stringify(["/images/hospitals/rajagiri-1.jpg", "/images/hospitals/rajagiri-2.jpg"]),
    accreditations: JSON.stringify(["JCI Accredited", "NABH Accredited"]),
  }
];

async function main() {
  console.log('Seeding IMIC Database...');

  // 1. Users
  await prisma.user.upsert({
    where: { email: 'admin@imic.com.bd' },
    update: {},
    create: {
      name: 'IMIC Super Admin',
      email: 'admin@imic.com.bd',
      password: 'admin123_secure_hash',
      role: 'SUPER_ADMIN',
      phone: '+8801710802000'
    }
  });

  await prisma.user.upsert({
    where: { email: 'staff@imic.com.bd' },
    update: {},
    create: {
      name: 'CPAC Support Staff',
      email: 'staff@imic.com.bd',
      password: 'staff123_secure_hash',
      role: 'STAFF',
      phone: '+8801777995995'
    }
  });

  // 2. Specialties & Procedures
  for (const s of specialtiesData) {
    const createdSpecialty = await prisma.specialty.upsert({
      where: { slug: s.slug },
      update: { name: s.name, department: s.department, description: s.description, icon: s.icon },
      create: {
        name: s.name,
        slug: s.slug,
        department: s.department,
        icon: s.icon,
        description: s.description
      }
    });

    for (const procName of s.procedures) {
      const existingProc = await prisma.procedure.findFirst({
        where: { specialtyId: createdSpecialty.id, name: procName }
      });
      if (!existingProc) {
        await prisma.procedure.create({
          data: {
            specialtyId: createdSpecialty.id,
            name: procName,
            description: `Procedure ${procName} under ${s.name}`
          }
        });
      }
    }
  }

  // 3. Hospitals
  for (const h of hospitalsData) {
    await prisma.hospital.upsert({
      where: { slug: h.slug },
      update: h,
      create: h
    });
  }

  // 4. Sample Doctors
  const farrerPark = await prisma.hospital.findUnique({ where: { slug: 'farrer-park-hospital' } });
  const cardiology = await prisma.specialty.findUnique({ where: { slug: 'cardiovascular' } });
  const oncology = await prisma.specialty.findUnique({ where: { slug: 'oncology' } });

  if (farrerPark && cardiology) {
    await prisma.doctor.create({
      data: {
        name: "Dr. K. S. Tan",
        title: "Senior Consultant Cardiologist",
        hospitalId: farrerPark.id,
        specialtyId: cardiology.id,
        bio: "Over 20 years of experience in interventional cardiology and TAVR procedures.",
        availability: "Mon, Wed, Fri"
      }
    });
  }

  // 5. Testimonials
  const testimonials = [
    {
      patientName: "Mr. Jahangir Alam",
      treatment: "Complex Cardiac Surgery (CABG)",
      hospital: "Mount Elizabeth Hospital",
      country: "Singapore",
      quote: "IMIC arranged my emergency visa within 24 hours and had an ambulance waiting for me at Changi airport. Dr. Tan saved my life. Forever grateful to the IMIC team in Banani!",
      photo: "/images/testimonials/patient1.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      patientName: "Mrs. Rehana Parveen",
      treatment: "Oncology Radiotherapy",
      hospital: "Sunway Medical Centre",
      country: "Malaysia",
      quote: "The service apartment arranged by IMIC was right across the hospital. Their interpreter was with us every step of the way. Highly recommend IMIC to all Bangladeshi patients.",
      photo: "/images/testimonials/patient2.png",
      videoUrl: ""
    }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // 6. Sample Blog Posts
  await prisma.blogPost.upsert({
    where: { slug: 'seeking-medical-treatment-in-singapore-malaysia-thailand-india' },
    update: {},
    create: {
      slug: 'seeking-medical-treatment-in-singapore-malaysia-thailand-india',
      title: 'Complete Patient Guide: Medical Travel to Singapore, Malaysia, Thailand & India from Bangladesh',
      summary: 'Learn how IMIC Patient Assistance Centre (CPAC) handles doctor appointments, emergency visas, airport buggy pickups, and hotel bookings seamlessly.',
      content: `
      <h2>Why Travel Abroad for Specialized Healthcare?</h2>
      <p>Patients in Bangladesh often face long wait times or limited availability for advanced surgical interventions, multi-organ transplants, complex oncology treatments, and pediatric cardiac operations.</p>
      
      <h3>How IMIC Simplifies Your Medical Journey</h3>
      <ul>
        <li><strong>Doctor's Appointment & Tele-consultation:</strong> Get medical record reviews from top doctors in Singapore, Malaysia, Thailand, and India before leaving Dhaka.</li>
        <li><strong>Visa Processing Support:</strong> Direct invitation letters from accredited partner hospitals facilitate fast-track emergency visas.</li>
        <li><strong>Airport Transfer & Stretcher Services:</strong> Tarmac ambulance and airport buggy assistance for non-ambulatory patients.</li>
        <li><strong>Accommodation Arrangements:</strong> Pre-booked service apartments and hotel rooms near partner hospitals.</li>
      </ul>
      `,
      coverImage: '/images/slider/slide1.jpg',
      category: 'Medical Tourism Guide',
      author: 'IMIC CPAC Team'
    }
  });

  // 7. Site Settings
  const siteSettings = [
    { key: 'phone_primary', value: '+8801710802000' },
    { key: 'phone_secondary', value: '+8801777995995' },
    { key: 'email', value: 'info@imic.com.bd' },
    { key: 'whatsapp', value: '+8801777995995' },
    { key: 'address', value: 'Suite – B1, Level – 2, House – 108, Road – 11, Block – C, Banani – 11, Dhaka -1213' },
    { key: 'cpac_description', value: 'Our Patient Assistance Centre (CPAC) provides a seamless and one-stop 24-hour service to our patients connecting them to a comprehensive choice of medical services and doctors across Singapore, Malaysia, Thailand & India.' }
  ];

  for (const s of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s
    });
  }

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
