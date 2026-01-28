-- Fix community_links RLS - allow users to insert links for their own obituaries

-- Policy: Users can insert community links for obituaries they own
CREATE POLICY "Users can insert community links for own obituaries"
ON public.community_links
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.obituaries o
    WHERE o.id = obituary_id
    AND o.user_id = auth.uid()
  )
);

-- Policy: Users can delete community links for obituaries they own
CREATE POLICY "Users can delete community links for own obituaries"
ON public.community_links
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.obituaries o
    WHERE o.id = obituary_id
    AND o.user_id = auth.uid()
  )
);

-- Also ensure communities can be created/upserted by authenticated users
-- (needed for city/school community creation during obituary submission)
DO $$
BEGIN
  -- Check if the policy already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'communities'
    AND policyname = 'Authenticated users can create communities'
  ) THEN
    CREATE POLICY "Authenticated users can create communities"
    ON public.communities
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END $$;
