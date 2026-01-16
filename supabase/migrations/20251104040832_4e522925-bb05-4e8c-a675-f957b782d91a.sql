-- Delete all non-obituary articles from Jewish Journal RSS Feed
-- These are all articles, events, and commentary - not actual obituaries

DELETE FROM obits WHERE source_name = 'Jewish Journal RSS Feed';