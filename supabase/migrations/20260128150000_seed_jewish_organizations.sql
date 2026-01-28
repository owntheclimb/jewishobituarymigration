-- Seed REAL Jewish organizations
-- These are national and regional Jewish organizations with memorial significance

INSERT INTO public.communities (type, name, slug, description, city_name, state_code, website, verified, status) VALUES
-- National Jewish Organizations
('organization', 'American Jewish Committee (AJC)', 'american-jewish-committee', 'Global Jewish advocacy organization founded in 1906, protecting Jewish interests worldwide', 'New York', 'NY', 'https://www.ajc.org', true, 'approved'),
('organization', 'Anti-Defamation League (ADL)', 'anti-defamation-league', 'Leading anti-hate organization founded in 1913, combating antisemitism and all forms of bigotry', 'New York', 'NY', 'https://www.adl.org', true, 'approved'),
('organization', 'American Israel Public Affairs Committee (AIPAC)', 'aipac', 'Pro-Israel lobbying organization strengthening US-Israel relations', 'Washington', 'DC', 'https://www.aipac.org', true, 'approved'),
('organization', 'Hadassah', 'hadassah-national', 'Women''s Zionist organization supporting healthcare and education in Israel since 1912', 'New York', 'NY', 'https://www.hadassah.org', true, 'approved'),
('organization', 'B''nai B''rith International', 'bnai-brith-international', 'Oldest Jewish service organization founded in 1843, promoting Jewish unity and humanitarian causes', 'Washington', 'DC', 'https://www.bnaibrith.org', true, 'approved'),
('organization', 'Jewish Federations of North America', 'jfna', 'Network of 146 Jewish Federations protecting and enhancing Jewish life globally', 'New York', 'NY', 'https://www.jewishfederations.org', true, 'approved'),
('organization', 'Simon Wiesenthal Center', 'simon-wiesenthal-center', 'Global Jewish human rights organization combating antisemitism and terrorism', 'Los Angeles', 'CA', 'https://www.wiesenthal.com', true, 'approved'),
('organization', 'World Jewish Congress', 'world-jewish-congress', 'International organization representing Jewish communities in 100 countries', 'New York', 'NY', 'https://www.worldjewishcongress.org', true, 'approved'),

-- Jewish Community Centers (JCC)
('organization', 'JCC Association of North America', 'jcc-association', 'Leadership network of over 170 Jewish Community Centers across North America', 'New York', 'NY', 'https://www.jcca.org', true, 'approved'),
('organization', 'Marlene Meyerson JCC Manhattan', 'jcc-manhattan', 'Jewish community center on the Upper West Side serving all of Manhattan', 'New York', 'NY', 'https://www.jccmanhattan.org', true, 'approved'),
('organization', 'JCC of Greater Los Angeles', 'jcc-los-angeles', 'Community center serving Jewish families throughout the Los Angeles area', 'Los Angeles', 'CA', 'https://www.jccla.org', true, 'approved'),
('organization', 'Greater Miami Jewish Federation', 'miami-jewish-federation', 'Central Jewish organization serving Miami-Dade County', 'Miami', 'FL', 'https://www.jewishmiami.org', true, 'approved'),
('organization', 'JCC Chicago', 'jcc-chicago', 'Bernard Horwich JCC serving Chicago''s Jewish community', 'Chicago', 'IL', 'https://www.jccchicago.org', true, 'approved'),

-- Youth Organizations
('organization', 'NCSY', 'ncsy-national', 'Orthodox Union''s international youth movement for Jewish teens', 'New York', 'NY', 'https://www.ncsy.org', true, 'approved'),
('organization', 'BBYO', 'bbyo-international', 'Leading Jewish youth movement with chapters in 60+ countries', 'Washington', 'DC', 'https://www.bbyo.org', true, 'approved'),
('organization', 'Young Judaea', 'young-judaea', 'Zionist youth movement providing leadership development and Israel experiences', 'New York', 'NY', 'https://www.youngjudaea.org', true, 'approved'),
('organization', 'USY (United Synagogue Youth)', 'usy-national', 'Conservative movement''s youth organization for Jewish teens', 'New York', 'NY', 'https://www.usy.org', true, 'approved'),
('organization', 'NFTY (North American Federation of Temple Youth)', 'nfty', 'Reform movement''s youth organization', 'New York', 'NY', 'https://www.nfty.org', true, 'approved'),

