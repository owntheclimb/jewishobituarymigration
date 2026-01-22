-- RB2B Leads Table for visitor identification
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create rb2b_leads table
CREATE TABLE IF NOT EXISTS public.rb2b_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- RB2B ID
    rb2b_id TEXT UNIQUE,

    -- Contact Details
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    job_title TEXT,
    linkedin_url TEXT,

    -- Company Details
    company_name TEXT,
    company_domain TEXT,
    company_industry TEXT,
    company_size TEXT,

    -- Location
    city TEXT,
    state TEXT,
    country TEXT,

    -- Visit Details
    page_url TEXT,
    referrer TEXT,
    visit_count INTEGER DEFAULT 1,
    first_seen_at TIMESTAMP WITH TIME ZONE,
    last_seen_at TIMESTAMP WITH TIME ZONE,

    -- Status & Notes
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_rb2b_leads_rb2b_id ON public.rb2b_leads(rb2b_id);
CREATE INDEX IF NOT EXISTS idx_rb2b_leads_email ON public.rb2b_leads(email);
CREATE INDEX IF NOT EXISTS idx_rb2b_leads_company_name ON public.rb2b_leads(company_name);
CREATE INDEX IF NOT EXISTS idx_rb2b_leads_status ON public.rb2b_leads(status);
CREATE INDEX IF NOT EXISTS idx_rb2b_leads_created_at ON public.rb2b_leads(created_at);

-- Enable RLS
ALTER TABLE public.rb2b_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only admins can view and manage leads
CREATE POLICY "Admins can manage rb2b leads"
    ON public.rb2b_leads
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

-- Allow webhook to insert leads (using service role)
CREATE POLICY "Service role can insert leads"
    ON public.rb2b_leads
    FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public.rb2b_leads IS 'Stores leads identified by RB2B visitor identification service';

DO $$
BEGIN
    RAISE NOTICE 'Created rb2b_leads table for visitor identification';
END $$;
