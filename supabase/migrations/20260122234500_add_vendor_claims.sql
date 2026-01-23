-- Vendor Claims Table for business claim submissions
-- Part 4: Vendor/Sponsorship System
-- January 22, 2026

-- Create vendor_claims table
CREATE TABLE IF NOT EXISTS public.vendor_claims (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,

    -- Business Information
    business_name TEXT NOT NULL,
    business_type TEXT,
    website TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,

    -- Contact Person
    contact_name TEXT,
    contact_title TEXT,
    contact_email TEXT,
    contact_phone TEXT,

    -- Claim Details
    description TEXT,
    services TEXT[],
    verification_method TEXT,
    additional_notes TEXT,

    -- Status Tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected')),
    admin_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vendor_claims_status ON public.vendor_claims(status);
CREATE INDEX IF NOT EXISTS idx_vendor_claims_created_at ON public.vendor_claims(created_at);
CREATE INDEX IF NOT EXISTS idx_vendor_claims_vendor_id ON public.vendor_claims(vendor_id);

-- Enable RLS
ALTER TABLE public.vendor_claims ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can submit a claim
DROP POLICY IF EXISTS "Anyone can submit vendor claims" ON public.vendor_claims;
CREATE POLICY "Anyone can submit vendor claims"
    ON public.vendor_claims
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only admins can view and manage claims
DROP POLICY IF EXISTS "Admins can manage vendor claims" ON public.vendor_claims;
CREATE POLICY "Admins can manage vendor claims"
    ON public.vendor_claims
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

-- Add comment documenting the schema
COMMENT ON TABLE public.vendor_claims IS 'Stores vendor claim requests submitted through the /vendors/claim form. Admins review and approve/reject claims.';

DO $$
BEGIN
    RAISE NOTICE 'Created vendor_claims table for vendor claim submissions';
END $$;
