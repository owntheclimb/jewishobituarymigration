import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/Providers';
import CartDrawer from '@/components/cart/CartDrawer';
import { PostHogProvider } from '@/components/PostHogProvider';

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
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jewish Obituary - Honor Their Legacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewish Obits - Honor Their Legacy',
    description: 'Create beautiful online memorials and obituaries for your loved ones.',
    images: ['/og-image.jpg'],
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
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add your Google Search Console verification code
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Schema Markup */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Jewish Obituary',
              alternateName: 'Jewish Obits',
              url: 'https://jewishobituary.com',
              logo: 'https://jewishobituary.com/logo.png',
              description: 'The premier online platform for creating, publishing, and preserving Jewish obituaries and memorial tributes.',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['English', 'Hebrew'],
              },
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Jewish Obituary',
              url: 'https://jewishobituary.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://jewishobituary.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v46eh408ed");
            `,
          }}
        />
        {/* RB2B Visitor Identification with Client-Side Lead Capture */}
        <Script
          id="rb2b-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(key) {
                if (window.reb2b) return;
                window.reb2b = {loaded: true};

                // Callback to capture identified visitors and send to our API
                window.reb2b.identifyCallback = function(data) {
                  if (data && data.email) {
                    fetch('/api/webhooks/rb2b', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        fullName: data.fullName,
                        linkedInUrl: data.linkedInUrl,
                        title: data.title,
                        companyName: data.companyName,
                        companyDomain: data.companyDomain,
                        companyIndustry: data.companyIndustry,
                        companySize: data.companySize,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                        pageUrl: window.location.href,
                        referrer: document.referrer
                      })
                    }).catch(function(err) {
                      console.error('RB2B lead capture error:', err);
                    });
                  }
                };

                var s = document.createElement("script");
                s.async = true;
                s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
                document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
              }("LNKLDHE30DOJ");
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <PostHogProvider>
          <Providers>
            <CartDrawer />
            {children}
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
