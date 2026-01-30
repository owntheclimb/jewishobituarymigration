-- ============================================================================
-- ADMIN PANEL FIX - PART 2 (Safe fixes for remaining issues)
-- ============================================================================

-- Fix obit_sources table - only add columns that don't exist
DO $$
BEGIN
  -- Add id column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'id') THEN
    ALTER TABLE public.obit_sources ADD COLUMN id UUID DEFAULT gen_random_uuid();
  END IF;

  -- Add name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'name') THEN
    ALTER TABLE public.obit_sources ADD COLUMN name TEXT;
  END IF;

  -- Add city column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'city') THEN
    ALTER TABLE public.obit_sources ADD COLUMN city TEXT;
  END IF;

  -- Add is_active column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'is_active') THEN
    ALTER TABLE public.obit_sources ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;

  -- Add last_fetched column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'last_fetched') THEN
    ALTER TABLE public.obit_sources ADD COLUMN last_fetched TIMESTAMPTZ;
  END IF;
END $$;

-- Copy data from old columns to new in obit_sources
UPDATE public.obit_sources
SET name = label
WHERE name IS NULL AND EXISTS (
  SELECT 1 FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'label'
);

UPDATE public.obit_sources
SET is_active = COALESCE(
  (SELECT active FROM public.obit_sources o2 WHERE o2.ctid = obit_sources.ctid),
  true
)
WHERE is_active IS NULL AND EXISTS (
  SELECT 1 FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'obit_sources' AND column_name = 'active'
);

-- Fix scraped_sources table
DO $$
BEGIN
  -- Add obituary_list_url column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scraped_sources' AND column_name = 'obituary_list_url') THEN
    ALTER TABLE public.scraped_sources ADD COLUMN obituary_list_url TEXT;
  END IF;

  -- Add city column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scraped_sources' AND column_name = 'city') THEN
    ALTER TABLE public.scraped_sources ADD COLUMN city TEXT;
  END IF;

  -- Add platform column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'scraped_sources' AND column_name = 'platform') THEN
    ALTER TABLE public.scraped_sources ADD COLUMN platform TEXT;
  END IF;
END $$;

-- Copy listing_url to obituary_list_url if it exists
UPDATE public.scraped_sources
SET obituary_list_url = listing_url
WHERE obituary_list_url IS NULL AND EXISTS (
  SELECT 1 FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'scraped_sources' AND column_name = 'listing_url'
);

-- Copy region to state if needed
UPDATE public.scraped_sources
SET state = region
WHERE state IS NULL AND EXISTS (
  SELECT 1 FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'scraped_sources' AND column_name = 'region'
);

-- Ensure profiles has required columns
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email') THEN
    ALTER TABLE public.profiles ADD COLUMN email TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'full_name') THEN
    ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
  END IF;
END $$;

-- Create is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create profile trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    now(),
    now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on tables if not already enabled
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notable_figures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_pages ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies for product_categories
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.product_categories;
CREATE POLICY "Anyone can view active categories" ON public.product_categories
  FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.product_categories;
CREATE POLICY "Admins can manage categories" ON public.product_categories
  FOR ALL USING (public.is_admin());

-- Products policies
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin());

-- Vendor Types policies
DROP POLICY IF EXISTS "Anyone can view vendor types" ON public.vendor_types;
CREATE POLICY "Anyone can view vendor types" ON public.vendor_types
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage vendor types" ON public.vendor_types;
CREATE POLICY "Admins can manage vendor types" ON public.vendor_types
  FOR ALL USING (public.is_admin());

-- Vendors policies
DROP POLICY IF EXISTS "Anyone can view active vendors" ON public.vendors;
CREATE POLICY "Anyone can view active vendors" ON public.vendors
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage vendors" ON public.vendors;
CREATE POLICY "Admins can manage vendors" ON public.vendors
  FOR ALL USING (public.is_admin());

-- Vendor Claims policies
DROP POLICY IF EXISTS "Users can create claims" ON public.vendor_claims;
CREATE POLICY "Users can create claims" ON public.vendor_claims
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage claims" ON public.vendor_claims;
CREATE POLICY "Admins can manage claims" ON public.vendor_claims
  FOR ALL USING (public.is_admin());

-- Notable Figures policies
DROP POLICY IF EXISTS "Anyone can view published figures" ON public.notable_figures;
CREATE POLICY "Anyone can view published figures" ON public.notable_figures
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins can manage figures" ON public.notable_figures;
CREATE POLICY "Admins can manage figures" ON public.notable_figures
  FOR ALL USING (public.is_admin());

