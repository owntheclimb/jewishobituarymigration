-- Vendor Types Table for categorizing vendors
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create vendor_types table (must be created before vendors table references it)
CREATE TABLE IF NOT EXISTS public.vendor_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,

    -- Display
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if table already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_types' AND column_name = 'active') THEN
        ALTER TABLE public.vendor_types ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_types' AND column_name = 'sort_order') THEN
        ALTER TABLE public.vendor_types ADD COLUMN sort_order INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_types' AND column_name = 'icon') THEN
        ALTER TABLE public.vendor_types ADD COLUMN icon TEXT;
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vendor_types_slug ON public.vendor_types(slug);
CREATE INDEX IF NOT EXISTS idx_vendor_types_sort_order ON public.vendor_types(sort_order);

-- Enable RLS
ALTER TABLE public.vendor_types ENABLE ROW LEVEL SECURITY;

-- RLS Policies (drop and recreate to handle changes)
DROP POLICY IF EXISTS "Anyone can view vendor types" ON public.vendor_types;
CREATE POLICY "Anyone can view vendor types"
    ON public.vendor_types
    FOR SELECT
    TO anon, authenticated
    USING (active = true);

DROP POLICY IF EXISTS "Admins can manage vendor types" ON public.vendor_types;
CREATE POLICY "Admins can manage vendor types"
    ON public.vendor_types
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

-- Insert default vendor types
INSERT INTO public.vendor_types (name, slug, description, icon, sort_order) VALUES
    ('Funeral Homes', 'funeral-homes', 'Full-service funeral homes and mortuaries', 'Building2', 1),
    ('Cemeteries', 'cemeteries', 'Jewish cemeteries and memorial parks', 'MapPin', 2),
    ('Florists', 'florists', 'Sympathy flowers and arrangements', 'Flower', 3),
    ('Caterers', 'caterers', 'Shiva and mourning meal catering', 'UtensilsCrossed', 4),
    ('Monument Makers', 'monument-makers', 'Headstones and memorials', 'Mountain', 5),
    ('Grief Counselors', 'grief-counselors', 'Bereavement support and counseling', 'Heart', 6),
    ('Chevra Kadisha', 'chevra-kadisha', 'Jewish burial societies', 'Users', 7),
    ('Rabbis', 'rabbis', 'Officiants for funeral services', 'Book', 8),
    ('Transportation', 'transportation', 'Hearse and family transportation', 'Car', 9),
    ('Legal Services', 'legal-services', 'Estate planning and probate attorneys', 'Scale', 10)
ON CONFLICT (slug) DO NOTHING;

-- Add comment
COMMENT ON TABLE public.vendor_types IS 'Categories for vendor listings (funeral homes, florists, etc.)';

DO $$
BEGIN
    RAISE NOTICE 'Created vendor_types table with default categories';
END $$;
