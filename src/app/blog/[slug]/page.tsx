import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import fallbackBlogs from '@/data/blogs.json';

export const revalidate = 3600;

export async function generateStaticParams() {
  return fallbackBlogs.map((b) => ({
    slug: b.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const scraped = fallbackBlogs.find((b) => b.slug === params.slug) || fallbackBlogs[0];

  if (!scraped) {
    notFound();
  }

  const post = {
    title: scraped.title,
    category: scraped.category,
    author: scraped.author,
    publishedAt: scraped.publishedAt,
    coverImage: scraped.imageUrl,
    content: scraped.content
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-imic-teal transition font-semibold">
              <ChevronLeft className="w-4 h-4 text-imic-teal" />
              <span>Back to Blog Articles</span>
            </Link>

            <div className="space-y-3">
              <span className="inline-block bg-imic-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category || 'Medical Travel'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-imic-teal" />
                  <span>{post.author || 'IMIC Medical Editorial'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-imic-teal" />
                  <span>{post.publishedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 max-w-4xl mx-auto px-4">
          <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100">
              <Image
                src={post.coverImage || '/images/blog/1600370785Cancer.jpg'}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
