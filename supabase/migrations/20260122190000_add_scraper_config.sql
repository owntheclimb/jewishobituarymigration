-- Add scraper_config column to scraped_sources table
-- This enables configurable web scraping without hardcoded parsers
-- January 22, 2026

-- Add scraper_config JSONB column for configurable scraping
ALTER TABLE public.scraped_sources
ADD COLUMN IF NOT EXISTS scraper_config JSONB;

-- Add state column for geographic categorization (matches obit_sources)
ALTER TABLE public.scraped_sources
ADD COLUMN IF NOT EXISTS state TEXT;

-- Add last_scraped timestamp to track when source was last processed
ALTER TABLE public.scraped_sources
ADD COLUMN IF NOT EXISTS last_scraped TIMESTAMP WITH TIME ZONE;

-- Add last_error to track scraping failures
ALTER TABLE public.scraped_sources
ADD COLUMN IF NOT EXISTS last_error TEXT;

-- Add scrape_count to track total successful scrapes
ALTER TABLE public.scraped_sources
ADD COLUMN IF NOT EXISTS scrape_count INTEGER DEFAULT 0;

-- Update state based on region
UPDATE public.scraped_sources SET state =
  CASE region
    WHEN 'FL' THEN 'FL'
    WHEN 'CA' THEN 'CA'
    WHEN 'IL' THEN 'IL'
    WHEN 'TX' THEN 'TX'
    WHEN 'OH' THEN 'OH'
    WHEN 'PA' THEN 'PA'
    WHEN 'MI' THEN 'MI'
    WHEN 'MD' THEN 'MD'
    WHEN 'NJ' THEN 'NJ'
    WHEN 'CO' THEN 'CO'
    WHEN 'CT' THEN 'CT'
    WHEN 'WI' THEN 'WI'
    WHEN 'MA' THEN 'MA'
    WHEN 'MN' THEN 'MN'
    WHEN 'MO' THEN 'MO'
    WHEN 'VA' THEN 'VA'
    WHEN 'GA' THEN 'GA'
    WHEN 'AZ' THEN 'AZ'
    ELSE region
  END
WHERE state IS NULL;

-- Add platform-specific scraper configs
-- Platform: Gather (Epstein Memorial, etc.)
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "gather",
  "listing": {
    "selector": ".gather-obit a.gather-link, a.gather-link",
    "name_selector": ".gather-obitname, h3",
    "date_selector": ".gather-obitdates",
    "url_contains": "/obituaries/"
  },
  "detail": {
    "name_selector": "h1, .obit-name",
    "content_selector": ".gather-content, .obituary-content, article",
    "image_selector": "meta[property=''og:image''], .gather-photo img"
  },
  "rate_limit_ms": 500,
  "max_items": 30
}'::jsonb
WHERE name IN ('Epstein Memorial Chapel Columbus');

-- Platform: Tukios (Goldsteins, etc.)
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "tukios",
  "listing": {
    "selector": "a[href*=''/obituaries/''], .obituary-card a, h3 a",
    "name_selector": "h3, .name",
    "date_selector": ".dates, .date-range",
    "url_contains": "/obituaries/"
  },
  "detail": {
    "name_selector": "h1, .deceased-name",
    "content_selector": ".obituary-text, .tribute-text, article",
    "image_selector": "meta[property=''og:image''], .obituary-photo img"
  },
  "rate_limit_ms": 500,
  "max_items": 30
}'::jsonb
WHERE name IN ('Goldsteins Rosenberg Raphael-Sacks');

-- Platform: FuneralTech (Feldman, etc.)
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "funeraltech",
  "listing": {
    "selector": ".tribute a, .tribute-list a",
    "name_selector": ".tribute-detail, h4",
    "date_selector": ".service-date",
    "url_contains": "/tribute/"
  },
  "detail": {
    "name_selector": "h1, .tribute-name",
    "content_selector": ".obituary-text, .tribute-content, #tribute-text",
    "image_selector": "meta[property=''og:image''], .deceased-image img"
  },
  "rate_limit_ms": 500,
  "max_items": 30
}'::jsonb
WHERE name IN ('Feldman Mortuary');

