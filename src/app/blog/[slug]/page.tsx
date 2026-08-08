import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ChevronLeft, Calendar, User } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <Link href="/blog" className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-imic-teal transition">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            <span className="bg-imic-teal/20 text-imic-teal font-bold text-xs px-3 py-1 rounded-full block w-fit">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-imic-teal" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-imic-teal" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </section>

        <section className="py-12 max-w-4xl mx-auto px-4 space-y-8">
          <div className="relative h-80 sm:h-[400px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>

          <div
            className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
