-- Fix virtual_candles table to match code expectations
-- The code uses entity_type, entity_id, session_id columns
-- But the table was created with obituary_id, notable_figure_id columns
-- This migration adds the missing columns

-- Add entity_type column
ALTER TABLE public.virtual_candles
ADD COLUMN IF NOT EXISTS entity_type TEXT DEFAULT 'obituary';

-- Add entity_id column (generic UUID reference)
ALTER TABLE public.virtual_candles
ADD COLUMN IF NOT EXISTS entity_id UUID;

-- Add session_id column for anonymous candle lighting tracking
ALTER TABLE public.virtual_candles
ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Create indexes for the new columns
CREATE INDEX IF NOT EXISTS idx_virtual_candles_entity_type ON public.virtual_candles(entity_type);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_entity_id ON public.virtual_candles(entity_id);
CREATE INDEX IF NOT EXISTS idx_virtual_candles_session_id ON public.virtual_candles(session_id);

-- Create unique constraint to prevent duplicate candles per session
CREATE UNIQUE INDEX IF NOT EXISTS idx_virtual_candles_unique_session
ON public.virtual_candles(entity_type, entity_id, session_id)
WHERE session_id IS NOT NULL;

-- Drop the old constraint that requires obituary_id OR notable_figure_id
-- (since we now use entity_type + entity_id pattern)
ALTER TABLE public.virtual_candles DROP CONSTRAINT IF EXISTS check_candle_reference;

-- Add new constraint - must have entity_id
ALTER TABLE public.virtual_candles ADD CONSTRAINT check_entity_reference
    CHECK (entity_id IS NOT NULL);

-- Update comment
COMMENT ON TABLE public.virtual_candles IS 'Virtual memorial candles lit in memory of the deceased. Uses entity_type/entity_id pattern for flexible references.';

DO $$
BEGIN
    RAISE NOTICE 'Fixed virtual_candles table columns to match code expectations';
END $$;
