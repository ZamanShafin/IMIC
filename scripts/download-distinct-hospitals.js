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
  const hospDir = path.join(process.cwd(), 'public', 'images', 'hospitals');
  
  // Download distinct modern medical centre photos for Indonesia and China
  const distinctImages = [
    {
      name: 'medistra-jakarta.jpg',
      url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'rscm-jakarta.jpg',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'pumch-beijing.jpg',
      url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'fuscc-shanghai.jpg',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    }
  ];

  for (const img of distinctImages) {
    const dest = path.join(hospDir, img.name);
    try {
      await downloadFile(img.url, dest);
      console.log(`Downloaded distinct hospital photo: ${img.name}`);
    } catch (e) {
      console.error(`Failed ${img.name}:`, e.message);
    }
  }

  console.log('Distinct hospital images downloaded successfully!');
}

run().catch(console.error);
