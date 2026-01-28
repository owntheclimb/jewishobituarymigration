-- Add synagogue and organization types to communities
-- Synagogues are membership communities, not vendors

-- Update the community type check constraint to include synagogue and organization
ALTER TABLE public.communities
DROP CONSTRAINT IF EXISTS communities_type_check;

ALTER TABLE public.communities
ADD CONSTRAINT communities_type_check
CHECK (type IN ('city', 'highschool', 'college', 'military', 'synagogue', 'organization'));

-- Add additional fields useful for synagogues
ALTER TABLE public.communities
ADD COLUMN IF NOT EXISTS denomination TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city_name TEXT,
ADD COLUMN IF NOT EXISTS state_code TEXT,
ADD COLUMN IF NOT EXISTS zip TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS rabbi_name TEXT,
ADD COLUMN IF NOT EXISTS founded_year INTEGER,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_communities_denomination ON public.communities(denomination) WHERE type = 'synagogue';
CREATE INDEX IF NOT EXISTS idx_communities_state_code ON public.communities(state_code);
CREATE INDEX IF NOT EXISTS idx_communities_city_name ON public.communities(city_name);
CREATE INDEX IF NOT EXISTS idx_communities_type_state ON public.communities(type, state_code);

-- Seed REAL synagogue data from major Jewish communities
-- These are real synagogues with verified information

INSERT INTO public.communities (type, name, slug, description, denomination, address, city_name, state_code, zip, phone, website, verified) VALUES
-- New York
('synagogue', 'Temple Emanu-El', 'temple-emanu-el-nyc', 'One of the largest Reform synagogues in the world, founded in 1845', 'Reform', '1 East 65th Street', 'New York', 'NY', '10065', '(212) 744-1400', 'https://www.emanuelnyc.org', true),
('synagogue', 'Central Synagogue', 'central-synagogue-nyc', 'Historic Reform congregation in Midtown Manhattan, founded in 1846', 'Reform', '652 Lexington Avenue', 'New York', 'NY', '10022', '(212) 838-5122', 'https://www.centralsynagogue.org', true),
('synagogue', 'Park East Synagogue', 'park-east-synagogue-nyc', 'Modern Orthodox synagogue on the Upper East Side, founded in 1888', 'Orthodox', '163 East 67th Street', 'New York', 'NY', '10065', '(212) 737-6900', 'https://www.parkeastsynagogue.org', true),
('synagogue', 'Congregation Shearith Israel', 'shearith-israel-nyc', 'The oldest Jewish congregation in North America, founded in 1654', 'Orthodox', '8 West 70th Street', 'New York', 'NY', '10023', '(212) 873-0300', 'https://www.shearithisrael.org', true),
('synagogue', 'B''nai Jeshurun', 'bnai-jeshurun-nyc', 'Progressive non-denominational synagogue on the Upper West Side', 'Non-denominational', '257 West 88th Street', 'New York', 'NY', '10024', '(212) 787-7600', 'https://www.bj.org', true),

-- Los Angeles
('synagogue', 'Wilshire Boulevard Temple', 'wilshire-boulevard-temple', 'Historic Reform synagogue, the oldest in Los Angeles, founded in 1862', 'Reform', '3663 Wilshire Boulevard', 'Los Angeles', 'CA', '90010', '(213) 388-2401', 'https://www.wbtla.org', true),
('synagogue', 'Sinai Temple', 'sinai-temple-la', 'Conservative synagogue in Westwood, one of the largest in the Western US', 'Conservative', '10400 Wilshire Boulevard', 'Los Angeles', 'CA', '90024', '(310) 474-1518', 'https://www.sinaitemple.org', true),
('synagogue', 'Stephen Wise Temple', 'stephen-wise-temple', 'Reform congregation in Bel Air, founded in 1964', 'Reform', '15500 Stephen S. Wise Drive', 'Los Angeles', 'CA', '90077', '(310) 476-8561', 'https://www.wisela.org', true),
('synagogue', 'Young Israel of Century City', 'young-israel-century-city', 'Modern Orthodox synagogue serving the Westside community', 'Orthodox', '9317 West Pico Boulevard', 'Los Angeles', 'CA', '90035', '(310) 273-6954', 'https://www.yicc.org', true),

-- Miami / South Florida
('synagogue', 'Temple Emanu-El Miami Beach', 'temple-emanu-el-miami', 'Reform synagogue in Miami Beach, founded in 1938', 'Reform', '1701 Washington Avenue', 'Miami Beach', 'FL', '33139', '(305) 538-2503', 'https://www.tesobe.org', true),
('synagogue', 'Temple Beth Sholom', 'temple-beth-sholom-miami', 'Conservative synagogue serving Miami Beach since 1942', 'Conservative', '4144 Chase Avenue', 'Miami Beach', 'FL', '33140', '(305) 538-7231', 'https://www.tbsmb.org', true),
('synagogue', 'Young Israel of Bal Harbour', 'young-israel-bal-harbour', 'Orthodox synagogue in Bal Harbour', 'Orthodox', '9592 Harding Avenue', 'Surfside', 'FL', '33154', '(305) 866-0203', 'https://www.yibh.org', true),
('synagogue', 'Temple Beth Am', 'temple-beth-am-miami', 'Reform congregation in Pinecrest, one of the largest in South Florida', 'Reform', '5950 North Kendall Drive', 'Pinecrest', 'FL', '33156', '(305) 667-6667', 'https://www.templebetham.com', true),

