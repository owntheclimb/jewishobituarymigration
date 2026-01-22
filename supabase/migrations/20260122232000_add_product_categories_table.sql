-- Product Categories Table
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create product_categories table (must be created before products table references it)
CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,

    -- Hierarchy
    parent_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,

    -- Display
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON public.product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_parent_id ON public.product_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_sort_order ON public.product_categories(sort_order);

-- Enable RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view active categories
CREATE POLICY "Anyone can view product categories"
    ON public.product_categories
    FOR SELECT
    TO anon, authenticated
    USING (active = true);

-- Admins can manage categories
CREATE POLICY "Admins can manage product categories"
    ON public.product_categories
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

-- Insert default categories
INSERT INTO public.product_categories (name, slug, description, sort_order) VALUES
    ('Sympathy Flowers', 'sympathy-flowers', 'Floral arrangements for memorial services', 1),
    ('Standing Sprays', 'standing-sprays', 'Large standing floral arrangements', 2),
    ('Baskets', 'baskets', 'Sympathy flower baskets', 3),
    ('Plants', 'plants', 'Living plants and arrangements', 4),
    ('Shiva Gifts', 'shiva-gifts', 'Appropriate gifts for mourners', 5),
    ('Memorial Donations', 'memorial-donations', 'Charitable donations in memory', 6)
ON CONFLICT (slug) DO NOTHING;

-- Add comment
COMMENT ON TABLE public.product_categories IS 'Categories for organizing products';

DO $$
BEGIN
    RAISE NOTICE 'Created product_categories table with default categories';
END $$;
