const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const prisma = new PrismaClient();

const regionUpdates = [
  // Singapore Regions
  { slug: 'mount-elizabeth-novena-hospital', city: 'Novena, Singapore', address: '38 Irrawaddy Road, Singapore 329563' },
  { slug: 'farrer-park-hospital', city: 'Farrer Park, Singapore', address: '1 Farrer Park Station Road, Singapore 217562' },
  { slug: 'mount-elizabeth-hospital-orchard', city: 'Orchard Road, Singapore', address: '3 Mount Elizabeth, Singapore 228510' },
  { slug: 'gleneagles-hospital-singapore', city: 'Napier / Orchard, Singapore', address: '6A Napier Road, Singapore 258500' },
  { slug: 'national-cancer-centre-singapore-nccs', city: 'Outram / SGH Campus, Singapore', address: '30 Hospital Boulevard, Singapore 168583' },
  { slug: 'singapore-general-hospital', city: 'Outram / SGH Campus, Singapore', address: 'Outram Road, Singapore 169608' },
  { slug: 'singapore-national-eye-centre-snec', city: 'Outram / SGH Campus, Singapore', address: '11 Third Hospital Avenue, Singapore 168751' },
  { slug: 'singapore-national-university-hospital-nuh', city: 'Kent Ridge / West, Singapore', address: '5 Lower Kent Ridge Road, Singapore 119074' },
  { slug: 'mount-alvernia-hospital', city: 'Thomson / Central, Singapore', address: '820 Thomson Road, Singapore 298149' },
  { slug: 'parkway-east-hospital', city: 'East Coast / Joo Chiat, Singapore', address: '321 Joo Chiat Place, Singapore 427990' },
  { slug: 'icon-cancer-centre-singapore', city: 'Farrer Park, Singapore', address: 'Farrer Park Medical Centre, 1 Farrer Park Station Road, Singapore' },

  // Thailand Districts
  { slug: 'bangkok-hospital-bdms-headquarter', city: 'Sukhumvit / Soonvijai, Bangkok', address: '2 Soi Soonvijai 7, New Petchburi Road, Bangkok 10310' },
  { slug: 'samitivej-sukhumvit-hospital', city: 'Sukhumvit (Thonglor), Bangkok', address: '133 Sukhumvit 49, Klongtan Nua, Vadhana, Bangkok 10110' },
  { slug: 'bnh-hospital', city: 'Silom / Convent, Bangkok', address: '9/1 Convent Road, Silom, Bangrak, Bangkok 10500' },
  { slug: 'medpark-hospital', city: 'Rama IV / Khlong Toei, Bangkok', address: '3333 Rama IV Road, Khlong Toei, Bangkok 10110' },
  { slug: 'vejthani-international-hospital', city: 'Ladprao / Bangkapi, Bangkok', address: '1 Ladprao 111, Klong-Chan, Bangkapi, Bangkok 10240' },

  // Indonesia Regions
  { slug: 'medistra-hospital', city: 'South Jakarta (Jakarta Selatan)', address: 'Jl. Jend. Gatot Subroto Kav. 59, Jakarta Selatan 12950' },
  { slug: 'rsupn-dr-cipto-mangunkusumo-rscm', city: 'Central Jakarta (Jakarta Pusat)', address: 'Jl. Diponegoro No. 71, Senen, Jakarta Pusat 10430' },

  // Malaysia Regions
  { slug: 'gleneagles-hospital-kuala-lumpur', city: 'Jalan Ampang, Kuala Lumpur', address: '282 & 286, Jalan Ampang, 50450 Kuala Lumpur' },
  { slug: 'prince-court-medical-centre', city: 'KLCC / Kia Peng, Kuala Lumpur', address: '39, Jalan Kia Peng, 50450 Kuala Lumpur' },
  { slug: 'beacon-hospital', city: 'Petaling Jaya, Selangor', address: '1, Jalan 215, Section 51, 46050 Petaling Jaya, Selangor' },
  { slug: 'subang-jaya-medical-centre-sjmc', city: 'Subang Jaya, Selangor', address: '1, Jalan SS 12/1A, 47500 Subang Jaya, Selangor' },
  { slug: 'sunway-medical-centre', city: 'Sunway City, Selangor', address: '5, Jalan Lagoon Selatan, Bandar Sunway, 47500 Petaling Jaya, Selangor' }
];

async function run() {
  console.log('Enriching regional city/district metadata in Supabase DB...');
  for (const u of regionUpdates) {
    try {
      await prisma.hospital.updateMany({
        where: { slug: u.slug },
        data: {
          city: u.city,
          address: u.address
        }
      });
      console.log(`✓ Updated: ${u.slug} -> ${u.city}`);
    } catch (e) {
      console.error(`✗ Error updating ${u.slug}:`, e.message);
    }
  }

  console.log('Syncing all updated hospitals to src/data/hospitals.json...');
  const allHospitals = await prisma.hospital.findMany({
    orderBy: [
      { country: 'asc' },
      { name: 'asc' }
    ]
  });

  const jsonPath = path.join(process.cwd(), 'src', 'data', 'hospitals.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allHospitals, null, 2));

  console.log(`Synced ${allHospitals.length} hospitals into hospitals.json successfully!`);
  await prisma.$disconnect();
}

run().catch(console.error);
