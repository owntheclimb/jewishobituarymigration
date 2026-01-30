-- ============================================================================
-- DISABLE PROFILES RLS - Testing to see if RLS is the issue
-- ============================================================================

-- Completely disable RLS on profiles table
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Also make sure the profile data exists and is correct
UPDATE public.profiles
SET role = 'admin', is_admin = true
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'owntheclimb@neshamajfs.com' LIMIT 1);

-- Verify
DO $$
DECLARE
  v_count INT;
  v_role TEXT;
BEGIN
  SELECT COUNT(*), MAX(role) INTO v_count, v_role
  FROM public.profiles
  WHERE role = 'admin';
  RAISE NOTICE 'Admin profiles: %, role: %', v_count, v_role;
END $$;
