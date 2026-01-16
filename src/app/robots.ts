import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
          '/checkout/',
          '/create-obituary/',
          '/moderation/',
          '/auth/',
          '/login/',
        ],
      },
    ],
    sitemap: 'https://jewishobituary.com/sitemap.xml',
  };
}
