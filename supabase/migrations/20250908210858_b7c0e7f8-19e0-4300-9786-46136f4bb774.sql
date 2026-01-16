-- Seed sample memorial data for testing
-- First, let's create some sample obituaries with memorial content

DO $$
DECLARE
    sample_obituary_id uuid;
    sample_user_id uuid := '550e8400-e29b-41d4-a716-446655440000'; -- Sample user ID
    community_city_id uuid;
    community_school_id uuid;
    community_college_id uuid;
    community_military_id uuid;
BEGIN
    -- Insert a sample obituary (if it doesn't exist)
    INSERT INTO public.obituaries (
        id, user_id, full_name, date_of_birth, date_of_death, 
        location, city, state, biography, funeral_details, 
        photo_url, published, visibility,
        high_schools, colleges, military_branches
    ) VALUES (
        gen_random_uuid(), 
        sample_user_id,
        'Eleanor Rose Martinez',
        '1945-03-15',
        '2024-11-20',
        'San Francisco, CA',
        'San Francisco',
        'California',
        'Eleanor was a beloved teacher, mother, and grandmother who touched countless lives with her kindness and wisdom. She dedicated 40 years to education, inspiring generations of students at Lincoln Elementary School. Eleanor loved gardening, reading classic literature, and spending time with her four grandchildren. Her warm smile and generous heart will be deeply missed by all who knew her.',
        'A celebration of life will be held on Saturday, November 25th at 2:00 PM at Grace Memorial Chapel, 123 Oak Street, San Francisco, CA. In lieu of flowers, the family requests donations to the local literacy program.',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
        true,
        'public',
        ARRAY['Lincoln High School', 'Washington High School'],
        ARRAY['Stanford University', 'UC Berkeley'],
        ARRAY['Navy']
    ) ON CONFLICT DO NOTHING
    RETURNING id INTO sample_obituary_id;

    -- If obituary already exists, get its ID
    IF sample_obituary_id IS NULL THEN
        SELECT id INTO sample_obituary_id 
        FROM public.obituaries 
        WHERE full_name = 'Eleanor Rose Martinez' 
        LIMIT 1;
    END IF;

    -- Create obituary theme
    INSERT INTO public.obituary_themes (obituary_id, background_style, accent_color_hex, music_enabled)
    VALUES (sample_obituary_id, 'forest', '#7A2CC6', false)
    ON CONFLICT (obituary_id) DO NOTHING;

    -- Create obituary settings
    INSERT INTO public.obituary_settings (
        obituary_id, allow_public_uploads, require_moderation_for_uploads, 
        guestbook_enabled, max_video_seconds
    )
    VALUES (sample_obituary_id, true, true, true, 120)
    ON CONFLICT (obituary_id) DO NOTHING;

    -- Get or create communities
    INSERT INTO public.communities (type, name, slug, description)
    VALUES 
        ('city', 'San Francisco, California', 'san-francisco-california', 'San Francisco, California community'),
        ('highschool', 'Lincoln High School', 'lincoln-high-school', 'Lincoln High School alumni community'),
        ('college', 'Stanford University', 'stanford-university', 'Stanford University alumni community'),
        ('military', 'Navy', 'navy', 'U.S. Navy veterans community')
    ON CONFLICT (type, slug) DO NOTHING;

    -- Get community IDs
    SELECT id INTO community_city_id FROM public.communities WHERE type = 'city' AND slug = 'san-francisco-california';
    SELECT id INTO community_school_id FROM public.communities WHERE type = 'highschool' AND slug = 'lincoln-high-school';
    SELECT id INTO community_college_id FROM public.communities WHERE type = 'college' AND slug = 'stanford-university';
    SELECT id INTO community_military_id FROM public.communities WHERE type = 'military' AND slug = 'navy';

    -- Create community links
    INSERT INTO public.community_links (obituary_id, community_id)
    VALUES 
        (sample_obituary_id, community_city_id),
        (sample_obituary_id, community_school_id),
        (sample_obituary_id, community_college_id),
        (sample_obituary_id, community_military_id)
    ON CONFLICT (obituary_id, community_id) DO NOTHING;

    -- Sample media assets (photos)
    INSERT INTO public.media_assets (
        obituary_id, uploader_user_id, type, storage_key, 
        title, caption, width, height, status
    ) VALUES 
        (sample_obituary_id, sample_user_id, 'photo', 'sample/family-photo-1.jpg', 
         'Family Gathering', 'Eleanor with her children and grandchildren at her 75th birthday celebration', 800, 600, 'approved'),
        (sample_obituary_id, sample_user_id, 'photo', 'sample/teaching-photo.jpg',
         'Teaching Days', 'Eleanor in her classroom at Lincoln Elementary School', 600, 800, 'approved'),
        (sample_obituary_id, NULL, 'photo', 'sample/garden-photo.jpg',
         'Her Beautiful Garden', 'Eleanor tending to her prized roses', 800, 600, 'pending'),
        (sample_obituary_id, sample_user_id, 'photo', 'sample/young-eleanor.jpg',
         'Young Eleanor', 'Eleanor as a young teacher in the 1970s', 400, 600, 'approved')
    ON CONFLICT DO NOTHING;

    -- Sample memories
    INSERT INTO public.memories (
        obituary_id, author_user_id, author_name, body, status
    ) VALUES 
        (sample_obituary_id, sample_user_id, 'Michael Martinez', 
         'Mom was the most caring and devoted person I ever knew. She taught me the value of education and kindness. Even in her final days, she was asking about her former students and how she could help others. Her legacy will live on in every life she touched.', 'approved'),
        (sample_obituary_id, NULL, 'Sarah Johnson', 
         'Mrs. Martinez was my third-grade teacher and she changed my life. She saw potential in me when others didn''t and encouraged me to pursue my dreams. I became a teacher because of her inspiration. Thank you for everything, Mrs. Martinez.', 'approved'),
        (sample_obituary_id, NULL, 'Robert Chen', 
         'Eleanor was a wonderful neighbor and friend. She always had time to chat over the fence about her beautiful garden, and she never forgot to ask about my family. She made our whole neighborhood feel like home.', 'pending')
    ON CONFLICT DO NOTHING;

    -- Sample guestbook entries
    INSERT INTO public.guestbook_entries (
        obituary_id, author_user_id, author_name, message, status
    ) VALUES 
        (sample_obituary_id, NULL, 'Linda Thompson', 
         'My deepest condolences to the Martinez family. Eleanor was a beacon of light in our community. Her kindness and wisdom touched so many lives. She will be greatly missed but never forgotten.', 'approved'),
        (sample_obituary_id, NULL, 'James Wilson', 
         'Sending love and prayers to the family during this difficult time. Eleanor was an amazing woman who made a difference in so many lives. Rest in peace.', 'approved'),
        (sample_obituary_id, NULL, 'Mary Rodriguez', 
         'Eleanor taught both my children and they still speak of her with such fondness. She was a true educator who cared deeply about each student. Our thoughts are with your family.', 'pending')
    ON CONFLICT DO NOTHING;

    -- Update community stats
    PERFORM public.update_community_stats();

    RAISE NOTICE 'Sample memorial data has been successfully seeded!';
END $$;