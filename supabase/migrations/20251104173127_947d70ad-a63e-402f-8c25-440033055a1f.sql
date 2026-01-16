-- Allow authenticated users to insert new communities (schools, synagogues, etc.)
-- New submissions will need to be reviewed/approved by admins later

CREATE POLICY "Authenticated users can submit communities"
ON public.communities
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Add a column to track submission status (for future moderation)
ALTER TABLE public.communities
ADD COLUMN IF NOT EXISTS submitted_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Update existing communities to be approved
UPDATE public.communities
SET status = 'approved'
WHERE status IS NULL OR status = 'pending';

-- Update the SELECT policy to only show approved communities to public
DROP POLICY IF EXISTS "Communities are viewable by everyone" ON public.communities;

CREATE POLICY "Approved communities are viewable by everyone"
ON public.communities
FOR SELECT
USING (status = 'approved' OR submitted_by = auth.uid());