const fs = require('fs');
const path = require('path');

const userImages = [
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/.user_uploaded/media_1787323316036.jpg',
    dest: 'public/images/slider/slide1.jpg',
    label: 'Samitivej Hospital Exterior'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/.user_uploaded/media_1787323316111.jpg',
    dest: 'public/images/slider/slide2.jpg',
    label: 'Advanced Surgical Theater'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/.user_uploaded/media_1787323316038.jpg',
    dest: 'public/images/slider/slide3.jpg',
    label: 'Farrer Park Medical Staff'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/.user_uploaded/media_1787323316109.jpg',
    dest: 'public/images/slider/slide4.jpg',
    label: 'Farrer Park Hospital Concourse'
  }
];

function run() {
  console.log('Copying user uploaded slider images...');
  const sliderDir = path.join(process.cwd(), 'public', 'images', 'slider');
  if (!fs.existsSync(sliderDir)) fs.mkdirSync(sliderDir, { recursive: true });

  for (const item of userImages) {
    const destPath = path.join(process.cwd(), item.dest);
    fs.copyFileSync(item.src, destPath);
    console.log(`✓ Copied [${item.label}] -> ${item.dest} (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
  }
  console.log('All 4 slider images updated successfully!');
}

run();
