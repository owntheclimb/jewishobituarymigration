-- Add new RSS feed sources for Jewish obituaries (Part 2 expansion)
-- Adds sources for Florida, California, Ohio, Michigan, and national publications
-- January 22, 2026

-- First, add city and state columns to obits table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'obits' AND column_name = 'city') THEN
    ALTER TABLE public.obits ADD COLUMN city TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'obits' AND column_name = 'state') THEN
    ALTER TABLE public.obits ADD COLUMN state TEXT;
  END IF;
END $$;

-- Add index for state filtering if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_obits_state ON public.obits(state);
CREATE INDEX IF NOT EXISTS idx_obits_city ON public.obits(city);

-- Add state column to obit_sources for cleaner state mapping
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'obit_sources' AND column_name = 'state') THEN
    ALTER TABLE public.obit_sources ADD COLUMN state TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'obit_sources' AND column_name = 'region') THEN
    ALTER TABLE public.obit_sources ADD COLUMN region TEXT;
  END IF;
END $$;

-- Update existing sources with their state codes
UPDATE public.obit_sources SET state = 'NY' WHERE key IN ('boropark24', 'yeshiva_world', 'matzav', 'jewish_world_ny');
UPDATE public.obit_sources SET state = 'NJ' WHERE key = 'lakewood_scoop';
UPDATE public.obit_sources SET state = 'MD' WHERE key IN ('baltimore_jewish_life', 'baltimore_jewish_times');
UPDATE public.obit_sources SET state = 'PA' WHERE key = 'philadelphia_exponent';
UPDATE public.obit_sources SET state = 'CO' WHERE key IN ('intermountain_jewish_news', 'boulder_jewish_news');
UPDATE public.obit_sources SET state = 'CT' WHERE key = 'ct_jewish_ledger';
UPDATE public.obit_sources SET state = 'AZ' WHERE key = 'arizona_jewish_post';
UPDATE public.obit_sources SET state = 'MA' WHERE key = 'jewish_journal_ma';
UPDATE public.obit_sources SET state = 'GA' WHERE key = 'atlanta_jewish_times';
UPDATE public.obit_sources SET state = 'VA' WHERE key = 'washington_jewish_week';
UPDATE public.obit_sources SET state = 'MN' WHERE key = 'tc_jewfolk';
UPDATE public.obit_sources SET state = 'WI' WHERE key = 'wisconsin_jewish_chronicle';
UPDATE public.obit_sources SET state = 'MO' WHERE key = 'st_louis_jewish_light';
UPDATE public.obit_sources SET state = 'FL' WHERE key IN ('heritage_orlando', 'jewishpress_tampa', 'kronish_southfl', 'orlando_jewish_funerals', 'sunshine_cremation', 'jfedsrq_sarasota');

-- Insert new RSS feed sources with state information
INSERT INTO public.obit_sources (key, label, type, url, feed_url, active, state) VALUES

-- California (PRIORITY - large Jewish population)
('jewish_journal_la', 'Jewish Journal of Los Angeles', 'feed', 'https://jewishjournal.com/obituaries/', 'https://jewishjournal.com/category/judaism/obituaries/feed/', true, 'CA'),
('san_diego_jewish_world', 'San Diego Jewish World', 'feed', 'https://www.sdjewishworld.com/category/obituaries/', 'https://www.sdjewishworld.com/category/obituaries/feed/', true, 'CA'),

-- Ohio (Cleveland and Columbus)
('cleveland_jewish_news', 'Cleveland Jewish News Obituaries', 'feed', 'https://www.clevelandjewishnews.com/community/lifecycles/obituaries/', 'https://www.clevelandjewishnews.com/search/?f=rss&t=article&c=community/lifecycles/obituaries&l=50&s=start_time&sd=desc', true, 'OH'),
('columbus_jewish_news', 'Columbus Jewish News Obituaries', 'feed', 'https://www.columbusjewishnews.com/community/lifecycles/obituaries/', 'https://www.columbusjewishnews.com/search/?f=rss&t=article&c=community/lifecycles/obituaries&l=50&s=start_time&sd=desc', true, 'OH'),

-- Michigan
('detroit_jewish_news', 'Detroit Jewish News Obituaries', 'feed', 'https://www.thejewishnews.com/news/obituaries/', 'https://www.thejewishnews.com/search/?f=rss&t=article&c=news/obituaries&l=50&s=start_time&sd=desc', true, 'MI'),

-- Florida (PRIORITY - large Jewish population)
('heritage_fl', 'Heritage Florida Jewish News', 'feed', 'https://www.heritagefl.com/', 'https://www.heritagefl.com/rss', true, 'FL'),
('jewish_press_pinellas', 'Jewish Press - Pinellas County', 'feed', 'https://www.jewishpressgulfcoast.com/', 'https://www.jewishpressgulfcoast.com/feed/', true, 'FL'),
('jewish_press_tampa_bay', 'Jewish Press - Tampa Bay', 'feed', 'https://www.jewishpresstampa.com/', 'https://www.jewishpresstampa.com/feed/', true, 'FL'),

-- National Publications (wide coverage)
('jta_obituaries', 'Jewish Telegraphic Agency - Obituaries', 'feed', 'https://www.jta.org/category/obituaries/', 'https://www.jta.org/category/obituaries/feed/', true, 'National')

ON CONFLICT (key) DO UPDATE SET
  label = EXCLUDED.label,
  url = EXCLUDED.url,
  feed_url = EXCLUDED.feed_url,
  active = EXCLUDED.active,
  state = EXCLUDED.state;

-- Update existing Philadelphia source to use search-based RSS (more reliable)
UPDATE public.obit_sources
SET feed_url = 'https://www.jewishexponent.com/search/?f=rss&t=article&c=death_notice&l=50&s=start_time&sd=desc'
WHERE key = 'philadelphia_exponent';

-- Log the migration
DO $$
BEGIN
  RAISE NOTICE 'Added 9 new RSS sources: CA (2), OH (2), MI (1), FL (3), National (1)';
  RAISE NOTICE 'Total sources should now be ~27 RSS feeds';
END $$;
