process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mapping = {
  "AIG Hospitals Hyderabad.jpg": "aig-hospital-hyderabad",
  "Apollo Hospital Chennai.jpg": "apollo-hospital-chennai",
  "Apollo Hospital Navi Mumbai.webp": "apollo-hospital-mumbai",
  "Apollo Hospitals Bannerghatta.jpg": "apollo-hospital-bangalore",
  "Apollo Hospitals Jubilee Hills.jpg": "apollo-hospital-hyderabad",
  "Apollo Multispeciality Hospitals.jpg": "apollo-hospital-kolkata",
  "ART Fertility Clinics Gurgaon.webp": "art-fertility-clinic-gurgaon",
  "Bangkok Hospital (BDMS).jpeg": "bangkok-hospital-bdms",
  "Beacon Hospital.png": "beacon-hospital-malaysia",
  "BNH Hospital.jpg": "bnh-hospital-bangkok",
  "Brains & Sparsh Hospital Bangalore.jpeg": "brains-sparsh-hospital-bangalore",
  "CARE Hospitals Hyderabad.webp": "care-hospital-hyderabad",
  "Columbia Asia Hospital Bangalore.webp": "columbia-asia-hospital-bangalore",
  "Columbia Asia Hospital, Delhi NCR.jpg": "columbia-asia-delhi",
  "Currae Specialty Hospital, Mumbai.jpg": "currae-hospital-mumbai",
  "Cytecare Cancer Hospital Bangalore.jpg": "cytecare-cancer-hospital-bangalore",
  "Fortis Hospital, Bangalore..webp": "fortis-hospital-bangalore",
  "Fortis Hospital, Kolkata..webp": "fortis-hospital-kolkata",
  "Fortis Hospital, Mumbai.webp": "fortis-hospital-mumbai",
  "Foshan Fosun Chancheng Hospital.jpg": "foshan-fosun-chancheng-hospital",
  "Gleneagles Global Hospital, bangalore.jpg": "global-hospital-bangalore",
  "Gleneagles Global Hospital,hydrabad.jpg": "global-hospital-hyderabad",
  "Gleneagles Global Hospital,mumbai.jpg": "global-hospital-mumbai",
  "Gleneagles Global Hospital.jpg": "global-hospital-chennai",
  "Gleneagles Hospital Kuala Lumpur.jpg": "gleneagles-hospital-kuala-lumpur",
  "Gleneagles Hospital Singapore.webp": "gleneagles-hospital-singapore",
  "Guangzhou Fosun Chancheng.jpg": "guangzhou-fosun-chancheng-hospital-xinshi",
  "HCG Cancer Centre..jpg": "hcg-cancer-centre-bangalore",
  "Indraprastha Apollo Hospital.webp": "apollo-hospital-delhi",
  "International Fertility Centre Delhi.webp": "international-fertility-centre-delhi",
  "Jaslok Hospital & Research Centre.jpg": "jaslok-hospital-research-centre-mumbai",
  "Kauvery Hospital Chennai.avif": "kauvery-hospital-chennai",
  "KIMS Hospital, Hyderabad.jpg": "kims-hospital-hyderabad",
  "Kokilaben Dhirubhai Ambani Hospital,.avif": "kokilaben-dhirubhai-ambani-hospital-mumbai",
  "Manipal Hospital, Bangalore..webp": "manipal-hospital-bangalore",
  "Max Super Speciality Hospital, Delhi.jpg": "max-hospital-delhi",
  "Medanta - The Medicity, Gurgaon..webp": "medanta-the-medicity-delhi",
  "Medistra Hospital.jpg": "medistra-hospital-jakarta",
  "MedPark Hospital.jpg": "medpark-hospital-bangkok",
  "Modern Cancer Hospital Guangzhou.jpg": "modern-cancer-hospital-guangzhou",
  "Mount Alvernia Hospital.webp": "mount-alvernia-hospital",
  "Narayana Hrudayalaya, Mumbai..png": "narayana-hrudayalaya-mumbai",
  "National Cancer Centre Singapore.jpg": "national-cancer-centre-singapore-nccs",
  "Parkway East Hospital.png": "parkway-east-hospital",
  "Prince Court Medical Centre.jpg": "prince-court-medical-centre",
  "Rainbow Children’s Hospital, Chennai..jpg": "rainbow-hospital-chennai",
  "Rainbow Children’s Hospital, Delhi..jpg": "rainbow-hospital-delhi",
  "RSUPN Dr. Cipto Mangunkusumo.jpg": "rsupn-dr-cipto-mangunkusumo-rscm-jakarta",
  "Sankara Nethralaya Chennai.webp": "sankara-nethralaya-chennai",
  "Shenzhen Hengsheng Hospital.jpg": "shenzhen-hengsheng-hospital",
  "Singapore General Hospital.jpg": "singapore-general-hospital",
  "Singapore National Eye Centre.jpg": "singapore-national-eye-centre-snec",
  "Singapore National University Hospital.jpg": "nuh-singapore",
  "Sir H N Reliance Foundation Hospital Mumbai.jpg": "sir-h-n-reliance-foundation-hospital-mumbai",
  "StarKids Children’s Hospital.jpg": "starkids-childrens-hospital-shanghai",
  "Subang Jaya Medical Centre (SJMC).jpg": "subang-jaya-medical-centre-sjmc",
  "Sushrut Hospital & Research Centre.jpg": "sushrut-hospital-research-centre-mumbai",
  "Vejthani International Hospital.jpg": "vejthani-international-hospital-bangkok",
  "Xuzhou Star Hospital.jpg": "xuzhou-star-hospital",
  "Zhuhai Chancheng Hospital.jpg": "zhuhai-chancheng-hospital"
};

