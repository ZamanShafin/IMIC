import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Youtube, Play } from 'lucide-react';

export const metadata = {
  title: 'Video Gallery | IMIC - International Medical Information Center',
  description: 'Watch video testimonials, patient treatment journeys, partner hospital overviews, and healthcare seminars by IMIC.',
};

const videos = [
  {
    title: "IMIC Patient Assistance Centre (CPAC) Overview",
    youtubeUrl: "https://youtube.com/@IMICLimited",
    thumbnail: "/images/slider/slide1.jpg"
  },
  {
    title: "Bangladeshi Patient Testimonial — Singapore Treatment",
    youtubeUrl: "https://youtube.com/@IMICLimited",
    thumbnail: "/images/slider/slide2.jpg"
  },
  {
    title: "Air Ambulance & Stretcher Evacuation Services",
    youtubeUrl: "https://youtube.com/@IMICLimited",
    thumbnail: "/images/slider/slide3.jpg"
  }
];

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-imic-navy via-slate-900 to-imic-teal/90 text-white py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Video Gallery</h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Watch authentic video testimonials, patient recovery stories, and partner hospital overviews on our official channel @IMICLimited.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid, i) => (
              <a
                key={i}
                href={vid.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 w-full flex items-center justify-center bg-slate-800 overflow-hidden">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-imic-navy/40 group-hover:bg-imic-navy/20 transition-colors" />
                  <div className="w-14 h-14 rounded-full bg-red-600 group-hover:scale-110 transition-transform text-white flex items-center justify-center shadow-2xl z-10">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="p-6 bg-slate-900 flex-1 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-wider">
                    <Youtube className="w-4 h-4" />
                    <span>YouTube Channel @IMICLimited</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-imic-teal transition leading-snug">
                    {vid.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
