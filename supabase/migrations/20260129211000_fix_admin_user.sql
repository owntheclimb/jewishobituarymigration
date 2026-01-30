-- ============================================================================
-- FIX ADMIN USER - Ensure admin profile exists and has correct role
-- ============================================================================

-- First, update any profile that matches the email from auth.users
UPDATE public.profiles p
SET
  role = 'admin',
  is_admin = true,
  email = u.email
FROM auth.users u
WHERE p.user_id = u.id
AND u.email = 'owntheclimb@neshamajfs.com';

-- If no profile exists for this user, create one
INSERT INTO public.profiles (user_id, email, full_name, role, is_admin, created_at, updated_at)
SELECT
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', email),
  'admin',
  true,
  now(),
  now()
FROM auth.users
WHERE email = 'owntheclimb@neshamajfs.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = auth.users.id
)
ON CONFLICT (user_id) DO UPDATE SET
  role = 'admin',
  is_admin = true,
  email = EXCLUDED.email;

-- Also fix any other profiles that have is_admin = true but no role
UPDATE public.profiles
SET role = 'admin'
WHERE is_admin = true AND (role IS NULL OR role = 'user');

-- Ensure the profiles RLS allows the user to see their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
CREATE POLICY "Anyone can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (true);
