-- Create the missing increment_scrape_count RPC function
CREATE OR REPLACE FUNCTION public.increment_scrape_count(source_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.scraped_sources
  SET scrape_count = COALESCE(scrape_count, 0) + 1
  WHERE id = source_id;
END;
$$;
