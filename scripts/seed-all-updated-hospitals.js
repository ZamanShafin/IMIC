const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Direct port 5432 Supabase PostgreSQL connection
process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

const prisma = new PrismaClient();

const updatedHospitals = [
  // --- SINGAPORE ---
  {
    name: 'Gleneagles Hospital Singapore',
    slug: 'gleneagles-hospital-singapore',
    country: 'Singapore',
    city: 'Singapore',
    address: '6A Napier Road, Singapore 258500',
    description: 'Premier tertiary acute care hospital in Napier Road, renowned for gastroenterology, cardiology, liver transplant, oncology, and minimally invasive surgery.',
    image: '/images/hospitals/gleneagles-sg.jpg',
    photos: JSON.stringify(['/images/hospitals/gleneagles-sg.jpg', '/images/hospitals/farrer-park-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'Singapore MOH Licensed', 'Halal-Certified Dining']),
    featured: true
  },
  {
    name: 'National Cancer Centre Singapore (NCCS)',
    slug: 'national-cancer-centre-singapore-nccs',
    country: 'Singapore',
    city: 'Singapore',
    address: '30 Hospital Boulevard, Singapore 168583',
    description: 'National specialty centre for oncology in Singapore offering cutting-edge proton beam therapy, advanced medical oncology, and personalized precision cancer treatments.',
    image: '/images/hospitals/nccs-sg.jpg',
    photos: JSON.stringify(['/images/hospitals/nccs-sg.jpg', '/images/hospitals/icon-cancer-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'SingHealth Academic Medical Centre']),
    featured: true
  },
  {
    name: 'Singapore National Eye Centre (SNEC)',
    slug: 'singapore-national-eye-centre-snec',
    country: 'Singapore',
    city: 'Singapore',
    address: '11 Third Hospital Avenue, Singapore 168751',
    description: 'Specialist ophthalmic medical institution leading Asia in cornea transplants, advanced cataract, retina surgery, and pediatric ophthalmology.',
    image: '/images/hospitals/snec-sg.jpg',
    photos: JSON.stringify(['/images/hospitals/snec-sg.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'ISO 9001 Certified']),
    featured: true
  },
  {
    name: 'Farrer Park Hospital',
    slug: 'farrer-park-hospital',
    country: 'Singapore',
    city: 'Singapore',
    address: '1 Farrer Park Station Road, Singapore 217562',
    description: 'Premier private tertiary hospital integrated with a 5-star hotel and medical centre, specializing in cardiology, oncology, orthopedic surgery, and executive health screening.',
    image: '/images/hospitals/farrer-park-1.jpg',
    photos: JSON.stringify(['/images/hospitals/farrer-park-1.jpg', '/images/hospitals/farrer-park-2.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'Singapore Health Award']),
    featured: true
  },
  {
    name: 'Mount Elizabeth Hospital (Orchard)',
    slug: 'mount-elizabeth-hospital-orchard',
    country: 'Singapore',
    city: 'Singapore',
    address: '3 Mount Elizabeth, Singapore 228510',
    description: "Asia Pacific's leading private medical hub for multi-organ transplants, complex neurosurgery, cardiology, and oncology.",
    image: '/images/hospitals/mount-elizabeth-1.jpg',
    photos: JSON.stringify(['/images/hospitals/mount-elizabeth-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited']),
    featured: true
  },
  {
    name: 'Mount Elizabeth Novena Hospital',
    slug: 'mount-elizabeth-novena-hospital',
    country: 'Singapore',
    city: 'Singapore',
    address: '38 Irrawaddy Road, Singapore 329563',
    description: 'Modern luxury boutique hospital in Novena medical hub featuring all single-patient rooms and world-class surgical facilities.',
    image: '/images/hospitals/mount-elizabeth-novena-1.jpg',
    photos: JSON.stringify(['/images/hospitals/mount-elizabeth-novena-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited']),
    featured: true
  },
  {
    name: 'ICON Cancer Centre Singapore',
    slug: 'icon-cancer-centre-singapore',
    country: 'Singapore',
    city: 'Singapore',
    address: 'Farrer Park & Mount Alvernia Medical Centres, Singapore',
    description: "Singapore's dedicated private oncology network providing comprehensive medical oncology, radiation oncology, and haematology care.",
    image: '/images/hospitals/icon-cancer-1.jpg',
    photos: JSON.stringify(['/images/hospitals/icon-cancer-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'ACHS Certified']),
    featured: true
  },

  // --- MALAYSIA (Sunway Medical Centre MUST BE FIRST) ---
  {
    name: 'Sunway Medical Centre',
    slug: 'sunway-medical-centre-malaysia',
    country: 'Malaysia',
    city: 'Subang Jaya, Selangor / Sunway City',
    address: '5, Jalan Lagoon Selatan, Bandar Sunway, 47500 Petaling Jaya, Selangor',
    description: "One of Southeast Asia's largest quaternary private hospitals with 28 Centres of Excellence, state-of-the-art robotic surgery, bone marrow transplant, and cancer care.",
    image: '/images/hospitals/sunway-medical-1.jpg',
    photos: JSON.stringify(['/images/hospitals/sunway-medical-1.jpg', '/images/hospitals/sunway-medical-2.jpg']),
    accreditations: JSON.stringify(['ACHS International Accredited', 'MSQH Accredited', 'MHTC Elite Partner']),
    featured: true
  },
  {
    name: 'Prince Court Medical Centre',
    slug: 'prince-court-medical-centre',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    address: '39, Jalan Kia Peng, 50450 Kuala Lumpur',
    description: 'Award-winning private hospital located in the heart of Kuala Lumpur offering exceptional patient care in cardiology, burn treatment, oncology, and IVF.',
    image: '/images/hospitals/prince-court-kl.jpg',
    photos: JSON.stringify(['/images/hospitals/prince-court-kl.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'MSQH Accredited']),
    featured: true
  },
  {
    name: 'Beacon Hospital',
    slug: 'beacon-hospital-malaysia',
    country: 'Malaysia',
    city: 'Petaling Jaya, Selangor',
    address: '1, Jalan 215, Section 51, 46050 Petaling Jaya, Selangor',
    description: 'Boutique cancer specialist hospital equipped with advanced radiotherapy (CyberKnife, Halcyon, Linac) and holistic oncology management.',
    image: '/images/hospitals/beacon-hospital.jpg',
    photos: JSON.stringify(['/images/hospitals/beacon-hospital.jpg']),
    accreditations: JSON.stringify(['MSQH Accredited', 'MHTC Partner']),
    featured: true
  },
  {
    name: 'Subang Jaya Medical Centre (SJMC)',
    slug: 'subang-jaya-medical-centre-sjmc',
    country: 'Malaysia',
    city: 'Subang Jaya, Selangor',
    address: '1, Jalan SS 12/1A, 47500 Subang Jaya, Selangor',
    description: 'Flagship tertiary hospital of Ramsay Sime Darby Health Care, recognized for complex oncology, bone marrow transplants, pediatric surgery, and cardiology.',
    image: '/images/hospitals/sjmc-malaysia.jpg',
    photos: JSON.stringify(['/images/hospitals/sjmc-malaysia.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'MSQH Accredited']),
    featured: true
  },
  {
    name: 'Gleneagles Hospital Kuala Lumpur',
    slug: 'gleneagles-hospital-kuala-lumpur',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    address: '282 & 286, Jalan Ampang, 50450 Kuala Lumpur',
    description: 'Premier tertiary care hospital in embassy row Kuala Lumpur, providing cutting-edge cardiology, orthopedics, neurosciences, and robotic surgery.',
    image: '/images/hospitals/gleneagles-kl.jpg',
    photos: JSON.stringify(['/images/hospitals/gleneagles-kl.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'MSQH Accredited']),
    featured: true
  },

  // --- THAILAND ---
  {
    name: 'Samitivej Sukhumvit Hospital',
    slug: 'samitivej-sukhumvit-hospital-bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    address: '133 Sukhumvit 49, Klongtan Nua, Vadhana, Bangkok 10110',
    description: 'Top-tier JCI-accredited hospital in Bangkok renowned for pediatric excellence (in partnership with Doernbecher Children’s Hospital USA), liver transplant, and gastroenterology.',
    image: '/images/hospitals/samitivej-1.jpg',
    photos: JSON.stringify(['/images/hospitals/samitivej-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'UNICEF/WHO Baby-Friendly Hospital']),
    featured: true
  },
  {
    name: 'BNH Hospital',
    slug: 'bnh-hospital-bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    address: '9/1 Convent Road, Silom, Bangrak, Bangkok 10500',
    description: 'First private international hospital in Thailand with over 125 years of medical heritage, specializing in spine surgery, joint replacement, and women’s health.',
    image: '/images/hospitals/bnh-bangkok.jpg',
    photos: JSON.stringify(['/images/hospitals/bnh-bangkok.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'HA Thailand']),
    featured: true
  },
  {
    name: 'Vejthani International Hospital',
    slug: 'vejthani-international-hospital-bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    address: '1 Ladprao 111, Klong-Chan, Bangkapi, Bangkok 10240',
    description: 'Known as the "King of Bones", Vejthani is a quaternary international hospital world-renowned for robotic orthopedics, spine surgery, and reconstructive procedures.',
    image: '/images/hospitals/vejthani-bangkok.jpg',
    photos: JSON.stringify(['/images/hospitals/vejthani-bangkok.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'CCPC Orthopedics Certified']),
    featured: true
  },
  {
    name: 'Bangkok Hospital (BDMS Headquarter)',
    slug: 'bangkok-hospital-bdms',
    country: 'Thailand',
    city: 'Bangkok',
    address: '2 Soi Soonvijai 7, New Petchburi Road, Bangkok 10310',
    description: 'Flagship medical complex of BDMS featuring dedicated Heart, Cancer, Neurology, and Trauma centres with international helicopter & aeromedical evacuation.',
    image: '/images/hospitals/bangkok-hospital.jpg',
    photos: JSON.stringify(['/images/hospitals/bangkok-hospital.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'TEMOS International']),
    featured: true
  },
  {
    name: 'MedPark Hospital',
    slug: 'medpark-hospital-bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    address: '3333 Rama IV Road, Khlong Toei, Bangkok 10110',
    description: 'Modern quaternary hospital designed by multi-specialty clinical doctors to treat complex medical conditions, organ transplant, and cardiovascular emergencies.',
    image: '/images/hospitals/medpark-bangkok.jpg',
    photos: JSON.stringify(['/images/hospitals/medpark-bangkok.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'HA Thailand']),
    featured: true
  },

  // --- INDONESIA ---
  {
    name: 'Medistra Hospital',
    slug: 'medistra-hospital-jakarta',
    country: 'Indonesia',
    city: 'Jakarta',
    address: 'Jl. Jend. Gatot Subroto Kav. 59, Jakarta Selatan 12950',
    description: 'Prominent tertiary hospital in South Jakarta known for exceptional cardiovascular care, oncology, liver & gastroenterology, and orthopedics.',
    image: '/images/hospitals/medistra-jakarta.jpg',
    photos: JSON.stringify(['/images/hospitals/medistra-jakarta.jpg']),
    accreditations: JSON.stringify(['KARS Paripurna Accredited', 'ISO Certified']),
    featured: true
  },
  {
    name: 'RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    slug: 'rsupn-dr-cipto-mangunkusumo-rscm-jakarta',
    country: 'Indonesia',
    city: 'Jakarta',
    address: 'Jl. Diponegoro No. 71, Senen, Jakarta Pusat 10430',
    description: "Indonesia's National Central General Quaternary Hospital and primary teaching facility for University of Indonesia, leading organ transplantation and complex rare disease treatments.",
    image: '/images/hospitals/rscm-jakarta.jpg',
    photos: JSON.stringify(['/images/hospitals/rscm-jakarta.jpg']),
    accreditations: JSON.stringify(['JCI Academic Medical Centre', 'KARS Accredited']),
    featured: true
  },

  // --- CHINA ---
  {
    name: 'Peking Union Medical College Hospital',
    slug: 'peking-union-medical-college-hospital-beijing',
    country: 'China',
    city: 'Beijing',
    address: 'No. 1 Shuaifuyuan, Dongcheng District, Beijing 100730',
    description: "China's premier national medical centre recognized globally for complex clinical diagnostics, rare disease management, and advanced surgical interventions.",
    image: '/images/hospitals/pumch-beijing.jpg',
    photos: JSON.stringify(['/images/hospitals/pumch-beijing.jpg']),
    accreditations: JSON.stringify(['National Class A Tertiary Hospital', 'ISO Certified']),
    featured: true
  },
  {
    name: 'Fudan University Shanghai Cancer Center',
    slug: 'fudan-university-shanghai-cancer-center',
    country: 'China',
    city: 'Shanghai',
    address: '270 Dong\'an Road, Xuhui District, Shanghai 200032',
    description: 'One of Asia\'s most advanced comprehensive oncology institutions offering cutting-edge heavy ion and proton therapy for solid tumors and hematology.',
    image: '/images/hospitals/fuscc-shanghai.jpg',
    photos: JSON.stringify(['/images/hospitals/fuscc-shanghai.jpg']),
    accreditations: JSON.stringify(['National Top Oncology Hospital', 'Class A Tertiary']),
    featured: true
  },

  // --- INDIA ---
  {
    name: 'Fortis Memorial Research Institute (FMRI)',
    slug: 'fortis-memorial-research-institute-delhi',
    country: 'India',
    city: 'Gurugram, Delhi NCR',
    address: 'Sector 44, Opposite HUDA City Centre Metro Station, Gurugram, Haryana 122002',
    description: 'Flagship multi-super speciality quaternary hospital with world-renowned clinicians in robotic oncology, bone marrow transplant, neurosciences, and cardiac care.',
    image: '/images/hospitals/fortis-1.jpg',
    photos: JSON.stringify(['/images/hospitals/fortis-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'HCG Cancer Centre',
    slug: 'hcg-cancer-centre-bangalore',
    country: 'India',
    city: 'Bengaluru',
    address: 'No. 8, P Kalinga Rao Road, Sampangi Rama Nagar, Bengaluru, Karnataka 560027',
    description: 'Specialist comprehensive oncology network in India offering CyberKnife, Radixact radiation, genomics, and cellular immunotherapy.',
    image: '/images/hospitals/hcg-hospital.jpg',
    photos: JSON.stringify(['/images/hospitals/hcg-hospital.jpg']),
    accreditations: JSON.stringify(['NABH Accredited', 'CAP Accredited']),
    featured: true
  },
  {
    name: 'Sir H. N. Reliance Foundation Hospital',
    slug: 'sir-h-n-reliance-foundation-hospital-mumbai',
    country: 'India',
    city: 'Mumbai',
    address: 'Raja Rammohan Roy Road, Prarthana Samaj, Girgaon, Mumbai 400004',
    description: 'Ultra-modern quaternary care hospital in South Mumbai delivering world-standard clinical outcomes in cardiology, oncology, neurosurgery, and organ transplant.',
    image: '/images/hospitals/reliance-mumbai.jpg',
    photos: JSON.stringify(['/images/hospitals/reliance-mumbai.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  },
  {
    name: 'Rajagiri Hospital',
    slug: 'rajagiri-hospital-kochi',
    country: 'India',
    city: 'Kochi, Kerala',
    address: 'Chunangamvely, Aluva, Kochi, Kerala 683112',
    description: 'Premier tertiary care hospital in Kerala renowned for high-success liver and kidney transplants, comprehensive oncology, and affordable quaternary care.',
    image: '/images/hospitals/rajagiri-1.jpg',
    photos: JSON.stringify(['/images/hospitals/rajagiri-1.jpg']),
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  }
];

async function seed() {
  console.log('Seeding updated hospital network into Supabase PostgreSQL DB...');

  // Save to src/data/hospitals.json
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'hospitals.json'), JSON.stringify(updatedHospitals, null, 2));

  for (const h of updatedHospitals) {
    console.log(`Upserting [${h.country}]: ${h.name}...`);
    await prisma.hospital.upsert({
      where: { slug: h.slug },
      update: {
        name: h.name,
        country: h.country,
        city: h.city,
        address: h.address,
        description: h.description,
        image: h.image,
        photos: h.photos,
        accreditations: h.accreditations,
        featured: h.featured
      },
      create: {
        slug: h.slug,
        name: h.name,
        country: h.country,
        city: h.city,
        address: h.address,
        description: h.description,
        image: h.image,
        photos: h.photos,
        accreditations: h.accreditations,
        featured: h.featured
      }
    });
  }

  console.log(`Successfully seeded ${updatedHospitals.length} hospitals into Supabase PostgreSQL DB!`);
  await prisma.$disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
