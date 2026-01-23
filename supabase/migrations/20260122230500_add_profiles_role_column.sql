-- Add role column to profiles table for admin functionality
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Add role column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;
END $$;

-- Add is_admin column for backward compatibility if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_admin') THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Create index on role for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Add comment
COMMENT ON COLUMN public.profiles.role IS 'User role: user or admin';
COMMENT ON COLUMN public.profiles.is_admin IS 'Deprecated: use role column instead';

DO $$
BEGIN
    RAISE NOTICE 'Added role and is_admin columns to profiles table';
END $$;
