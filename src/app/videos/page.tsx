import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Youtube, Play } from 'lucide-react';

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
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Video Gallery</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">IMIC Video Channel</h1>
            <p className="text-slate-300 text-sm">Subscribe to @IMICLimited on YouTube for video testimonials and hospital tours.</p>
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
                className="group bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col"
              >
                <div className="relative h-52 w-full flex items-center justify-center bg-slate-800">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
                  <div className="w-14 h-14 rounded-full bg-red-600 group-hover:scale-110 transition text-white flex items-center justify-center shadow-2xl z-10">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="p-6 bg-slate-900 flex-1 space-y-2">
                  <span className="text-xs font-bold text-imic-teal uppercase tracking-wider block">YouTube Channel @IMICLimited</span>
                  <h3 className="text-base font-bold text-white group-hover:text-imic-teal transition">{vid.title}</h3>
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
