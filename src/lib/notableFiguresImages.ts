/**
 * Notable Figures Image Mapping
 * Maps notable figure names to their curated image URLs
 */

export interface NotableFigure {
  name: string;
  imageUrl: string;
  aliases?: string[]; // Alternative spellings or name variations
}

export const NOTABLE_FIGURES_IMAGES: NotableFigure[] = [
  {
    name: 'joan rivers',
    imageUrl: '/notable-figures/joan-rivers.jpg',
    aliases: ['joan alexandra rivers', 'joan molinsky']
  },
  {
    name: 'elie wiesel',
    imageUrl: '/notable-figures/elie-wiesel.jpg',
    aliases: ['eliezer wiesel']
  },
  {
    name: 'leonard nimoy',
    imageUrl: '/notable-figures/leonard-nimoy.jpg',
    aliases: ['leonard simon nimoy']
  },
  {
    name: 'ruth bader ginsburg',
    imageUrl: '/notable-figures/ruth-bader-ginsburg.jpg',
    aliases: ['ruth joan bader ginsburg', 'rbg', 'justice ginsburg']
  },
  {
    name: 'carl reiner',
    imageUrl: '/notable-figures/carl-reiner.jpg',
    aliases: ['carl reiner']
  },
  {
    name: 'gene wilder',
    imageUrl: '/notable-figures/gene-wilder.jpg',
    aliases: ['jerome silberman']
  },
];

/**
 * Find a notable figure's image by name (case insensitive, partial match)
 */
export const getNotableFigureImage = (name: string): string | null => {
  if (!name) return null;
  
  const nameLower = name.toLowerCase().trim();
  
  for (const figure of NOTABLE_FIGURES_IMAGES) {
    // Check main name
    if (nameLower.includes(figure.name) || figure.name.includes(nameLower)) {
      return figure.imageUrl;
    }
    
    // Check aliases
    if (figure.aliases) {
      for (const alias of figure.aliases) {
        if (nameLower.includes(alias.toLowerCase()) || alias.toLowerCase().includes(nameLower)) {
          return figure.imageUrl;
        }
      }
    }
  }
  
  return null;
};

/**
 * Check if a name matches a notable figure
 */
export const isNotableFigure = (name: string): boolean => {
  return getNotableFigureImage(name) !== null;
};
