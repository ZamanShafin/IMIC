import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { Camera } from 'lucide-react';

const galleryPhotos = [
  { title: "Partner Hospital Facilities", src: "/images/hospitals/farrer-park-1.jpg" },
  { title: "Patient Suite Accommodation", src: "/images/hospitals/farrer-park-2.jpg" },
  { title: "Icon Cancer Centre Singapore", src: "/images/hospitals/icon-cancer-1.jpg" },
  { title: "Sunway Medical Centre Kuala Lumpur", src: "/images/hospitals/sunway-medical-1.jpg" },
  { title: "Samitivej Hospital Bangkok", src: "/images/hospitals/samitivej-1.jpg" },
  { title: "Fortis Research Institute Gurugram", src: "/images/hospitals/fortis-1.jpg" },
  { title: "Mount Elizabeth Hospital Novena", src: "/images/hospitals/mount-elizabeth-novena-1.jpg" },
  { title: "Rajagiri Hospital Kochi", src: "/images/hospitals/rajagiri-1.jpg" }
];

export default function PhotoGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-16 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Visual Overview</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Photo Gallery</h1>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="group bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition">
                <div className="relative h-56 w-full">
                  <Image src={photo.src} alt={photo.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 bg-white">
                  <span className="text-xs font-bold text-imic-navy block">{photo.title}</span>
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
