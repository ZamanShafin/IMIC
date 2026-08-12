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
  }
  return url;
}

const dbUrl = getDbUrl();

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
