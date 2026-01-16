-- Insert RSS feed sources for Jewish obituaries nationwide
INSERT INTO public.obit_sources (key, label, type, url, feed_url, active) VALUES
-- New York
('boropark24', 'BoroPark24 Obituaries', 'feed', 'https://www.boropark24.com/obituaries/', 'https://www.boropark24.com/obituaries/feed/', true),
('yeshiva_world', 'Yeshiva World News - Levaya Alerts', 'feed', 'https://www.theyeshivaworld.com/category/levaya', 'https://www.theyeshivaworld.com/category/levaya/feed/', true),
('matzav', 'Matzav - Petirah', 'feed', 'https://matzav.com/category/matzav-shmooze/petirah/', 'https://matzav.com/category/matzav-shmooze/petirah/feed/', true),
('jewish_world_ny', 'The Jewish World (Capital Region)', 'feed', 'https://jewishworldnews.org/obituaries/', 'https://jewishworldnews.org/obituaries/feed/', true),

-- New Jersey
('lakewood_scoop', 'The Lakewood Scoop Obituaries', 'feed', 'https://www.thelakewoodscoop.com/news/category/obituaries', 'https://www.thelakewoodscoop.com/news/category/obituaries/feed/', true),

-- Maryland
('baltimore_jewish_life', 'Baltimore Jewish Life - Nichum Aveilim', 'feed', 'https://baltimorejewishlife.com/m/chesed/', 'https://baltimorejewishlife.com/m/chesed/feed/', true),
('baltimore_jewish_times', 'Baltimore Jewish Times Obituaries', 'feed', 'https://www.jewishtimes.com/category/community/obituaries/', 'https://www.jewishtimes.com/category/community/obituaries/feed/', true),

-- Pennsylvania  
('philadelphia_exponent', 'Philadelphia Jewish Exponent - Death Notices', 'feed', 'https://www.jewishexponent.com/death_notice/', 'https://www.jewishexponent.com/death_notice/feed/', true),

-- Colorado
('intermountain_jewish_news', 'Intermountain Jewish News Obituaries', 'feed', 'https://www.ijn.com/obituaries/', 'https://www.ijn.com/obituaries/feed/', true),
('boulder_jewish_news', 'Boulder Jewish News Obituaries', 'feed', 'https://boulderjewishnews.org/tag/obituary/', 'https://boulderjewishnews.org/tag/obituary/feed/', true),

-- Connecticut
('ct_jewish_ledger', 'Connecticut Jewish Ledger Obituaries', 'feed', 'https://www.jewishledger.com/category/obituaries/', 'https://www.jewishledger.com/category/obituaries/feed/', true),

-- Arizona
('arizona_jewish_post', 'Arizona Jewish Post Obituaries', 'feed', 'https://azjewishpost.com/category/lifecycles/obituaries/', 'https://azjewishpost.com/category/lifecycles/obituaries/feed/', true),

-- Massachusetts
('jewish_journal_ma', 'The Jewish Journal (North Shore)', 'feed', 'https://jewishjournal.org/category/obituaries/', 'https://jewishjournal.org/category/obituaries/feed/', true),

-- Georgia
('atlanta_jewish_times', 'Atlanta Jewish Times Obituaries', 'feed', 'https://www.atlantajewishtimes.com/topic/obituaries/', 'https://www.atlantajewishtimes.com/topic/obituaries/feed/', true),

-- Virginia
('washington_jewish_week', 'Washington Jewish Week Obituaries', 'feed', 'https://www.washingtonjewishweek.com/obituaries/', 'https://www.washingtonjewishweek.com/obituaries/feed/', true),

-- Minnesota
('tc_jewfolk', 'TC Jewfolk - Obituaries & Remembrances', 'feed', 'https://tcjewfolk.com/category/obituaries-remembrances/', 'https://tcjewfolk.com/category/obituaries-remembrances/feed/', true),

-- Wisconsin
('wisconsin_jewish_chronicle', 'Wisconsin Jewish Chronicle Obituaries', 'feed', 'https://www.jewishchronicle.org/obituaries/', 'https://www.jewishchronicle.org/obituaries/feed/', true),

-- Missouri
('st_louis_jewish_light', 'St. Louis Jewish Light Obituaries', 'feed', 'https://stljewishlight.org/category/obituaries/', 'https://stljewishlight.org/category/obituaries/feed/', true)

ON CONFLICT (key) DO UPDATE SET
  label = EXCLUDED.label,
  url = EXCLUDED.url,
  feed_url = EXCLUDED.feed_url,
  active = EXCLUDED.active;