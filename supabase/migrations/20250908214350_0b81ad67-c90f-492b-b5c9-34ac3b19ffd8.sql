-- Fix security issues with profiles table RLS policies
-- Drop existing potentially problematic policies and recreate with strict access control

-- First, drop all existing policies on profiles table
DROP POLICY IF EXISTS "Service role can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create strict RLS policies for profiles table
-- Users can only view their own profile (authenticated users only)
CREATE POLICY "Users can view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can only insert their own profile (authenticated users only)
CREATE POLICY "Users can insert own profile only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own profile (authenticated users only)
CREATE POLICY "Users can update own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role retains admin access for system operations
CREATE POLICY "Service role admin access"
ON public.profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix obituary_settings table - restrict to obituary owners only
DROP POLICY IF EXISTS "Anyone can view obituary settings" ON public.obituary_settings;

CREATE POLICY "Only obituary owners can view settings"
ON public.obituary_settings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.obituaries 
    WHERE obituaries.id = obituary_settings.obituary_id 
    AND obituaries.user_id = auth.uid()
  )
);

-- Fix obituary_themes table - restrict to obituary owners only  
DROP POLICY IF EXISTS "Anyone can view obituary themes" ON public.obituary_themes;

CREATE POLICY "Only obituary owners can view themes"
ON public.obituary_themes
FOR SELECT  
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.obituaries 
    WHERE obituaries.id = obituary_themes.obituary_id 
    AND obituaries.user_id = auth.uid()
  )
);

-- Ensure RLS is enabled on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obituary_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obituary_themes ENABLE ROW LEVEL SECURITY;