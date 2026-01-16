-- Create scraped sources table
CREATE TABLE IF NOT EXISTS public.scraped_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  listing_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  region TEXT DEFAULT 'FL',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create scraped obituaries table (separate from user-created obituaries)
CREATE TABLE IF NOT EXISTS public.scraped_obituaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date_of_death DATE,
  published_at TIMESTAMPTZ,
  city TEXT,
  state TEXT,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  snippet TEXT,
  is_jewish BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indices for performance
CREATE INDEX IF NOT EXISTS scraped_obituaries_state_dod_idx ON public.scraped_obituaries(state, date_of_death DESC);
CREATE INDEX IF NOT EXISTS scraped_obituaries_published_idx ON public.scraped_obituaries(published_at DESC);
CREATE INDEX IF NOT EXISTS scraped_obituaries_name_idx ON public.scraped_obituaries USING gin (to_tsvector('simple', name));

-- Enable RLS
ALTER TABLE public.scraped_obituaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_sources ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_scraped_obituaries" ON public.scraped_obituaries FOR SELECT USING (true);
CREATE POLICY "public_read_scraped_sources" ON public.scraped_sources FOR SELECT USING (true);

-- Seed starter sources
INSERT INTO public.scraped_sources (name, base_url, listing_url, region) VALUES
  ('Kronish Funeral Services','https://kronishfuneral.com','https://kronishfuneral.com/obituaries/','FL'),
  ('Neshama Jewish Funeral Services','https://www.neshamajfs.com','https://www.neshamajfs.com/obituaries','FL'),
  ('Sunshine Cremation','https://sunshinecremation.com','https://sunshinecremation.com/obituaries/','FL'),
  ('Heritage Florida Jewish News','https://www.heritagefl.com','https://www.heritagefl.com/section/life_cycles/obituary','FL'),
  ('Jewish Press Tampa Bay','https://www.jewishpresstampa.com','https://www.jewishpresstampa.com/articles/obituaries-236/','FL')
ON CONFLICT DO NOTHING;