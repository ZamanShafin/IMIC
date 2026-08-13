const { PrismaClient } = require('@prisma/client');

async function bench(name, url) {
  const start = Date.now();
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    const u = await prisma.user.findUnique({ where: { email: 'admin@imic.com.bd' } });
    console.log(`[${name}] Execution Time: ${Date.now() - start} ms | User: ${u ? u.name : 'null'}`);
  } catch (err) {
    console.error(`[${name}] Error: ${err.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  console.log('Testing Supabase Latency Options...');
  await bench('Pooler 6543 (connection_limit=1)', 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1');
  await bench('Direct Port 5432 (connection_limit=1)', 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?connection_limit=1');
}

run();
