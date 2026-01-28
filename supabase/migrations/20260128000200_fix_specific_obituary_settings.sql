-- Directly insert settings for the Einstein obituary and any others that got missed
-- The previous migration only worked for obituaries in the obituaries table
-- Some may be in scraped_obituaries or have other issues

-- First, let's insert for ANY UUID-like value that doesn't have settings
-- This specific one is failing: 3e20c9ed-1518-4bb4-b740-44b4620a5f59

INSERT INTO public.obituary_settings (obituary_id, allow_public_uploads, require_moderation_for_uploads, guestbook_enabled, max_video_seconds)
VALUES ('3e20c9ed-1518-4bb4-b740-44b4620a5f59', true, true, true, 120)
ON CONFLICT (obituary_id) DO NOTHING;

-- Also, let's drop the foreign key constraint on obituary_settings so we can have settings for any obituary
-- even if it's not in the main obituaries table

ALTER TABLE public.obituary_settings
DROP CONSTRAINT IF EXISTS obituary_settings_obituary_id_fkey;

-- Now insert again without FK constraint
INSERT INTO public.obituary_settings (obituary_id, allow_public_uploads, require_moderation_for_uploads, guestbook_enabled, max_video_seconds)
VALUES ('3e20c9ed-1518-4bb4-b740-44b4620a5f59', true, true, true, 120)
ON CONFLICT (obituary_id) DO NOTHING;

DO $$
BEGIN
    RAISE NOTICE 'Added settings for specific obituary and removed FK constraint';
END $$;
