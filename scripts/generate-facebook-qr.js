const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://www.facebook.com/InternationalMedicalInformationCentre';
const publicDir = path.join(__dirname, '..', 'public', 'images');
const fullLogoPath = path.join(publicDir, 'logo', 'logo.png');
const artifactDir = 'C:\\Users\\snake\\.gemini\\antigravity\\brain\\425d783d-780e-41fb-a3a3-39daad1b9e68';

async function generate() {
  const qrSize = 1200;
  // Generate base QR buffer with Level H error correction
  const qrBuffer = await QRCode.toBuffer(targetUrl, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 3,
    width: qrSize,
    color: {
      dark: '#0f172a', // IMIC slate-900
      light: '#ffffff'
    }
  });

  // Badge dimensions tailored for the 780x294 full IMIC logo
  const badgeWidth = 380;
  const badgeHeight = 170;
  const radius = 28;

  const badgeSvg = Buffer.from(
    '<svg width="' + badgeWidth + '" height="' + badgeHeight + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="2" y="2" width="' + (badgeWidth - 4) + '" height="' + (badgeHeight - 4) + '" rx="' + radius + '" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>' +
    '<rect x="6" y="6" width="' + (badgeWidth - 12) + '" height="' + (badgeHeight - 12) + '" rx="' + (radius - 3) + '" fill="#ffffff" stroke="#1877F2" stroke-width="2" stroke-opacity="0.35"/>' +
    '</svg>'
  );

  const logoWidth = 330;
  const logoHeight = Math.round(logoWidth * (294 / 780)); // ~124px

  const resizedLogo = await sharp(fullLogoPath)
    .resize(logoWidth, logoHeight, { fit: 'contain' })
    .png()
    .toBuffer();

  // Composite the badge and full logo together
  const badgeWithLogo = await sharp(badgeSvg)
    .composite([
      {
        input: resizedLogo,
        top: Math.round((badgeHeight - logoHeight) / 2),
        left: Math.round((badgeWidth - logoWidth) / 2)
      }
    ])
    .png()
    .toBuffer();

  // Composite badge onto QR center
  const posX = Math.round((qrSize - badgeWidth) / 2);
  const posY = Math.round((qrSize - badgeHeight) / 2);

  const finalQrPng = await sharp(qrBuffer)
    .composite([
      {
        input: badgeWithLogo,
        top: posY,
        left: posX
      }
    ])
    .png()
    .toBuffer();

  // Save PNG
  const pngPath = path.join(publicDir, 'qr-facebook.png');
  fs.writeFileSync(pngPath, finalQrPng);
  console.log('Final Facebook QR PNG saved to:', pngPath);

  // Verify readability with jsQR
  const rawData = await sharp(finalQrPng).ensureAlpha().raw().toBuffer();
  const code = jsQR(new Uint8ClampedArray(rawData), qrSize, qrSize);
  if (code && code.data === targetUrl) {
    console.log('✅ Facebook QR Code Scan VERIFIED! Decoded URL:', code.data);
  } else {
    console.warn('⚠️ Warning: QR Code scan check returned:', code ? code.data : null);
  }

  // 2. Scalable Vector SVG with embedded Base64 FULL Logo
  const fullLogoBase64 = fs.readFileSync(fullLogoPath).toString('base64');
  const qrSvgRaw = await QRCode.toString(targetUrl, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 3,
    color: {
      dark: '#0f172a',
      light: '#ffffff'
    }
  });

  const vbMatch = qrSvgRaw.match(/viewBox="0 0 (\d+) (\d+)"/);
  const vbDim = vbMatch ? parseInt(vbMatch[1], 10) : 45;

  const svgBadgeW = (vbDim * (badgeWidth / qrSize)).toFixed(2);
  const svgBadgeH = (vbDim * (badgeHeight / qrSize)).toFixed(2);
  const svgLogoW = (vbDim * (logoWidth / qrSize)).toFixed(2);
  const svgLogoH = (vbDim * (logoHeight / qrSize)).toFixed(2);

  const svgBadgeX = ((vbDim - svgBadgeW) / 2).toFixed(2);
  const svgBadgeY = ((vbDim - svgBadgeH) / 2).toFixed(2);
  const svgLogoX = ((vbDim - svgLogoW) / 2).toFixed(2);
  const svgLogoY = ((vbDim - svgLogoH) / 2).toFixed(2);

  const innerQrPaths = qrSvgRaw.replace(/<\?xml.*?\?>/, '').replace(/<svg.*?>/, '').replace(/<\/svg>/, '');

  const finalQrSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbDim} ${vbDim}" width="1200" height="1200">
  ${innerQrPaths}
  <!-- Full IMIC Logo Badge -->
  <rect x="${svgBadgeX}" y="${svgBadgeY}" width="${svgBadgeW}" height="${svgBadgeH}" rx="1.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.3"/>
  <image href="data:image/png;base64,${fullLogoBase64}" x="${svgLogoX}" y="${svgLogoY}" width="${svgLogoW}" height="${svgLogoH}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  const svgPath = path.join(publicDir, 'qr-facebook.svg');
  fs.writeFileSync(svgPath, finalQrSvg, 'utf8');
  console.log('SVG saved to:', svgPath);

  // 3. Branded Display Card SVG for Facebook Desk Standee
  const brandedCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="fbGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1877F2"/>
      <stop offset="100%" stop-color="#0062E0"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="1100" fill="#f8fafc"/>

  <!-- Main Card -->
  <g filter="url(#cardShadow)">
    <rect x="50" y="50" width="700" height="1000" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  </g>

  <!-- Top Decorative Header Bar -->
  <path d="M 50 86 Q 50 50 86 50 L 714 50 Q 750 50 750 86 L 750 240 L 50 240 Z" fill="url(#headerGrad)"/>
  <rect x="50" y="236" width="700" height="6" fill="url(#fbGrad)"/>

  <!-- Company Title -->
  <text x="400" y="115" text-anchor="middle" fill="#38bdf8" font-size="20" font-weight="800" letter-spacing="4">INTERNATIONAL MEDICAL INFORMATION CENTRE</text>
  <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="38" font-weight="900" letter-spacing="1">IMIC BANANI, DHAKA</text>
  <text x="400" y="202" text-anchor="middle" fill="#94a3b8" font-size="16" font-weight="600" letter-spacing="0.5">Patient Assistance Centre &amp; Medical Coordination</text>

  <!-- Badge: Facebook -->
  <g transform="translate(230, 275)">
    <rect x="0" y="0" width="340" height="42" rx="21" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <!-- Facebook 'f' icon -->
    <circle cx="28" cy="21" r="14" fill="#1877F2"/>
    <text x="28" y="27" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="900">f</text>
    <text x="190" y="26" text-anchor="middle" fill="#1d4ed8" font-size="16" font-weight="800" letter-spacing="0.5">OFFICIAL FACEBOOK PAGE</text>
  </g>

  <!-- Card Heading -->
  <text x="400" y="365" text-anchor="middle" fill="#0f172a" font-size="34" font-weight="900">Scan to Connect on Facebook</text>
  <text x="400" y="398" text-anchor="middle" fill="#64748b" font-size="16" font-weight="500">Doctor schedules, patient updates &amp; medical travel seminars</text>

  <!-- QR Frame with Embedded QR & FULL Center Logo -->
  <g transform="translate(190, 430)">
    <rect x="-15" y="-15" width="450" height="450" rx="28" fill="#ffffff" stroke="#1877F2" stroke-width="4"/>
    <rect x="-8" y="-8" width="436" height="436" rx="22" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
    
    <svg x="0" y="0" width="420" height="420" viewBox="0 0 ${vbDim} ${vbDim}">
      ${innerQrPaths}
      <rect x="${svgBadgeX}" y="${svgBadgeY}" width="${svgBadgeW}" height="${svgBadgeH}" rx="1.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.3"/>
      <image href="data:image/png;base64,${fullLogoBase64}" x="${svgLogoX}" y="${svgLogoY}" width="${svgLogoW}" height="${svgLogoH}" preserveAspectRatio="xMidYMid meet"/>
    </svg>
  </g>

  <!-- URL Tag -->
  <g transform="translate(170, 915)">
    <rect x="0" y="0" width="460" height="48" rx="24" fill="#1877F2"/>
    <text x="230" y="30" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="700" letter-spacing="0.5">fb.com/InternationalMedicalInformationCentre</text>
  </g>

  <!-- Footer Help -->
  <text x="400" y="995" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Scan using any Smartphone Camera • Banani, Dhaka: +8801777995995</text>
</svg>`;

  const cardSvgPath = path.join(publicDir, 'qr-facebook-card.svg');
  fs.writeFileSync(cardSvgPath, brandedCardSvg, 'utf8');
  console.log('Branded Facebook Card SVG generated at:', cardSvgPath);

  // Copy to Artifact Directory for display in conversation
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(pngPath, path.join(artifactDir, 'qr-facebook.png'));
    fs.copyFileSync(cardSvgPath, path.join(artifactDir, 'qr-facebook-card.svg'));
    console.log('Copied to artifact dir successfully!');
  }
}

generate().catch(console.error);
