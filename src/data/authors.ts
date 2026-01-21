/**
 * Author data for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * Used across article pages to show author attribution
 */

export interface Author {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  image: string;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  'editorial-team': {
    id: 'editorial-team',
    name: 'Jewish Obituary Editorial Team',
    title: 'Content Team',
    credentials: ['Jewish tradition researchers', 'Memorial services experts'],
    bio: 'The Jewish Obituary editorial team creates comprehensive guides on Jewish mourning traditions, obituary writing, and memorial practices. Our content is informed by rabbinical sources and reviewed for accuracy.',
    image: '', // Fallback avatar will be shown
    expertise: ['mourning traditions', 'obituary writing', 'memorial practices', 'shiva customs'],
  },
  'tradition-expert': {
    id: 'tradition-expert',
    name: 'Jewish Traditions Expert',
    title: 'Religious Traditions Consultant',
    credentials: ['Judaic studies background', 'Community education experience'],
    bio: 'Our traditions expert provides guidance on Jewish mourning customs, drawing from traditional sources and contemporary practice. Content reflects the diversity of Jewish observance across denominations.',
    image: '', // Fallback avatar will be shown
    expertise: ['jewish law', 'mourning customs', 'funeral traditions', 'kaddish', 'shiva'],
  },
  'grief-support': {
    id: 'grief-support',
    name: 'Grief Support Specialist',
    title: 'Bereavement Counseling',
    credentials: ['Mental health background', 'Grief support training'],
    bio: 'Our grief support specialist creates resources to help families navigate loss with compassion and understanding, combining practical guidance with emotional support.',
    image: '', // Fallback avatar will be shown
    expertise: ['grief counseling', 'bereavement support', 'mourning psychology', 'family support'],
  },
};

/**
 * Get author by ID
 */
export function getAuthor(id: string): Author | undefined {
  return authors[id];
}

/**
 * Get default author for articles
 */
export function getDefaultAuthor(): Author {
  return authors['editorial-team'];
}
