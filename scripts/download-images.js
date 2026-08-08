const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const imageList = [
  // Logo
  { url: 'https://imic.com.bd/public/images/983621061IMIC-Logo.jpeg', dest: 'logo/logo.jpeg' },

  // Hero carousel
  { url: 'https://imic.com.bd/public/images/slider/1470035297Untitled-1.jpg', dest: 'slider/slide1.jpg' },
  { url: 'https://imic.com.bd/public/images/slider/1184152221Untitled-2.jpg', dest: 'slider/slide2.jpg' },
  { url: 'https://imic.com.bd/public/images/slider/860469809Untitled-4-min.jpg', dest: 'slider/slide3.jpg' },
  { url: 'https://imic.com.bd/public/images/slider/1827362846Untitled-3.jpg', dest: 'slider/slide4.jpg' },

  // Services icons
  { url: 'https://imic.com.bd/public/images/service/703962117Picture3.png', dest: 'services/direct-admission.png' },
  { url: 'https://imic.com.bd/public/images/service/1978542220Picture1.png', dest: 'services/doctor-appointment.png' },
  { url: 'https://imic.com.bd/public/images/service/194029101Picture7.png', dest: 'services/visa-application.png' },
  { url: 'https://imic.com.bd/public/images/service/408592057Picture9.png', dest: 'services/ticketing.png' },
  { url: 'https://imic.com.bd/public/images/service/810732956Picture13.png', dest: 'services/air-ambulance.png' },
  { url: 'https://imic.com.bd/public/images/service/1192025677Picture5.png', dest: 'services/treatment-plan.png' },
  { url: 'https://imic.com.bd/public/images/service/621890749Picture11.png', dest: 'services/accommodation.png' },
  { url: 'https://imic.com.bd/public/images/service/1555885378Picture2.png', dest: 'services/airport-meet.png' },
  { url: 'https://imic.com.bd/public/images/service/1459754849Picture6.png', dest: 'services/interpreter.png' },
  { url: 'https://imic.com.bd/public/images/service/619051771Picture4.png', dest: 'services/hospitalization-support.png' },
  { url: 'https://imic.com.bd/public/images/service/948028730Picture8.png', dest: 'services/billing-financial.png' },
  { url: 'https://imic.com.bd/public/images/service/952807238Picture12.png', dest: 'services/general-enquiries.png' },

  // Specialities highlight icons
  { url: 'https://imic.com.bd/public/images/service/5734145544-2.png', dest: 'speciality-highlights/countries.png' },
  { url: 'https://imic.com.bd/public/images/service/223913502Picture15-1.png', dest: 'speciality-highlights/foreign-hospitals.png' },
  { url: 'https://imic.com.bd/public/images/service/1268608974f1_visa_icon.png', dest: 'speciality-highlights/visa-assistance.png' },
  { url: 'https://imic.com.bd/public/images/service/326444164Picture13.png', dest: 'speciality-highlights/air-ambulance.png' },
  { url: 'https://imic.com.bd/public/images/service/1711381995Direct-Admission.png', dest: 'speciality-highlights/direct-admission.png' },
  { url: 'https://imic.com.bd/public/images/service/1819686477TICKET.png', dest: 'speciality-highlights/ticketing.png' },
  { url: 'https://imic.com.bd/public/images/service/98630548Picture16.png', dest: 'speciality-highlights/accommodation.png' },
  { url: 'https://imic.com.bd/public/images/service/2053264168Picture17.png', dest: 'speciality-highlights/flight-stretcher.png' },

  // Process
  { url: 'https://imic.com.bd/public/images/how-we-work-2.png', dest: 'process/how-we-work.png' },

  // Healthcare partners
  { url: 'https://imic.com.bd/public/images/service/300025677ulab_logo.gif', dest: 'partners/ulab.gif' },
  { url: 'https://imic.com.bd/public/images/service/1550785809unnamed-1.png', dest: 'partners/partner1.png' },
  { url: 'https://imic.com.bd/public/images/service/1799684865logo.png', dest: 'partners/partner2.png' },
  { url: 'https://imic.com.bd/public/images/service/141761033Untitled-2.png', dest: 'partners/partner3.png' },
  { url: 'https://imic.com.bd/public/images/service/167606471524254766_1873627162655252_3296614467876923817_o.jpg', dest: 'partners/partner4.jpg' },
  { url: 'https://imic.com.bd/public/images/service/990698214front-design2.png', dest: 'partners/partner5.png' },
  { url: 'https://imic.com.bd/public/images/service/243115798gp-pwa-180.png', dest: 'partners/partner6.png' },
  { url: 'https://imic.com.bd/public/images/service/2116812934Lions_Clubs_International_logo.svg_.png', dest: 'partners/partner7.png' },
  { url: 'https://imic.com.bd/public/images/service/769511384949b1254-6231-41ae-8c3f-6cc69c9c48b4.jpg', dest: 'partners/partner8.jpg' },

  // Testimonial photos
  { url: 'https://imic.com.bd/public/images/service/1939920371672152854.png', dest: 'testimonials/patient1.png' },
  { url: 'https://imic.com.bd/public/images/service/17419258372-150x150.png', dest: 'testimonials/patient2.png' },

  // Accreditations
  { url: 'https://imic.com.bd/public/images/service/3582409696.jpg', dest: 'accreditations/accred1.jpg' },
  { url: 'https://imic.com.bd/public/images/service/20549385867.jpg', dest: 'accreditations/accred2.jpg' },
  { url: 'https://imic.com.bd/public/images/service/8100155794-1.png', dest: 'accreditations/accred3.png' },
  { url: 'https://imic.com.bd/public/images/service/16209615295.png', dest: 'accreditations/accred4.png' },
  { url: 'https://imic.com.bd/public/images/service/1618281813.png', dest: 'accreditations/accred5.png' },
  { url: 'https://imic.com.bd/public/images/service/7934235162-1.png', dest: 'accreditations/accred6.png' },
  { url: 'https://imic.com.bd/public/images/service/20715101341.png', dest: 'accreditations/accred7.png' },

  // Hospitals
  { url: 'https://imic.com.bd/public/images/products/1250794616Farrer-Park-Hospital.jpg', dest: 'hospitals/farrer-park-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/175113606deluxe-suite.jpg', dest: 'hospitals/farrer-park-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/402090665Icon-Cancer-Centre-Singapore-768x476.jpg', dest: 'hospitals/icon-cancer-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/850298451ICON-CANCER-CENTRE.jpg', dest: 'hospitals/icon-cancer-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/1174947280Sunway-Medical-Centre.jpg', dest: 'hospitals/sunway-medical-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/493838786Samitivej-Hospital.jpg', dest: 'hospitals/samitivej-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/2117789338Gleneagles-Hospital-Singapore.jpg', dest: 'hospitals/gleneagles-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/882880608about_bg2.jpg', dest: 'hospitals/mount-alvernia-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/193521147Mount-Alvernia-Hospital.jpg', dest: 'hospitals/mount-alvernia-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/900858951Mount-Elizabeth-Novena-Hospital.jpeg', dest: 'hospitals/mount-elizabeth-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/964089879Singapore_General_Hospital_Facade.jfif', dest: 'hospitals/sgh-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/1426395962Singapore-National-University-Hospital.jpg', dest: 'hospitals/nuh-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/1158704353FORTIS-HOSPITAL.jpg', dest: 'hospitals/fortis-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/470685375WhatsApp-Image-2022-06-25-at-3.27.10-PM.jpeg', dest: 'hospitals/fortis-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/349581324hcg-HOSPITALS.jpg', dest: 'hospitals/hcg-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/894242233HCG-BANGALORE.png', dest: 'hospitals/hcg-2.png' },
  { url: 'https://imic.com.bd/public/images/products/265586559Reliance-Hospital-mumbai.webp', dest: 'hospitals/reliance-1.webp' },
  { url: 'https://imic.com.bd/public/images/products/33395301Reliance-Hospital-Akola.jpg', dest: 'hospitals/reliance-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/95830295662ad0c7d85de42589a4da337ec1c587c.jpg', dest: 'hospitals/rajagiri-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/1688777533Rajagiri-Hospital-Kochi.jpg', dest: 'hospitals/rajagiri-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/163692821520220322_140300~2.jpg', dest: 'hospitals/parkway-east-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/1744329398Parkway-East-Hospital-01.jpg', dest: 'hospitals/parkway-east-2.jpg' },
  { url: 'https://imic.com.bd/public/images/products/183735540mount-elizabeth-novena-hospital-singapore-facade-2.jpg', dest: 'hospitals/mount-elizabeth-novena-1.jpg' },
  { url: 'https://imic.com.bd/public/images/products/91199849122.jpg', dest: 'hospitals/mount-elizabeth-novena-2.jpg' },
];

