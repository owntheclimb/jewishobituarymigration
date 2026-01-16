-- Create server-side ownership validation function
CREATE OR REPLACE FUNCTION public.is_obituary_owner(obit_id uuid, check_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM obituaries 
    WHERE id = obit_id AND user_id = check_user_id
  );
$$;

-- Create function to auto-set status based on ownership for memories
CREATE OR REPLACE FUNCTION public.set_memory_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- If user owns the obituary, auto-approve; otherwise set to pending
  IF public.is_obituary_owner(NEW.obituary_id, COALESCE(NEW.author_user_id, '00000000-0000-0000-0000-000000000000'::uuid)) THEN
    NEW.status := 'approved';
  ELSE
    NEW.status := 'pending';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create function to auto-set status based on ownership for guestbook entries
CREATE OR REPLACE FUNCTION public.set_guestbook_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- If user owns the obituary, auto-approve; otherwise set to pending
  IF public.is_obituary_owner(NEW.obituary_id, COALESCE(NEW.author_user_id, '00000000-0000-0000-0000-000000000000'::uuid)) THEN
    NEW.status := 'approved';
  ELSE
    NEW.status := 'pending';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create function to auto-set status based on ownership for media assets
CREATE OR REPLACE FUNCTION public.set_media_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- If user owns the obituary, auto-approve; otherwise set to pending
  IF public.is_obituary_owner(NEW.obituary_id, COALESCE(NEW.uploader_user_id, '00000000-0000-0000-0000-000000000000'::uuid)) THEN
    NEW.status := 'approved';
  ELSE
    NEW.status := 'pending';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS set_memory_status_trigger ON public.memories;
DROP TRIGGER IF EXISTS set_guestbook_status_trigger ON public.guestbook_entries;
DROP TRIGGER IF EXISTS set_media_status_trigger ON public.media_assets;

-- Create triggers to enforce server-side status setting
CREATE TRIGGER set_memory_status_trigger
  BEFORE INSERT ON public.memories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_memory_status();

CREATE TRIGGER set_guestbook_status_trigger
  BEFORE INSERT ON public.guestbook_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_guestbook_status();

CREATE TRIGGER set_media_status_trigger
  BEFORE INSERT ON public.media_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.set_media_status();