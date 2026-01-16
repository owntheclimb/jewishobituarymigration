/**
 * Unified Obituary Data Transformer
 * Normalizes data from multiple sources (obituaries, obits, scraped_obituaries)
 * into a consistent UnifiedObituary format
 */

import { detectGender, getPlaceholderImage } from './genderDetection';
import { getNotableFigureImage } from './notableFiguresImages';

export interface UnifiedObituary {
  id: string;
  name: string;
  dateOfBirth: string | null;
  dateOfDeath: string | null;
  publishedAt: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  biography: string | null;
  imageUrl: string | null;
  source: string;
  sourceUrl: string;
  isExternal: boolean;
  createdAt: string | null;
  // Additional metadata
  hasVerifiedPhoto: boolean;
  isRecent: boolean; // Within 30 days
  isNotable: boolean; // Can be determined by additional logic
  sourceTable: 'obituaries' | 'obits' | 'scraped_obituaries'; // Track source table
}

interface Obituary {
  id: string;
  full_name: string;
  date_of_birth: string | null;
  date_of_death: string | null;
  biography: string | null;
  location: string | null;
  photo_url: string | null;
  created_at: string | null;
  city?: string | null;
  state?: string | null;
}

interface JewishObit {
  id: string;
  title: string;
  summary: string | null;
  source_name: string;
  source_url: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string | null;
}

interface ScrapedObituary {
  id: string;
  name: string;
  date_of_death: string | null;
  published_at: string | null;
  city: string | null;
  state: string | null;
  source: string;
  source_url: string;
  snippet: string | null;
  image_url?: string | null;
  created_at: string | null;
}

/**
 * Get the appropriate image for an obituary
 * Priority: 1) Provided image, 2) Notable figure image, 3) Gender-specific placeholder
 */
const getObituaryImage = (imageUrl: string | null, name: string): string => {
  // If we have a valid image URL, use it
  if (imageUrl && imageUrl !== '/placeholder-memorial.svg') {
    return imageUrl;
  }
  
  // Check if this is a notable figure with a curated image
  const notableImage = getNotableFigureImage(name);
  if (notableImage) {
    return notableImage;
  }
  
  // Fall back to gender-specific placeholder
  const gender = detectGender(name);
  return getPlaceholderImage(gender);
};

const isRecent = (date: string | null): boolean => {
  if (!date) return false;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(date) >= thirtyDaysAgo;
  } catch {
    return false;
  }
};

export const transformUserObituary = (obit: Obituary): UnifiedObituary => {
  return {
    id: obit.id,
    name: obit.full_name,
    dateOfBirth: obit.date_of_birth,
    dateOfDeath: obit.date_of_death,
    publishedAt: obit.created_at,
    location: obit.location,
    city: obit.city || null,
    state: obit.state || null,
    biography: obit.biography,
    imageUrl: getObituaryImage(obit.photo_url, obit.full_name),
    source: 'Jewish Obits',
    sourceUrl: `/obituary/${obit.id}`,
    isExternal: false,
    createdAt: obit.created_at,
    hasVerifiedPhoto: !!obit.photo_url,
    isRecent: isRecent(obit.date_of_death || obit.created_at),
    isNotable: false,
    sourceTable: 'obituaries',
  };
};

export const transformJewishObit = (obit: JewishObit): UnifiedObituary => {
  return {
    id: obit.id,
    name: obit.title,
    dateOfBirth: null,
    dateOfDeath: null,
    publishedAt: obit.published_at,
    location: null,
    city: null,
    state: null,
    biography: obit.summary,
    imageUrl: getObituaryImage(obit.image_url, obit.title),
    source: obit.source_name,
    sourceUrl: obit.source_url,
    isExternal: true,
    createdAt: obit.created_at,
    hasVerifiedPhoto: !!obit.image_url,
    isRecent: isRecent(obit.published_at || obit.created_at),
    isNotable: false,
    sourceTable: 'obits',
  };
};

export const transformScrapedObituary = (obit: ScrapedObituary): UnifiedObituary => {
  const location = obit.city && obit.state 
    ? `${obit.city}, ${obit.state}` 
    : obit.city || obit.state || null;

  return {
    id: obit.id,
    name: obit.name,
    dateOfBirth: null,
    dateOfDeath: obit.date_of_death,
    publishedAt: obit.published_at,
    location,
    city: obit.city,
    state: obit.state,
    biography: obit.snippet,
    imageUrl: getObituaryImage(obit.image_url ?? null, obit.name),
    source: obit.source,
    sourceUrl: obit.source_url,
    isExternal: true,
    createdAt: obit.created_at,
    hasVerifiedPhoto: !!obit.image_url,
    isRecent: isRecent(obit.date_of_death || obit.published_at || obit.created_at),
    isNotable: false,
    sourceTable: 'scraped_obituaries',
  };
};

/**
 * Transform any obituary type to UnifiedObituary
 */
export const transformObituary = (
  obit: Obituary | JewishObit | ScrapedObituary
): UnifiedObituary => {
  if ('full_name' in obit) {
    return transformUserObituary(obit);
  } else if ('title' in obit) {
    return transformJewishObit(obit);
  } else {
    return transformScrapedObituary(obit);
  }
};

/**
 * Mark notable obituaries based on name matching
 * This can be enhanced with a database of notable figures
 */
const NOTABLE_KEYWORDS = [
  'rabbi', 'dr.', 'professor', 'mayor', 'senator', 'representative',
  'judge', 'colonel', 'general', 'admiral', 'reverend', 'cantor',
  'president', 'chairman', 'founder', 'ceo', 'director'
];

// Known notable figures (can be expanded)
const NOTABLE_FIGURES = [
  'joan rivers', 'elie wiesel', 'leonard nimoy', 'ruth bader ginsburg',
  'harvey weinstein', 'carl reiner', 'mel brooks', 'gene wilder',
  'sandy koufax', 'barbra streisand', 'steven spielberg', 'larry king',
  'ruth westheimer', 'alan dershowitz', 'noam chomsky', 'joseph heller',
  'isaac asimov', 'philip roth', 'saul bellow', 'arthur miller'
];

export const markAsNotable = (obit: UnifiedObituary): UnifiedObituary => {
  const nameLower = obit.name.toLowerCase();
  
  // Check if name contains notable keywords
  const hasKeyword = NOTABLE_KEYWORDS.some(keyword => nameLower.includes(keyword));
  
  // Check if name matches known notable figures
  const isKnownFigure = NOTABLE_FIGURES.some(figure => nameLower.includes(figure));
  
  return {
    ...obit,
    isNotable: hasKeyword || isKnownFigure,
  };
};
