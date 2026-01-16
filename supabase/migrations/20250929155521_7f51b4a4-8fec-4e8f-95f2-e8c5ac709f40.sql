-- Update the RSS feed URL to point to a working RSS feed
UPDATE obit_sources 
SET feed_url = 'https://jewishlivingandlearning.org/feed/', 
    label = 'Jewish Living & Learning RSS Feed'
WHERE key = 'jewish-obits-rss';

-- Add some additional working RSS feeds for testing
INSERT INTO obit_sources (key, label, type, url, feed_url, active) VALUES 
('jewish-journal-rss', 'Jewish Journal RSS Feed', 'feed', 'https://jewishjournal.com', 'https://jewishjournal.com/feed/', true)
ON CONFLICT (key) DO UPDATE SET 
  feed_url = EXCLUDED.feed_url,
  label = EXCLUDED.label,
  active = EXCLUDED.active;