-- ============================================================================
-- FIX ALL ADMIN RLS - Ensure admins can access all tables
-- ============================================================================

-- First, ensure is_admin function exists and works correctly
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if current user is an admin
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND (role = 'admin' OR is_admin = true)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Grant execute on is_admin to authenticated and anon
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- ============================================================================
-- INDUSTRY_PAGES - Fix RLS
-- ============================================================================
ALTER TABLE public.industry_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view industry pages" ON public.industry_pages;
DROP POLICY IF EXISTS "Admins can manage industry pages" ON public.industry_pages;
DROP POLICY IF EXISTS "Anyone can view published pages" ON public.industry_pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON public.industry_pages;

-- Allow anyone to read (needed for public pages)
CREATE POLICY "industry_pages_select_all" ON public.industry_pages
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "industry_pages_admin_all" ON public.industry_pages
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- VENDOR_CLAIMS - Fix RLS
-- ============================================================================
ALTER TABLE public.vendor_claims ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create claims" ON public.vendor_claims;
DROP POLICY IF EXISTS "Admins can manage claims" ON public.vendor_claims;
DROP POLICY IF EXISTS "Users can create claims" ON public.vendor_claims;
DROP POLICY IF EXISTS "Admins can view claims" ON public.vendor_claims;

-- Allow anyone to insert claims
CREATE POLICY "vendor_claims_insert_all" ON public.vendor_claims
  FOR INSERT WITH CHECK (true);

-- Allow admins to view all claims
CREATE POLICY "vendor_claims_select_admin" ON public.vendor_claims
  FOR SELECT TO authenticated USING (public.is_admin());

-- Allow admins to manage all claims
CREATE POLICY "vendor_claims_admin_all" ON public.vendor_claims
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- VENDORS - Fix RLS
-- ============================================================================
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view vendors" ON public.vendors;
DROP POLICY IF EXISTS "Admins can manage vendors" ON public.vendors;
DROP POLICY IF EXISTS "Anyone can view active vendors" ON public.vendors;

-- Allow anyone to read vendors (for public pages)
CREATE POLICY "vendors_select_all" ON public.vendors
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "vendors_admin_all" ON public.vendors
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- VENDOR_TYPES - Fix RLS
-- ============================================================================
ALTER TABLE public.vendor_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view vendor types" ON public.vendor_types;
DROP POLICY IF EXISTS "Admins can manage vendor types" ON public.vendor_types;

-- Allow anyone to read vendor types
CREATE POLICY "vendor_types_select_all" ON public.vendor_types
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "vendor_types_admin_all" ON public.vendor_types
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- PRODUCTS - Fix RLS
-- ============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;

-- Allow anyone to read products
CREATE POLICY "products_select_all" ON public.products
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "products_admin_all" ON public.products
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- PRODUCT_CATEGORIES - Fix RLS
-- ============================================================================
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view categories" ON public.product_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.product_categories;
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.product_categories;

-- Allow anyone to read categories
CREATE POLICY "product_categories_select_all" ON public.product_categories
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "product_categories_admin_all" ON public.product_categories
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- OBIT_SOURCES - Fix RLS
-- ============================================================================
ALTER TABLE public.obit_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "obit_sources_select" ON public.obit_sources;
DROP POLICY IF EXISTS "obit_sources_all_admin" ON public.obit_sources;
DROP POLICY IF EXISTS "Anyone can view obit sources" ON public.obit_sources;
DROP POLICY IF EXISTS "Admins can manage obit sources" ON public.obit_sources;

-- Allow anyone to read (for public display)
CREATE POLICY "obit_sources_select_all" ON public.obit_sources
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "obit_sources_admin_all" ON public.obit_sources
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- SCRAPED_SOURCES - Fix RLS
-- ============================================================================
ALTER TABLE public.scraped_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "scraped_sources_select" ON public.scraped_sources;
DROP POLICY IF EXISTS "scraped_sources_all_admin" ON public.scraped_sources;
DROP POLICY IF EXISTS "Anyone can view scraped sources" ON public.scraped_sources;
DROP POLICY IF EXISTS "Admins can manage scraped sources" ON public.scraped_sources;

-- Allow anyone to read
CREATE POLICY "scraped_sources_select_all" ON public.scraped_sources
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "scraped_sources_admin_all" ON public.scraped_sources
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- SCRAPED_OBITUARIES - Fix RLS
-- ============================================================================
ALTER TABLE public.scraped_obituaries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view scraped obituaries" ON public.scraped_obituaries;
DROP POLICY IF EXISTS "Admins can manage scraped obituaries" ON public.scraped_obituaries;

-- Allow anyone to read
CREATE POLICY "scraped_obituaries_select_all" ON public.scraped_obituaries
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "scraped_obituaries_admin_all" ON public.scraped_obituaries
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- NOTABLE_FIGURES - Fix RLS
-- ============================================================================
ALTER TABLE public.notable_figures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notable_figures_select" ON public.notable_figures;
DROP POLICY IF EXISTS "notable_figures_all_admin" ON public.notable_figures;
DROP POLICY IF EXISTS "Anyone can view notable figures" ON public.notable_figures;
DROP POLICY IF EXISTS "Admins can manage notable figures" ON public.notable_figures;
DROP POLICY IF EXISTS "Anyone can view published figures" ON public.notable_figures;
DROP POLICY IF EXISTS "Admins can manage figures" ON public.notable_figures;

-- Allow anyone to read
CREATE POLICY "notable_figures_select_all" ON public.notable_figures
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "notable_figures_admin_all" ON public.notable_figures
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- ANALYTICS_EVENTS - Fix RLS
-- ============================================================================
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics events" ON public.analytics_events;

-- Allow anyone to insert analytics
CREATE POLICY "analytics_events_insert_all" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Allow admins to view
CREATE POLICY "analytics_events_select_admin" ON public.analytics_events
  FOR SELECT TO authenticated USING (public.is_admin());

-- ============================================================================
-- RB2B_LEADS - Fix RLS
-- ============================================================================
ALTER TABLE public.rb2b_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.rb2b_leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.rb2b_leads;
DROP POLICY IF EXISTS "Admins can manage leads" ON public.rb2b_leads;

-- Allow anyone to insert leads
CREATE POLICY "rb2b_leads_insert_all" ON public.rb2b_leads
  FOR INSERT WITH CHECK (true);

-- Allow admins to view and manage
CREATE POLICY "rb2b_leads_admin_all" ON public.rb2b_leads
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- OBITS - Fix RLS
-- ============================================================================
ALTER TABLE public.obits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view obits" ON public.obits;
DROP POLICY IF EXISTS "Admins can manage obits" ON public.obits;

-- Allow anyone to read
CREATE POLICY "obits_select_all" ON public.obits
  FOR SELECT USING (true);

-- Allow admins to do everything
CREATE POLICY "obits_admin_all" ON public.obits
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- Grant permissions
-- ============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Verify admin user
DO $$
DECLARE
  admin_count INT;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM public.profiles WHERE role = 'admin' OR is_admin = true;
  RAISE NOTICE 'Total admin users: %', admin_count;
END $$;
