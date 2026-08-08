import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://imic.com.bd'),
  title: 'IMIC — International Medical Information Center | Medical Tourism Bangladesh',
  description: 'IMIC connects Bangladeshi patients to top accredited partner hospitals in Singapore, Malaysia, Thailand, and India. 24/7 CPAC hotline in Banani, Dhaka.',
  keywords: ['IMIC', 'Medical Tourism Bangladesh', 'Singapore Hospitals', 'Malaysia Medical Travel', 'Thailand Treatment', 'India Hospitals', 'Emergency Medical Visa', 'Air Ambulance Bangladesh'],
  openGraph: {
    title: 'IMIC — International Medical Information Center',
    description: 'One-stop Patient Assistance Centre (CPAC) in Dhaka for medical treatment abroad.',
    url: 'https://imic.com.bd',
    siteName: 'IMIC Bangladesh',
    images: [{ url: '/images/logo/logo.jpeg' }],
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
        {children}
      </body>
    </html>
  );
}
