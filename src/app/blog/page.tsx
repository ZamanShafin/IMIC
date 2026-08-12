import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const fallbackPosts = [
  {
    id: 'post-1',
    slug: 'seeking-medical-treatment-in-singapore-malaysia-thailand-india',
    title: 'Complete Patient Guide: Medical Travel to Singapore, Malaysia, Thailand & India from Bangladesh',
    summary: 'Learn how IMIC Patient Assistance Centre (CPAC) handles doctor appointments, emergency visas, airport buggy pickups, and hotel bookings seamlessly.',
    coverImage: '/images/slider/slide1.jpg',
    category: 'Medical Tourism Guide',
    author: 'IMIC CPAC Team',
    publishedAt: new Date()
  }
];

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    });
  } catch (error) {
    console.error('Blog DB connection note:', error);
    posts = fallbackPosts;
  }

  if (posts.length === 0) posts = fallbackPosts;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Medical Insights</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Health & Travel Blog</h1>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative h-52 w-full bg-slate-100">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="bg-imic-teal/10 text-imic-teal font-bold px-2.5 py-0.5 rounded-md">{post.category}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>

                    <h2 className="text-lg font-bold text-imic-navy group-hover:text-imic-teal transition line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-imic-navy hover:text-imic-teal flex items-center gap-1 transition"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-imic-teal" />
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
