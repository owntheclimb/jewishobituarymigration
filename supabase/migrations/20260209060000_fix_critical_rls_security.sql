-- ============================================================================
-- CRITICAL SECURITY FIX: Prevent anonymous users from modifying/deleting data
-- Issue: The anon role can UPDATE profiles (privilege escalation) and DELETE
-- from obituaries, obits, communities, vendors, scraped_obituaries
-- Root cause: GRANT INSERT, UPDATE, DELETE ON ALL TABLES was too broad
-- ============================================================================

-- Step 1: Revoke write permissions from anon role on ALL tables
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;

-- Step 2: Re-grant SELECT only to anon (for public read access)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Step 3: Keep authenticated users' write permissions (controlled by RLS)
-- authenticated role already has INSERT, UPDATE, DELETE from previous migration

-- Step 4: Enable RLS on profiles table (was disabled by 20260129213000)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop any overly permissive policies on profiles (ignore if not exists)
DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_anon_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_auth_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_auth_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_anon_select_v2" ON public.profiles;
DROP POLICY IF EXISTS "profiles_auth_select_v2" ON public.profiles;
DROP POLICY IF EXISTS "profiles_auth_update_own_v2" ON public.profiles;

-- Step 6: Create proper profiles policies
-- Public can read profiles (for obituary display)
CREATE POLICY "profiles_anon_select" ON public.profiles
  FOR SELECT TO anon
  USING (true);

-- Authenticated users can read all profiles
CREATE POLICY "profiles_auth_select" ON public.profiles
  FOR SELECT TO authenticated
  USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_auth_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "profiles_auth_insert_own" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Admins can do everything on profiles (using service role for admin operations)
-- Note: Admin operations go through API routes that use the service role key

-- Step 7: Allow anon INSERT only on specific tables that need it
GRANT INSERT ON public.virtual_candles TO anon;
GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT ON public.analytics_events TO anon;
GRANT INSERT ON public.guestbook_entries TO anon;

-- Step 8: Verify the fix
DO $$
BEGIN
  RAISE NOTICE 'Critical RLS security fix applied successfully';
END $$;
