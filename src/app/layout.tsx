import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jewishobituary.com'),
  title: {
    default: 'Jewish Obits - Honor Their Legacy',
    template: '%s | Jewish Obits',
  },
  description: 'Create beautiful online memorials and obituaries for your loved ones. Search Jewish obituaries, connect with communities, and preserve cherished memories.',
  keywords: ['jewish obituaries', 'memorial', 'remembrance', 'shiva', 'kaddish', 'yahrzeit', 'obituary search', 'jewish funeral', 'mourning traditions'],
  authors: [{ name: 'Jewish Obits' }],
  creator: 'Jewish Obits',
  publisher: 'Jewish Obits',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Jewish Obits - Honor Their Legacy',
    description: 'Create beautiful online memorials and obituaries for your loved ones.',
    url: 'https://jewishobituary.com',
    siteName: 'Jewish Obits',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewish Obits - Honor Their Legacy',
    description: 'Create beautiful online memorials and obituaries for your loved ones.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <Providers>
          <CartDrawer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
