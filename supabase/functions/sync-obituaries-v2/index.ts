/**
 * Generic Obituary Scraper v2
 *
 * A configurable web scraper that uses JSON configs from scraped_sources table
 * to scrape obituaries from funeral home websites.
 *
 * Supports multiple platforms: Gather, Tukios, FuneralTech, WordPress, FrontRunner
 */

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import * as cheerio from "npm:cheerio@1.0.0-rc.12";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

const MAX_PAYLOAD_SIZE = 50 * 1024;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const UA = "JewishObituaryBot/2.0 (+https://jewishobituary.com; contact@jewishobituary.com)";

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false }
});

// Types
interface ScraperConfig {
  platform: string;
  listing: {
    selector: string;
    name_selector?: string;
    date_selector?: string;
    url_contains?: string;
    url_pattern?: string;
  };
  detail: {
    name_selector: string;
    content_selector: string;
    image_selector: string;
  };
  rate_limit_ms: number;
  max_items: number;
}

interface ScrapedSource {
  id: string;
  name: string;
  base_url: string;
  listing_url: string;
  is_active: boolean;
  region: string;
  state: string;
  scraper_config: ScraperConfig;
}

interface ParsedItem {
  name: string;
  date_of_death?: string | null;
  published_at?: string | null;
  city?: string | null;
  state?: string | null;
  source: string;
  source_url: string;
  snippet?: string | null;
  image_url?: string | null;
}

// Utility functions
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
      },
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }

    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

function toISODate(raw?: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/\u00A0/g, " ").trim();

  // Try direct parsing
  const tryDates = [
    cleaned,
    cleaned.replace(/(\w+)\s+(\d{1,2}),\s+(\d{4})/, "$1 $2, $3"),
  ];

  for (const d of tryDates) {
    const dt = new Date(d);
    if (!Number.isNaN(dt.getTime()) && dt.getFullYear() > 1900) {
      return dt.toISOString();
    }
  }

  // ISO format like 2025-09-29
  const isoMatch = cleaned.match(/\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return new Date(isoMatch[0]).toISOString();

  // Match patterns like "died on January 15, 2024"
  const diedMatch = cleaned.match(/(?:died|passed away|passed)\s+(?:on\s+)?(\w+\s+\d{1,2},?\s+\d{4})/i);
  if (diedMatch) {
    const dt = new Date(diedMatch[1]);
    if (!Number.isNaN(dt.getTime())) return dt.toISOString();
  }

  // Try extracting any date-like pattern
  const datePattern = /(\w+\s+\d{1,2},?\s+\d{4})/;
  const anyDate = cleaned.match(datePattern);
  if (anyDate) {
    const dt = new Date(anyDate[1]);
    if (!Number.isNaN(dt.getTime()) && dt.getFullYear() > 1900) {
      return dt.toISOString();
    }
  }

  return null;
}

function extractSnippet(html: string, maxLength = 200): string | null {
  const $ = cheerio.load(html);

  // Remove non-content elements
  $('script, style, nav, header, footer, aside, iframe, form').remove();

  // Get text from paragraphs
  let text = '';
  $('p').each((_i, p) => {
    const pText = $(p).text().trim();
    if (pText.length > 20) {
      text += pText + ' ';
    }
  });

  // Fallback to article or body
  if (!text) {
    text = $('article, .entry-content, .post-content, .obituary-content').first().text().trim();
  }
  if (!text) {
    text = $('body').text().trim();
  }

  // Clean up
  text = text.replace(/\s+/g, ' ').trim();

  // Extract first 2-3 sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let snippet = sentences.slice(0, 3).join(' ').slice(0, maxLength);

  if (snippet.length >= maxLength) {
    snippet = snippet.slice(0, snippet.lastIndexOf(' ')) + '...';
  }

  return snippet || null;
}

function extractImageUrl(html: string, baseUrl: string): string | null {
  const $ = cheerio.load(html);

  // Try Open Graph image first
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) {
    try {
      return new URL(ogImage, baseUrl).href;
    } catch { /* ignore */ }
  }

  // Try Twitter image
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) {
    try {
      return new URL(twitterImage, baseUrl).href;
    } catch { /* ignore */ }
  }

  // Try article images
  const selectors = [
    'article img',
    '.entry-content img',
    '.obituary-content img',
    '.gather-photo img',
    '.obit-photo img',
    '.deceased-image img'
  ];

  for (const selector of selectors) {
    const img = $(selector).first();
    const src = img.attr('src') || img.attr('data-src');
    if (src && !src.includes('avatar') && !src.includes('icon') && !src.includes('logo')) {
      try {
        return new URL(src, baseUrl).href;
      } catch { /* ignore */ }
    }
  }

  return null;
}

