-- Virtual Candles Table for memorial candle lighting
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create virtual_candles table
CREATE TABLE IF NOT EXISTS public.virtual_candles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Reference (can be for obituary or notable figure)
    obituary_id UUID REFERENCES public.obituaries(id) ON DELETE CASCADE,
    notable_figure_id UUID REFERENCES public.notable_figures(id) ON DELETE CASCADE,

    -- Lit by
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT, -- Name of person lighting (if anonymous or not logged in)
    email TEXT,

    -- Message
    message TEXT,

    -- Candle details
    candle_type TEXT DEFAULT 'standard',
    duration_days INTEGER DEFAULT 1, -- How long candle stays lit

    -- Status
    is_lit BOOLEAN DEFAULT true,
    lit_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,

    -- Location (optional)
    city TEXT,
    country TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_virtual_candles_obituary_id ON public.virtual_candles(obituary_id);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_notable_figure_id ON public.virtual_candles(notable_figure_id);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_user_id ON public.virtual_candles(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_lit_at ON public.virtual_candles(lit_at);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_is_lit ON public.virtual_candles(is_lit) WHERE is_lit = true;

-- Enable RLS
ALTER TABLE public.virtual_candles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view lit candles
CREATE POLICY "Anyone can view lit candles"
    ON public.virtual_candles
    FOR SELECT
    TO anon, authenticated
    USING (is_lit = true);

-- Anyone can light a candle
CREATE POLICY "Anyone can light a candle"
    ON public.virtual_candles
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Users can update their own candles
CREATE POLICY "Users can update own candles"
    ON public.virtual_candles
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Admins can manage all candles
CREATE POLICY "Admins can manage candles"
    ON public.virtual_candles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND (profiles.role = 'admin' OR profiles.is_admin = true)
        )
    );

-- Add check constraint - must reference either obituary or notable figure
ALTER TABLE public.virtual_candles ADD CONSTRAINT check_candle_reference
    CHECK (obituary_id IS NOT NULL OR notable_figure_id IS NOT NULL);

-- Add comment
COMMENT ON TABLE public.virtual_candles IS 'Virtual memorial candles lit in memory of the deceased';

DO $$
BEGIN
    RAISE NOTICE 'Created virtual_candles table for memorial candles';
END $$;
