-- Create storage buckets for media assets
INSERT INTO storage.buckets (id, name, public) VALUES 
('memorial-media', 'memorial-media', true),
('memorial-thumbnails', 'memorial-thumbnails', true);

-- Create MediaAsset table
CREATE TABLE public.media_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    obituary_id uuid NOT NULL REFERENCES public.obituaries(id) ON DELETE CASCADE,
    uploader_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    type text NOT NULL CHECK (type IN ('photo', 'video')),
    storage_key text NOT NULL,
    thumb_key text,
    duration_seconds integer,
    width integer,
    height integer,
    title text,
    caption text,
    visibility text DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    status text DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create Memory table
CREATE TABLE public.memories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    obituary_id uuid NOT NULL REFERENCES public.obituaries(id) ON DELETE CASCADE,
    author_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name text NOT NULL,
    body text NOT NULL,
    status text DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create GuestbookEntry table
CREATE TABLE public.guestbook_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    obituary_id uuid NOT NULL REFERENCES public.obituaries(id) ON DELETE CASCADE,
    author_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create ObituaryTheme table
CREATE TABLE public.obituary_themes (
    obituary_id uuid PRIMARY KEY REFERENCES public.obituaries(id) ON DELETE CASCADE,
    background_style text DEFAULT 'forest' CHECK (background_style IN ('forest', 'sky', 'ocean', 'plain')),
    accent_color_hex text DEFAULT '#7A2CC6',
    music_enabled boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now()
);

-- Create ObituarySettings table
CREATE TABLE public.obituary_settings (
    obituary_id uuid PRIMARY KEY REFERENCES public.obituaries(id) ON DELETE CASCADE,
    allow_public_uploads boolean DEFAULT true,
    require_moderation_for_uploads boolean DEFAULT true,
    guestbook_enabled boolean DEFAULT true,
    max_video_seconds integer DEFAULT 120,
    updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_media_assets_obituary_type_status ON public.media_assets(obituary_id, type, status);
CREATE INDEX idx_memories_obituary_status ON public.memories(obituary_id, status);
CREATE INDEX idx_guestbook_entries_obituary_status ON public.guestbook_entries(obituary_id, status);

-- Enable RLS on all new tables
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obituary_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obituary_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for MediaAssets
CREATE POLICY "Anyone can view approved public media assets" 
ON public.media_assets FOR SELECT 
USING (status = 'approved' AND visibility = 'public');

CREATE POLICY "Users can upload media assets" 
ON public.media_assets FOR INSERT 
WITH CHECK (auth.uid() = uploader_user_id OR uploader_user_id IS NULL);

CREATE POLICY "Obituary owners can manage all media assets" 
ON public.media_assets FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.obituaries 
        WHERE id = obituary_id AND user_id = auth.uid()
    )
);

-- RLS Policies for Memories
CREATE POLICY "Anyone can view approved memories" 
ON public.memories FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Users can create memories" 
ON public.memories FOR INSERT 
WITH CHECK (auth.uid() = author_user_id OR author_user_id IS NULL);

CREATE POLICY "Obituary owners can manage all memories" 
ON public.memories FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.obituaries 
        WHERE id = obituary_id AND user_id = auth.uid()
    )
);

-- RLS Policies for GuestbookEntries
CREATE POLICY "Anyone can view approved guestbook entries" 
ON public.guestbook_entries FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Users can create guestbook entries" 
ON public.guestbook_entries FOR INSERT 
WITH CHECK (auth.uid() = author_user_id OR author_user_id IS NULL);

CREATE POLICY "Obituary owners can manage all guestbook entries" 
ON public.guestbook_entries FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.obituaries 
        WHERE id = obituary_id AND user_id = auth.uid()
    )
);

-- RLS Policies for ObituaryThemes
CREATE POLICY "Anyone can view obituary themes" 
ON public.obituary_themes FOR SELECT 
USING (true);

CREATE POLICY "Obituary owners can manage themes" 
ON public.obituary_themes FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.obituaries 
        WHERE id = obituary_id AND user_id = auth.uid()
    )
);

-- RLS Policies for ObituarySettings
CREATE POLICY "Anyone can view obituary settings" 
ON public.obituary_settings FOR SELECT 
USING (true);

CREATE POLICY "Obituary owners can manage settings" 
ON public.obituary_settings FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.obituaries 
        WHERE id = obituary_id AND user_id = auth.uid()
    )
);

-- Storage policies for memorial media
CREATE POLICY "Anyone can view public memorial media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'memorial-media');

CREATE POLICY "Authenticated users can upload memorial media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'memorial-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own memorial media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'memorial-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own memorial media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'memorial-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for thumbnails
CREATE POLICY "Anyone can view thumbnails" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'memorial-thumbnails');

CREATE POLICY "Service role can manage thumbnails" 
ON storage.objects FOR ALL 
USING (bucket_id = 'memorial-thumbnails' AND auth.role() = 'service_role');

-- Create triggers for updated_at
CREATE TRIGGER update_media_assets_updated_at
BEFORE UPDATE ON public.media_assets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_memories_updated_at
BEFORE UPDATE ON public.memories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_guestbook_entries_updated_at
BEFORE UPDATE ON public.guestbook_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_obituary_themes_updated_at
BEFORE UPDATE ON public.obituary_themes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_obituary_settings_updated_at
BEFORE UPDATE ON public.obituary_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();