const baseDir = path.join(__dirname, '..', 'public', 'images');

async function downloadFile(url, targetPath) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(targetPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, targetPath).then(resolve);
      } else {
        console.warn(`Failed ${response.statusCode}: ${url}`);
        resolve(false);
      }
    });

    request.on('error', (err) => {
      console.warn(`Error downloading ${url}: ${err.message}`);
      resolve(false);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      console.warn(`Timeout downloading ${url}`);
      resolve(false);
    });
  });
}

function createFallbackSvg(destPath, text) {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="#0F2C59"/>
    <rect x="20" y="20" width="560" height="360" fill="none" stroke="#00A896" stroke-width="4" rx="12"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="24" font-weight="bold">IMIC Healthcare Partner</text>
    <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#00A896" font-family="sans-serif" font-size="16">${text}</text>
  </svg>`;
  fs.writeFileSync(destPath + '.svg', svgContent, 'utf-8');
}

async function main() {
  console.log('Starting image extraction from imic.com.bd...');
  let successCount = 0;
  let fallbackCount = 0;

  for (const item of imageList) {
    const targetPath = path.join(baseDir, item.dest);
    const ok = await downloadFile(item.url, targetPath);
    if (ok) {
      successCount++;
      console.log(`[OK] Saved ${item.dest}`);
    } else {
      fallbackCount++;
      createFallbackSvg(targetPath, path.basename(item.dest));
      console.log(`[FALLBACK] Created SVG fallback for ${item.dest}`);
    }
  }

  console.log(`\nImage extraction complete! Successfully downloaded ${successCount}/${imageList.length} images.`);
}

main();
