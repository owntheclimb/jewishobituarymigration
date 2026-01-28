-- Add missing obituary_settings rows
-- The frontend queries obituary_settings but many obituaries don't have settings rows
-- This creates default settings for any obituary that doesn't have one

-- Insert default settings for all obituaries that don't have settings
INSERT INTO public.obituary_settings (obituary_id, allow_public_uploads, require_moderation_for_uploads, guestbook_enabled, max_video_seconds)
SELECT
    o.id as obituary_id,
    true as allow_public_uploads,
    true as require_moderation_for_uploads,
    true as guestbook_enabled,
    120 as max_video_seconds
FROM public.obituaries o
WHERE NOT EXISTS (
    SELECT 1 FROM public.obituary_settings os WHERE os.obituary_id = o.id
)
ON CONFLICT (obituary_id) DO NOTHING;

-- Create a trigger to automatically create settings for new obituaries
CREATE OR REPLACE FUNCTION public.create_obituary_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.obituary_settings (obituary_id)
    VALUES (NEW.id)
    ON CONFLICT (obituary_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists and recreate
DROP TRIGGER IF EXISTS auto_create_obituary_settings ON public.obituaries;

CREATE TRIGGER auto_create_obituary_settings
    AFTER INSERT ON public.obituaries
    FOR EACH ROW
    EXECUTE FUNCTION public.create_obituary_settings();

DO $$
BEGIN
    RAISE NOTICE 'Added missing obituary_settings rows and created auto-creation trigger';
END $$;
