-- Contact Submissions Table for contact form entries
-- Part 11: Database Schema Fix
-- January 22, 2026

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Contact Details
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,

    -- Message
    subject TEXT,
    message TEXT NOT NULL,

    -- Source
    source TEXT DEFAULT 'contact-form', -- contact-form, vendor-inquiry, etc.
    page_url TEXT, -- Which page they submitted from

    -- Reference (optional - for vendor inquiries, etc.)
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
    obituary_id UUID REFERENCES public.obituaries(id) ON DELETE SET NULL,

    -- Status
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),

    -- Admin tracking
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    replied_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    replied_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,

    -- Metadata
    ip_address INET,
    user_agent TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_vendor_id ON public.contact_submissions(vendor_id);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can submit a contact form
CREATE POLICY "Anyone can submit contact form"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only admins can view and manage submissions
CREATE POLICY "Admins can manage contact submissions"
    ON public.contact_submissions
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
COMMENT ON TABLE public.contact_submissions IS 'Stores contact form submissions and inquiries';

DO $$
BEGIN
    RAISE NOTICE 'Created contact_submissions table for contact forms';
END $$;