-- Platform: WordPress Blog Style (most common)
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "wordpress",
  "listing": {
    "selector": "article a, .entry-title a, h2 a, .post a[href*=''/obituar'']",
    "name_selector": ".entry-title, h2, h3",
    "date_selector": "time, .entry-date, .post-date",
    "url_pattern": "/(obituar|tribut|memorial|service).*/"
  },
  "detail": {
    "name_selector": "h1, .entry-title",
    "content_selector": ".entry-content, article, .post-content",
    "image_selector": "meta[property=''og:image''], .wp-post-image, article img"
  },
  "rate_limit_ms": 500,
  "max_items": 30
}'::jsonb
WHERE name IN (
  'Kronish Funeral Services',
  'Neshama Jewish Funeral Services',
  'Sunshine Cremation',
  'Heritage Florida Jewish News',
  'Jewish Press Tampa Bay'
);

-- Platform: FrontRunner (common funeral home platform)
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "frontrunner",
  "listing": {
    "selector": ".obit-listing a, .obituary-item a, .tribute-card a",
    "name_selector": ".obit-name, h3, h4",
    "date_selector": ".obit-dates, .date",
    "url_contains": "/obituaries/"
  },
  "detail": {
    "name_selector": "h1, .obit-header h2",
    "content_selector": ".obit-text, .obituary-content, article",
    "image_selector": "meta[property=''og:image''], .obit-photo img"
  },
  "rate_limit_ms": 500,
  "max_items": 30
}'::jsonb
WHERE scraper_config IS NULL
AND name IN (
  'Chicago Jewish Funerals',
  'Dallas Jewish Funerals',
  'Goldman Funeral Group',
  'Sol Levinson & Bros',
  'Sagel Bloomfield',
  'Jewish Memorial Chapel NJ',
  'Mount Sinai Memorial Chapels NJ',
  'Belkoff-Goldstein Funeral Home',
  'Louis Memorial Chapel KC',
  'Northern Virginia Jewish Funerals',
  'Brezniak Funeral Directors',
  'Abraham L Green & Son',
  'Weinstein Mortuary Hartford',
  'Hodroff-Epstein Memorial Chapels',
  'Goodman-Bensman Funeral Home',
  'Blane Goodman Funeral Service'
);

-- Default config for remaining sources
UPDATE public.scraped_sources
SET scraper_config = '{
  "platform": "generic",
  "listing": {
    "selector": "a[href*=''/obituar''], a[href*=''/tribut''], article a, .entry-title a",
    "name_selector": "h2, h3, h4, .title",
    "date_selector": "time, .date, .dates",
    "url_pattern": "/(obituar|tribut|memorial|service|recent)/"
  },
  "detail": {
    "name_selector": "h1, h2.entry-title",
    "content_selector": "article, .entry-content, .post-content, .obituary-content",
    "image_selector": "meta[property=''og:image''], article img, .featured-image img"
  },
  "rate_limit_ms": 750,
  "max_items": 25
}'::jsonb
WHERE scraper_config IS NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_scraped_sources_is_active ON public.scraped_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_scraped_sources_state ON public.scraped_sources(state);

-- Add comment documenting the schema
COMMENT ON COLUMN public.scraped_sources.scraper_config IS 'JSON configuration for web scraping. Structure:
{
  "platform": "gather|tukios|funeraltech|wordpress|frontrunner|generic",
  "listing": {
    "selector": "CSS selector for obituary links on listing page",
    "name_selector": "CSS selector for name element",
    "date_selector": "CSS selector for date element",
    "url_contains": "String that URL must contain",
    "url_pattern": "Regex pattern for valid URLs"
  },
  "detail": {
    "name_selector": "CSS selector for name on detail page",
    "content_selector": "CSS selector for content/bio",
    "image_selector": "CSS selector for image"
  },
  "rate_limit_ms": "Milliseconds between requests",
  "max_items": "Maximum items to scrape per run"
}';

DO $$
BEGIN
  RAISE NOTICE 'Added scraper_config to scraped_sources table';
  RAISE NOTICE 'Configured 38 funeral home sources with platform-specific scrapers';
END $$;
