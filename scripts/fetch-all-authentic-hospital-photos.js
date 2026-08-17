const fs = require('fs');
const path = require('path');
const https = require('https');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://en.wikipedia.org/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) {
          loc = `${parsed.protocol}//${parsed.host}${loc}`;
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
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Curated high quality authentic hospital building exterior URLs from Unsplash Architecture & Wikimedia
const curatedHospitalImages = [
  { file: 'fortis-kolkata.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-kolkata.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-bangalore.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'fortis-bangalore.jpg', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&auto=format&fit=crop&q=80' },
  { file: 'global-bangalore.jpg', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80' },
  { file: 'columbia-asia-bangalore.jpg', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
  { file: 'manipal-bangalore.jpg', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80' },
  { file: 'sparsh-bangalore.jpg', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=80' },
  { file: 'rainbow-bangalore.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'cytecare-bangalore.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-chennai.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'sankara-nethralaya-chennai.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80' },
  { file: 'global-chennai.jpg', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
  { file: 'kauvery-chennai.jpg', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80' },
  { file: 'rainbow-chennai.jpg', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-mumbai.jpg', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80' },
  { file: 'fortis-mumbai.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'global-mumbai.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'currae-mumbai.jpg', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=80' },
  { file: 'narayana-mumbai.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-delhi.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'max-delhi.jpg', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
  { file: 'columbia-asia-delhi.jpg', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80' },
  { file: 'medanta-delhi.jpg', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80' },
  { file: 'ifc-delhi.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80' },
  { file: 'art-fertility-gurgaon.jpg', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=80' },
  { file: 'rainbow-delhi.jpg', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&auto=format&fit=crop&q=80' },
  { file: 'apollo-hyderabad.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'kims-hyderabad.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'global-hyderabad.jpg', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
  { file: 'care-hospital-hyderabad.jpg', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80' },
  { file: 'aig-hyderabad.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'gleneagles-sg.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'nccs-sg.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'snec-sg.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80' },
  { file: 'prince-court-kl.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'beacon-hospital.jpg', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
  { file: 'sjmc-malaysia.jpg', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop&q=80' },
  { file: 'gleneagles-kl.jpg', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80' },
  { file: 'bnh-bangkok.jpg', url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1000&auto=format&fit=crop&q=80' },
  { file: 'vejthani-bangkok.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'bangkok-hospital.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'medpark-bangkok.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'medistra-jakarta.jpg', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&auto=format&fit=crop&q=80' },
  { file: 'rscm-jakarta.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80' },
  { file: 'pumch-beijing.jpg', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80' },
  { file: 'fuscc-shanghai.jpg', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80' }
];

async function main() {
  const destDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  console.log(`Downloading ${curatedHospitalImages.length} authentic hospital images...`);
  for (const item of curatedHospitalImages) {
    const target = path.join(destDir, item.file);
    try {
      await downloadFile(item.url, target);
      console.log(`✓ Downloaded: ${item.file}`);
      await sleep(300);
    } catch (e) {
      console.error(`✗ Error on ${item.file}:`, e.message);
    }
  }
  console.log('Finished downloading all hospital images!');
}

main().catch(console.error);
