-- Vendors Table for funeral homes, florists, and service providers
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create vendors table
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type_id UUID REFERENCES public.vendor_types(id) ON DELETE SET NULL,

    -- Business Details
    description TEXT,
    short_description TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,

    -- Location
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Media
    logo_url TEXT,
    banner_url TEXT,

    -- Status & Features
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
    featured BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false,

    -- Stats
    view_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON public.vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_type_id ON public.vendors(type_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON public.vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_city_state ON public.vendors(city, state);
CREATE INDEX IF NOT EXISTS idx_vendors_featured ON public.vendors(featured) WHERE featured = true;

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view active vendors
CREATE POLICY "Anyone can view active vendors"
    ON public.vendors
    FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

-- Admins can manage all vendors
CREATE POLICY "Admins can manage vendors"
    ON public.vendors
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND (profiles.role = 'admin' OR profiles.is_admin = true)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND (profiles.role = 'admin' OR profiles.is_admin = true)
        )
    );

-- Add comment
COMMENT ON TABLE public.vendors IS 'Stores vendor/business listings including funeral homes, florists, and service providers';

DO $$
BEGIN
    RAISE NOTICE 'Created vendors table for business listings';
END $$;
