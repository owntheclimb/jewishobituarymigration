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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Joan_Rivers_2010.jpg',
    aliases: ['joan alexandra rivers', 'joan molinsky']
  },
  {
    name: 'elie wiesel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Elie_Wiesel_2012_Shankbone.JPG',
    aliases: ['eliezer wiesel']
  },
  {
    name: 'leonard nimoy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Leonard_Nimoy_Star_Trek_2011.jpg',
    aliases: ['leonard simon nimoy']
  },
  {
    name: 'ruth bader ginsburg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Ruth_Bader_Ginsburg_2016_portrait.jpg',
    aliases: ['ruth joan bader ginsburg', 'rbg', 'justice ginsburg']
  },
  {
    name: 'carl reiner',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Carl_Reiner_2011_Shankbone.JPG',
    aliases: ['carl reiner']
  },
  {
    name: 'gene wilder',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Gene_Wilder_1970.JPG',
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
