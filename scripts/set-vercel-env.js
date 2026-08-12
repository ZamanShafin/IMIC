const { execSync } = require('child_process');
const fs = require('fs');

const targetUrl = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

console.log('Target URL to set on Vercel:', targetUrl.slice(0, 25) + '... (length: ' + targetUrl.length + ')');

fs.writeFileSync('.tmp-env-val.txt', targetUrl, 'utf8');

try {
  console.log('1. Removing old DATABASE_URL from Vercel...');
  try {
    execSync('npx vercel env rm DATABASE_URL production -y', { stdio: 'inherit' });
  } catch (e) {
    // ignore if not existing
  }

  console.log('2. Adding clean DATABASE_URL to Vercel production...');
  execSync('npx vercel env add DATABASE_URL production < .tmp-env-val.txt', { stdio: 'inherit' });

  fs.unlinkSync('.tmp-env-val.txt');
  console.log('Successfully updated Vercel DATABASE_URL environment variable!');
} catch (err) {
  if (fs.existsSync('.tmp-env-val.txt')) fs.unlinkSync('.tmp-env-val.txt');
  console.error('Error setting Vercel env:', err.message);
  process.exit(1);
}
