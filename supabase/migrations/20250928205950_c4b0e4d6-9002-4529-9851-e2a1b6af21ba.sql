-- Update existing obit sources with working RSS feed URLs
UPDATE obit_sources 
SET 
  feed_url = 'https://www.jewishpresstampa.com/category/obituaries/feed/',
  url = 'https://www.jewishpresstampa.com/category/obituaries/',
  type = 'feed',
  active = true
WHERE key = 'jewishpress_tampa';

-- Add Pinellas County Jewish Press feed if it doesn't exist
INSERT INTO obit_sources (key, label, type, url, feed_url, active) 
VALUES ('jewish_press_pinellas', 'Pinellas County', 'feed', 'https://www.jewishpresspinellas.com/category/obituaries/', 'https://www.jewishpresspinellas.com/category/obituaries/feed/', true)
ON CONFLICT (key) DO UPDATE SET
  feed_url = EXCLUDED.feed_url,
  url = EXCLUDED.url,
  type = EXCLUDED.type,
  active = EXCLUDED.active;

-- Update Heritage FL to use a working approach (we'll need to create a generator feed later)
UPDATE obit_sources 
SET 
  feed_url = NULL,
  url = 'https://www.heritagefl.com/section/life_cycles/obituary/',
  type = 'generator',
  active = false
WHERE key = 'heritage_orlando';

-- Disable other sources temporarily until we can set up proper feeds
UPDATE obit_sources 
SET active = false 
WHERE key IN ('kronish_southfl', 'orlando_jewish_funerals', 'sunshine_cremation', 'jfedsrq_sarasota');