-- Industry Pages policies
DROP POLICY IF EXISTS "Anyone can view published pages" ON public.industry_pages;
CREATE POLICY "Anyone can view published pages" ON public.industry_pages
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage pages" ON public.industry_pages;
CREATE POLICY "Admins can manage pages" ON public.industry_pages
  FOR ALL USING (public.is_admin());

-- Profiles policies for admin management
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin() OR user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin() OR user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin() OR user_id = auth.uid());

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_vendors_type ON public.vendors(type_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON public.vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendor_claims_status ON public.vendor_claims(status);
CREATE INDEX IF NOT EXISTS idx_notable_figures_category ON public.notable_figures(category);
CREATE INDEX IF NOT EXISTS idx_notable_figures_status ON public.notable_figures(status);
CREATE INDEX IF NOT EXISTS idx_industry_pages_published ON public.industry_pages(is_published);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Seed vendor types if empty
INSERT INTO public.vendor_types (name, slug, description, icon, sort_order)
SELECT * FROM (VALUES
  ('Funeral Homes', 'funeral-homes', 'Full-service funeral homes providing burial and cremation services', 'building', 1),
  ('Cemeteries', 'cemeteries', 'Jewish cemeteries and memorial parks', 'landmark', 2),
  ('Monument Companies', 'monument-companies', 'Headstone and monument manufacturers', 'monument', 3),
  ('Florists', 'florists', 'Sympathy flower arrangements and delivery', 'flower', 4),
  ('Grief Counselors', 'grief-counselors', 'Professional grief and bereavement counseling', 'heart', 5),
  ('Estate Planning Attorneys', 'estate-planning-attorneys', 'Wills, trusts, and estate planning legal services', 'scale', 6),
  ('Shiva Services', 'shiva-services', 'Catering and supplies for shiva observance', 'home', 7),
  ('Memorial Products', 'memorial-products', 'Keepsakes, urns, and memorial items', 'gift', 8),
  ('Transportation', 'transportation', 'Hearse and limousine services', 'car', 9),
  ('Chevra Kadisha', 'chevra-kadisha', 'Traditional Jewish burial society services', 'users', 10)
) AS v(name, slug, description, icon, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.vendor_types LIMIT 1)
ON CONFLICT (slug) DO NOTHING;

-- Seed product categories if empty
INSERT INTO public.product_categories (name, slug, description, active, sort_order)
SELECT * FROM (VALUES
  ('Sympathy Flowers', 'sympathy-flowers', 'Fresh flower arrangements for funerals and shiva', true, 1),
  ('Standing Sprays', 'standing-sprays', 'Large standing floral arrangements', true, 2),
  ('Plants', 'plants', 'Living plants as lasting tributes', true, 3),
  ('Gift Baskets', 'gift-baskets', 'Sympathy gift and food baskets', true, 4),
  ('Memorial Keepsakes', 'memorial-keepsakes', 'Keepsake items to remember loved ones', true, 5),
  ('Memorial Trees', 'memorial-trees', 'Plant a tree in memory', true, 6)
) AS v(name, slug, description, active, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.product_categories LIMIT 1)
ON CONFLICT (slug) DO NOTHING;

-- Seed notable figures if empty
INSERT INTO public.notable_figures (name, slug, hebrew_name, death_year, birth_year, short_bio, category, status, featured)
SELECT * FROM (VALUES
  ('Ruth Bader Ginsburg', 'rbg', 'רות באדר גינזבורג', 2020, 1933, 'Supreme Court Justice and pioneering advocate for gender equality', 'politicians', 'published', true),
  ('Elie Wiesel', 'elie-wiesel', 'אליעזר ויזל', 2016, 1928, 'Nobel Peace Prize laureate, Holocaust survivor, author of "Night"', 'activists', 'published', true),
  ('Leonard Nimoy', 'leonard-nimoy', 'לאונרד נימוי', 2015, 1931, 'Actor, director, known for playing Spock on Star Trek', 'artists', 'published', true),
  ('Joan Rivers', 'joan-rivers', 'ג׳ואן ריברס', 2014, 1933, 'Groundbreaking comedian and television personality', 'artists', 'published', true),
  ('Gene Wilder', 'gene-wilder', 'ג׳ין ווילדר', 2016, 1933, 'Beloved actor known for Willy Wonka and Young Frankenstein', 'artists', 'published', true),
  ('Carl Reiner', 'carl-reiner', 'קרל ריינר', 2020, 1922, 'Legendary comedy writer, actor, and director', 'artists', 'published', true)
) AS v(name, slug, hebrew_name, death_year, birth_year, short_bio, category, status, featured)
WHERE NOT EXISTS (SELECT 1 FROM public.notable_figures LIMIT 1)
ON CONFLICT (slug) DO NOTHING;
