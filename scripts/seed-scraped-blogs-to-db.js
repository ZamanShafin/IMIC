const { PrismaClient } = require('@prisma/client');
const blogs = require('../src/data/blogs.json');

// Direct port 5432 Supabase PostgreSQL connection
process.env.DATABASE_URL = 'postgresql://postgres.yomwsefzovgsjuwcyjde:Shafin%406490@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding 4 authentic scraped blog posts into Supabase PostgreSQL database...');

  for (const b of blogs) {
    const cleanTitle = b.title.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    const cleanSummary = b.excerpt.replace(/&amp;/g, '&');
    const cleanContent = b.content.replace(/&amp;/g, '&');

    console.log(`Upserting: ${cleanTitle.slice(0, 45)}...`);
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: cleanTitle,
        summary: cleanSummary,
        content: cleanContent,
        coverImage: b.imageUrl,
        category: b.category,
        author: b.author,
        published: true,
        publishedAt: new Date(b.publishedAt)
      },
      create: {
        slug: b.slug,
        title: cleanTitle,
        summary: cleanSummary,
        content: cleanContent,
        coverImage: b.imageUrl,
        category: b.category,
        author: b.author,
        published: true,
        publishedAt: new Date(b.publishedAt)
      }
    });
  }

  console.log('Successfully seeded all 4 blog posts into Supabase PostgreSQL database!');
  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
