-- Notable Figures Table for historical/notable Jewish figures
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create notable_figures table
CREATE TABLE IF NOT EXISTS public.notable_figures (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    hebrew_name TEXT,

    -- Dates
    birth_date DATE,
    death_date DATE,
    birth_year INTEGER,
    death_year INTEGER,

    -- Biography
    bio TEXT,
    short_bio TEXT,
    notable_for TEXT,

    -- Categorization
    category TEXT,
    subcategory TEXT,

    -- Media
    image_url TEXT,
    gallery_urls TEXT[],

    -- Stats
    candle_count INTEGER DEFAULT 0,
    memory_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,

    -- Status & Features
    status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
    featured BOOLEAN DEFAULT false,

    -- SEO
    meta_title TEXT,
    meta_description TEXT,

    -- External Links
    wikipedia_url TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notable_figures_slug ON public.notable_figures(slug);
CREATE INDEX IF NOT EXISTS idx_notable_figures_category ON public.notable_figures(category);
CREATE INDEX IF NOT EXISTS idx_notable_figures_status ON public.notable_figures(status);
CREATE INDEX IF NOT EXISTS idx_notable_figures_featured ON public.notable_figures(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_notable_figures_death_year ON public.notable_figures(death_year);

-- Enable RLS
ALTER TABLE public.notable_figures ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view published figures
CREATE POLICY "Anyone can view published notable figures"
    ON public.notable_figures
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Admins can manage all figures
CREATE POLICY "Admins can manage notable figures"
    ON public.notable_figures
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
COMMENT ON TABLE public.notable_figures IS 'Historical and notable Jewish figures for memorial pages';

DO $$
BEGIN
    RAISE NOTICE 'Created notable_figures table for notable Jewish figures';
END $$;
