const fs = require('fs');
const html = fs.readFileSync('founder_page_raw.html', 'utf8');

// Find all img tags
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
console.log('--- ALL IMAGES IN PAGE ---');
imgMatches.forEach(m => console.log(m[0]));

// Find the main article or founder section
console.log('\n--- BODY FRAGMENTS ---');
const mainSectionMatch = html.match(/<main[\s\S]*?<\/main>|<section[\s\S]*?<\/section>/gi);
if (mainSectionMatch) {
  mainSectionMatch.forEach(s => {
    if (s.includes('Founder') || s.includes('Message') || s.includes('Managing') || s.includes('Director') || s.includes('Chairman') || s.includes('imic')) {
      console.log('FOUND SECTION:\n', s);
    }
  });
} else {
  console.log(html.slice(3000, 10000));
}
