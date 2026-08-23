import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import fallbackBlogs from '@/data/blogs.json';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = fallbackBlogs.map((b, i) => ({
    id: `blog-${i}`,
    slug: b.slug,
    title: b.title,
    summary: b.excerpt,
    coverImage: b.imageUrl,
    category: b.category,
    author: b.author,
    publishedAt: b.publishedAt
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Health & Travel Blog</h1>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto">
              Authentic articles, seminar updates, and medical MOU announcements from International Medical Information Center (IMIC).
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <div
                key={post.id || post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.coverImage || '/images/blog/1600370785Cancer.jpg'}
                      alt={post.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-imic-navy/90 text-white text-xs font-bold px-3 py-1 rounded-xl backdrop-blur-md">
                      {post.category || 'Healthcare'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-imic-teal" />
                      <span>{post.publishedAt || 'IMIC Medical Desk'}</span>
                    </div>

                    <h2 className="text-xl font-bold text-imic-navy group-hover:text-imic-teal transition line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    By {post.author || 'IMIC Medical Team'}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-imic-navy group-hover:text-imic-teal flex items-center gap-1 transition"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
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
