const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');

process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const prisma = new PrismaClient();

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) {
          const u = new URL(url);
          loc = `${u.protocol}//${u.host}${loc}`;
        }
        return downloadFile(loc, dest).then(resolve).catch(reject);
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

const newMumbaiHospitals = [
  {
    name: 'Kokilaben Dhirubhai Ambani Hospital and Medical Research Institute',
    slug: 'kokilaben-dhirubhai-ambani-hospital-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053',
    description: 'Flagship JCI, NABH, and CAP-accredited quaternary super-speciality healthcare institute in Mumbai. Pioneering Full Time Specialist System (FTSS), da Vinci Xi robotic cancer surgery, pediatric cardiac surgery, comprehensive neurosciences, multi-organ transplants, and advanced sports medicine.',
    image: '/images/hospitals/kokilaben-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=85',
    accreditations: JSON.stringify(['JCI Accredited', 'NABH Accredited', 'CAP Accredited', 'NABL Certified']),
    featured: true
  },
  {
    name: 'Sushrut Hospital & Research Centre',
    slug: 'sushrut-hospital-research-centre-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: '365, Swastik Park, Chembur East, Mumbai, Maharashtra 400071',
    description: 'Distinguished multi-speciality tertiary hospital and research centre in Chembur, Mumbai, specializing in advanced nephrology, kidney transplants, high-dependency ICU critical care, laparoscopic general surgery, orthopaedics, and interventional cardiology.',
    image: '/images/hospitals/sushrut-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=85',
    accreditations: JSON.stringify(['NABH Accredited', 'ISO 9001 Certified', 'Apex Renal Care Center']),
    featured: true
  },
  {
    name: 'Jaslok Hospital & Research Centre',
    slug: 'jaslok-hospital-research-centre-mumbai',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    address: '15, Dr. Deshmukh Marg, Pedder Road, Cumballa Hill, Mumbai, Maharashtra 400026',
    description: 'One of India’s most iconic landmark multi-specialty institutions on Pedder Road, South Mumbai. Renowned pioneer in kidney & liver transplantation, interventional cardiology, MR-guided Focused Ultrasound (MRgFUS), neurosurgery, IVF genetics, and high-dose oncology radiation.',
    image: '/images/hospitals/jaslok-mumbai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=85',
    accreditations: JSON.stringify(['NABH Accredited', 'NABL Certified', 'JCI Benchmark Partner', 'Pioneer Transplant Institute']),
    featured: true
  }
];

async function run() {
  console.log('1. Downloading photos for new Mumbai hospitals...');
  const hospDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  if (!fs.existsSync(hospDir)) fs.mkdirSync(hospDir, { recursive: true });

  for (const h of newMumbaiHospitals) {
    const filename = path.basename(h.image);
    const dest = path.join(hospDir, filename);
    if (h.imageUrl) {
      try {
        await downloadFile(h.imageUrl, dest);
        console.log(`✓ Downloaded image for ${h.name} -> ${filename}`);
      } catch (err) {
        console.error(`✗ Error downloading ${filename}:`, err.message);
      }
    }
  }

  console.log('2. Upserting into Supabase PostgreSQL DB...');
  for (const h of newMumbaiHospitals) {
    console.log(`Upserting [Mumbai]: ${h.name}`);
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

  console.log('3. Syncing src/data/hospitals.json...');
  const allHospitals = await prisma.hospital.findMany({
    orderBy: [
      { country: 'asc' },
      { name: 'asc' }
    ]
  });

  const jsonPath = path.join(process.cwd(), 'src', 'data', 'hospitals.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allHospitals, null, 2));

  console.log(`Successfully updated database and hospitals.json! Total hospitals: ${allHospitals.length}`);
  await prisma.$disconnect();
}

run().catch(console.error);