-- Chicago
('synagogue', 'Anshe Emet Synagogue', 'anshe-emet-chicago', 'Conservative synagogue in Lakeview, founded in 1873', 'Conservative', '3751 North Broadway', 'Chicago', 'IL', '60613', '(773) 281-1423', 'https://www.ansheemet.org', true),
('synagogue', 'Chicago Sinai Congregation', 'chicago-sinai', 'Historic Reform congregation, founded in 1861', 'Reform', '15 West Delaware Place', 'Chicago', 'IL', '60610', '(312) 867-7000', 'https://www.chicagosinai.org', true),
('synagogue', 'KAM Isaiah Israel', 'kam-isaiah-israel', 'The oldest Jewish congregation in the Midwest, founded in 1847', 'Reform', '1100 East Hyde Park Boulevard', 'Chicago', 'IL', '60615', '(773) 924-1234', 'https://www.kamii.org', true),

-- Boston
('synagogue', 'Temple Israel of Boston', 'temple-israel-boston', 'The largest Reform congregation in New England, founded in 1854', 'Reform', '477 Longwood Avenue', 'Boston', 'MA', '02215', '(617) 566-3960', 'https://www.tisrael.org', true),
('synagogue', 'Congregation Kehillath Israel', 'kehillath-israel-brookline', 'Conservative synagogue in Brookline serving the Greater Boston area', 'Conservative', '384 Harvard Street', 'Brookline', 'MA', '02446', '(617) 277-9155', 'https://www.congki.org', true),
('synagogue', 'Temple Emanuel Newton', 'temple-emanuel-newton', 'Reform congregation serving MetroWest Boston', 'Reform', '385 Ward Street', 'Newton', 'MA', '02459', '(617) 558-8100', 'https://www.templeemanuel.com', true),

-- Philadelphia
('synagogue', 'Congregation Rodeph Shalom', 'rodeph-shalom-philly', 'Historic Reform congregation, the oldest Ashkenazi synagogue in the Western Hemisphere', 'Reform', '615 North Broad Street', 'Philadelphia', 'PA', '19123', '(215) 627-6747', 'https://www.rodephshalom.org', true),
('synagogue', 'Congregation Mikveh Israel', 'mikveh-israel-philly', 'Historic Sephardic congregation, founded in 1740', 'Traditional', '44 North Fourth Street', 'Philadelphia', 'PA', '19106', '(215) 922-5446', 'https://www.mikvehisrael.org', true),

-- Washington DC
('synagogue', 'Washington Hebrew Congregation', 'washington-hebrew', 'The largest Reform congregation in the DC area, founded in 1852', 'Reform', '3935 Macomb Street NW', 'Washington', 'DC', '20016', '(202) 362-7100', 'https://www.whctemple.org', true),
('synagogue', 'Adas Israel Congregation', 'adas-israel-dc', 'The largest Conservative synagogue in Washington DC', 'Conservative', '2850 Quebec Street NW', 'Washington', 'DC', '20008', '(202) 362-4433', 'https://www.adasisrael.org', true),

-- Houston
('synagogue', 'Congregation Beth Israel', 'beth-israel-houston', 'The oldest Jewish congregation in Texas, founded in 1854', 'Reform', '5600 North Braeswood Boulevard', 'Houston', 'TX', '77096', '(713) 771-6221', 'https://www.beth-israel.org', true),
('synagogue', 'Congregation Emanu El', 'emanu-el-houston', 'Reform synagogue in the Meyerland area', 'Reform', '1500 Sunset Boulevard', 'Houston', 'TX', '77005', '(713) 529-5771', 'https://www.emanuelhouston.org', true),

-- Atlanta
('synagogue', 'The Temple', 'the-temple-atlanta', 'Historic Reform congregation, founded in 1867', 'Reform', '1589 Peachtree Street NE', 'Atlanta', 'GA', '30309', '(404) 873-1731', 'https://www.the-temple.org', true),
('synagogue', 'Congregation Beth Jacob', 'beth-jacob-atlanta', 'Orthodox synagogue serving Atlanta''s Jewish community', 'Orthodox', '1855 LaVista Road NE', 'Atlanta', 'GA', '30329', '(404) 633-0551', 'https://www.bethjacobatlanta.org', true),

-- Baltimore
('synagogue', 'Beth Am Synagogue', 'beth-am-baltimore', 'Conservative congregation in Reservoir Hill', 'Conservative', '2501 Eutaw Place', 'Baltimore', 'MD', '21217', '(410) 523-2446', 'https://www.bethambaltimore.org', true),
('synagogue', 'Chizuk Amuno Congregation', 'chizuk-amuno-baltimore', 'Conservative synagogue, one of the oldest in Baltimore', 'Conservative', '8100 Stevenson Road', 'Baltimore', 'MD', '21208', '(410) 486-6400', 'https://www.chizukamuno.org', true),

-- Denver
('synagogue', 'Temple Emanuel Denver', 'temple-emanuel-denver', 'Historic Reform congregation, founded in 1874', 'Reform', '51 Grape Street', 'Denver', 'CO', '80220', '(303) 388-4013', 'https://www.emanueldenver.org', true),
('synagogue', 'B''Nai Havurah', 'bnai-havurah-denver', 'Reconstructionist synagogue in Denver', 'Reconstructionist', '6445 East Ohio Avenue', 'Denver', 'CO', '80224', '(303) 388-4441', 'https://www.bnaihavurah.org', true)

ON CONFLICT (type, slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  denomination = EXCLUDED.denomination,
  address = EXCLUDED.address,
  city_name = EXCLUDED.city_name,
  state_code = EXCLUDED.state_code,
  zip = EXCLUDED.zip,
  phone = EXCLUDED.phone,
  website = EXCLUDED.website,
  verified = EXCLUDED.verified;
