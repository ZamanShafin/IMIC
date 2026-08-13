import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import fallbackBlogs from '@/data/blogs.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  let post: any = null;

  try {
    post = await db.blogPost.findUnique({
      where: { slug: params.slug }
    });
  } catch (err) {
    console.error('Blog detail DB query note:', err);
  }

  // Fallback to extracted authentic blog JSON if DB record not synced
  if (!post) {
    const scraped = fallbackBlogs.find((b) => b.slug === params.slug);
    if (scraped) {
      post = {
        title: scraped.title,
        category: scraped.category,
        author: scraped.author,
        publishedAt: scraped.publishedAt,
        coverImage: scraped.imageUrl,
        content: scraped.content
      };
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-14 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-imic-teal transition">
              <ChevronLeft className="w-4 h-4 text-imic-teal" />
              <span>Back to Blog Articles</span>
            </Link>

            <span className="bg-imic-teal/20 text-imic-teal font-bold text-xs px-3.5 py-1 rounded-full block w-fit">
              {post.category || 'Medical News'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>

            <div className="flex items-center gap-6 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-imic-teal" /> {post.author || 'IMIC Editorial Team'}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-imic-teal" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        <section className="py-12 max-w-4xl mx-auto px-4 space-y-8">
          <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
            <Image src={post.coverImage || post.imageUrl} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            {post.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
