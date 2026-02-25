/**
 * Gender Detection Utility
 * Determines gender based on name patterns to show appropriate placeholder images
 */

// Common male names in Jewish and general communities
const MALE_NAMES = [
  'abraham', 'aaron', 'adam', 'alan', 'albert', 'alexander', 'alfred', 'andrew', 'anthony',
  'arthur', 'benjamin', 'bernard', 'brian', 'bruce', 'carl', 'charles', 'christopher', 'daniel',
  'david', 'dennis', 'donald', 'douglas', 'edward', 'eric', 'eugene', 'frank', 'gary', 'gene',
  'george', 'gerald', 'gregory', 'harold', 'harry', 'harvey', 'henry', 'herbert', 'howard',
  'isaac', 'jack', 'jacob', 'james', 'jason', 'jeffrey', 'jerome', 'jerry', 'joel', 'john',
  'jonathan', 'joseph', 'joshua', 'kenneth', 'kevin', 'larry', 'lawrence', 'leonard', 'louis',
  'mark', 'martin', 'matthew', 'michael', 'morris', 'moshe', 'nathan', 'neil', 'norman',
  'paul', 'peter', 'philip', 'rabbi', 'ralph', 'raymond', 'richard', 'robert', 'roger',
  'ronald', 'roy', 'russell', 'samuel', 'saul', 'scott', 'sidney', 'simon', 'solomon',
  'stanley', 'stephen', 'steven', 'stuart', 'theodore', 'thomas', 'timothy', 'walter',
  'warren', 'william', 'yakov', 'yehuda', 'yitzchak', 'yosef'
];

// Common female names in Jewish and general communities
const FEMALE_NAMES = [
  'abigail', 'ada', 'adele', 'alice', 'amy', 'andrea', 'angela', 'ann', 'anna', 'anne',
  'barbara', 'beatrice', 'betty', 'beverly', 'brenda', 'carol', 'carolyn', 'catherine',
  'cheryl', 'christine', 'clara', 'deborah', 'diane', 'dolores', 'donna', 'doris', 'dorothy',
  'edith', 'eileen', 'elaine', 'eleanor', 'elizabeth', 'ellen', 'emily', 'esther', 'ethel',
  'evelyn', 'florence', 'frances', 'georgia', 'geraldine', 'gloria', 'grace', 'hannah',
  'harriet', 'helen', 'ida', 'irene', 'jacqueline', 'jane', 'janet', 'janice', 'jean',
  'jennifer', 'jessica', 'joan', 'joyce', 'judith', 'judy', 'julia', 'julie', 'karen',
  'katherine', 'kathleen', 'kathy', 'laura', 'lillian', 'linda', 'lisa', 'lois', 'lorraine',
  'louise', 'margaret', 'maria', 'marie', 'marilyn', 'martha', 'mary', 'melissa', 'mildred',
  'miriam', 'nancy', 'norma', 'pamela', 'patricia', 'paula', 'phyllis', 'rachel', 'rebecca',
  'rita', 'rose', 'ruth', 'sandra', 'sarah', 'sharon', 'shirley', 'stephanie', 'susan',
  'sylvia', 'teresa', 'theresa', 'virginia', 'vivian', 'wanda', 'yael', 'yehudit'
];

// Male titles and honorifics
const MALE_TITLES = ['mr.', 'dr.', 'rabbi', 'prof.', 'professor', 'rev.', 'father', 'brother', 'sir'];

// Female titles and honorifics
const FEMALE_TITLES = ['mrs.', 'ms.', 'miss', 'dr.', 'prof.', 'professor', 'sister', 'rebbetzin'];

export type Gender = 'male' | 'female' | 'unknown';

/**
 * Detect gender from a full name
 * Returns 'male', 'female', or 'unknown'
 */
export const detectGender = (fullName: string): Gender => {
  if (!fullName) return 'unknown';
  
  const nameLower = fullName.toLowerCase().trim();
  
  // Check for male titles
  for (const title of MALE_TITLES) {
    if (nameLower.includes(title)) {
      return 'male';
    }
  }
  
  // Check for female titles (but be careful with Dr./Prof. which could be either)
  for (const title of FEMALE_TITLES) {
    if (title === 'dr.' || title === 'prof.' || title === 'professor') {
      continue; // Skip ambiguous titles
    }
    if (nameLower.includes(title)) {
      return 'female';
    }
  }
  
  // Extract first name (first word after removing titles)
  const words = nameLower.split(' ').filter(w => w.length > 0);
  if (words.length === 0) return 'unknown';
  
  // Remove common titles to get to the actual first name
  const firstWord = words[0].replace(/[.,]/g, '');
  const possibleFirstName = MALE_TITLES.includes(firstWord) || FEMALE_TITLES.includes(firstWord)
    ? (words[1] || firstWord)
    : firstWord;
  
  // Check against name lists
  if (MALE_NAMES.includes(possibleFirstName)) {
    return 'male';
  }
  
  if (FEMALE_NAMES.includes(possibleFirstName)) {
    return 'female';
  }
  
  // If we can't determine, return unknown
  return 'unknown';
};

/**
 * Get the universal placeholder image for obituaries without photos
 */
export const getPlaceholderImage = (gender: Gender): string => {
  return '/placeholder-memorial.svg';
};

/**
 * Get placeholder based on name (convenience function)
 */
export const getPlaceholderForName = (fullName: string): string => {
  const gender = detectGender(fullName);
  return getPlaceholderImage(gender);
};