function extractCity(text: string, state?: string): string | null {
  // Pattern: "of City, State" or "City, State"
  const stateAbbrev = state || '[A-Z]{2}';
  const cityPattern = new RegExp(`(?:of\\s+)?([A-Z][a-zA-Z\\s]+),\\s*(?:${stateAbbrev}|Florida|California|Texas|Ohio|Michigan|Maryland|Pennsylvania|New Jersey|Colorado|Connecticut|Wisconsin|Massachusetts|Minnesota|Missouri|Virginia|Georgia|Arizona)`, 'i');

  const match = text.match(cityPattern);
  if (match && match[1] && match[1].length < 30) {
    return match[1].trim();
  }

  // Resident pattern
  const residentPattern = /([A-Z][a-zA-Z\s]+)\s+resident/i;
  const resMatch = text.match(residentPattern);
  if (resMatch && resMatch[1] && resMatch[1].length < 30) {
    return resMatch[1].trim();
  }

  return null;
}

function cleanName(name: string): string {
  return name
    .replace(/Obituary\s*[-–:]?\s*/gi, '')
    .replace(/^[-–:]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isValidObituaryUrl(url: string, config: ScraperConfig): boolean {
  // Check url_contains
  if (config.listing.url_contains) {
    if (!url.includes(config.listing.url_contains)) {
      return false;
    }
  }

  // Check url_pattern (regex)
  if (config.listing.url_pattern) {
    try {
      const regex = new RegExp(config.listing.url_pattern, 'i');
      if (!regex.test(url)) {
        return false;
      }
    } catch { /* ignore invalid regex */ }
  }

  // General validation - must not be category/tag pages
  const excludePatterns = [
    /\/category\//i,
    /\/tag\//i,
    /\/page\/\d+/i,
    /\/author\//i,
    /\/search\//i,
    /\?pg=/i,
    /#$/
  ];

  for (const pattern of excludePatterns) {
    if (pattern.test(url)) {
      return false;
    }
  }

  return true;
}

// Generic scraper function
async function scrapeSource(source: ScrapedSource): Promise<ParsedItem[]> {
  const config = source.scraper_config;
  const items: ParsedItem[] = [];

  console.log(`[${source.name}] Starting scrape with config:`, config.platform);

  try {
    // Fetch listing page
    const html = await fetchHtml(source.listing_url);
    const $ = cheerio.load(html);

    // Find all obituary links using configured selector
    const links: { url: string; name: string; date?: string }[] = [];

    $(config.listing.selector).each((_i, el) => {
      const $el = $(el);
      let href = $el.attr('href');

      // Skip if no href or not an anchor
      if (!href) {
        // Maybe the selector found a container, look for links inside
        const innerLink = $el.find('a').first();
        href = innerLink.attr('href');
        if (!href) return;
      }

      // Convert to absolute URL
      try {
        const absoluteUrl = new URL(href, source.base_url).href;

        // Validate URL
        if (!isValidObituaryUrl(absoluteUrl, config)) {
          return;
        }

        // Extract name
        let name = '';
        if (config.listing.name_selector) {
          name = $el.find(config.listing.name_selector).first().text().trim() ||
                 $el.closest('article, .obit, .tribute').find(config.listing.name_selector).first().text().trim();
        }
        if (!name) {
          name = $el.text().trim();
        }
        name = cleanName(name);

        // Skip empty or too short names
        if (!name || name.length < 2) return;

        // Skip if it's just "Obituary" or generic text
        if (/^(obituary|obituaries|view|read more|click here)$/i.test(name)) {
          return;
        }

        // Extract date if available
        let date = '';
        if (config.listing.date_selector) {
          date = $el.find(config.listing.date_selector).first().text().trim() ||
                 $el.closest('article, .obit, .tribute').find(config.listing.date_selector).first().text().trim();
        }

        links.push({ url: absoluteUrl, name, date });
      } catch { /* invalid URL */ }
    });

    console.log(`[${source.name}] Found ${links.length} potential obituary links`);

    // Deduplicate by URL
    const uniqueLinks = [...new Map(links.map(l => [l.url, l])).values()];

    // Process each link (up to max_items)
    const maxItems = Math.min(config.max_items || 30, uniqueLinks.length);

    for (let i = 0; i < maxItems; i++) {
      const link = uniqueLinks[i];

      const item: ParsedItem = {
        name: link.name,
        source: source.name,
        source_url: link.url,
        state: source.state || source.region,
        published_at: toISODate(link.date)
      };

      // Try to fetch detail page for more info
      try {
        await sleep(config.rate_limit_ms || 500);

        const detailHtml = await fetchHtml(link.url);
        const $detail = cheerio.load(detailHtml);

        // Extract better name from detail page
        if (config.detail.name_selector) {
          const detailName = $detail(config.detail.name_selector).first().text().trim();
          if (detailName && detailName.length > 2 && detailName.length < 100) {
            item.name = cleanName(detailName);
          }
        }

        // Extract snippet
        item.snippet = extractSnippet(detailHtml);

        // Extract image
        item.image_url = extractImageUrl(detailHtml, link.url);

        // Extract city from content
        const bodyText = $detail(config.detail.content_selector).first().text();
        if (bodyText) {
          item.city = extractCity(bodyText, source.state);

          // Try to find date of death
          if (!item.date_of_death) {
            item.date_of_death = toISODate(bodyText);
          }
          if (!item.published_at) {
            // Try time element
            const timeText = $detail('time').first().attr('datetime') ||
                            $detail('time').first().text().trim() ||
                            $detail('.entry-date, .post-date, .date').first().text().trim();
            item.published_at = toISODate(timeText);
          }
        }

        console.log(`[${source.name}] Scraped: ${item.name}`);
      } catch (err) {
        console.log(`[${source.name}] Failed to fetch detail for ${link.url}:`, err);
        // Still add the item with basic info
      }

      items.push(item);
    }

    return items;
  } catch (err) {
    console.error(`[${source.name}] Scrape failed:`, err);
    throw err;
  }
}

// Upsert function
async function upsertItems(items: ParsedItem[]) {
  if (!items.length) return 0;

  // Deduplicate by source_url
  const unique = [...new Map(items.map(i => [i.source_url, i])).values()];

  const { error } = await sb
    .from("scraped_obituaries")
    .upsert(unique, { onConflict: "source_url" });

  if (error) {
    console.error("Upsert error:", error);
    throw error;
  }

  return unique.length;
}

// Update source status
async function updateSourceStatus(sourceId: string, success: boolean, error?: string) {
  if (success) {
    const { error: incrementError } = await sb.rpc('increment_scrape_count', { source_id: sourceId });
    if (incrementError) {
      console.error(`Failed to increment scrape_count for ${sourceId}:`, incrementError);
    }
  }

  await sb
    .from("scraped_sources")
    .update({
      last_scraped: new Date().toISOString(),
      last_error: success ? null : (error || 'Unknown error'),
    })
    .eq('id', sourceId);
}

// Main handler
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = req.headers.get('x-api-key');
    const authorization = req.headers.get('authorization');
    const internalApiKey = Deno.env.get('INTERNAL_API_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const isInternalRequest = !!internalApiKey && apiKey === internalApiKey;
    const isCronBearerRequest = !!anonKey && authorization === `Bearer ${anonKey}`;

    if (!isInternalRequest && !isCronBearerRequest) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Payload too large' }),
        { status: 413, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Starting obituary sync v2...");

    // Get all active sources with scraper configs
    const { data: sources, error: sourcesError } = await sb
      .from('scraped_sources')
      .select('*')
      .or('is_active.eq.true,active.eq.true')
      .not('scraper_config', 'is', null)
      .order('name');

    if (sourcesError) {
      throw sourcesError;
    }

    console.log(`Found ${sources?.length || 0} active sources with configs`);

    const results: { source: string; count: number; error?: string }[] = [];
    let totalInserted = 0;

    // Process each source
    for (const source of sources || []) {
      try {
        console.log(`\n=== Processing: ${source.name} ===`);

        const items = await scrapeSource(source as ScrapedSource);

        if (items.length > 0) {
          const count = await upsertItems(items);
          totalInserted += count;
          results.push({ source: source.name, count });
          await updateSourceStatus(source.id, true);
        } else {
          results.push({ source: source.name, count: 0 });
        }

        // Rate limit between sources
        await sleep(1000);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error(`Error processing ${source.name}:`, errorMsg);
        results.push({ source: source.name, count: 0, error: errorMsg });
        await updateSourceStatus(source.id, false, errorMsg);
      }
    }

    console.log(`\n=== Sync complete. Total inserted: ${totalInserted} ===`);

    return new Response(JSON.stringify({
      success: true,
      total_inserted: totalInserted,
      sources_processed: results.length,
      results,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "content-type": "application/json" },
      status: 200
    });
  } catch (e) {
    console.error("Error in sync-obituaries-v2:", e);
    return new Response(JSON.stringify({
      success: false,
      error: e instanceof Error ? e.message : String(e)
    }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
