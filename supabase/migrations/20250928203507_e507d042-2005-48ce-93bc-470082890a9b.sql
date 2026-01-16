-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create cron job to refresh obituary feeds every 15 minutes
SELECT cron.schedule(
  'refresh_obits_15m',
  '*/15 * * * *',
  $$
  SELECT
    net.http_post(
        url := 'https://pinwpummsftjsqvszchs.supabase.co/functions/v1/refresh-obits',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4"}'::jsonb,
        body := '{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);