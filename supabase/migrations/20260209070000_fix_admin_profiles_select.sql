-- Fix: Allow admin users to SELECT all profiles (needed for Manage Admins page)
-- Currently, profiles_auth_select only allows users to read their own profile,
-- which causes the admin management page to show "0 admins"

-- Drop the restrictive auth select policy
DROP POLICY IF EXISTS "profiles_auth_select" ON public.profiles;

-- Allow all authenticated users to SELECT profiles
-- This is consistent with anon already having SELECT on profiles
-- (needed for admin management, user lookups, etc.)
CREATE POLICY "profiles_auth_select_all" ON public.profiles
  FOR SELECT TO authenticated
  USING (true);
