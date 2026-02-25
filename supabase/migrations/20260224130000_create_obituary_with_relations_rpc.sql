-- Atomic obituary creation with related settings and community links
CREATE OR REPLACE FUNCTION public.create_obituary_with_relations(
  p_user_id uuid,
  p_full_name text,
  p_date_of_birth date DEFAULT NULL,
  p_date_of_death date DEFAULT NULL,
  p_location text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_state text DEFAULT NULL,
  p_high_schools text[] DEFAULT '{}',
  p_colleges text[] DEFAULT '{}',
  p_military_branches text[] DEFAULT '{}',
  p_biography text DEFAULT NULL,
  p_funeral_details text DEFAULT NULL,
  p_photo_url text DEFAULT NULL,
  p_allow_public_uploads boolean DEFAULT true,
  p_guestbook_enabled boolean DEFAULT true,
  p_require_moderation_for_uploads boolean DEFAULT true,
  p_max_video_seconds integer DEFAULT 120
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_obituary_id uuid;
  v_community_id uuid;
  v_name text;
  v_slug text;
BEGIN
  -- Enforce authenticated ownership at function boundary.
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'Unauthorized obituary creation request';
  END IF;

  INSERT INTO public.obituaries (
    user_id,
    full_name,
    date_of_birth,
    date_of_death,
    location,
    city,
    state,
    high_schools,
    colleges,
    military_branches,
    biography,
    funeral_details,
    photo_url,
    published,
    visibility
  )
  VALUES (
    p_user_id,
    p_full_name,
    p_date_of_birth,
    p_date_of_death,
    p_location,
    p_city,
    p_state,
    COALESCE(p_high_schools, '{}'),
    COALESCE(p_colleges, '{}'),
    COALESCE(p_military_branches, '{}'),
    p_biography,
    p_funeral_details,
    p_photo_url,
    true,
    'public'
  )
  RETURNING id INTO v_obituary_id;

  INSERT INTO public.obituary_settings (
    obituary_id,
    allow_public_uploads,
    guestbook_enabled,
    require_moderation_for_uploads,
    max_video_seconds
  )
  VALUES (
    v_obituary_id,
    p_allow_public_uploads,
    p_guestbook_enabled,
    p_require_moderation_for_uploads,
    p_max_video_seconds
  )
  ON CONFLICT (obituary_id) DO UPDATE
  SET
    allow_public_uploads = EXCLUDED.allow_public_uploads,
    guestbook_enabled = EXCLUDED.guestbook_enabled,
    require_moderation_for_uploads = EXCLUDED.require_moderation_for_uploads,
    max_video_seconds = EXCLUDED.max_video_seconds;

  -- Link city community.
  IF COALESCE(p_city, '') <> '' AND COALESCE(p_state, '') <> '' THEN
    v_name := trim(p_city) || ', ' || trim(p_state);
    v_slug := regexp_replace(lower(regexp_replace(v_name, '[^a-z0-9]+', '-', 'g')), '(^-|-$)', '', 'g');

    INSERT INTO public.communities (type, name, slug, description)
    VALUES ('city', v_name, v_slug, v_name || ' community')
    ON CONFLICT (type, slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_community_id;

    INSERT INTO public.community_links (obituary_id, community_id)
    VALUES (v_obituary_id, v_community_id)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Link high schools.
  FOREACH v_name IN ARRAY COALESCE(p_high_schools, '{}') LOOP
    IF trim(COALESCE(v_name, '')) = '' THEN
      CONTINUE;
    END IF;

    v_slug := regexp_replace(lower(regexp_replace(trim(v_name), '[^a-z0-9]+', '-', 'g')), '(^-|-$)', '', 'g');

    INSERT INTO public.communities (type, name, slug, description)
    VALUES ('highschool', trim(v_name), v_slug, trim(v_name) || ' alumni community')
    ON CONFLICT (type, slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_community_id;

    INSERT INTO public.community_links (obituary_id, community_id)
    VALUES (v_obituary_id, v_community_id)
    ON CONFLICT DO NOTHING;
  END LOOP;

  -- Link colleges.
  FOREACH v_name IN ARRAY COALESCE(p_colleges, '{}') LOOP
    IF trim(COALESCE(v_name, '')) = '' THEN
      CONTINUE;
    END IF;

    v_slug := regexp_replace(lower(regexp_replace(trim(v_name), '[^a-z0-9]+', '-', 'g')), '(^-|-$)', '', 'g');

    INSERT INTO public.communities (type, name, slug, description)
    VALUES ('college', trim(v_name), v_slug, trim(v_name) || ' alumni community')
    ON CONFLICT (type, slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_community_id;

    INSERT INTO public.community_links (obituary_id, community_id)
    VALUES (v_obituary_id, v_community_id)
    ON CONFLICT DO NOTHING;
  END LOOP;

  -- Link military branches.
  FOREACH v_name IN ARRAY COALESCE(p_military_branches, '{}') LOOP
    IF trim(COALESCE(v_name, '')) = '' THEN
      CONTINUE;
    END IF;

    v_slug := regexp_replace(lower(regexp_replace(trim(v_name), '[^a-z0-9]+', '-', 'g')), '(^-|-$)', '', 'g');

    INSERT INTO public.communities (type, name, slug, description)
    VALUES ('military', trim(v_name), v_slug, trim(v_name) || ' community')
    ON CONFLICT (type, slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_community_id;

    INSERT INTO public.community_links (obituary_id, community_id)
    VALUES (v_obituary_id, v_community_id)
    ON CONFLICT DO NOTHING;
  END LOOP;

  PERFORM public.update_community_stats();

  RETURN v_obituary_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_obituary_with_relations(
  uuid, text, date, date, text, text, text, text[], text[], text[], text, text, text, boolean, boolean, boolean, integer
) TO authenticated;
