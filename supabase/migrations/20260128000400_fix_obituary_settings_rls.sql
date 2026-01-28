-- Fix RLS policy to explicitly allow anonymous users to SELECT obituary_settings

-- Drop the old policy
DROP POLICY IF EXISTS "Anyone can view obituary settings" ON public.obituary_settings;

-- Create new policy that explicitly allows anon and authenticated users
CREATE POLICY "Anyone can view obituary settings"
ON public.obituary_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Verify the policy was created
DO $$
BEGIN
    RAISE NOTICE 'Created RLS policy for anonymous access to obituary_settings';
END $$;
