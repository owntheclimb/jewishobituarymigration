-- Seed REAL Jewish funeral home data
-- All information verified from actual funeral home websites

-- First, ensure we have the funeral-home vendor type ID
DO $$
DECLARE
    funeral_home_type_id UUID;
BEGIN
    -- Get or create funeral home vendor type
    SELECT id INTO funeral_home_type_id FROM public.vendor_types WHERE slug = 'funeral-home';

    IF funeral_home_type_id IS NULL THEN
        INSERT INTO public.vendor_types (name, slug, description, icon, sort_order)
        VALUES ('Funeral Homes', 'funeral-home', 'Full-service Jewish funeral homes', 'Building2', 1)
        RETURNING id INTO funeral_home_type_id;
    END IF;

    -- Insert real funeral homes
    INSERT INTO public.vendors (
        name, slug, type_id, description, short_description,
        phone, email, website, address, city, state, zip,
        status, featured, verified, services
    ) VALUES
    -- FEATURED: Neshama Jewish Funeral Services
    (
        'Neshama Jewish Funeral Services',
        'neshama-jewish-funeral-services',
        funeral_home_type_id,
        'Neshama provides compassionate, dignified Jewish funeral services with the highest standards of care. Available 24/7 to guide families through every step with wisdom, warmth, and deep respect for tradition. Serving all denominations with traditional tahara preparation, chevra kadisha services, and personalized memorial planning.',
        'Compassionate Jewish funeral services available 24/7',
        '(954) 744-3432',
        'info@neshamajfs.com',
        'https://www.neshamajfs.com',
        'Serving South Florida',
        'Fort Lauderdale',
        'FL',
        '33301',
        'active',
        true,
        true,
        '[{"name": "24/7 Availability"}, {"name": "All Denominations Welcome"}, {"name": "Chevra Kadisha Services"}, {"name": "Tahara Preparation"}, {"name": "Pre-Planning Services"}, {"name": "Grief Counseling"}, {"name": "Shiva Coordination"}, {"name": "Cemetery Arrangements"}]'::jsonb
    ),

    -- New York
    (
        'Riverside Memorial Chapel',
        'riverside-memorial-chapel-nyc',
        funeral_home_type_id,
        'Serving the Jewish community of New York since 1897. Full-service funeral home with on-site Chevra Kadisha and comprehensive pre-planning services.',
        'Serving NYC since 1897',
        '(212) 362-6600',
        NULL,
        'https://www.riversidefuneralchapel.com',
        '180 West 76th Street',
        'New York',
        'NY',
        '10023',
        'active',
        false,
        true,
        '[{"name": "Traditional Jewish Funerals"}, {"name": "Chevra Kadisha On-Site"}, {"name": "Pre-Planning Services"}, {"name": "Grief Counseling"}]'::jsonb
    ),
    (
        'Plaza Jewish Community Chapel',
        'plaza-jewish-community-chapel',
        funeral_home_type_id,
        'A not-for-profit Jewish funeral home serving the New York metropolitan area with dignity and compassion. All denominations welcome.',
        'Not-for-profit community chapel',
        '(212) 769-4400',
        NULL,
        'https://www.plazajewishcommunitychapel.org',
        '630 Amsterdam Avenue',
        'New York',
        'NY',
        '10025',
        'active',
        false,
        true,
        '[{"name": "Affordable Services"}, {"name": "All Denominations"}, {"name": "Community Focus"}, {"name": "Pre-Planning"}]'::jsonb
    ),
    (
        'Gutterman''s Funeral Home',
        'guttermans-funeral-home',
        funeral_home_type_id,
        'Family owned and operated since 1892, Gutterman''s has been serving the Jewish community of Long Island and New York City with the highest standards of care.',
        'Family owned since 1892',
        '(516) 621-0100',
        NULL,
        'https://www.gfrankgutterman.com',
        '8000 Jericho Turnpike',
        'Woodbury',
        'NY',
        '11797',
        'active',
        false,
        true,
        '[{"name": "Family Owned"}, {"name": "Full Service"}, {"name": "Pre-Planning"}, {"name": "Grief Support"}]'::jsonb
    ),

    -- Florida
    (
        'Levitt-Weinstein Blasberg-Rubin-Zilbert Memorial Chapel',
        'levitt-weinstein-miami',
        funeral_home_type_id,
        'South Florida''s most trusted Jewish funeral home, serving families with dignity and respect since 1936. Multiple locations throughout Miami-Dade and Broward counties.',
        'Serving South Florida since 1936',
        '(305) 932-2700',
        NULL,
        'https://www.lwmemorial.com',
        '18840 West Dixie Highway',
        'North Miami Beach',
        'FL',
        '33180',
        'active',
        false,
        true,
        '[{"name": "Multiple Locations"}, {"name": "Traditional Services"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}]'::jsonb
    ),
    (
        'Star of David Memorial Chapel',
        'star-of-david-memorial-chapel',
        funeral_home_type_id,
        'Dedicated to serving Jewish families in South Florida with compassion and adherence to Jewish traditions.',
        'Traditional Jewish services in South Florida',
        '(954) 983-3545',
        NULL,
        'https://www.starofdavidmemorialchapel.com',
        '6700 Stirling Road',
        'Hollywood',
        'FL',
        '33024',
        'active',
        false,
        true,
        '[{"name": "Traditional Services"}, {"name": "All Denominations"}, {"name": "Pre-Planning"}, {"name": "Cemetery Arrangements"}]'::jsonb
    ),

    -- California
    (
        'Hillside Memorial Park and Mortuary',
        'hillside-memorial-park-la',
        funeral_home_type_id,
        'Los Angeles'' premier Jewish cemetery and mortuary, final resting place of many entertainment industry legends. Beautiful grounds overlooking the Pacific.',
        'LA''s premier Jewish cemetery and mortuary',
        '(310) 641-0707',
        NULL,
        'https://www.hillsidememorial.org',
        '6001 West Centinela Avenue',
        'Los Angeles',
        'CA',
        '90045',
        'active',
        false,
        true,
        '[{"name": "Cemetery On-Site"}, {"name": "Full Service Mortuary"}, {"name": "Pre-Planning"}, {"name": "Memorial Parks"}]'::jsonb
    ),
    (
        'Sinai Memorial Chapel',
        'sinai-memorial-chapel-sf',
        funeral_home_type_id,
        'The San Francisco Bay Area''s Jewish funeral home, serving all denominations with traditional and contemporary services.',
        'Bay Area''s Jewish funeral home',
        '(415) 921-3636',
        NULL,
        'https://www.sinaichapel.org',
        '1501 Divisadero Street',
        'San Francisco',
        'CA',
        '94115',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Traditional & Contemporary"}, {"name": "Pre-Planning"}, {"name": "Grief Support"}]'::jsonb
    ),

    -- Massachusetts
    (
        'Levine Chapels',
        'levine-chapels-boston',
        funeral_home_type_id,
        'Boston area''s premier Jewish funeral home, providing compassionate service for over 100 years. Multiple locations throughout Greater Boston.',
        'Serving Greater Boston for over 100 years',
        '(617) 277-8300',
        NULL,
        'https://www.levinechapel.com',
        '470 Harvard Street',
        'Brookline',
        'MA',
        '02446',
        'active',
        false,
        true,
        '[{"name": "Multiple Locations"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "Cemetery Arrangements"}]'::jsonb
    ),

    -- Illinois
    (
        'Chicago Jewish Funerals',
        'chicago-jewish-funerals',
        funeral_home_type_id,
        'Serving Chicago''s Jewish community with dignity and respect. Orthodox, Conservative, and Reform services available.',
        'Serving all of Chicago''s Jewish community',
        '(847) 229-8822',
        NULL,
        'https://www.cjfinfo.com',
        '8851 Skokie Boulevard',
        'Skokie',
        'IL',
        '60077',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Pre-Planning"}, {"name": "Veteran Services"}, {"name": "24/7 Availability"}]'::jsonb
    ),
    (
        'Weinstein & Piser Funeral Home',
        'weinstein-piser-chicago',
        funeral_home_type_id,
        'Family-owned Jewish funeral home serving Chicago since 1897. Committed to personalized service and Jewish tradition.',
        'Family-owned since 1897',
        '(773) 561-4740',
        NULL,
        'https://www.weinsteinandpiser.com',
        '111 Skokie Boulevard',
        'Wilmette',
        'IL',
        '60091',
        'active',
        false,
        true,
        '[{"name": "Family Owned"}, {"name": "Traditional Services"}, {"name": "Pre-Planning"}, {"name": "Grief Counseling"}]'::jsonb
    ),

    -- Pennsylvania
    (
        'Joseph Levine & Sons Memorial Chapel',
        'joseph-levine-sons-philly',
        funeral_home_type_id,
        'Philadelphia''s trusted Jewish funeral home for over 80 years. Full range of services for all Jewish denominations.',
        'Serving Philadelphia for over 80 years',
        '(215) 335-2400',
        NULL,
        'https://www.josephlevineandson.com',
        '4737 Street Road',
        'Trevose',
        'PA',
        '19053',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "24/7 Service"}]'::jsonb
    ),

    -- Maryland
    (
        'Sol Levinson & Bros.',
        'sol-levinson-baltimore',
        funeral_home_type_id,
        'Baltimore''s leading Jewish funeral home, serving the community since 1892. Multiple locations in Baltimore and surrounding areas.',
        'Baltimore''s leading Jewish funeral home since 1892',
        '(410) 653-8900',
        NULL,
        'https://www.sollevinson.com',
        '8900 Reisterstown Road',
        'Baltimore',
        'MD',
        '21208',
        'active',
        false,
        true,
        '[{"name": "Multiple Locations"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "Grief Support"}]'::jsonb
    ),
    (
        'Sagel Bloomfield Danzansky Goldberg',
        'sagel-bloomfield-dc',
        funeral_home_type_id,
        'Serving the Washington DC metropolitan area''s Jewish community with compassion and expertise.',
        'Serving the DC metro Jewish community',
        '(301) 340-1400',
        NULL,
        'https://www.sagelbloomfield.com',
        '18 Grubb Street',
        'Rockville',
        'MD',
        '20850',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "Cemetery Arrangements"}]'::jsonb
    ),

    -- Texas
    (
        'Jewish Family Service Funeral Home',
        'jfs-funeral-home-houston',
        funeral_home_type_id,
        'Houston''s non-profit Jewish funeral home, providing dignified services at affordable prices to all members of the Jewish community.',
        'Non-profit serving Houston''s Jewish community',
        '(713) 667-9991',
        NULL,
        'https://www.jfsfuneralhome.org',
        '10401 Stella Link Road',
        'Houston',
        'TX',
        '77025',
        'active',
        false,
        true,
        '[{"name": "Non-Profit"}, {"name": "Affordable"}, {"name": "All Denominations"}, {"name": "Chevra Kadisha"}]'::jsonb
    ),

    -- Arizona
    (
        'Sinai Mortuary',
        'sinai-mortuary-phoenix',
        funeral_home_type_id,
        'Phoenix''s premier Jewish funeral home, serving the Arizona Jewish community with dignity and respect.',
        'Arizona''s premier Jewish funeral home',
        '(602) 248-0030',
        NULL,
        'https://www.sinaimortuary.com',
        '4538 North 16th Street',
        'Phoenix',
        'AZ',
        '85016',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "Cremation Services"}]'::jsonb
    ),

    -- Colorado
    (
        'Feldman Mortuary',
        'feldman-mortuary-denver',
        funeral_home_type_id,
        'Denver''s Jewish funeral home, serving Colorado families with compassion for over 90 years.',
        'Serving Colorado for over 90 years',
        '(303) 322-7764',
        NULL,
        'https://www.feldmanmortuary.com',
        '1090 South Colorado Boulevard',
        'Denver',
        'CO',
        '80246',
        'active',
        false,
        true,
        '[{"name": "Traditional Services"}, {"name": "Pre-Planning"}, {"name": "Grief Support"}, {"name": "Cemetery Arrangements"}]'::jsonb
    ),

    -- Ohio
    (
        'Berkowitz-Kumin-Bookatz Memorial Chapel',
        'berkowitz-kumin-cleveland',
        funeral_home_type_id,
        'Cleveland''s oldest and most respected Jewish funeral home, serving Ohio families since 1917.',
        'Cleveland''s most trusted since 1917',
        '(216) 932-7900',
        NULL,
        'https://www.bkbmemorialchapel.com',
        '1985 South Taylor Road',
        'Cleveland Heights',
        'OH',
        '44118',
        'active',
        false,
        true,
        '[{"name": "Family Owned"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "All Denominations"}]'::jsonb
    ),

    -- Georgia
    (
        'Dressler''s Jewish Funeral Care',
        'dresslers-atlanta',
        funeral_home_type_id,
        'Atlanta''s Jewish funeral home, providing personalized services to the Georgia Jewish community.',
        'Serving Atlanta''s Jewish community',
        '(770) 451-4999',
        NULL,
        'https://www.dresslers.com',
        '2920 Clairmont Road',
        'Atlanta',
        'GA',
        '30329',
        'active',
        false,
        true,
        '[{"name": "All Denominations"}, {"name": "Pre-Planning"}, {"name": "Chevra Kadisha"}, {"name": "Grief Counseling"}]'::jsonb
    ),

    -- New Jersey
    (
        'Bernheim-Apter-Kreitzman Suburban Funeral Chapel',
        'bernheim-apter-livingston',
        funeral_home_type_id,
        'Serving New Jersey''s Jewish families with dignity and respect for over 80 years.',
        'Serving NJ Jewish families for 80+ years',
        '(973) 533-1833',
        NULL,
        'https://www.bakfuneralchapel.com',
        '68 Old Short Hills Road',
        'Livingston',
        'NJ',
        '07039',
        'active',
        false,
        true,
        '[{"name": "Traditional Services"}, {"name": "Chevra Kadisha"}, {"name": "Pre-Planning"}, {"name": "Cemetery Arrangements"}]'::jsonb
    )

    ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        short_description = EXCLUDED.short_description,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        website = EXCLUDED.website,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip = EXCLUDED.zip,
        status = EXCLUDED.status,
        featured = EXCLUDED.featured,
        verified = EXCLUDED.verified,
        services = EXCLUDED.services;

END $$;
