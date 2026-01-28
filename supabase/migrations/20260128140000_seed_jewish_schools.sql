-- Seed REAL Jewish day schools and universities
-- These are actual institutions where alumni memorial pages make sense

INSERT INTO public.communities (type, name, slug, description, city_name, state_code, verified, status) VALUES
-- Major Jewish Day Schools - New York
('highschool', 'Ramaz School', 'ramaz-school-nyc', 'Modern Orthodox day school on the Upper East Side, founded in 1937', 'New York', 'NY', true, 'approved'),
('highschool', 'SAR Academy', 'sar-academy-riverdale', 'Modern Orthodox day school in Riverdale serving grades K-12', 'Bronx', 'NY', true, 'approved'),
('highschool', 'Frisch School', 'frisch-school-paramus', 'Modern Orthodox high school in Bergen County, founded in 1972', 'Paramus', 'NJ', true, 'approved'),
('highschool', 'Flatbush Yeshivah', 'flatbush-yeshivah-brooklyn', 'Orthodox day school in Brooklyn serving the community since 1927', 'Brooklyn', 'NY', true, 'approved'),
('highschool', 'Maimonides School', 'maimonides-school-brookline', 'Modern Orthodox day school in Boston area, founded by Rabbi Soloveitchik', 'Brookline', 'MA', true, 'approved'),
('highschool', 'Hebrew Academy of Long Beach', 'halb-long-beach', 'Orthodox day school serving Long Island since 1953', 'Long Beach', 'NY', true, 'approved'),

-- Major Jewish Day Schools - Florida
('highschool', 'Hebrew Academy (RASG)', 'rasg-hebrew-academy-miami', 'Orthodox day school in Miami Beach', 'Miami Beach', 'FL', true, 'approved'),
('highschool', 'Scheck Hillel Community School', 'hillel-community-school-miami', 'Community day school in North Miami Beach', 'North Miami Beach', 'FL', true, 'approved'),
('highschool', 'David Posnack Jewish Day School', 'posnack-jds-davie', 'Community day school serving Broward County', 'Davie', 'FL', true, 'approved'),

-- Major Jewish Day Schools - California
('highschool', 'Shalhevet High School', 'shalhevet-los-angeles', 'Modern Orthodox high school in Los Angeles', 'Los Angeles', 'CA', true, 'approved'),
('highschool', 'YULA High School', 'yula-high-school-la', 'Yeshiva University Los Angeles High School', 'Los Angeles', 'CA', true, 'approved'),
('highschool', 'Milken Community School', 'milken-community-school', 'Pluralistic Jewish day school in Los Angeles', 'Los Angeles', 'CA', true, 'approved'),
('highschool', 'de Toledo High School', 'de-toledo-west-hills', 'Pluralistic Jewish high school in West Hills', 'West Hills', 'CA', true, 'approved'),

-- Major Jewish Day Schools - Illinois
('highschool', 'Ida Crown Jewish Academy', 'ida-crown-chicago', 'Modern Orthodox high school in Chicago', 'Chicago', 'IL', true, 'approved'),
('highschool', 'Rochelle Zell Jewish High School', 'rochelle-zell-deerfield', 'Pluralistic Jewish high school in Deerfield', 'Deerfield', 'IL', true, 'approved'),

-- Major Jewish Day Schools - Maryland/DC
('highschool', 'Charles E. Smith Jewish Day School', 'cesjds-rockville', 'Community day school serving the Washington DC area', 'Rockville', 'MD', true, 'approved'),
('highschool', 'Beth Tfiloh Dahan Community School', 'beth-tfiloh-baltimore', 'Largest Modern Orthodox day school in Maryland', 'Baltimore', 'MD', true, 'approved'),
('highschool', 'Melvin J. Berman Hebrew Academy', 'berman-hebrew-academy', 'Orthodox day school in Rockville', 'Rockville', 'MD', true, 'approved'),

-- Major Jewish Day Schools - Texas
('highschool', 'Robert M. Beren Academy', 'beren-academy-houston', 'Modern Orthodox day school in Houston', 'Houston', 'TX', true, 'approved'),
('highschool', 'Akiba Academy of Dallas', 'akiba-academy-dallas', 'Community Jewish day school in Dallas', 'Dallas', 'TX', true, 'approved'),

-- Major Jewish Day Schools - Pennsylvania
('highschool', 'Jack M. Barrack Hebrew Academy', 'barrack-hebrew-academy', 'Pluralistic Jewish day school serving Philadelphia', 'Bryn Mawr', 'PA', true, 'approved'),
('highschool', 'Kohelet Yeshiva High School', 'kohelet-yeshiva-merion', 'Modern Orthodox high school in Merion Station', 'Merion Station', 'PA', true, 'approved'),

-- Major Jewish Day Schools - Other States
('highschool', 'Fuchs Mizrachi School', 'fuchs-mizrachi-cleveland', 'Modern Orthodox day school in Cleveland', 'Beachwood', 'OH', true, 'approved'),
('highschool', 'Denver Academy of Torah', 'dat-denver', 'Orthodox day school in Denver', 'Denver', 'CO', true, 'approved'),
('highschool', 'Atlanta Jewish Academy', 'atlanta-jewish-academy', 'Community day school in Atlanta', 'Atlanta', 'GA', true, 'approved'),

-- Universities with significant Jewish populations/programs
('college', 'Yeshiva University', 'yeshiva-university-nyc', 'Private Orthodox Jewish research university in New York City', 'New York', 'NY', true, 'approved'),
('college', 'Brandeis University', 'brandeis-university', 'Private research university founded by the American Jewish community', 'Waltham', 'MA', true, 'approved'),
('college', 'Touro University', 'touro-university', 'Jewish-sponsored university system with multiple campuses', 'New York', 'NY', true, 'approved'),
('college', 'Hebrew Union College', 'hebrew-union-college', 'Reform Jewish seminary with campuses in Cincinnati, LA, New York, Jerusalem', 'Cincinnati', 'OH', true, 'approved'),
('college', 'Jewish Theological Seminary', 'jts-nyc', 'Conservative Jewish seminary in New York City', 'New York', 'NY', true, 'approved')

ON CONFLICT (type, slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  city_name = EXCLUDED.city_name,
  state_code = EXCLUDED.state_code,
  verified = EXCLUDED.verified,
  status = EXCLUDED.status;
