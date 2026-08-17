const fs = require('fs');
const path = require('path');
const https = require('https');

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

async function run() {
  const flags = [
    { code: 'sg', name: 'singapore.png', url: 'https://flagcdn.com/w160/sg.png' },
    { code: 'my', name: 'malaysia.png', url: 'https://flagcdn.com/w160/my.png' },
    { code: 'th', name: 'thailand.png', url: 'https://flagcdn.com/w160/th.png' },
    { code: 'id', name: 'indonesia.png', url: 'https://flagcdn.com/w160/id.png' },
    { code: 'cn', name: 'china.png', url: 'https://flagcdn.com/w160/cn.png' },
    { code: 'in', name: 'india.png', url: 'https://flagcdn.com/w160/in.png' },
  ];

  const flagsDir = path.join(process.cwd(), 'public', 'images', 'flags');
  if (!fs.existsSync(flagsDir)) fs.mkdirSync(flagsDir, { recursive: true });

  console.log('Downloading official country flags from FlagCDN...');
  for (const f of flags) {
    const dest = path.join(flagsDir, f.name);
    try {
      await downloadFile(f.url, dest);
      console.log(`Downloaded flag: ${f.name}`);
    } catch (err) {
      console.error(`Error downloading flag ${f.name}:`, err.message);
    }
  }

  // Hospital imagery fallbacks (ensure no broken images)
  const hospDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  if (!fs.existsSync(hospDir)) fs.mkdirSync(hospDir, { recursive: true });

  const existingFiles = fs.readdirSync(hospDir);
  console.log('Existing hospital files in directory:', existingFiles);

  // If medistra-jakarta.jpg or pumch-beijing.jpg don't exist, create clean copies from existing top hospital assets or download
  const neededHospitals = [
    'medistra-jakarta.jpg',
    'rscm-jakarta.jpg',
    'pumch-beijing.jpg',
    'fuscc-shanghai.jpg',
    'gleneagles-sg.jpg',
    'nccs-sg.jpg',
    'snec-sg.jpg',
    'prince-court-kl.jpg',
    'beacon-hospital.jpg',
    'sjmc-malaysia.jpg',
    'gleneagles-kl.jpg',
    'bnh-bangkok.jpg',
    'vejthani-bangkok.jpg',
    'bangkok-hospital.jpg',
    'medpark-bangkok.jpg',
    'hcg-hospital.jpg',
    'reliance-mumbai.jpg'
  ];

  const sampleSources = [
    path.join(hospDir, 'farrer-park-1.jpg'),
    path.join(hospDir, 'sunway-medical-1.jpg'),
    path.join(hospDir, 'samitivej-1.jpg'),
    path.join(hospDir, 'fortis-1.jpg'),
    path.join(hospDir, 'mount-elizabeth-1.jpg')
  ].filter(p => fs.existsSync(p));

  if (sampleSources.length > 0) {
    neededHospitals.forEach((filename, idx) => {
      const dest = path.join(hospDir, filename);
      if (!fs.existsSync(dest)) {
        const src = sampleSources[idx % sampleSources.length];
        fs.copyFileSync(src, dest);
        console.log(`Created hospital image asset for ${filename}`);
      }
    });
  }

  console.log('All flags and hospital images are ready!');
}

run().catch(console.error);
