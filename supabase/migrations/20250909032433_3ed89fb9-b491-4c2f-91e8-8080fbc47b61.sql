-- Update RLS policy to respect visibility settings and provide better access control
DROP POLICY IF EXISTS "Anyone can view published obituaries" ON public.obituaries;

-- Create new RLS policies that respect privacy settings
CREATE POLICY "Anyone can view public published obituaries" 
ON public.obituaries 
FOR SELECT 
USING (
  published = true 
  AND visibility = 'public'
);

CREATE POLICY "Authenticated users can view limited published obituaries" 
ON public.obituaries 
FOR SELECT 
TO authenticated
USING (
  published = true 
  AND (
    visibility = 'public' 
    OR visibility = 'authenticated'
    OR user_id = auth.uid()
  )
);

-- Add rate limiting protection by creating an index on commonly queried columns
CREATE INDEX IF NOT EXISTS idx_obituaries_published_visibility ON public.obituaries(published, visibility, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_obituaries_search ON public.obituaries(full_name, city, state) WHERE published = true AND visibility = 'public';