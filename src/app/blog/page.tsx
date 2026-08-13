import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { ArrowRight, Calendar } from 'lucide-react';
import fallbackBlogs from '@/data/blogs.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    });
  } catch (error) {
    console.error('Blog DB connection note:', error);
  }

  // Fallback to extracted authentic blog JSON if database table is initializing
  if (!posts || posts.length === 0) {
    posts = fallbackBlogs.map((b, i) => ({
      id: `scraped-${i}`,
      slug: b.slug,
      title: b.title,
      summary: b.excerpt,
      coverImage: b.imageUrl,
      category: b.category,
      author: b.author,
      publishedAt: b.publishedAt
    }));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Medical Insights</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Health & Travel Blog</h1>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Authentic articles, seminar updates, and medical MOU announcements from International Medical Information Center (IMIC).
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <div
                key={post.id || post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={post.coverImage || post.imageUrl || '/images/blog/default-blog.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="bg-imic-teal/10 text-imic-teal font-bold px-3 py-1 rounded-md">
                        {post.category || 'Medical News'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-imic-teal" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-imic-navy group-hover:text-imic-teal transition leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary || post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-imic-navy hover:text-imic-teal flex items-center gap-1.5 transition"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-imic-teal" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
