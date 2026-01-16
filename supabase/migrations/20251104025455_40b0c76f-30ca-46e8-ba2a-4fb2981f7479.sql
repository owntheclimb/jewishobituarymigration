-- Add image_url column to scraped_obituaries table for storing obituary photos
ALTER TABLE public.scraped_obituaries 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add index on image_url for faster queries filtering by image presence
CREATE INDEX IF NOT EXISTS idx_scraped_obituaries_image_url 
ON public.scraped_obituaries(image_url) 
WHERE image_url IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.scraped_obituaries.image_url IS 'URL of the obituary photo, extracted from og:image meta tag or article content';
