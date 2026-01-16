-- Disable the Jewish Journal main RSS feed since it imports articles instead of obituaries
-- The feed URL https://jewishjournal.com/feed/ is their main blog/news feed, not obituaries

UPDATE obit_sources 
SET active = false 
WHERE key = 'jewish-journal-rss' AND label = 'Jewish Journal RSS Feed';