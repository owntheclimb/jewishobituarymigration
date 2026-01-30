-- ============================================================================
-- FIX RLS POLICIES - Allow admins to access all data
-- ============================================================================

-- Fix is_admin function to check BOTH role AND is_admin boolean
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND (
      role IN ('admin', 'super_admin')
      OR is_admin = true
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure current admin user has proper role
UPDATE public.profiles
SET role = 'admin', is_admin = true
WHERE email = 'owntheclimb@neshamajfs.com'
  AND (role IS NULL OR role = 'user' OR role != 'admin');

-- Fix obit_sources RLS - enable and add proper policies
ALTER TABLE public.obit_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view obit sources" ON public.obit_sources;
CREATE POLICY "Anyone can view obit sources" ON public.obit_sources
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage obit sources" ON public.obit_sources;
CREATE POLICY "Admins can manage obit sources" ON public.obit_sources
  FOR ALL USING (public.is_admin());

-- Fix scraped_sources RLS
ALTER TABLE public.scraped_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view scraped sources" ON public.scraped_sources;
CREATE POLICY "Anyone can view scraped sources" ON public.scraped_sources
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage scraped sources" ON public.scraped_sources;
CREATE POLICY "Admins can manage scraped sources" ON public.scraped_sources
  FOR ALL USING (public.is_admin());

-- Fix scraped_obituaries RLS
ALTER TABLE public.scraped_obituaries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view scraped obituaries" ON public.scraped_obituaries;
CREATE POLICY "Anyone can view scraped obituaries" ON public.scraped_obituaries
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage scraped obituaries" ON public.scraped_obituaries;
CREATE POLICY "Admins can manage scraped obituaries" ON public.scraped_obituaries
  FOR ALL USING (public.is_admin());

-- Fix obits RLS
ALTER TABLE public.obits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view obits" ON public.obits;
CREATE POLICY "Anyone can view obits" ON public.obits
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage obits" ON public.obits;
CREATE POLICY "Admins can manage obits" ON public.obits
  FOR ALL USING (public.is_admin());

-- Fix profiles RLS - allow admins to see ALL profiles and users to see their own
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Fix notable_figures RLS
ALTER TABLE public.notable_figures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published figures" ON public.notable_figures;
DROP POLICY IF EXISTS "Anyone can view notable figures" ON public.notable_figures;
CREATE POLICY "Anyone can view notable figures" ON public.notable_figures
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage figures" ON public.notable_figures;
DROP POLICY IF EXISTS "Admins can manage notable figures" ON public.notable_figures;
CREATE POLICY "Admins can manage notable figures" ON public.notable_figures
  FOR ALL USING (public.is_admin());

-- Fix analytics_events RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
CREATE POLICY "Anyone can insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics events" ON public.analytics_events;
CREATE POLICY "Admins can view analytics" ON public.analytics_events
  FOR SELECT USING (public.is_admin());

-- Fix rb2b_leads RLS
ALTER TABLE public.rb2b_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view leads" ON public.rb2b_leads;
CREATE POLICY "Admins can view leads" ON public.rb2b_leads
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.rb2b_leads;
CREATE POLICY "Anyone can insert leads" ON public.rb2b_leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage leads" ON public.rb2b_leads;
CREATE POLICY "Admins can manage leads" ON public.rb2b_leads
  FOR ALL USING (public.is_admin());

-- Fix industry_pages RLS
ALTER TABLE public.industry_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published pages" ON public.industry_pages;
DROP POLICY IF EXISTS "Anyone can view industry pages" ON public.industry_pages;
CREATE POLICY "Anyone can view industry pages" ON public.industry_pages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage pages" ON public.industry_pages;
DROP POLICY IF EXISTS "Admins can manage industry pages" ON public.industry_pages;
CREATE POLICY "Admins can manage industry pages" ON public.industry_pages
  FOR ALL USING (public.is_admin());

-- Fix vendors RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active vendors" ON public.vendors;
DROP POLICY IF EXISTS "Anyone can view vendors" ON public.vendors;
CREATE POLICY "Anyone can view vendors" ON public.vendors
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage vendors" ON public.vendors;
CREATE POLICY "Admins can manage vendors" ON public.vendors
  FOR ALL USING (public.is_admin());

-- Fix vendor_types RLS
ALTER TABLE public.vendor_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view vendor types" ON public.vendor_types;
CREATE POLICY "Anyone can view vendor types" ON public.vendor_types
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage vendor types" ON public.vendor_types;
CREATE POLICY "Admins can manage vendor types" ON public.vendor_types
  FOR ALL USING (public.is_admin());

-- Fix vendor_claims RLS
ALTER TABLE public.vendor_claims ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create claims" ON public.vendor_claims;
DROP POLICY IF EXISTS "Anyone can create claims" ON public.vendor_claims;
CREATE POLICY "Anyone can create claims" ON public.vendor_claims
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view claims" ON public.vendor_claims;
DROP POLICY IF EXISTS "Admins can manage claims" ON public.vendor_claims;
CREATE POLICY "Admins can manage claims" ON public.vendor_claims
  FOR ALL USING (public.is_admin());

-- Fix products RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin());

-- Fix product_categories RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active categories" ON public.product_categories;
DROP POLICY IF EXISTS "Anyone can view categories" ON public.product_categories;
CREATE POLICY "Anyone can view categories" ON public.product_categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.product_categories;
CREATE POLICY "Admins can manage categories" ON public.product_categories
  FOR ALL USING (public.is_admin());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
