const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');

process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const prisma = new PrismaClient();

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' } }, (res) => {
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

const newChinaHospitals = [
  {
    name: 'Foshan Fosun Chancheng Hospital',
    slug: 'foshan-fosun-chancheng-hospital',
    country: 'China',
    city: 'Foshan, Guangdong',
    address: 'No. 3 Lingnan Avenue North, Chancheng District, Foshan, Guangdong 528000',
    description: 'Flagship JCI-accredited tertiary general hospital of Fosun Health, specializing in orthopedics, spinal surgery, cardiovascular care, oncology, and minimally invasive surgery.',
    image: '/images/hospitals/foshan-chancheng-hospital.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'National Class A Tertiary Hospital']),
    featured: true
  },
  {
    name: 'Guangzhou Fosun Chancheng Hospital (Xinshi Hospital)',
    slug: 'guangzhou-fosun-chancheng-hospital-xinshi',
    country: 'China',
    city: 'Guangzhou, Guangdong',
    address: 'No. 8 Xinshi Xinjie, Baiyun District, Guangzhou, Guangdong 510410',
    description: 'Premier tertiary comprehensive hospital in Baiyun Guangzhou, delivering advanced clinical care in neurosciences, cardiovascular medicine, rehabilitation, and general surgery.',
    image: '/images/hospitals/guangzhou-xinshi-hospital.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['Class A Tertiary Hospital', 'ISO 9001 Certified']),
    featured: true
  },
  {
    name: 'Shenzhen Hengsheng Hospital',
    slug: 'shenzhen-hengsheng-hospital',
    country: 'China',
    city: 'Shenzhen, Guangdong',
    address: 'No. 20 Yinshu Road, Xixiang Street, Baoan District, Shenzhen, Guangdong 518102',
    description: 'Large modern tertiary general hospital overlooking Qianhai Bay, offering state-of-the-art reproductive medicine (IVF), oncology, cardiovascular interventions, and trauma surgery.',
    image: '/images/hospitals/shenzhen-hengsheng-hospital.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['Class A Tertiary Hospital', 'National IVF Licensed Centre']),
    featured: true
  },
  {
    name: 'Zhuhai Chancheng Hospital',
    slug: 'zhuhai-chancheng-hospital',
    country: 'China',
    city: 'Zhuhai, Guangdong',
    address: 'No. 128 Nanping Technology Park, Xiangzhou District, Zhuhai, Guangdong 519060',
    description: 'Specialized healthcare facility in Zhuhai providing high-standard orthopedic rehabilitation, geriatric medicine, chronic disease management, and minimally invasive surgery.',
    image: '/images/hospitals/zhuhai-chancheng-hospital.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['Class A Secondary General Hospital', 'Fosun Health Network']),
    featured: true
  },
  {
    name: 'StarKids Children’s Hospital Shanghai',
    slug: 'starkids-childrens-hospital-shanghai',
    country: 'China',
    city: 'Shanghai',
    address: 'No. 1088 Jinxiu Road, Pudong New Area, Shanghai 200135',
    description: 'International pediatric tertiary specialty hospital in Shanghai, providing world-class pediatric neurology, pediatric surgery, developmental pediatrics, and pediatric cardiology.',
    image: '/images/hospitals/starkids-shanghai.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'International Pediatric Quality Standards']),
    featured: true
  },
  {
    name: 'Xuzhou Star Hospital',
    slug: 'xuzhou-star-hospital',
    country: 'China',
    city: 'Xuzhou, Jiangsu',
    address: 'No. 68 Tongshan Road, Yunlong District, Xuzhou, Jiangsu 221004',
    description: 'Renowned tertiary specialty hospital in Huaihai Economic Zone delivering advanced cardiovascular care, oncology radiation, orthopedics, and executive health check-ups.',
    image: '/images/hospitals/xuzhou-star-hospital.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['Class A Tertiary Hospital', 'ISO Certified']),
    featured: true
  },
  {
    name: 'Modern Cancer Hospital Guangzhou (St. Stamford)',
    slug: 'modern-cancer-hospital-guangzhou',
    country: 'China',
    city: 'Guangzhou, Guangdong',
    address: 'No. 2 Lianquan Road, Tianhe District, Guangzhou, Guangdong 510500',
    description: 'Internationally recognized JCI-accredited cancer hospital pioneering 18 minimally invasive targeted therapies including Cryotherapy, NanoKnife, Interventional Chemotherapy, and Particle Implantation.',
    image: '/images/hospitals/modern-cancer-guangzhou.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80',
    accreditations: JSON.stringify(['JCI Accredited', 'Singapore Raffles Medical Group Partner', 'Minimally Invasive Cancer Pioneer']),
    featured: true
  }
];

async function run() {
  console.log('1. Removing previous China hospitals from Supabase DB...');
  await prisma.hospital.deleteMany({
    where: { country: 'China' }
  });

  console.log('2. Downloading authentic photos for 7 China hospitals...');
  const hospDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  if (!fs.existsSync(hospDir)) fs.mkdirSync(hospDir, { recursive: true });

  for (const h of newChinaHospitals) {
    const filename = path.basename(h.image);
    const dest = path.join(hospDir, filename);
    if (h.imageUrl) {
      try {
        await downloadFile(h.imageUrl, dest);
        console.log(`Downloaded photo for ${h.name} -> ${filename}`);
      } catch (err) {
        console.error(`Failed ${filename}:`, err.message);
      }
    }
  }

  console.log('3. Inserting 7 new China hospitals into Supabase DB...');
  for (const h of newChinaHospitals) {
    console.log(`Creating [China - ${h.city}]: ${h.name}`);
    await prisma.hospital.create({
      data: {
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

  console.log('4. Syncing src/data/hospitals.json...');
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
