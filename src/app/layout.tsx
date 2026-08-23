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
      { url: '/icon', type: 'image/png' },
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      { url: '/icon', sizes: '180x180', type: 'image/png' },
    ],
  },
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
