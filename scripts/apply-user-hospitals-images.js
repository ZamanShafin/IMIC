const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres'
    }
  }
});

const hospitals = JSON.parse(fs.readFileSync('src/data/hospitals.json', 'utf8'));

// Exact 1-to-1 Mapping from public/HOSPITALS filename to hospital slug/name
const fileToHospitalMapping = {
  "AIG Hospitals Hyderabad.jpg": "aig-hospitals-hyderabad",
  "Apollo Hospital Chennai.jpg": "apollo-hospital-chennai",
  "Apollo Hospital Navi Mumbai.webp": "apollo-hospital-navi-mumbai",
  "Apollo Hospitals Bannerghatta.jpg": "apollo-hospitals-bannerghatta-bangalore",
  "Apollo Hospitals Jubilee Hills.jpg": "apollo-hospitals-jubilee-hills-hyderabad",
  "Apollo Multispeciality Hospitals.jpg": "apollo-multispeciality-hospitals-kolkata",
  "ART Fertility Clinics Gurgaon.webp": "art-fertility-clinics-gurgaon",
  "Bangkok Hospital (BDMS).jpeg": "bangkok-hospital-bdms",
  "Beacon Hospital.png": "beacon-hospital",
  "BNH Hospital.jpg": "bnh-hospital",
  "Brains & Sparsh Hospital Bangalore.jpeg": "brains-sparsh-hospital-bangalore",
  "CARE Hospitals Hyderabad.webp": "care-hospitals-hyderabad",
  "Columbia Asia Hospital Bangalore.webp": "columbia-asia-hospital-bangalore",
  "Columbia Asia Hospital, Delhi NCR.jpg": "columbia-asia-hospital-delhi-ncr",
  "Currae Specialty Hospital, Mumbai.jpg": "currae-specialty-hospital-mumbai",
  "Cytecare Cancer Hospital Bangalore.jpg": "cytecare-cancer-hospital-bangalore",
  "Fortis Hospital, Bangalore..webp": "fortis-hospital-bangalore",
  "Fortis Hospital, Kolkata..webp": "fortis-hospital-kolkata",
  "Fortis Hospital, Mumbai.webp": "fortis-hospital-mumbai",
  "Foshan Fosun Chancheng Hospital.jpg": "foshan-fosun-chancheng-hospital",
  "Gleneagles Global Hospital, bangalore.jpg": "gleneagles-global-hospital-bangalore",
  "Gleneagles Global Hospital,hydrabad.jpg": "gleneagles-global-hospital-hyderabad",
  "Gleneagles Global Hospital,mumbai.jpg": "gleneagles-hospital-mumbai",
  "Gleneagles Global Hospital.jpg": "gleneagles-healthcity-chennai",
  "Gleneagles Hospital Kuala Lumpur.jpg": "gleneagles-hospital-kuala-lumpur",
  "Gleneagles Hospital Singapore.webp": "gleneagles-hospital-singapore",
  "Guangzhou Fosun Chancheng.jpg": "guangzhou-fosun-chancheng-hospital-xinshi",
  "HCG Cancer Centre..jpg": "hcg-cancer-centre",
  "Indraprastha Apollo Hospital.webp": "indraprastha-apollo-hospitals-delhi",
  "International Fertility Centre Delhi.webp": "international-fertility-centre-delhi",
  "Jaslok Hospital & Research Centre.jpg": "jaslok-hospital-research-centre-mumbai",
  "Kauvery Hospital Chennai.avif": "kauvery-hospital-chennai",
  "KIMS Hospital, Hyderabad.jpg": "kims-hospital-hyderabad",
  "Kokilaben Dhirubhai Ambani Hospital,.avif": "kokilaben-dhirubhai-ambani-hospital-mumbai",
  "Manipal Hospital, Bangalore..webp": "manipal-hospital-bangalore",
  "Max Super Speciality Hospital, Delhi.jpg": "max-super-speciality-hospital-delhi",
  "Medanta - The Medicity, Gurgaon..webp": "medanta-the-medicity",
  "Medistra Hospital.jpg": "medistra-hospital",
  "MedPark Hospital.jpg": "medpark-hospital",
  "Modern Cancer Hospital Guangzhou.jpg": "modern-cancer-hospital-guangzhou",
  "Mount Alvernia Hospital.webp": "mount-alvernia-hospital",
  "Narayana Hrudayalaya, Mumbai..png": "narayana-hrudayalaya-mumbai",
  "National Cancer Centre Singapore.jpg": "national-cancer-centre-singapore",
  "Parkway East Hospital.png": "parkway-east-hospital",
  "Prince Court Medical Centre.jpg": "prince-court-medical-centre",
  "Rainbow Children’s Hospital, Chennai..jpg": "rainbow-childrens-hospital-chennai",
  "Rainbow Children’s Hospital, Delhi..jpg": "rainbow-childrens-hospital-delhi",
  "RSUPN Dr. Cipto Mangunkusumo.jpg": "rsupn-dr-cipto-mangunkusumo",
  "Sankara Nethralaya Chennai.webp": "sankara-nethralaya-chennai",
  "Shenzhen Hengsheng Hospital.jpg": "shenzhen-hengsheng-hospital",
  "Singapore General Hospital.jpg": "singapore-general-hospital",
  "Singapore National Eye Centre.jpg": "singapore-national-eye-centre",
  "Singapore National University Hospital.jpg": "singapore-national-university-hospital",
  "Sir H N Reliance Foundation Hospital Mumbai.jpg": "sir-h-n-reliance-foundation-hospital",
  "StarKids Children’s Hospital.jpg": "starkids-childrens-hospital-shanghai",
  "Subang Jaya Medical Centre (SJMC).jpg": "subang-jaya-medical-centre-sjmc",
  "Sushrut Hospital & Research Centre.jpg": "sushrut-hospital-research-centre-mumbai",
  "Vejthani International Hospital.jpg": "vejthani-international-hospital",
  "Xuzhou Star Hospital.jpg": "xuzhou-star-hospital",
  "Zhuhai Chancheng Hospital.jpg": "zhuhai-chancheng-hospital"
};

