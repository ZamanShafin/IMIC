process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const srcImage = 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/.user_uploaded/media_1787465334824.jpg';
const destImage = path.join(process.cwd(), 'public', 'images', 'hospitals', 'columbia-asia-delhi.jpg');
const slug = 'columbia-asia-delhi';

async function run() {
  console.log(`Copying user image to ${destImage}...`);
  fs.copyFileSync(srcImage, destImage);
  console.log(`✓ Image copied successfully (${(fs.statSync(destImage).size / 1024).toFixed(1)} KB)`);

  const hospitalsData = JSON.parse(fs.readFileSync('src/data/hospitals.json', 'utf8'));
  const index = hospitalsData.findIndex(h => h.slug === slug);
  if (index !== -1) {
    const publicUrl = `/images/hospitals/columbia-asia-delhi.jpg?v=${Date.now()}`;
    hospitalsData[index].image = `/images/hospitals/columbia-asia-delhi.jpg`;
    hospitalsData[index].photos = JSON.stringify([`/images/hospitals/columbia-asia-delhi.jpg`]);
    fs.writeFileSync('src/data/hospitals.json', JSON.stringify(hospitalsData, null, 2), 'utf8');
    console.log(`✓ Updated src/data/hospitals.json for ${hospitalsData[index].name}`);
  }

  try {
    await prisma.hospital.updateMany({
      where: { slug: slug },
      data: {
        image: '/images/hospitals/columbia-asia-delhi.jpg',
        photos: JSON.stringify(['/images/hospitals/columbia-asia-delhi.jpg'])
      }
    });
    console.log(`✓ Updated Supabase PostgreSQL record for slug "${slug}"`);
  } catch (err) {
    console.warn('DB update note:', err.message);
  }

  await prisma.$disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
