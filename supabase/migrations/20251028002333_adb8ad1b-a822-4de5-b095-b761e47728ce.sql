-- Add Hebrew name field to obituaries table
ALTER TABLE public.obituaries 
ADD COLUMN IF NOT EXISTS hebrew_name TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.obituaries.hebrew_name IS 'Hebrew name of the deceased for display and Yahrzeit reminders';