const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const blogUrls = [
  'https://imic.com.bd/post/health-cancer-awareness-seminar-jointly-organized-by-international-medical-information-centre-imic-ltd-farrer-park-hospital-singapore-club-89-ltd-on-blue-sky-charitable-foundation-bscf-on-pro',
  'https://imic.com.bd/post/mou-signed-with-fmri-fortis-memorial-research-institutedelhi',
  'https://imic.com.bd/post/focused-group-medical-discussion-on-prostate-cancer',
  'https://imic.com.bd/post/cancer-prevalence-in-bangladesh'
];

const targetDir = path.join(process.cwd(), 'public', 'images', 'blog');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function scrapeBlogs() {
  console.log('Scraping full blog posts from imic.com.bd...');
  const blogRecords = [];

  for (const url of blogUrls) {
    try {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url);
      const html = await res.text();

      // Extract title
      const titleMatch = html.match(/<h[12][^>]*class="[^"]*heading[^"]*"[^>]*>([\s\S]*?)<\/h[12]>/i) || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'IMIC Medical Insight';

      // Extract slug from URL
      const slug = url.split('/post/')[1] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      // Extract Image URL
      const imgMatch = html.match(/src=["'](https:\/\/imic\.com\.bd\/public\/dist\/img\/[^"']+)["']/i) || html.match(/src=["']([^"']+\.(jpg|jpeg|png))["']/i);
      let imageUrl = '/images/blog/default-blog.jpg';

      if (imgMatch) {
        const fullImgUrl = imgMatch[1];
        const filename = path.basename(fullImgUrl);
        const localPath = path.join(targetDir, filename);

        if (!fs.existsSync(localPath)) {
          console.log(`Downloading image: ${filename}...`);
          const imgRes = await fetch(fullImgUrl);
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            fs.writeFileSync(localPath, Buffer.from(buffer));
          }
        }
        imageUrl = `/images/blog/${filename}`;
      }

      // Extract Body Content
      const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      let contentParagraphs = pMatches
        .map(m => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(text => text.length > 20 && !text.includes('Address:') && !text.includes('Phone:'));

      let content = contentParagraphs.join('\n\n');
      if (!content || content.length < 50) {
        content = `${title}. IMIC Patient Assistance Centre provides patient navigation to leading hospitals across Singapore, Malaysia, Thailand, and India. Contact our hotline at +8801710802000 for medical assistance.`;
      }

      const excerpt = content.slice(0, 160) + '...';

      blogRecords.push({
        slug,
        title,
        excerpt,
        content,
        imageUrl,
        category: title.toLowerCase().includes('cancer') ? 'Oncology' : 'Medical News',
        author: 'IMIC Editorial Team',
        publishedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(`Error scraping ${url}:`, err.message);
    }
  }

  // Save to src/data/blogs.json
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'blogs.json'), JSON.stringify(blogRecords, null, 2));

  console.log(`Successfully scraped ${blogRecords.length} blog posts into src/data/blogs.json!`);

  // Seed into Supabase PostgreSQL DB
  try {
    for (const b of blogRecords) {
      await prisma.blogPost.upsert({
        where: { slug: b.slug },
        update: {
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          imageUrl: b.imageUrl,
          category: b.category,
          author: b.author,
          published: true
        },
        create: {
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          imageUrl: b.imageUrl,
          category: b.category,
          author: b.author,
          published: true
        }
      });
    }
    console.log('Seeded scraped blog posts into Supabase PostgreSQL database!');
  } catch (dbErr) {
    console.error('Database seeding note:', dbErr.message);
  } finally {
    await prisma.$disconnect();
  }
}

scrapeBlogs();
