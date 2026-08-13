const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'images', 'gallery');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function scrapeGallery() {
  console.log('Fetching https://imic.com.bd/photo-gallery...');
  const res = await fetch('https://imic.com.bd/photo-gallery');
  const html = await res.text();

  const regex = /src=[\"'](https:\/\/imic\.com\.bd\/public\/images\/gallary\/[^\x22']+)[\"']/gi;
  const urls = new Set();
  let match;

  while ((match = regex.exec(html)) !== null) {
    urls.add(match[1]);
  }

  console.log(`Found ${urls.size} unique gallery images.`);

  const downloadedList = [];

  for (const url of urls) {
    const filename = path.basename(url);
    const localPath = path.join(targetDir, filename);
    const relativeUrl = `/images/gallery/${filename}`;

    try {
      if (!fs.existsSync(localPath)) {
        console.log(`Downloading: ${filename}...`);
        const imgRes = await fetch(url);
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          fs.writeFileSync(localPath, Buffer.from(buffer));
        } else {
          console.error(`Failed ${url}: ${imgRes.status}`);
          continue;
        }
      }

      // Generate title from filename
      let title = filename
        .replace(/^\d+[\.\-_]*/, '') // remove leading ID numbers
        .replace(/\.(jpg|jpeg|png|webp)$/i, '')
        .replace(/[-_]+/g, ' ')
        .trim();

      if (!title || title.length < 3) {
        title = 'IMIC Patient Assistance & Event Gallery';
      }

      downloadedList.push({
        id: filename,
        url: relativeUrl,
        title,
        category: title.toLowerCase().includes('tv') ? 'Media & Events' : title.toLowerCase().includes('farrer') ? 'Hospital Partners' : 'CPAC Operations'
      });
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'data', 'gallery.json'),
    JSON.stringify(downloadedList, null, 2)
  );

  console.log(`Saved ${downloadedList.length} gallery items to src/data/gallery.json`);
}

scrapeGallery();
