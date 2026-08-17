const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');

process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const prisma = new PrismaClient();

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const indiaHospitalsList = [
  // --- KOLKATA ---
  {
    name: 'Fortis Hospital Kolkata',
    slug: 'fortis-hospital-kolkata',
    country: 'India',
    city: 'Kolkata, West Bengal',
    address: '730, Anandapur, E.M. Bypass Road, Kolkata 700107',
    description: 'World-class multi-super specialty tertiary hospital in Anandapur, Kolkata, specializing in cardiology, kidney transplants, orthopedics, critical care, and advanced robotic surgeries.',
    image: '/images/hospitals/fortis-kolkata.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'ISO 9001']),
    featured: true
  },
  {
    name: 'Apollo Multispeciality Hospitals Kolkata',
    slug: 'apollo-hospital-kolkata',
    country: 'India',
    city: 'Kolkata, West Bengal',
    address: '58, Canal Circular Road, Kadapara, Phool Bagan, Kankurgachi, Kolkata 700054',
    description: 'JCI-accredited flagship tertiary care hospital in Eastern India, leading in multi-organ transplants, robotic joint replacements, comprehensive oncology, and cardiovascular surgery.',
    image: '/images/hospitals/apollo-kolkata.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },

  // --- BANGALORE ---
  {
    name: 'Apollo Hospitals Bannerghatta Bangalore',
    slug: 'apollo-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '154/11, Opp. IIM-B, Bannerghatta Road, Bangalore 560076',
    description: 'Premier quaternary hospital recognized for coronary angioplasties, keyhole heart surgeries, complex pediatric cardiology, and neuro-interventions.',
    image: '/images/hospitals/apollo-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  },
  {
    name: 'Fortis Hospital Bangalore',
    slug: 'fortis-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '154/9, Bannerghatta Road, Opposite IIM-B, Bengaluru 560076',
    description: 'Flagship healthcare facility in South India, celebrated for excellence in orthopedics, liver and kidney transplants, neurology, and oncology.',
    image: '/images/hospitals/fortis-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  },
  {
    name: 'Gleneagles Global Hospital Bangalore',
    slug: 'global-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '67/1, Kengeri, Uttarahalli Main Road, Bangalore 560060',
    description: 'Renowned multi-organ transplant center specializing in complex liver, pancreas, and multi-visceral transplantation, pulmonology, and bariatric surgery.',
    image: '/images/hospitals/global-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Columbia Asia Hospital Bangalore (Manipal)',
    slug: 'columbia-asia-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '26/4, Brigade Gateway, Yeshwanthpur, Bangalore 560055',
    description: 'Ultra-modern international standard hospital providing clinical specialties in neurosurgery, minimally invasive spine surgery, nephrology, and trauma care.',
    image: '/images/hospitals/columbia-asia-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Manipal Hospital Bangalore',
    slug: 'manipal-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '98, HAL Old Airport Road, Kodihalli, Bengaluru 560017',
    description: 'One of India’s most esteemed multi-specialty quaternary referral hospitals, pioneering robotic surgeries, oncology, pediatric heart surgery, and organ transplants.',
    image: '/images/hospitals/manipal-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'AABI Certified']),
    featured: true
  },
  {
    name: 'Brains & Sparsh Hospital Bangalore',
    slug: 'brains-sparsh-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: 'Infantry Road & Yeshwantpur, Bangalore, Karnataka',
    description: 'Premier center of excellence for spine surgery, joint arthroplasty, complex neurosciences, stroke rehabilitation, and reconstructive trauma.',
    image: '/images/hospitals/sparsh-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'ISO 9001']),
    featured: true
  },
  {
    name: 'Rainbow Children’s Hospital Bangalore',
    slug: 'rainbow-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: '178/1 & 178/2, Opposite Brand Factory, Bannerghatta Road, Bilekahalli, Bengaluru 560076',
    description: 'Dedicated tertiary pediatric and perinatal hospital network offering pediatric cardiac surgery, pediatric neurology, neonatal ICU, and fetal medicine.',
    image: '/images/hospitals/rainbow-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Cytecare Cancer Hospital Bangalore',
    slug: 'cytecare-cancer-hospital-bangalore',
    country: 'India',
    city: 'Bangalore, Karnataka',
    address: 'Venkatala, Near Bagalur Cross, International Airport Road, Yelahanka, Bengaluru 560064',
    description: 'Comprehensive specialized cancer hospital delivering organ-site specific oncology, precision radiotherapy, targeted chemotherapy, and surgical oncology.',
    image: '/images/hospitals/cytecare-bangalore.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },

  // --- CHENNAI ---
  {
    name: 'Apollo Hospital Chennai (Greams Road)',
    slug: 'apollo-hospital-chennai',
    country: 'India',
    city: 'Chennai, Tamil Nadu',
    address: '21 Greams Lane, Off Greams Road, Thousand Lights, Chennai 600006',
    description: 'Flagship apex institution of Apollo Hospitals, internationally known for cutting-edge cardiology (TAVI, robotic CABG), proton beam cancer therapy, and organ transplants.',
    image: '/images/hospitals/apollo-chennai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Sankara Nethralaya Chennai',
    slug: 'sankara-nethralaya-chennai',
    country: 'India',
    city: 'Chennai, Tamil Nadu',
    address: '18 College Road, Nungambakkam, Chennai 600006',
    description: 'India’s premier non-profit ophthalmic specialty hospital, world-renowned for cornea transplantation, vitreo-retinal surgery, pediatric ophthalmology, and ocular oncology.',
    image: '/images/hospitals/sankara-nethralaya-chennai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'ISO 9001']),
    featured: true
  },
  {
    name: 'Gleneagles HealthCity Chennai',
    slug: 'global-hospital-chennai',
    country: 'India',
    city: 'Chennai, Tamil Nadu',
    address: '439, Cheran Nagar, Perumbakkam, Chennai 600100',
    description: 'Sprawling 21-acre quaternary hospital renowned as Asia’s leading multi-organ transplant center (liver, lung, heart, kidney, and bone marrow).',
    image: '/images/hospitals/global-chennai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'Halal-Friendly']),
    featured: true
  },
  {
    name: 'Kauvery Hospital Chennai',
    slug: 'kauvery-hospital-chennai',
    country: 'India',
    city: 'Chennai, Tamil Nadu',
    address: '199, Luz Church Road, Mylapore, Chennai 600004',
    description: 'Leading multi-specialty quaternary care hospital celebrated for advanced neurosurgery, vascular surgery, interventional cardiology, and orthopedics.',
    image: '/images/hospitals/kauvery-chennai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Rainbow Children’s Hospital Chennai',
    slug: 'rainbow-hospital-chennai',
    country: 'India',
    city: 'Chennai, Tamil Nadu',
    address: '157, Anna Salai, Guindy, Chennai 600032',
    description: 'Premier specialized pediatric care facility with state-of-the-art Level-4 NICU/PICU, pediatric surgery, child neurology, and developmental care.',
    image: '/images/hospitals/rainbow-chennai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited']),
    featured: true
  },

  // --- MUMBAI ---
  {
    name: 'Apollo Hospital Navi Mumbai',
    slug: 'apollo-hospital-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: 'Plot No. 13, Off Uran Panvel Road, Sector 23, CBD Belapur, Navi Mumbai 400614',
    description: 'JCI-accredited quaternary care hospital equipped with cutting-edge technology for robotic surgeries, liver & kidney transplants, cardiology, and oncology.',
    image: '/images/hospitals/apollo-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  },
  {
    name: 'Fortis Hospital Mumbai (Mulund)',
    slug: 'fortis-hospital-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: 'Mulund Goregaon Link Road, Industrial Area, Bhandup West, Mumbai 400078',
    description: 'Premier tertiary healthcare center renowned as Western India’s foremost heart transplant destination with comprehensive cancer care and neurosciences.',
    image: '/images/hospitals/fortis-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited']),
    featured: true
  },
  {
    name: 'Gleneagles Hospital Mumbai (Parel)',
    slug: 'global-hospital-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: '35, Dr. Ernest Borges Road, Opp Shirodkar High School, Parel, Mumbai 400012',
    description: 'Foremost quaternary care and multi-organ transplant hospital in Mumbai specializing in hepatobiliary surgery, oncology, gastroenterology, and robotic urology.',
    image: '/images/hospitals/global-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Currae Specialty Hospital Mumbai',
    slug: 'currae-hospital-mumbai',
    country: 'India',
    city: 'Mumbai / Thane, Maharashtra',
    address: 'High Street Mall, Kapurbawdi Junction, Ghodbunder Road, Thane West, Mumbai 400607',
    description: 'Boutique surgical and orthopedic center dedicated to minimally invasive arthroscopy, joint replacements, bariatric surgery, and women’s health.',
    image: '/images/hospitals/currae-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'ISO 9001']),
    featured: true
  },
  {
    name: 'Narayana Hrudayalaya Mumbai (SRCC Children’s Hospital)',
    slug: 'narayana-hrudayalaya-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: '1-1A, Haji Ali Park, K. Khadye Marg, Mahalaxmi, Mumbai 400034',
    description: 'Premier pediatric quaternary multi-specialty hospital managed by Narayana Health, leading in pediatric cardiac surgery, neurosciences, and bone marrow transplants.',
    image: '/images/hospitals/narayana-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'JCI Compliant']),
    featured: true
  },

  // --- DELHI / NCR ---
  {
    name: 'Indraprastha Apollo Hospitals Delhi',
    slug: 'apollo-hospital-delhi',
    country: 'India',
    city: 'New Delhi, Delhi NCR',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi 110076',
    description: 'India’s first JCI-accredited tertiary medical complex offering comprehensive excellence in heart transplants, robotic surgery, oncology, and pediatrics.',
    image: '/images/hospitals/apollo-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Fortis Memorial Research Institute (FMRI Gurugram)',
    slug: 'fortis-memorial-research-institute-delhi',
    country: 'India',
    city: 'Gurugram, Delhi NCR',
    address: 'Sector 44, Opposite HUDA City Centre Metro Station, Gurugram, Haryana 122002',
    description: 'Quaternary care hospital recognized worldwide as the Next Generation Hospital with premier clinical faculties in neurosurgery, robotic oncology, and bone marrow transplants.',
    image: '/images/hospitals/fortis-1.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Max Super Speciality Hospital Delhi',
    slug: 'max-hospital-delhi',
    country: 'India',
    city: 'New Delhi, Delhi NCR',
    address: '1, 2, Press Enclave Road, Mandir Marg, Saket, New Delhi 110017',
    description: 'Premier quaternary healthcare network in Delhi NCR known for Da Vinci robotic surgery, bone marrow transplant, neuro-interventions, and liver transplant.',
    image: '/images/hospitals/max-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Columbia Asia Hospital Delhi NCR (Manipal)',
    slug: 'columbia-asia-delhi',
    country: 'India',
    city: 'Gurugram, Delhi NCR',
    address: 'Block F, Gol Chakkar, Near Palam Vihar, Gurugram 122017',
    description: 'Modern multi-specialty care hospital delivering specialized surgical services in orthopedics, cardiology, bariatrics, and minimal access general surgery.',
    image: '/images/hospitals/columbia-asia-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Medanta - The Medicity',
    slug: 'medanta-the-medicity-delhi',
    country: 'India',
    city: 'Gurugram, Delhi NCR',
    address: 'CH Bakhtawar Singh Road, Sector 38, Gurugram, Haryana 122001',
    description: 'World-renowned 1,600-bed multi-super specialty quaternary medical institute founded by Dr. Naresh Trehan, housing 6 Institutes of Excellence for heart, liver, neuro, and cancer.',
    image: '/images/hospitals/medanta-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'International Fertility Centre Delhi',
    slug: 'international-fertility-centre-delhi',
    country: 'India',
    city: 'New Delhi, Delhi NCR',
    address: 'H-6, 1st Floor, Green Park Extension, New Delhi 110016',
    description: 'State-of-the-art IVF and reproductive medicine centre offering ICSI, IMSI, blastocyst culture, egg freezing, and advanced reproductive genetic diagnostics.',
    image: '/images/hospitals/ifc-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['ICMR Registered', 'ISO 9001 Certified']),
    featured: true
  },
  {
    name: 'ART Fertility Clinics Gurgaon',
    slug: 'art-fertility-clinic-gurgaon',
    country: 'India',
    city: 'Gurugram, Delhi NCR',
    address: 'Plot No. 44, Sector 44, Near HUDA City Centre, Gurugram 122002',
    description: 'Global benchmark fertility institution delivering personalized IVF protocols with proprietary artificial intelligence embryology technologies and genetic screening.',
    image: '/images/hospitals/art-fertility-gurgaon.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['ESHRE Certified', 'ISO Certified']),
    featured: true
  },
  {
    name: 'Rainbow Children’s Hospital Delhi',
    slug: 'rainbow-hospital-delhi',
    country: 'India',
    city: 'New Delhi, Delhi NCR',
    address: 'Geeta Colony & Malviya Nagar, New Delhi 110031',
    description: 'Leading children’s hospital offering comprehensive pediatric cardiology, pediatric hematology-oncology, neonatal surgery, and pediatric intensive care.',
    image: '/images/hospitals/rainbow-delhi.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },

  // --- HYDERABAD ---
  {
    name: 'Apollo Hospitals Jubilee Hills Hyderabad',
    slug: 'apollo-hospital-hyderabad',
    country: 'India',
    city: 'Hyderabad, Telangana',
    address: 'Road No 72, Opposite Bharatiya Vidya Bhavan School, Film Nagar, Jubilee Hills, Hyderabad 500033',
    description: 'Asia’s premier healthcare destination renowned for complex multi-organ transplants, robotic heart surgery, neurosciences, and precision radiation oncology.',
    image: '/images/hospitals/apollo-hyderabad.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'KIMS Hospital Hyderabad (Secunderabad)',
    slug: 'kims-hospital-hyderabad',
    country: 'India',
    city: 'Hyderabad / Secunderabad, Telangana',
    address: '1-8-31/1, Minister Road, Krishna Nagar Colony, Begumpet, Secunderabad 500003',
    description: 'Quaternary multi-specialty referral hospital in South India, celebrated for leading heart and lung transplants, ECMO care, neurosciences, and robotic joint surgeries.',
    image: '/images/hospitals/kims-hyderabad.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'Green Hospital Award']),
    featured: true
  },
  {
    name: 'Gleneagles Global Hospital Hyderabad (Lakdikapool)',
    slug: 'global-hospital-hyderabad',
    country: 'India',
    city: 'Hyderabad, Telangana',
    address: '6-1-1070/1 to 4, Lakdikapool, Hyderabad 500004',
    description: 'Pioneering transplant and quaternary care hospital in Hyderabad with state-of-the-art facilities for liver transplants, advanced gastroenterology, and oncology.',
    image: '/images/hospitals/global-hyderabad.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'CARE Hospitals Hyderabad (Banjara Hills)',
    slug: 'care-hospital-hyderabad',
    country: 'India',
    city: 'Hyderabad, Telangana',
    address: 'Road No. 1, Prem Nagar, Banjara Hills, Hyderabad 500034',
    description: 'Nationally accredited multi-specialty hospital group pioneering cardiac surgery, vascular interventions, kidney transplants, and critical care medicine.',
    image: '/images/hospitals/care-hospital-hyderabad.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'AIG Hospitals Hyderabad (Asian Institute of Gastroenterology)',
    slug: 'aig-hospital-hyderabad',
    country: 'India',
    city: 'Hyderabad, Telangana',
    address: '1-66/AIG/2 to 5, Mindspace Road, Gachibowli, Hyderabad 500032',
    description: 'World-renowned quaternary referral centre for gastroenterology, hepatology, therapeutic endoscopy, GI surgical oncology, and organ transplants.',
    image: '/images/hospitals/aig-hyderabad.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'NABL Certified']),
    featured: true
  }
];

async function run() {
  console.log('1. Downloading photos for all Indian hospitals...');
  const hospDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  if (!fs.existsSync(hospDir)) fs.mkdirSync(hospDir, { recursive: true });

  for (const h of indiaHospitalsList) {
    const filename = path.basename(h.image);
    const dest = path.join(hospDir, filename);
    if (!fs.existsSync(dest) && h.imageUrl) {
      try {
        await downloadFile(h.imageUrl, dest);
        console.log(`Downloaded image for ${h.name} -> ${filename}`);
      } catch (err) {
        console.error(`Failed download for ${filename}:`, err.message);
      }
    }
  }

  console.log('2. Upserting all Indian hospitals into Supabase PostgreSQL DB...');
  for (const h of indiaHospitalsList) {
    console.log(`Upserting [${h.city}]: ${h.name}`);
    await prisma.hospital.upsert({
      where: { slug: h.slug },
      update: {
        name: h.name,
        country: h.country,
        city: h.city,
        address: h.address,
        description: h.description,
        image: h.image,
        photos: JSON.stringify([h.image]),
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
        photos: JSON.stringify([h.image]),
        accreditations: h.accreditations,
        featured: h.featured
      }
    });
  }

  console.log('3. Updating src/data/hospitals.json with all Indian hospitals...');
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'hospitals.json');
  let currentList = [];
  if (fs.existsSync(jsonPath)) {
    try {
      currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
      currentList = [];
    }
  }

  // Merge Indian hospitals
  const mergedMap = new Map();
  currentList.forEach(h => mergedMap.set(h.slug, h));
  indiaHospitalsList.forEach(h => mergedMap.set(h.slug, {
    name: h.name,
    slug: h.slug,
    country: h.country,
    city: h.city,
    address: h.address,
    description: h.description,
    image: h.image,
    photos: JSON.stringify([h.image]),
    accreditations: h.accreditations,
    featured: h.featured
  }));

  const finalList = Array.from(mergedMap.values());
  fs.writeFileSync(jsonPath, JSON.stringify(finalList, null, 2));

  console.log(`Updated hospitals.json! Total hospitals now: ${finalList.length}`);
  await prisma.$disconnect();
}

run().catch(console.error);
