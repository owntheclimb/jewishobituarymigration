-- Products Table for memorial products (flowers, etc.)
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,

    -- Details
    description TEXT,
    short_description TEXT,

    -- Pricing
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    compare_at_price DECIMAL(10, 2),
    currency TEXT DEFAULT 'USD',

    -- Categorization
    category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,

    -- Media
    image_url TEXT,
    images TEXT[], -- Array of additional images

    -- Status & Features
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    featured BOOLEAN DEFAULT false,

    -- Inventory
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER,

    -- SEO
    meta_title TEXT,
    meta_description TEXT,

    -- Stats
    view_count INTEGER DEFAULT 0,
    order_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view active products
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products"
    ON public.products
    FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

-- Admins can manage all products
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products"
    ON public.products
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
COMMENT ON TABLE public.products IS 'Product catalog for memorial items (flowers, donations, etc.)';

DO $$
BEGIN
    RAISE NOTICE 'Created products table for memorial items';
END $$;
