-- Analytics Events Table for tracking user interactions
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Event Details
    event_name TEXT NOT NULL,
    event_category TEXT,
    event_action TEXT,
    event_label TEXT,
    event_value INTEGER,

    -- Page/URL
    page_url TEXT,
    page_title TEXT,
    referrer TEXT,

    -- Session
    session_id TEXT,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    -- Device/Browser
    user_agent TEXT,
    device_type TEXT, -- mobile, tablet, desktop
    browser TEXT,
    os TEXT,
    screen_width INTEGER,
    screen_height INTEGER,

    -- Location
    ip_address INET,
    country TEXT,
    region TEXT,
    city TEXT,

    -- UTM Parameters
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,

    -- Custom Properties
    properties JSONB DEFAULT '{}'::jsonb,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_url ON public.analytics_events(page_url);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can insert analytics events
CREATE POLICY "Anyone can insert analytics events"
    ON public.analytics_events
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view analytics"
    ON public.analytics_events
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND (profiles.role = 'admin' OR profiles.is_admin = true)
        )
    );

-- Add comment
COMMENT ON TABLE public.analytics_events IS 'Stores analytics events for tracking user behavior';

DO $$
BEGIN
    RAISE NOTICE 'Created analytics_events table for analytics tracking';
END $$;
