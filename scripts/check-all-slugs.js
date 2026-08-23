const fs = require('fs');
const hospitals = JSON.parse(fs.readFileSync('src/data/hospitals.json', 'utf8'));

console.log('--- Hospital Slugs in hospitals.json ---');
hospitals.forEach((h, i) => {
  console.log(`${i + 1}. [${h.slug}] -> "${h.name}" (${h.city}, ${h.country})`);
});
