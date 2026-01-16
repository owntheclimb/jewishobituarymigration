-- Create additional sample communities for testing
INSERT INTO public.communities (type, name, slug, description) VALUES 
    ('city', 'Los Angeles, California', 'los-angeles-california', 'Los Angeles, California community'),
    ('city', 'New York, New York', 'new-york-new-york', 'New York, New York community'),
    ('highschool', 'Roosevelt High School', 'roosevelt-high-school', 'Roosevelt High School alumni community'),
    ('highschool', 'Kennedy High School', 'kennedy-high-school', 'Kennedy High School alumni community'),
    ('college', 'UCLA', 'ucla', 'UCLA alumni community'),
    ('college', 'Columbia University', 'columbia-university', 'Columbia University alumni community'),
    ('military', 'Army', 'army', 'U.S. Army veterans community'),
    ('military', 'Air Force', 'air-force', 'U.S. Air Force veterans community'),
    ('military', 'Marines', 'marines', 'U.S. Marines veterans community')
ON CONFLICT (type, slug) DO NOTHING;

-- Update community stats to reflect existing data
SELECT public.update_community_stats();