async function run() {
  const sourceDir = path.join(process.cwd(), 'public', 'HOSPITALS');
  const targetDir = path.join(process.cwd(), 'public', 'images', 'hospitals');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const hospitalsData = JSON.parse(fs.readFileSync('src/data/hospitals.json', 'utf8'));

  let count = 0;
  for (const [filename, slug] of Object.entries(mapping)) {
    const srcPath = path.join(sourceDir, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File missing: ${filename}`);
      continue;
    }

    const ext = path.extname(filename);
    const destName = `${slug}${ext}`;
    const destPath = path.join(targetDir, destName);
    fs.copyFileSync(srcPath, destPath);

    const publicUrl = `/images/hospitals/${destName}`;

    const index = hospitalsData.findIndex(h => h.slug === slug);
    if (index !== -1) {
      hospitalsData[index].image = publicUrl;
      let existing = [];
      try {
        existing = typeof hospitalsData[index].photos === 'string'
          ? JSON.parse(hospitalsData[index].photos)
          : (hospitalsData[index].photos || []);
      } catch (e) {
        existing = [];
      }
      hospitalsData[index].photos = JSON.stringify([publicUrl, ...existing.filter(p => p !== publicUrl)]);
      count++;
      console.log(`[${count}/60] Updated "${hospitalsData[index].name}" -> ${publicUrl}`);
    } else {
      console.error(`Slug not found in dataset: ${slug}`);
    }
  }

  fs.writeFileSync('src/data/hospitals.json', JSON.stringify(hospitalsData, null, 2), 'utf8');
  console.log(`\n✓ Successfully synced all ${count} hospital images in src/data/hospitals.json!`);

  console.log('\nUpdating Supabase PostgreSQL database records via Prisma...');
  let dbCount = 0;
  for (const [filename, slug] of Object.entries(mapping)) {
    const ext = path.extname(filename);
    const publicUrl = `/images/hospitals/${slug}${ext}`;
    const photosJson = JSON.stringify([publicUrl]);

    try {
      await prisma.hospital.updateMany({
        where: { slug: slug },
        data: {
          image: publicUrl,
          photos: photosJson
        }
      });
      dbCount++;
    } catch (err) {
      console.warn(`DB note for ${slug}:`, err.message);
    }
  }

  console.log(`✓ Successfully updated ${dbCount} hospital records in Supabase PostgreSQL!`);
  await prisma.$disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
