-- Add DELETE policy for profiles table
-- This allows users to delete their own profile records

CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);