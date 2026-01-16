-- Insert the RSS feed source into obit_sources table with correct type
INSERT INTO public.obit_sources (key, label, type, url, feed_url, active) 
VALUES 
  ('jewish-obits-rss', 'Jewish Obits RSS Feed', 'feed', 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/0365b7f5a32d833d4a004c264645bbde/456e2a00-0d13-4d6c-913d-b349f13c182e/index.html', 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/0365b7f5a32d833d4a004c264645bbde/456e2a00-0d13-4d6c-913d-b349f13c182e/index.html', true)
ON CONFLICT (key) DO UPDATE SET
  label = EXCLUDED.label,
  type = EXCLUDED.type,
  url = EXCLUDED.url,
  feed_url = EXCLUDED.feed_url,
  active = EXCLUDED.active,
  updated_at = now();