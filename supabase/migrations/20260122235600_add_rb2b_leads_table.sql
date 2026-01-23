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

-- Add missing columns if table already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'rb2b_id') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN rb2b_id TEXT UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'email') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN email TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'first_name') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN first_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'last_name') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN last_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'full_name') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN full_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'job_title') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN job_title TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'linkedin_url') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN linkedin_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'company_name') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN company_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'company_domain') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN company_domain TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'company_industry') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN company_industry TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'company_size') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN company_size TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'city') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN city TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'state') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN state TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'country') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN country TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'page_url') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN page_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'referrer') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN referrer TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'visit_count') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN visit_count INTEGER DEFAULT 1;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'first_seen_at') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN first_seen_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'last_seen_at') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN last_seen_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'status') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rb2b_leads' AND column_name = 'notes') THEN
        ALTER TABLE public.rb2b_leads ADD COLUMN notes TEXT;
    END IF;
END $$;

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
DROP POLICY IF EXISTS "Admins can manage rb2b leads" ON public.rb2b_leads;
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
DROP POLICY IF EXISTS "Service role can insert leads" ON public.rb2b_leads;
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
