-- Remove the overly broad service role admin access policy
DROP POLICY IF EXISTS "Service role admin access" ON public.profiles;

-- Create security definer functions for legitimate service role use cases
CREATE OR REPLACE FUNCTION public.get_profile_for_notification(obituary_user_id UUID)
RETURNS TABLE(email TEXT, full_name TEXT)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.email, p.full_name
  FROM profiles p
  WHERE p.user_id = obituary_user_id
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_profiles_for_digest()
RETURNS TABLE(
  subscription_id UUID,
  user_id UUID,
  community_id UUID,
  last_sent_at TIMESTAMPTZ,
  community_name TEXT,
  community_type TEXT,
  community_slug TEXT,
  user_email TEXT,
  user_full_name TEXT
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    s.id as subscription_id,
    s.user_id,
    s.community_id,
    s.last_sent_at,
    c.name as community_name,
    c.type as community_type,
    c.slug as community_slug,
    p.email as user_email,
    p.full_name as user_full_name
  FROM subscriptions s
  JOIN communities c ON c.id = s.community_id
  JOIN profiles p ON p.user_id = s.user_id
  WHERE s.frequency = 'daily'
    AND p.email IS NOT NULL;
$$;

-- Create restrictive service role policies for specific operations only
CREATE POLICY "Service role can read profiles for notifications" 
ON public.profiles 
FOR SELECT 
TO service_role
USING (
  -- Only allow access when called through our security definer functions
  -- This prevents direct profile access via service role
  false
);

-- Grant execute permissions on the functions to service role
GRANT EXECUTE ON FUNCTION public.get_profile_for_notification(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_profiles_for_digest() TO service_role;