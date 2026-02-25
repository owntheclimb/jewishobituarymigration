-- Ensure required extensions are available
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Keep scheduling idempotent
SELECT cron.unschedule('sync_obituaries_v2_30m')
WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'sync_obituaries_v2_30m'
);

-- Schedule scraped obituary sync every 30 minutes
SELECT cron.schedule(
  'sync_obituaries_v2_30m',
  '*/30 * * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://pinwpummsftjsqvszchs.supabase.co/functions/v1/sync-obituaries-v2',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4"}'::jsonb,
      body := '{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);
