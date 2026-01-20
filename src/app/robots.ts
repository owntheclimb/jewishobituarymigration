import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    '/api/',
    '/account/',
    '/checkout/',
    '/create-obituary/',
    '/moderation/',
    '/auth/',
    '/login/',
    '/admin/',
    '/private/',
  ];

  return {
    rules: [
      // Traditional Search Crawlers
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // OpenAI Crawlers (ChatGPT, GPT)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Anthropic (Claude)
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Google AI (Gemini)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Apple AI
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Amazon
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Meta
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Common Crawl (used by many LLMs)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Social Media
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: disallowedPaths,
      },
      // Default - all other crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: 'https://jewishobituary.com/sitemap.xml',
  };
}