-- Chabad-Lubavitch
('organization', 'Chabad-Lubavitch World Headquarters', 'chabad-770', 'Global headquarters of Chabad-Lubavitch movement in Crown Heights, Brooklyn', 'Brooklyn', 'NY', 'https://www.chabad.org', true, 'approved'),
('organization', 'Chabad of California', 'chabad-california', 'Chabad centers serving Jewish communities throughout California', 'Los Angeles', 'CA', 'https://www.chabadca.com', true, 'approved'),
('organization', 'Chabad of South Florida', 'chabad-south-florida', 'Network of Chabad centers serving South Florida communities', 'Miami', 'FL', 'https://www.chabadflorida.com', true, 'approved'),

-- Holocaust & Remembrance Organizations
('organization', 'United States Holocaust Memorial Museum', 'ushmm', 'America''s national memorial museum for Holocaust education and remembrance', 'Washington', 'DC', 'https://www.ushmm.org', true, 'approved'),
('organization', 'USC Shoah Foundation', 'usc-shoah-foundation', 'Organization preserving survivor testimonies, founded by Steven Spielberg', 'Los Angeles', 'CA', 'https://sfi.usc.edu', true, 'approved'),
('organization', 'Claims Conference', 'claims-conference', 'Organization securing compensation for Holocaust survivors worldwide', 'New York', 'NY', 'https://www.claimscon.org', true, 'approved'),

-- Educational Organizations
('organization', 'Hillel International', 'hillel-international', 'Largest Jewish campus organization serving students at 850+ colleges', 'Washington', 'DC', 'https://www.hillel.org', true, 'approved'),
('organization', 'Birthright Israel', 'birthright-israel', 'Free educational trips to Israel for young Jewish adults', 'New York', 'NY', 'https://www.birthrightisrael.com', true, 'approved'),
('organization', 'American Jewish Historical Society', 'ajhs', 'Oldest ethnic historical society in America, preserving American Jewish history', 'New York', 'NY', 'https://www.ajhs.org', true, 'approved'),

-- Professional Organizations
('organization', 'Jewish War Veterans of the USA', 'jewish-war-veterans', 'Oldest active veterans organization in America, founded in 1896', 'Washington', 'DC', 'https://www.jwv.org', true, 'approved'),
('organization', 'National Council of Jewish Women', 'ncjw', 'Grassroots organization of volunteers improving lives through advocacy and community service', 'New York', 'NY', 'https://www.ncjw.org', true, 'approved'),
('organization', 'ORT America', 'ort-america', 'Global Jewish education organization providing skills training worldwide', 'New York', 'NY', 'https://www.ortamerica.org', true, 'approved'),

-- Regional Federations
('organization', 'UJA-Federation of New York', 'uja-federation-ny', 'Largest local philanthropy in the world, caring for Jews in NY, Israel, and globally', 'New York', 'NY', 'https://www.ujafedny.org', true, 'approved'),
('organization', 'Jewish Federation of Greater Los Angeles', 'jewish-federation-la', 'Central Jewish organization serving Los Angeles County', 'Los Angeles', 'CA', 'https://www.jewishla.org', true, 'approved'),
('organization', 'Jewish United Fund of Chicago', 'juf-chicago', 'Jewish Federation serving the Chicago metropolitan area', 'Chicago', 'IL', 'https://www.juf.org', true, 'approved'),
('organization', 'Jewish Federation of Greater Philadelphia', 'jewish-federation-philly', 'Jewish Federation serving the Philadelphia region', 'Philadelphia', 'PA', 'https://www.jewishphilly.org', true, 'approved'),
('organization', 'Jewish Federation of Greater Washington', 'jewish-federation-dc', 'Jewish Federation serving the Greater Washington DC area', 'Rockville', 'MD', 'https://www.shalomdc.org', true, 'approved'),
('organization', 'Combined Jewish Philanthropies of Boston', 'cjp-boston', 'Jewish Federation serving Greater Boston', 'Boston', 'MA', 'https://www.cjp.org', true, 'approved')

ON CONFLICT (type, slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  city_name = EXCLUDED.city_name,
  state_code = EXCLUDED.state_code,
  website = EXCLUDED.website,
  verified = EXCLUDED.verified,
  status = EXCLUDED.status;
