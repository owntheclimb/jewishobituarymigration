-- Create the obits table for Jewish obituary feeds
CREATE TABLE public.obits (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for performance on published_at
CREATE INDEX idx_obits_published_at ON public.obits(published_at DESC);

-- Create the obit_sources table for managing RSS feeds
CREATE TABLE public.obit_sources (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('feed', 'generator')),
  url TEXT NOT NULL,
  feed_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.obits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obit_sources ENABLE ROW LEVEL SECURITY;

-- Allow public read access to obits
CREATE POLICY "Obits are publicly viewable" 
ON public.obits 
FOR SELECT 
USING (true);

-- Allow public read access to obit_sources
CREATE POLICY "Obit sources are publicly viewable" 
ON public.obit_sources 
FOR SELECT 
USING (true);

-- Insert initial Florida Jewish news sources
INSERT INTO public.obit_sources (key, label, type, url, feed_url, active) VALUES
  ('heritage_orlando', 'Orlando', 'feed', 'https://heritagefl.com', 'https://heritagefl.com/category/obituaries/feed/', true),
  ('jewishpress_tampa', 'Tampa Bay', 'feed', 'https://jewishpresstampa.com', 'https://jewishpresstampa.com/category/obituaries/feed/', true),
  ('kronish_southfl', 'South Florida', 'generator', 'https://kronishfuneral.com', 'https://rss.app/feeds/v1.1/_example_kronish.xml', true),
  ('orlando_jewish_funerals', 'Orlando', 'generator', 'https://orlandojewishfunerals.com', 'https://rss.app/feeds/v1.1/_example_orlando.xml', true),
  ('sunshine_cremation', 'South East Florida', 'generator', 'https://sunshinecremation.com', 'https://rss.app/feeds/v1.1/_example_sunshine.xml', true),
  ('jfedsrq_sarasota', 'Sarasota-Manatee', 'generator', 'https://jfedsrq.org', 'https://rss.app/feeds/v1.1/_example_jfedsrq.xml', true);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_obit_sources_updated_at
  BEFORE UPDATE ON public.obit_sources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();