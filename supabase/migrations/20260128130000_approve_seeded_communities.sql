-- Fix: Set status = 'approved' for all seeded synagogues
-- The seed migration didn't set status, so they defaulted to 'pending'

UPDATE public.communities
SET status = 'approved'
WHERE type = 'synagogue'
  AND status IS DISTINCT FROM 'approved';
