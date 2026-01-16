-- Step 1: Add columns and constraints to obits table
ALTER TABLE public.obits 
ADD COLUMN IF NOT EXISTS state TEXT;

ALTER TABLE public.obits 
ADD COLUMN IF NOT EXISTS city TEXT;

-- Add unique constraint on source_url
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'obits_source_url_unique'
    ) THEN
        ALTER TABLE public.obits 
        ADD CONSTRAINT obits_source_url_unique UNIQUE (source_url);
    END IF;
END $$;

-- Step 2: Add unique constraint to scraped_sources
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'scraped_sources_listing_url_unique'
    ) THEN
        ALTER TABLE public.scraped_sources 
        ADD CONSTRAINT scraped_sources_listing_url_unique UNIQUE (listing_url);
    END IF;
END $$;