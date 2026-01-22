-- Vendor Leads Table for tracking clicks and contact form submissions
-- Part 4: Vendor/Sponsorship System
-- January 22, 2026

-- Create vendor_leads table
CREATE TABLE IF NOT EXISTS public.vendor_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
    lead_type TEXT NOT NULL, -- page_view, click_phone, click_website, click_email, contact_form
    source_page TEXT, -- The page where the lead originated
    lead_data JSONB, -- Additional data (for contact forms)
    visitor_ip TEXT,
    visitor_session TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_vendor_leads_vendor_id ON public.vendor_leads(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_leads_lead_type ON public.vendor_leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_vendor_leads_created_at ON public.vendor_leads(created_at);

-- Create composite index for vendor analytics
CREATE INDEX IF NOT EXISTS idx_vendor_leads_vendor_date ON public.vendor_leads(vendor_id, created_at);

-- Enable RLS
ALTER TABLE public.vendor_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to insert leads (for tracking)
CREATE POLICY "Anyone can insert vendor leads"
    ON public.vendor_leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Admins can view all vendor leads"
    ON public.vendor_leads
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Add tier column to vendors for sponsorship levels
ALTER TABLE public.vendors
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'basic' CHECK (tier IN ('basic', 'premium', 'featured'));

-- Add click tracking counters to vendors (for quick stats)
ALTER TABLE public.vendors
ADD COLUMN IF NOT EXISTS page_views INTEGER DEFAULT 0;

ALTER TABLE public.vendors
ADD COLUMN IF NOT EXISTS phone_clicks INTEGER DEFAULT 0;

ALTER TABLE public.vendors
ADD COLUMN IF NOT EXISTS website_clicks INTEGER DEFAULT 0;

ALTER TABLE public.vendors
ADD COLUMN IF NOT EXISTS contact_submissions INTEGER DEFAULT 0;

-- Create function to increment vendor counters
CREATE OR REPLACE FUNCTION increment_vendor_counter()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lead_type = 'page_view' THEN
        UPDATE public.vendors SET page_views = page_views + 1 WHERE id = NEW.vendor_id;
    ELSIF NEW.lead_type = 'click_phone' THEN
        UPDATE public.vendors SET phone_clicks = phone_clicks + 1 WHERE id = NEW.vendor_id;
    ELSIF NEW.lead_type = 'click_website' THEN
        UPDATE public.vendors SET website_clicks = website_clicks + 1 WHERE id = NEW.vendor_id;
    ELSIF NEW.lead_type = 'click_email' THEN
        UPDATE public.vendors SET website_clicks = website_clicks + 1 WHERE id = NEW.vendor_id;
    ELSIF NEW.lead_type = 'contact_form' THEN
        UPDATE public.vendors SET contact_submissions = contact_submissions + 1 WHERE id = NEW.vendor_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-increment counters
DROP TRIGGER IF EXISTS trigger_increment_vendor_counter ON public.vendor_leads;
CREATE TRIGGER trigger_increment_vendor_counter
    AFTER INSERT ON public.vendor_leads
    FOR EACH ROW
    EXECUTE FUNCTION increment_vendor_counter();

-- Add comment documenting the schema
COMMENT ON TABLE public.vendor_leads IS 'Tracks vendor page views, clicks (phone/website/email), and contact form submissions for analytics and lead generation.';

COMMENT ON COLUMN public.vendors.tier IS 'Sponsorship tier: basic (free), premium ($49/mo), featured ($99/mo)';

DO $$
BEGIN
    RAISE NOTICE 'Created vendor_leads table for lead tracking';
    RAISE NOTICE 'Added tier column to vendors for sponsorship levels';
    RAISE NOTICE 'Added click counters to vendors table';
END $$;
