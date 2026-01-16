-- Delete non-obituary articles and fix HTML entities in existing titles

-- Delete non-obituary articles (Rabbis of LA series, poems, and feature articles)
DELETE FROM obits WHERE 
  id IN (
    'rss-https%3A%2F%2Fjewishjournal.com%2F%3Fp%3D384542',
    'rss-https%3A%2F%2Fjewishjournal.com%2F%3Fp%3D384456',
    'rss-https%3A%2F%2Ftcjewfolk.com%2F%3Fp%3D71455',
    'rss-https%3A%2F%2Ftcjewfolk.com%2F%3Fp%3D76479',
    'rss-https%3A%2F%2Fjewishjournal.com%2F%3Fp%3D384713'
  );

-- Fix HTML entities in existing titles using CHR() for special characters
UPDATE obits
SET title = 
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                REPLACE(
                  REPLACE(
                    REPLACE(title,
                      '&#8220;', CHR(8220)),
                      '&#8221;', CHR(8221)),
                      '&#8216;', CHR(8216)),
                      '&#8217;', CHR(8217)),
                      '&#8211;', CHR(8211)),
                      '&#8212;', CHR(8212)),
                      '&#124;', '|'),
                      '&#8230;', CHR(8230)),
                      '&amp;', '&'),
                      '&quot;', '"')
WHERE title ~ '&#[0-9]+;|&amp;|&quot;';