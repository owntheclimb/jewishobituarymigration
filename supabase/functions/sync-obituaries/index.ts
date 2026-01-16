// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import * as cheerio from "npm:cheerio@1.0.0-rc.12";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_PAYLOAD_SIZE = 50 * 1024; // 50KB limit

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const UA = Deno.env.get("USER_AGENT") ?? "NeshamaLegacyBot/1.0 (+contact: info@neshamajfs.com)";

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false }
});

type ParsedItem = {
  name: string;
  date_of_death?: string | null;
  published_at?: string | null;
  city?: string | null;
  state?: string | null;
  source: string;
  source_url: string;
  snippet?: string | null;
  image_url?: string | null;
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "text/html" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return await res.text();
}

function toISODate(raw?: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/\u00A0/g, " ").trim();
  
  // Try various date formats
  const tryDates = [
    cleaned,
    cleaned.replace(/(\w+)\s+(\d{1,2}),\s+(\d{4})/, "$1 $2, $3"),
  ];
  
  for (const d of tryDates) {
    const dt = new Date(d);
    if (!Number.isNaN(dt.getTime())) return dt.toISOString();
  }
  
  // ISO format like 2025-09-29
  const isoMatch = cleaned.match(/\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return new Date(isoMatch[0]).toISOString();
  
  // Match patterns like "died on January 15, 2024" or "passed away December 3, 2023"
  const diedMatch = cleaned.match(/(?:died|passed away|passed)\s+(?:on\s+)?(\w+\s+\d{1,2},?\s+\d{4})/i);
  if (diedMatch) {
    const dt = new Date(diedMatch[1]);
    if (!Number.isNaN(dt.getTime())) return dt.toISOString();
  }
  
  return null;
}

// Extract clean snippet from HTML content (first 2-3 sentences, ~200 chars)
function extractSnippet(html: string, maxLength = 200): string | null {
  const $ = cheerio.load(html);
  
  // Remove script, style, and other non-content elements
  $('script, style, nav, header, footer, aside, iframe').remove();
  
  // Get text from paragraphs
  let text = '';
  $('p').each((_i, p) => {
    const pText = $(p).text().trim();
    if (pText.length > 20) { // Skip very short paragraphs
      text += pText + ' ';
    }
  });
  
  // If no paragraphs, try article text
  if (!text) {
    text = $('article').first().text().trim();
  }
  
  // If still nothing, try body
  if (!text) {
    text = $('body').text().trim();
  }
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Extract first 2-3 sentences or maxLength chars
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let snippet = sentences.slice(0, 3).join(' ').slice(0, maxLength);
  
  if (snippet.length < text.length && snippet.length >= maxLength) {
    snippet = snippet.slice(0, snippet.lastIndexOf(' ')) + '...';
  }
  
  return snippet || null;
}

// Extract image URL from page (og:image, twitter:image, or first article image)
function extractImageUrl(html: string, baseUrl: string): string | null {
  const $ = cheerio.load(html);
  
  // Try Open Graph image
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) {
    return new URL(ogImage, baseUrl).href;
  }
  
  // Try Twitter image
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) {
    return new URL(twitterImage, baseUrl).href;
  }
  
  // Try first image in article content
  const articleImg = $('article img, .entry-content img, .post-content img').first().attr('src');
  if (articleImg && !articleImg.includes('avatar') && !articleImg.includes('icon')) {
    return new URL(articleImg, baseUrl).href;
  }
  
  // Try any image with reasonable size attributes
  const imgs = $('img[width], img[height]');
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs.eq(i);
    const src = img.attr('src');
    const width = parseInt(img.attr('width') || '0');
    const height = parseInt(img.attr('height') || '0');
    
    // Skip small images (likely icons/logos)
    if (src && (width > 200 || height > 200)) {
      return new URL(src, baseUrl).href;
    }
  }
  
  return null;
}

// Extract city from content text
function extractCity(text: string): string | null {
  // Common patterns: "of City, State" or "City, State –" or "City resident"
  const cityPattern = /(?:of\s+)?([A-Z][a-zA-Z\s]+),\s*(?:FL|Florida)/i;
  const match = text.match(cityPattern);
  if (match && match[1]) {
    return match[1].trim();
  }
  
  const residentPattern = /([A-Z][a-zA-Z\s]+)\s+resident/i;
  const resMatch = text.match(residentPattern);
  if (resMatch && resMatch[1] && resMatch[1].length < 30) {
    return resMatch[1].trim();
  }
  
  return null;
}

