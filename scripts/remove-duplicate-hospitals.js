const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const prisma = new PrismaClient();

const oldDuplicateSlugs = [
  'sunway-medical-centre',
  'rajagiri-hospital',
  'fortis-memorial-research-institute',
  'hcg-hospitals',
  'reliance-foundation-hospital',
  'gleneagles-global-hospitals',
  'icon-cancer-centre',
  'mount-elizabeth-hospitals',
  'samitivej-hospitals'
];

async function main() {
  console.log('Removing old duplicate hospital records from Supabase PostgreSQL DB...');
  
  for (const slug of oldDuplicateSlugs) {
    try {
      const deleted = await prisma.hospital.deleteMany({
        where: { slug: slug }
      });
      console.log(`Deleted old duplicate slug [${slug}]: ${deleted.count} record(s)`);
    } catch (e) {
      console.error(`Error deleting ${slug}:`, e.message);
    }
  }

  // Fetch clean remaining list from DB
  const cleanList = await prisma.hospital.findMany({
    orderBy: [
      { country: 'asc' },
      { name: 'asc' }
    ]
  });

  console.log(`Clean unique hospitals in DB: ${cleanList.length}`);

  // Write clean hospitals list to src/data/hospitals.json
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'hospitals.json');
  fs.writeFileSync(jsonPath, JSON.stringify(cleanList, null, 2));
  console.log(`Updated src/data/hospitals.json with ${cleanList.length} unique hospitals!`);

  await prisma.$disconnect();
}

main().catch(console.error);
