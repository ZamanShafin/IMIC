const fs = require('fs');
const { execSync } = require('child_process');

const envContent = fs.readFileSync('.env.production.local', 'utf8');
const lines = envContent.split('\n');
let dbUrl = '';

for (const line of lines) {
  if (line.startsWith('DATABASE_URL=')) {
    dbUrl = line.replace('DATABASE_URL=', '').trim();
    // remove surrounding quotes
    if ((dbUrl.startsWith('"') && dbUrl.endsWith('"')) || (dbUrl.startsWith("'") && dbUrl.endsWith("'"))) {
      dbUrl = dbUrl.slice(1, -1);
    }
  }
}

console.log('Target DB URL Protocol:', dbUrl.slice(0, 12));

try {
  console.log('Pushing database schema...');
  execSync('npx prisma db push --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: dbUrl },
    stdio: 'inherit'
  });

  console.log('Seeding initial data...');
  execSync('npx ts-node prisma/seed.ts', {
    env: { ...process.env, DATABASE_URL: dbUrl },
    stdio: 'inherit'
  });

  console.log('Database sync and seed finished successfully!');
} catch (err) {
  console.error('Database migration error:', err.message);
  process.exit(1);
}
