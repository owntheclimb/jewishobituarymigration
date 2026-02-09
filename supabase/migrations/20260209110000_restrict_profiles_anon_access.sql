-- ============================================================================
-- SECURITY FIX: Remove anonymous SELECT on profiles and scraped_sources
-- Issue: profiles table exposes emails and roles to unauthenticated users
-- Issue: scraped_sources exposes scraping strategy to unauthenticated users
-- Neither table is read by any public-facing page (all reads use auth client)
-- ============================================================================

-- Remove anon SELECT on profiles - exposes PII (emails, roles)
DROP POLICY IF EXISTS "profiles_anon_select" ON public.profiles;

-- Revoke SELECT on scraped_sources from anon
-- (the GRANT SELECT ON ALL TABLES gave anon SELECT on everything)
REVOKE SELECT ON public.scraped_sources FROM anon;
REVOKE SELECT ON public.profiles FROM anon;

-- Re-grant SELECT on profiles to anon role but with RLS filtering
-- Actually, we already have RLS enabled and dropped the anon policy,
-- so even with the grant, RLS will block anon reads since there's no policy.
-- But to be safe, explicitly revoke.

-- Verify
DO $$
BEGIN
  RAISE NOTICE 'Restricted anon access to profiles and scraped_sources';
END $$;