async function parseKronish(listUrl: string): Promise<ParsedItem[]> {
  const html = await fetchHtml(listUrl);
  const $ = cheerio.load(html);
  const out: ParsedItem[] = [];
  $("a").each((_i, a) => {
    const href = $(a).attr("href") || "";
    const text = $(a).text().trim();
    if (!href || !/\/\d{4}\/\d{2}\//.test(href)) return;
    if (/obituary/i.test(text)) {
      const name = text.replace(/Obituary/i, "").trim().replace(/\s{2,}/g, " ").replace(/^[-–]+/, "").trim();
      out.push({ name: name || text, source: "Kronish Funeral Services", source_url: new URL(href, "https://kronishfuneral.com").href, state: "FL" });
    }
  });
  // hydrate items for dates, snippet, and images
  for (const item of out.slice(0, 20)) {
    try {
      const detail = await fetchHtml(item.source_url);
      const $$ = cheerio.load(detail);
      
      // Extract date
      const dateText = $$("time").first().text().trim() || $$(".entry-meta").first().text().trim();
      item.published_at = toISODate(dateText);
      
      // Extract snippet
      item.snippet = extractSnippet(detail);
      
      // Extract image
      item.image_url = extractImageUrl(detail, item.source_url);
      
      // Try to extract city from content
      const bodyText = $$('article, .entry-content, .post-content').first().text();
      if (!item.city && bodyText) {
        item.city = extractCity(bodyText);
      }
      
      // Try to find date of death in text
      if (!item.date_of_death && bodyText) {
        item.date_of_death = toISODate(bodyText);
      }
      
      await sleep(250);
    } catch (e) { 
      console.log(`Failed to fetch details for ${item.source_url}:`, e);
    }
  }
  return out;
}

async function parseNeshama(listUrl: string): Promise<ParsedItem[]> {
  const html = await fetchHtml(listUrl);
  const $ = cheerio.load(html);
  const out: ParsedItem[] = [];
  // Cards with "View Obituary"
  $("a:contains('View Obituary')").each((_i, a) => {
    const href = $(a).attr("href");
    const name = $(a).closest("div").prevAll().first().text().trim() || "Obituary";
    if (!href) return;
    out.push({ name, source: "Neshama Jewish Funeral Services", source_url: new URL(href, "https://www.neshamajfs.com").href, state: "FL" });
  });
  for (const item of out.slice(0, 20)) {
    try {
      const detail = await fetchHtml(item.source_url);
      const $$ = cheerio.load(detail);
      
      // Extract better name from heading
      const heading = $$("h1,h2").first().text().trim();
      if (heading && heading.length > 2) item.name = heading;
      
      // Extract snippet
      item.snippet = extractSnippet(detail);
      
      // Extract image
      item.image_url = extractImageUrl(detail, item.source_url);
      
      // Extract city from content
      const bodyText = $$('article, .entry-content, .post-content').first().text();
      if (!item.city && bodyText) {
        item.city = extractCity(bodyText);
      }
      
      await sleep(250);
    } catch (e) {
      console.log(`Failed to fetch details for ${item.source_url}:`, e);
    }
  }
  return out;
}

async function parseSunshine(listUrl: string): Promise<ParsedItem[]> {
  const html = await fetchHtml(listUrl);
  const $ = cheerio.load(html);
  const out: ParsedItem[] = [];
  // Sunshine uses "Obituary" post entries
  $("a").each((_i, a) => {
    const href = $(a).attr("href") || "";
    const text = $(a).text().trim();
    if (!href || !/\/\d{4}\/\d{2}\//.test(href)) return;
    if (/Obituary/i.test(text)) {
      const name = text.replace(/Obituary/i, "").trim();
      out.push({ name: name || text, source: "Sunshine Cremation", source_url: new URL(href, "https://sunshinecremation.com").href, state: "FL" });
    }
  });
  for (const item of out.slice(0, 20)) {
    try {
      const detail = await fetchHtml(item.source_url);
      const $$ = cheerio.load(detail);
      
      // Extract snippet
      item.snippet = extractSnippet(detail);
      
      // Extract date
      const dateText = $$("time").first().text().trim();
      item.published_at = toISODate(dateText);
      
      // Extract image
      item.image_url = extractImageUrl(detail, item.source_url);
      
      // Extract city from content
      const bodyText = $$('article, .entry-content, .post-content').first().text();
      if (!item.city && bodyText) {
        item.city = extractCity(bodyText);
      }
      
      await sleep(250);
    } catch (e) {
      console.log(`Failed to fetch details for ${item.source_url}:`, e);
    }
  }
  return out;
}

async function parseHeritage(listUrl: string): Promise<ParsedItem[]> {
  const html = await fetchHtml(listUrl);
  const $ = cheerio.load(html);
  const out: ParsedItem[] = [];
  // List items are links with titles containing "Obituary -"
  $("a").each((_i, a) => {
    const href = $(a).attr("href") || "";
    const title = $(a).text().trim();
    if (!href || !/\/story\//.test(href)) return;
    if (/Obituary\s*[-–]/i.test(title) || /Obituary/i.test(title)) {
      out.push({
        name: title.replace(/Obituary\s*[-–]?\s*/i, "").trim() || title,
        source: "Heritage Florida Jewish News",
        source_url: new URL(href, "https://www.heritagefl.com").href,
        state: "FL"
      });
    }
  });
  return out;
}

async function parseJewishPressTampa(listUrl: string): Promise<ParsedItem[]> {
  const html = await fetchHtml(listUrl);
  const $ = cheerio.load(html);
  const out: ParsedItem[] = [];
  // Article list posts inside the obituaries page
  $("a").each((_i, a) => {
    const href = $(a).attr("href") || "";
    const title = $(a).text().trim();
    if (!href || !/\/articles\//.test(href)) return;
    if (/Obituaries?/i.test(title) || /Obituary/i.test(title)) {
      out.push({
        name: title.replace(/Obituaries?\s*[-–]?\s*/i, "").trim() || title,
        source: "Jewish Press Tampa Bay",
        source_url: new URL(href, "https://www.jewishpresstampa.com").href,
        state: "FL"
      });
    }
  });
  return out;
}

async function upsert(items: ParsedItem[]) {
  if (!items.length) return;
  // de-dup within batch
  const unique = new Map(items.map(i => [i.source_url, i]));
  const rows = Array.from(unique.values());
  const { error } = await sb.from("scraped_obituaries").upsert(rows, { onConflict: "source_url" });
  if (error) {
    console.error("Upsert error:", error);
    throw error;
  }
  console.log(`Upserted ${rows.length} obituaries`);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Payload size validation
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      console.error('Payload too large');
      return new Response(
        JSON.stringify({ error: 'Payload too large' }),
        {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Starting obituary sync...");
    
    // Allow GET for testing and POST for actual sync
    if (req.method !== "POST" && req.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405,
        headers: { ...corsHeaders, "content-type": "application/json" }
      });
    }

    const sources = [
      { name: "Kronish", fn: parseKronish, url: "https://kronishfuneral.com/obituaries/" },
      { name: "Neshama", fn: parseNeshama, url: "https://www.neshamajfs.com/obituaries" },
      { name: "Sunshine", fn: parseSunshine, url: "https://sunshinecremation.com/obituaries/" },
      { name: "Heritage", fn: parseHeritage, url: "https://www.heritagefl.com/section/life_cycles/obituary" },
      { name: "JewishPressTampa", fn: parseJewishPressTampa, url: "https://www.jewishpresstampa.com/articles/obituaries-236/" },
    ];

    const results: ParsedItem[][] = [];
    for (const src of sources) {
      try {
        console.log(`Fetching from ${src.name}...`);
        const items = await src.fn(src.url);
        console.log(`Found ${items.length} items from ${src.name}`);
        results.push(items);
        await sleep(500);
      } catch (e: any) {
        console.error(`Source failed ${src.name}:`, e?.message);
      }
    }

    const flat = results.flat();
    console.log(`Total items to upsert: ${flat.length}`);
    await upsert(flat);

    return new Response(JSON.stringify({ 
      success: true,
      inserted_or_updated: flat.length,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "content-type": "application/json" },
      status: 200
    });
  } catch (e: any) {
    console.error("Error in sync-obituaries:", e);
    return new Response(JSON.stringify({ 
      success: false,
      error: String(e?.message || e) 
    }), { 
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
