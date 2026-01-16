-- Add new fields to existing obituaries table
ALTER TABLE public.obituaries 
ADD COLUMN city text,
ADD COLUMN state text,
ADD COLUMN high_schools text[] DEFAULT '{}',
ADD COLUMN colleges text[] DEFAULT '{}',
ADD COLUMN military_branches text[] DEFAULT '{}',
ADD COLUMN visibility text DEFAULT 'public' CHECK (visibility IN ('public', 'private'));

-- Create indexes for obituaries
CREATE INDEX idx_obituaries_city ON public.obituaries(city);
CREATE INDEX idx_obituaries_state ON public.obituaries(state);
CREATE INDEX idx_obituaries_visibility ON public.obituaries(visibility);
CREATE INDEX idx_obituaries_published_at ON public.obituaries(created_at) WHERE published = true;
CREATE INDEX idx_obituaries_high_schools ON public.obituaries USING GIN(high_schools);
CREATE INDEX idx_obituaries_colleges ON public.obituaries USING GIN(colleges);
CREATE INDEX idx_obituaries_military_branches ON public.obituaries USING GIN(military_branches);

-- Create Community table
CREATE TABLE public.communities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL CHECK (type IN ('city', 'highschool', 'college', 'military')),
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    stats_recent_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(type, slug)
);

-- Enable RLS on communities
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Create policies for communities (public read access)
CREATE POLICY "Communities are viewable by everyone" 
ON public.communities 
FOR SELECT 
USING (true);

-- Create CommunityLink table (many-to-many between obituaries and communities)
CREATE TABLE public.community_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    obituary_id uuid NOT NULL REFERENCES public.obituaries(id) ON DELETE CASCADE,
    community_id uuid NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(obituary_id, community_id)
);

-- Enable RLS on community_links
ALTER TABLE public.community_links ENABLE ROW LEVEL SECURITY;

-- Create policies for community_links (public read access)
CREATE POLICY "Community links are viewable by everyone" 
ON public.community_links 
FOR SELECT 
USING (true);

-- Create Subscription table
CREATE TABLE public.subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    community_id uuid NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    frequency text DEFAULT 'daily' CHECK (frequency IN ('daily')),
    last_sent_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, community_id)
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions" 
ON public.subscriptions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_communities_type ON public.communities(type);
CREATE INDEX idx_communities_stats_recent_count ON public.communities(stats_recent_count DESC);
CREATE INDEX idx_community_links_obituary_id ON public.community_links(obituary_id);
CREATE INDEX idx_community_links_community_id ON public.community_links(community_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_community_id ON public.subscriptions(community_id);

-- Create triggers for updated_at
CREATE TRIGGER update_communities_updated_at
BEFORE UPDATE ON public.communities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update community stats
CREATE OR REPLACE FUNCTION public.update_community_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.communities 
  SET stats_recent_count = (
    SELECT COUNT(DISTINCT cl.obituary_id)
    FROM public.community_links cl
    JOIN public.obituaries o ON o.id = cl.obituary_id
    WHERE cl.community_id = communities.id
    AND o.published = true
    AND o.visibility = 'public'
    AND o.created_at >= (NOW() - INTERVAL '30 days')
  );
END;
$$;

-- Seed some sample data
INSERT INTO public.communities (type, name, slug, description) VALUES
('city', 'New York', 'new-york', 'New York City community'),
('city', 'Los Angeles', 'los-angeles', 'Los Angeles community'),
('city', 'Chicago', 'chicago', 'Chicago community'),
('highschool', 'Lincoln High School', 'lincoln-high-school', 'Lincoln High School alumni'),
('highschool', 'Washington High School', 'washington-high-school', 'Washington High School alumni'),
('college', 'Harvard University', 'harvard-university', 'Harvard University alumni'),
('college', 'Stanford University', 'stanford-university', 'Stanford University alumni'),
('military', 'Army', 'army', 'U.S. Army veterans'),
('military', 'Navy', 'navy', 'U.S. Navy veterans'),
('military', 'Air Force', 'air-force', 'U.S. Air Force veterans');