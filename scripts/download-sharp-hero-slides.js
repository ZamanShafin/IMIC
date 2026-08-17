const fs = require('fs');
const path = require('path');
const https = require('https');

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

const sharpHeroImages = [
  {
    name: 'slide1.jpg',
    // Ultra-sharp, bright modern glass hospital complex with blue skies
    url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1920&auto=format&fit=crop&q=95'
  },
  {
    name: 'slide2.jpg',
    // Bright, crisp specialist surgeons in modern operating/medical center
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&auto=format&fit=crop&q=95'
  },
  {
    name: 'slide3.jpg',
    // Ultra-clean modern medical center and air ambulance / patient transfer
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1920&auto=format&fit=crop&q=95'
  },
  {
    name: 'slide4.jpg',
    // Premium bright hospital concourse and executive care reception
    url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&auto=format&fit=crop&q=95'
  }
];

async function run() {
  const sliderDir = path.join(process.cwd(), 'public', 'images', 'slider');
  if (!fs.existsSync(sliderDir)) fs.mkdirSync(sliderDir, { recursive: true });

  console.log('Downloading sharp, vibrant, high-definition hero banner images...');
  for (const img of sharpHeroImages) {
    const dest = path.join(sliderDir, img.name);
    try {
      await downloadFile(img.url, dest);
      console.log(`✓ Downloaded sharp banner: ${img.name}`);
    } catch (e) {
      console.error(`✗ Error downloading ${img.name}:`, e.message);
    }
  }
  console.log('Finished downloading all sharp banner images!');
}

run().catch(console.error);
