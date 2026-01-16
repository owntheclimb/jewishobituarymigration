-- Insert scraping sources for funeral homes nationwide
INSERT INTO public.scraped_sources (name, base_url, listing_url, region, is_active) VALUES
-- New Jersey
('Jewish Memorial Chapel NJ', 'https://www.jewishmemorialchapel.org', 'https://www.jewishmemorialchapel.org/obituaries/', 'NJ', true),
('Mount Sinai Memorial Chapels NJ', 'https://www.msmc.us', 'https://www.msmc.us/obituaries', 'NJ', true),
('Belkoff-Goldstein Funeral Home', 'https://belkoffgoldsteinfuneralhome.com', 'https://belkoffgoldsteinfuneralhome.com/obituaries', 'NJ', true),

-- Maryland
('Sol Levinson & Bros', 'https://www.sollevinson.com', 'https://www.sollevinson.com/obituaries', 'MD', true),
('Sagel Bloomfield', 'https://www.sagelbloomfield.com', 'https://www.sagelbloomfield.com/listings', 'MD', true),

-- Pennsylvania
('Goldsteins Rosenberg Raphael-Sacks', 'https://www.goldsteinsfuneral.com', 'https://www.goldsteinsfuneral.com/obituaries/', 'PA', true),
('Joseph Levine & Sons', 'https://obits.levinefuneral.com', 'https://obits.levinefuneral.com/', 'PA', true),
('Ralph Schugar Chapel', 'https://www.schugar.com', 'https://www.schugar.com/obituaries', 'PA', true),

-- Illinois
('Chicago Jewish Funerals', 'https://www.chicagojewishfunerals.com', 'https://www.chicagojewishfunerals.com/service-list/', 'IL', true),
('Goldman Funeral Group', 'https://www.goldmanfuneralgroup.com', 'https://www.goldmanfuneralgroup.com/obituaries/', 'IL', true),

-- California
('Sinai Memorial Chapel SF', 'https://sinaichapel.org', 'https://sinaichapel.org/obituaries/', 'CA', true),
('Mount Sinai Memorial Parks LA', 'https://www.mountsinaiparks.org', 'https://www.mountsinaiparks.org/obituaries/', 'CA', true),
('Chevra Kadisha Mortuary LA', 'https://chevrakadisha.com', 'https://chevrakadisha.com/', 'CA', true),

-- Colorado
('Feldman Mortuary', 'https://feldmanmemorial.com', 'https://feldmanmemorial.com/317/Obituaries.html', 'CO', true),
('Shalom Funeral Service Denver', 'https://www.shalomfuneral.com', 'https://www.shalomfuneral.com/obituaries', 'CO', true),

-- Connecticut
('Weinstein Mortuary Hartford', 'https://www.weinsteinmortuary.com', 'https://www.weinsteinmortuary.com/obituaries', 'CT', true),
('Abraham L Green & Son', 'https://www.greensfuneralhome.com', 'https://www.greensfuneralhome.com/obituaries/obituary-listings', 'CT', true),

-- Arizona
('Sinai Mortuary Arizona', 'https://www.sinaimortuary.net', 'https://www.sinaimortuary.net/', 'AZ', true),
('Tucson Jewish Funerals', 'https://www.tucsonjewishfunerals.com', 'https://www.tucsonjewishfunerals.com/', 'AZ', true),

-- Massachusetts
('Brezniak Funeral Directors', 'https://www.brezniakfuneraldirectors.com', 'https://www.brezniakfuneraldirectors.com/obituaries/', 'MA', true),

-- Michigan
('Ira Kaufman Chapel', 'https://www.irakaufman.com', 'https://www.irakaufman.com/recent-funerals/', 'MI', true),
('Hebrew Memorial Chapel', 'https://hebrewmemorial.org', 'https://hebrewmemorial.org/obituaries/', 'MI', true),
('The Dorfman Chapel', 'https://www.thedorfmanchapel.com', 'https://www.thedorfmanchapel.com/services-funeral-notices.php', 'MI', true),

-- Ohio
('Epstein Memorial Chapel Columbus', 'https://www.epsteinmemorialchapel.com', 'https://www.epsteinmemorialchapel.com/obituaries/', 'OH', true),
('Weil Kahn Funeral Home', 'https://www.weilkahnfuneralhome.com', 'https://www.weilkahnfuneralhome.com/obituaries/obituary-notification', 'OH', true),

-- Georgia
('Dresslers Jewish Funeral Care', 'https://www.jewishfuneralcare.com', 'https://www.jewishfuneralcare.com/', 'GA', true),

-- Texas
('Dallas Jewish Funerals', 'https://www.dallasjewishfunerals.com', 'https://www.dallasjewishfunerals.com/m/obituaries/', 'TX', true),
('Waldman Funeral Care Houston', 'https://www.waldmanfuneralcare.com', 'https://www.waldmanfuneralcare.com/obituaries', 'TX', true),

-- Virginia
('Northern Virginia Jewish Funerals', 'https://www.northernvirginiajewishfunerals.com', 'https://www.northernvirginiajewishfunerals.com/m/obituaries/', 'VA', true),

-- Minnesota
('Hodroff-Epstein Memorial Chapels', 'https://www.hodroffepsteinmemorialchapels.com', 'https://www.hodroffepsteinmemorialchapels.com/obituaries/', 'MN', true),

-- Wisconsin
('Goodman-Bensman Funeral Home', 'https://goodmanbensman.com', 'https://goodmanbensman.com/obituaries/', 'WI', true),
('Blane Goodman Funeral Service', 'https://www.blanegoodmanfunerals.com', 'https://www.blanegoodmanfunerals.com/obituaries/', 'WI', true),

-- Missouri
('Louis Memorial Chapel KC', 'https://www.louismemorialchapel.com', 'https://www.louismemorialchapel.com/obituaries/', 'MO', true)

ON CONFLICT (listing_url) DO UPDATE SET
  name = EXCLUDED.name,
  base_url = EXCLUDED.base_url,
  region = EXCLUDED.region,
  is_active = EXCLUDED.is_active;