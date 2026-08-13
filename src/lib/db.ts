import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDbUrl() {
  let url = process.env.DATABASE_URL || '';
  if (url && (url.startsWith('postgresql://') || url.startsWith('postgres://'))) {
    // Ensure pgbouncer=true is appended for Supabase serverless pooler
    if (!url.includes('pgbouncer=true')) {
      url += (url.includes('?') ? '&' : '?') + 'pgbouncer=true';
    }
    // Limit pool size to 1 for ultra-fast serverless cold starts
    if (!url.includes('connection_limit=')) {
      url += (url.includes('?') ? '&' : '?') + 'connection_limit=1&connect_timeout=10';
    }
  }
  return url;
}

const dbUrl = getDbUrl();

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: ['error']
  });

globalForPrisma.prisma = db;
