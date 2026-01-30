-- ============================================================================
-- NUCLEAR RLS FIX - Completely reset profiles RLS and ensure admin access
-- ============================================================================

-- Step 1: Temporarily disable RLS on profiles to allow updates
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 2: Get the user_id from auth.users and update/create the profile
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id for the admin email
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'owntheclimb@neshamajfs.com' LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    -- Check if profile exists
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_user_id) THEN
      -- Update existing profile
      UPDATE public.profiles
      SET role = 'admin', is_admin = true, email = 'owntheclimb@neshamajfs.com'
      WHERE user_id = v_user_id;
      RAISE NOTICE 'Updated existing profile for admin user %', v_user_id;
    ELSE
      -- Create new profile
      INSERT INTO public.profiles (user_id, email, full_name, role, is_admin, created_at, updated_at)
      VALUES (v_user_id, 'owntheclimb@neshamajfs.com', 'Shimi Carroll', 'admin', true, now(), now());
      RAISE NOTICE 'Created new profile for admin user %', v_user_id;
    END IF;
  ELSE
    RAISE WARNING 'No user found with email owntheclimb@neshamajfs.com';
  END IF;
END $$;

-- Step 3: Drop ALL existing policies on profiles
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', policy_record.policyname);
    RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
  END LOOP;
END $$;

-- Step 4: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create simple, permissive policies
-- Allow ALL authenticated users to read ANY profile (needed for admin checks)
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT TO authenticated USING (true);

-- Allow anonymous to read profiles too (for public profile pages)
CREATE POLICY "profiles_select_anon_policy" ON public.profiles
  FOR SELECT TO anon USING (true);

-- Allow users to update their own profile
CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Allow admins to update any profile
CREATE POLICY "profiles_admin_update_policy" ON public.profiles
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR is_admin = true))
  );

-- Allow inserts for new users
CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Allow admins to insert profiles
CREATE POLICY "profiles_admin_insert_policy" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR is_admin = true))
  );

-- Step 6: Also fix other critical tables RLS
-- obit_sources
ALTER TABLE public.obit_sources DISABLE ROW LEVEL SECURITY;
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT policyname FROM pg_policies WHERE tablename = 'obit_sources' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.obit_sources', policy_record.policyname);
  END LOOP;
END $$;
ALTER TABLE public.obit_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "obit_sources_select" ON public.obit_sources FOR SELECT USING (true);
CREATE POLICY "obit_sources_all_admin" ON public.obit_sources FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- scraped_sources
ALTER TABLE public.scraped_sources DISABLE ROW LEVEL SECURITY;
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT policyname FROM pg_policies WHERE tablename = 'scraped_sources' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.scraped_sources', policy_record.policyname);
  END LOOP;
END $$;
ALTER TABLE public.scraped_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scraped_sources_select" ON public.scraped_sources FOR SELECT USING (true);
CREATE POLICY "scraped_sources_all_admin" ON public.scraped_sources FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- notable_figures
ALTER TABLE public.notable_figures DISABLE ROW LEVEL SECURITY;
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT policyname FROM pg_policies WHERE tablename = 'notable_figures' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.notable_figures', policy_record.policyname);
  END LOOP;
END $$;
ALTER TABLE public.notable_figures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notable_figures_select" ON public.notable_figures FOR SELECT USING (true);
CREATE POLICY "notable_figures_all_admin" ON public.notable_figures FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- Verify the admin user
DO $$
DECLARE
  admin_count INT;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM public.profiles WHERE role = 'admin' OR is_admin = true;
  RAISE NOTICE 'Total admin users: %', admin_count;
END $$;
