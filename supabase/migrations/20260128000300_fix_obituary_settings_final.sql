-- Final fix for obituary_settings - drop FK first, then insert
-- Must drop FK constraint before inserting for obituaries not in obituaries table

-- 1. Drop the foreign key constraint
DO $$
DECLARE
    constraint_name text;
BEGIN
    -- Find and drop any FK constraint on obituary_id
    FOR constraint_name IN
        SELECT tc.constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_name = 'obituary_settings'
        AND tc.constraint_type = 'FOREIGN KEY'
        AND ccu.column_name = 'obituary_id'
    LOOP
        EXECUTE 'ALTER TABLE public.obituary_settings DROP CONSTRAINT IF EXISTS ' || constraint_name;
        RAISE NOTICE 'Dropped constraint: %', constraint_name;
    END LOOP;
END $$;

-- 2. Now insert the row (FK is gone so it should work)
INSERT INTO public.obituary_settings (obituary_id, allow_public_uploads, require_moderation_for_uploads, guestbook_enabled, max_video_seconds)
VALUES ('3e20c9ed-1518-4bb4-b740-44b4620a5f59', true, true, true, 120)
ON CONFLICT (obituary_id) DO UPDATE SET updated_at = NOW();

-- 3. Verify the insert worked
DO $$
DECLARE
    row_count integer;
BEGIN
    SELECT COUNT(*) INTO row_count FROM public.obituary_settings WHERE obituary_id = '3e20c9ed-1518-4bb4-b740-44b4620a5f59';
    IF row_count > 0 THEN
        RAISE NOTICE 'SUCCESS: obituary_settings row exists for 3e20c9ed-1518-4bb4-b740-44b4620a5f59';
    ELSE
        RAISE WARNING 'FAILED: obituary_settings row was NOT created';
    END IF;
END $$;