async function main() {
  console.log('--- Applying Newly Uploaded Hospital Images ---');

  const sourceDir = path.join(process.cwd(), 'public', 'HOSPITALS');
  const targetDir = path.join(process.cwd(), 'public', 'images', 'hospitals');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let updatedCount = 0;

  for (const [filename, slug] of Object.entries(fileToHospitalMapping)) {
    const srcFilePath = path.join(sourceDir, filename);
    if (!fs.existsSync(srcFilePath)) {
      console.warn(`⚠️ Source file not found: ${filename}`);
      continue;
    }

    const ext = path.extname(filename);
    const destFileName = `${slug}${ext}`;
    const destFilePath = path.join(targetDir, destFileName);

    // Copy to public/images/hospitals/[slug].[ext]
    fs.copyFileSync(srcFilePath, destFilePath);

    const newPublicUrl = `/images/hospitals/${destFileName}`;

    // Update in JSON dataset
    const hospitalIndex = hospitals.findIndex(h => h.slug === slug);
    if (hospitalIndex !== -1) {
      hospitals[hospitalIndex].image = newPublicUrl;
      let existingPhotos = [];
      try {
        existingPhotos = typeof hospitals[hospitalIndex].photos === 'string' 
          ? JSON.parse(hospitals[hospitalIndex].photos) 
          : (hospitals[hospitalIndex].photos || []);
      } catch (e) {
        existingPhotos = [];
      }
      // Put new primary image at index 0 of photos
      hospitals[hospitalIndex].photos = JSON.stringify([newPublicUrl, ...existingPhotos.filter(p => p !== newPublicUrl)]);
      updatedCount++;
      console.log(`✓ [${updatedCount}/60] Updated "${hospitals[hospitalIndex].name}" -> ${newPublicUrl}`);
    } else {
      console.warn(`⚠️ Slug not found in JSON: ${slug}`);
    }

    // Update in Supabase PostgreSQL database
    try {
      await prisma.hospital.updateMany({
        where: { slug: slug },
        data: {
          image: newPublicUrl,
          photos: JSON.stringify([newPublicUrl])
        }
      });
    } catch (dbErr) {
      console.error(`DB update note for ${slug}:`, dbErr.message);
    }
  }

  // Save updated JSON
  fs.writeFileSync('src/data/hospitals.json', JSON.stringify(hospitals, null, 2), 'utf8');
  console.log(`\n🎉 Successfully updated ${updatedCount} hospitals in JSON and Supabase DB!`);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
