import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const preferredRegion = 'sin1';

export const metadata: Metadata = {
  metadataBase: new URL('https://imic.com.bd'),
  title: 'IMIC — International Medical Information Center | Medical Tourism Bangladesh',
  description: 'IMIC connects Bangladeshi patients to top accredited partner hospitals in Singapore, Malaysia, Thailand, and India. 24/7 CPAC hotline in Banani, Dhaka.',
  keywords: ['IMIC', 'Medical Tourism Bangladesh', 'Singapore Hospitals', 'Malaysia Medical Travel', 'Thailand Treatment', 'India Hospitals', 'Emergency Medical Visa', 'Air Ambulance Bangladesh'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'IMIC — International Medical Information Center',
    description: 'One-stop Patient Assistance Centre (CPAC) in Dhaka for medical treatment abroad.',
    url: 'https://imic.com.bd',
    siteName: 'IMIC Bangladesh',
    images: [{ url: '/images/logo/logo.png' }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800 bg-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
