const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://imic.com.bd/#reviews';
const publicDir = path.join(__dirname, '..', 'public', 'images');
const logoIconPath = path.join(publicDir, 'logo', 'logo-icon.png');
const artifactDir = 'C:\\Users\\snake\\.gemini\\antigravity\\brain\\425d783d-780e-41fb-a3a3-39daad1b9e68';

async function generate() {
  const qrSize = 1200;
  // Generate base QR buffer
  const qrBuffer = await QRCode.toBuffer(targetUrl, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 3,
    width: qrSize,
    color: {
      dark: '#0f172a', // IMIC slate-900 / navy
      light: '#ffffff'
    }
  });

  // Center badge dimensions (22% of total QR size)
  const badgeSize = 270;
  const logoInnerSize = 200;
  const radius = 38;

  // Create rounded white badge with subtle border
  const badgeSvg = Buffer.from(`
    <svg width="${badgeSize}" height="${badgeSize}" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="${badgeSize - 4}" height="${badgeSize - 4}" rx="${radius}" fill="#ffffff" stroke="#e2e8f0" stroke-width="4"/>
      <rect x="6" y="6" width="${badgeSize - 12}" height="${badgeSize - 12}" rx="${radius - 4}" fill="#ffffff" stroke="#0d9488" stroke-width="2" stroke-opacity="0.3"/>
    </svg>
  `);

  // Resize logo-icon.png
  const resizedLogo = await sharp(logoIconPath)
    .resize(logoInnerSize, logoInnerSize, { fit: 'contain' })
    .toBuffer();

  // Composite the badge and logo together
  const badgeWithLogo = await sharp(badgeSvg)
    .composite([
      {
        input: resizedLogo,
        top: Math.round((badgeSize - logoInnerSize) / 2),
        left: Math.round((badgeSize - logoInnerSize) / 2)
      }
    ])
    .png()
    .toBuffer();

  // Composite badge onto QR code center
  const centerPos = Math.round((qrSize - badgeSize) / 2);
  const finalQrPng = await sharp(qrBuffer)
    .composite([
      {
        input: badgeWithLogo,
        top: centerPos,
        left: centerPos
      }
    ])
    .png()
    .toBuffer();

  // Save PNG
  const pngPath = path.join(publicDir, 'qr-reviews.png');
  fs.writeFileSync(pngPath, finalQrPng);
  console.log('Final QR PNG with IMIC logo saved to:', pngPath);

  // Verify readability with jsQR
  const rawData = await sharp(finalQrPng).ensureAlpha().raw().toBuffer();
  const code = jsQR(new Uint8ClampedArray(rawData), qrSize, qrSize);
  if (code && code.data === targetUrl) {
    console.log('✅ QR Code Scan VERIFIED! Decoded URL:', code.data);
  } else {
    console.warn('⚠️ Warning: QR Code scan check failed or returned:', code ? code.data : null);
  }

  // 2. Scalable Vector SVG with Base64 Logo in the Center
  const logoBase64 = fs.readFileSync(logoIconPath).toString('base64');
  const qrSvgRaw = await QRCode.toString(targetUrl, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 3,
    color: {
      dark: '#0f172a',
      light: '#ffffff'
    }
  });

  // Extract viewBox width/height from raw QR svg
  const vbMatch = qrSvgRaw.match(/viewBox="0 0 (\d+) (\d+)"/);
  const vbDim = vbMatch ? parseInt(vbMatch[1], 10) : 45;
  const svgBadgeDim = (vbDim * 0.24).toFixed(2);
  const svgLogoDim = (vbDim * 0.18).toFixed(2);
  const svgBadgePos = ((vbDim - svgBadgeDim) / 2).toFixed(2);
  const svgLogoPos = ((vbDim - svgLogoDim) / 2).toFixed(2);

  const innerQrPaths = qrSvgRaw.replace(/<\?xml.*?\?>/, '').replace(/<svg.*?>/, '').replace(/<\/svg>/, '');

  const finalQrSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbDim} ${vbDim}" width="1200" height="1200">
  ${innerQrPaths}
  <!-- IMIC Center Logo Badge -->
  <rect x="${svgBadgePos}" y="${svgBadgePos}" width="${svgBadgeDim}" height="${svgBadgeDim}" rx="1.5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.3"/>
  <image href="data:image/png;base64,${logoBase64}" x="${svgLogoPos}" y="${svgLogoPos}" width="${svgLogoDim}" height="${svgLogoDim}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  const svgPath = path.join(publicDir, 'qr-reviews.svg');
  fs.writeFileSync(svgPath, finalQrSvg, 'utf8');
  console.log('SVG with logo saved to:', svgPath);

  // 3. Branded Display Card SVG
  const brandedCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#14b8a6"/>
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
  <rect x="50" y="236" width="700" height="6" fill="url(#tealGrad)"/>

  <!-- Company Title -->
  <text x="400" y="115" text-anchor="middle" fill="#14b8a6" font-size="20" font-weight="800" letter-spacing="4">INTERNATIONAL MEDICAL INFORMATION CENTRE</text>
  <text x="400" y="165" text-anchor="middle" fill="#ffffff" font-size="38" font-weight="900" letter-spacing="1">IMIC BANANI, DHAKA</text>
  <text x="400" y="202" text-anchor="middle" fill="#94a3b8" font-size="16" font-weight="600" letter-spacing="0.5">Patient Assistance Centre &amp; Medical Coordination</text>

  <!-- Badge: Reviews -->
  <g transform="translate(250, 275)">
    <rect x="0" y="0" width="300" height="42" rx="21" fill="#fef3c7" stroke="#fde68a" stroke-width="1.5"/>
    <text x="150" y="26" text-anchor="middle" fill="#92400e" font-size="16" font-weight="800" letter-spacing="0.5">⭐⭐⭐⭐⭐ 5.0 RATED</text>
  </g>

  <!-- Card Heading -->
  <text x="400" y="365" text-anchor="middle" fill="#0f172a" font-size="32" font-weight="900">Scan to Read Patient Reviews</text>
  <text x="400" y="398" text-anchor="middle" fill="#64748b" font-size="16" font-weight="500">Authentic experiences from verified Bangladesh patients &amp; families</text>

  <!-- QR Frame with Embedded QR & Center Logo -->
  <g transform="translate(190, 430)">
    <rect x="-15" y="-15" width="450" height="450" rx="28" fill="#ffffff" stroke="#0d9488" stroke-width="4"/>
    <rect x="-8" y="-8" width="436" height="436" rx="22" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
    
    <svg x="0" y="0" width="420" height="420" viewBox="0 0 ${vbDim} ${vbDim}">
      ${innerQrPaths}
      <rect x="${svgBadgePos}" y="${svgBadgePos}" width="${svgBadgeDim}" height="${svgBadgeDim}" rx="1.5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.3"/>
      <image href="data:image/png;base64,${logoBase64}" x="${svgLogoPos}" y="${svgLogoPos}" width="${svgLogoDim}" height="${svgLogoDim}" preserveAspectRatio="xMidYMid meet"/>
    </svg>
  </g>

  <!-- URL Tag -->
  <g transform="translate(210, 915)">
    <rect x="0" y="0" width="380" height="48" rx="24" fill="#0f172a"/>
    <text x="190" y="30" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700" letter-spacing="0.5">imic.com.bd/#reviews</text>
  </g>

  <!-- Footer Help -->
  <text x="400" y="995" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Scan using any Smartphone Camera • Banani, Dhaka: +8801777995995</text>
</svg>`;

  const cardSvgPath = path.join(publicDir, 'qr-reviews-card.svg');
  fs.writeFileSync(cardSvgPath, brandedCardSvg, 'utf8');
  console.log('Branded Card SVG with logo generated at:', cardSvgPath);

  // Copy to Artifact Directory for display in conversation
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(pngPath, path.join(artifactDir, 'qr-reviews.png'));
    fs.copyFileSync(cardSvgPath, path.join(artifactDir, 'qr-reviews-card.svg'));
    console.log('Copied to artifact dir successfully!');
  }
}

generate().catch(console.error);
