-- Fix security vulnerability: Restrict profile visibility to profile owners only
DROP POLICY "Users can view all profiles" ON public.profiles;

-- Create new policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Also ensure users can only view their own profile for other operations
-- (The existing INSERT and UPDATE policies are already correct)

-- Add a policy for service role to access profiles for email functionality
CREATE POLICY "Service role can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.role() = 'service_role');