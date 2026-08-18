const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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

async function run() {
  const destDir = path.join(process.cwd(), 'public', 'images', 'team');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const url = 'https://imic.com.bd/public/dist/img/5698802431.jpg';
  const dest = path.join(destDir, 'farzana-wali-liza.jpg');
  
  console.log('Downloading Founder photo from:', url);
  await downloadFile(url, dest);
  console.log('Downloaded successfully to:', dest);
}

run().catch(console.error);
