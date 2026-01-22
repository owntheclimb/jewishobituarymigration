-- Admin Settings Table for site-wide configuration
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Setting identification
    key TEXT UNIQUE NOT NULL,
    category TEXT,
    label TEXT,
    description TEXT,

    -- Value (stored as JSON for flexibility)
    value JSONB DEFAULT '{}'::jsonb,
    default_value JSONB DEFAULT '{}'::jsonb,
    value_type TEXT DEFAULT 'string', -- string, number, boolean, json, array

    -- Display
    sort_order INTEGER DEFAULT 0,
    is_secret BOOLEAN DEFAULT false, -- Hide value in UI

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_settings_key ON public.admin_settings(key);
CREATE INDEX IF NOT EXISTS idx_admin_settings_category ON public.admin_settings(category);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only admins can view and manage settings
CREATE POLICY "Admins can manage settings"
    ON public.admin_settings
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

-- Insert default settings
INSERT INTO public.admin_settings (key, category, label, value, value_type, sort_order) VALUES
    ('site_name', 'general', 'Site Name', '"JewishObituary.com"', 'string', 1),
    ('site_description', 'general', 'Site Description', '"The Jewish Memorial and Obituary Platform"', 'string', 2),
    ('contact_email', 'general', 'Contact Email', '"contact@jewishobituary.com"', 'string', 3),
    ('support_email', 'general', 'Support Email', '"support@jewishobituary.com"', 'string', 4),
    ('analytics_enabled', 'analytics', 'Enable Analytics', 'true', 'boolean', 10),
    ('posthog_enabled', 'analytics', 'Enable PostHog', 'true', 'boolean', 11),
    ('maintenance_mode', 'system', 'Maintenance Mode', 'false', 'boolean', 20),
    ('obituary_approval_required', 'obituaries', 'Require Approval', 'false', 'boolean', 30),
    ('auto_scraping_enabled', 'scraping', 'Auto Scraping', 'true', 'boolean', 40)
ON CONFLICT (key) DO NOTHING;

-- Add comment
COMMENT ON TABLE public.admin_settings IS 'Site-wide admin settings and configuration';

DO $$
BEGIN
    RAISE NOTICE 'Created admin_settings table for site configuration';
END $$;
