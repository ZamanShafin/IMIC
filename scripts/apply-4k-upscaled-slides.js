const fs = require('fs');
const path = require('path');

const upscaledImages = [
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/samitivej_upscaled_1787323639316.jpg',
    dest: 'public/images/slider/slide1.jpg',
    label: '4K Samitivej Hospital Bangkok'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/surgery_upscaled_1787323662259.jpg',
    dest: 'public/images/slider/slide2.jpg',
    label: '4K Advanced Surgical Suite'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/farrer_staff_upscaled_1787323689999.jpg',
    dest: 'public/images/slider/slide3.jpg',
    label: '4K Farrer Park Medical Team'
  },
  {
    src: 'C:/Users/snake/.gemini/antigravity/brain/a3daf641-6887-4c28-8307-024186331d41/farrer_lobby_upscaled_1787323714498.jpg',
    dest: 'public/images/slider/slide4.jpg',
    label: '4K Farrer Park Hospital Lobby Concourse'
  }
];

function run() {
  console.log('Copying 4K upscaled images to public/images/slider/...');
  for (const item of upscaledImages) {
    const destPath = path.join(process.cwd(), item.dest);
    fs.copyFileSync(item.src, destPath);
    const sizeKB = (fs.statSync(destPath).size / 1024).toFixed(1);
    console.log(`✓ Copied [${item.label}] -> ${item.dest} (${sizeKB} KB)`);
  }
  console.log('All 4 upscaled slides installed successfully!');
}

run();
