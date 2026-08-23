const fs = require('fs');
const path = require('path');

const hospitals = JSON.parse(fs.readFileSync('src/data/hospitals.json', 'utf8'));
const files = fs.readdirSync('public/HOSPITALS');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

console.log('--- Matching public/HOSPITALS images to hospitals.json ---');

const matches = [];
const unmatchedFiles = [];
const matchedHospitalIds = new Set();

for (const file of files) {
  const fileBase = path.parse(file).name;
  const normFile = normalize(fileBase);

  // Find best match in hospitals
  let bestMatch = null;
  let bestScore = 0;

  for (const h of hospitals) {
    const normName = normalize(h.name);
    const normCity = normalize(h.city || '');
    const normFullName = normName + normCity;

    if (normName.includes(normFile) || normFile.includes(normName)) {
      bestMatch = h;
      bestScore = 100;
      break;
    }

    // Keyword matching
    const fileWords = fileBase.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 2);
    let matchCount = 0;
    for (const w of fileWords) {
      if (h.name.toLowerCase().includes(w) || (h.city && h.city.toLowerCase().includes(w))) {
        matchCount++;
      }
    }

    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = h;
    }
  }

  if (bestMatch && bestScore >= 2) {
    matches.push({ file, hospital: bestMatch, score: bestScore });
    matchedHospitalIds.add(bestMatch.id || bestMatch.name);
  } else {
    unmatchedFiles.push(file);
  }
}

console.log(`Matched ${matches.length} files:`);
matches.forEach(m => {
  console.log(`✓ "${m.file}" -> [${m.hospital.name}] (${m.hospital.city}, ${m.hospital.country})`);
});

if (unmatchedFiles.length > 0) {
  console.log(`\nUnmatched files (${unmatchedFiles.length}):`);
  unmatchedFiles.forEach(f => console.log(`? "${f}"`));
}

const unmatchedHospitals = hospitals.filter(h => !matchedHospitalIds.has(h.id || h.name));
console.log(`\nHospitals without matching image from public/HOSPITALS (${unmatchedHospitals.length}):`);
unmatchedHospitals.forEach(h => console.log(`- [${h.name}] (${h.city}, ${h.country})`));
