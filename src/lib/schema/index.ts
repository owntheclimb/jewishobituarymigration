/**
 * Schema.org JSON-LD generators for SEO
 * These functions generate structured data for rich search results
 */

// ============================================
// Article Schema - For blog posts and guides
// ============================================
export interface ArticleSchemaData {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
}

export function generateArticleSchema(data: ArticleSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image || 'https://jewishobituary.com/og-image.jpg',
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.authorName,
      ...(data.authorUrl && { url: data.authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jewish Obituary',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jewishobituary.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}

// ============================================
// Person Schema - For notable figures and obituaries
// ============================================
export interface PersonSchemaData {
  name: string;
  alternateName?: string; // Hebrew name
  birthDate?: string;
  deathDate?: string;
  description: string;
  image?: string;
  url: string;
  birthPlace?: string;
  deathPlace?: string;
  awards?: string[];
  jobTitle?: string;
  nationality?: string;
}

export function generatePersonSchema(data: PersonSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    ...(data.alternateName && { alternateName: data.alternateName }),
    ...(data.birthDate && { birthDate: data.birthDate }),
    ...(data.deathDate && { deathDate: data.deathDate }),
    description: data.description,
    ...(data.image && { image: data.image }),
    url: data.url,
    ...(data.birthPlace && { birthPlace: data.birthPlace }),
    ...(data.deathPlace && { deathPlace: data.deathPlace }),
    ...(data.awards?.length && { award: data.awards }),
    ...(data.jobTitle && { jobTitle: data.jobTitle }),
    ...(data.nationality && { nationality: data.nationality }),
  };
}

// ============================================
// LocalBusiness Schema - For funeral homes
// ============================================
export interface LocalBusinessSchemaData {
  name: string;
  description: string;
  url: string;
  phone?: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  image?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
}

export function generateFuneralHomeSchema(data: LocalBusinessSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.phone && { telephone: data.phone }),
    ...(data.email && { email: data.email }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.state,
      postalCode: data.address.zip,
      addressCountry: data.address.country || 'US',
    },
    ...(data.image && { image: data.image }),
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
    }),
    ...(data.openingHours && { openingHours: data.openingHours }),
    ...(data.priceRange && { priceRange: data.priceRange }),
  };
}

// ============================================
// BreadcrumbList Schema - For navigation
// ============================================
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// FAQPage Schema - For FAQ sections
// ============================================
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ============================================
// HowTo Schema - For step-by-step guides
// ============================================
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToSchemaData {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration format, e.g., "PT30M"
  steps: HowToStep[];
}

export function generateHowToSchema(data: HowToSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    ...(data.image && { image: data.image }),
    ...(data.totalTime && { totalTime: data.totalTime }),
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

// ============================================
// Product Schema - For flowers and memorial products
// ============================================
export interface ProductSchemaData {
  name: string;
  description: string;
  image: string;
  url: string;
  sku?: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
}

export function generateProductSchema(data: ProductSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    ...(data.sku && { sku: data.sku }),
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency || 'USD',
      availability: `https://schema.org/${data.availability || 'InStock'}`,
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating.value,
        reviewCount: data.rating.count,
      },
    }),
  };
}

// ============================================
// Speakable Schema - For AI/voice assistant optimization (GEO)
// ============================================
export interface SpeakableSchemaData {
  url: string;
  name: string;
  cssSelectors: string[];
}

export function generateSpeakableSchema(data: SpeakableSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': data.url,
    name: data.name,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: data.cssSelectors,
    },
  };
}

// ============================================
// Helper: Render schema as script tag content
// ============================================
export function schemaToString(schema: object): string {
  return JSON.stringify(schema);
}
