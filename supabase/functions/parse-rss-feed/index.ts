import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MAX_PAYLOAD_SIZE = 50 * 1024; // 50KB limit

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

interface RSSFeed {
  title: string;
  link: string;
  description: string;
  items: RSSItem[];
}

// Comprehensive HTML entity decoder
function decodeHTMLEntities(text: string): string {
  // Named entities
  const namedEntities: Record<string, string> = {
    '&quot;': '"',
    '&amp;': '&',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&mdash;': '\u2014',
    '&ndash;': '\u2013',
    '&hellip;': '\u2026',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&bull;': '\u2022',
    '&copy;': '\u00A9',
    '&reg;': '\u00AE',
    '&trade;': '\u2122',
  };

  let decoded = text;
  
  // Replace named entities
  for (const [entity, char] of Object.entries(namedEntities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  
  // Replace numeric entities (decimal: &#8220;)
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Replace hex entities (hex: &#x2014;)
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decoded;
}

function parseRSSFeed(xmlContent: string): RSSFeed {
  console.log('Raw XML content length:', xmlContent.length);
  console.log('First 500 chars:', xmlContent.substring(0, 500));
  
  // First decode HTML entities if the content is HTML-encoded
  let processedContent = xmlContent;
  if (xmlContent.includes('&lt;')) {
    processedContent = xmlContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    console.log('Decoded HTML entities');
  }
  
  // Extract channel information with more flexible patterns
  const titleMatch = processedContent.match(/<channel>[\s\S]*?<title>(.*?)<\/title>/i) || 
                    processedContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) ||
                    processedContent.match(/<title>(.*?)<\/title>/i);
  
  const linkMatch = processedContent.match(/<channel>[\s\S]*?<link>(.*?)<\/link>/i) ||
                   processedContent.match(/<link>(.*?)<\/link>/i);
  
  const descriptionMatch = processedContent.match(/<channel>[\s\S]*?<description><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                          processedContent.match(/<channel>[\s\S]*?<description>(.*?)<\/description>/i) ||
                          processedContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/i) ||
                          processedContent.match(/<description>(.*?)<\/description>/i);
  
  const title = titleMatch ? titleMatch[1].trim() : '';
  const link = linkMatch ? linkMatch[1].trim() : '';
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  console.log('Parsed channel info:', { title, link, description });
  
  // Extract items with more flexible patterns
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  const items: RSSItem[] = [];
  
  let itemMatch;
  while ((itemMatch = itemRegex.exec(processedContent)) !== null) {
    const itemContent = itemMatch[1];
    console.log('Processing item content (first 200 chars):', itemContent.substring(0, 200));
    
    // More flexible title matching
    const itemTitleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) ||
                          itemContent.match(/<title>(.*?)<\/title>/i);
    
    // More flexible link matching - use [\s\S]*? to handle multiline links
    const itemLinkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
    
    // More flexible description matching - use [\s\S]*? for multiline content
    const itemDescMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
                         itemContent.match(/<description>([\s\S]*?)<\/description>/i) ||
                         itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i);
    
    // More flexible date matching
    const itemPubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/i);
    
    // More flexible GUID matching - use [\s\S]*? for multiline content
    const itemGuidMatch = itemContent.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
    
    if (itemTitleMatch && itemLinkMatch) {
      // Normalize link - remove newlines and extra whitespace
      const normalizedLink = itemLinkMatch[1].replace(/\s+/g, '').trim();
      const item = {
        title: decodeHTMLEntities(itemTitleMatch[1].trim()),
        link: normalizedLink,
        description: itemDescMatch ? decodeHTMLEntities(itemDescMatch[1].trim()) : '',
        pubDate: itemPubDateMatch ? itemPubDateMatch[1].trim() : '',
        guid: itemGuidMatch ? itemGuidMatch[1].replace(/\s+/g, '').trim() : normalizedLink
      };
      
      console.log('Parsed item:', item.title);
      items.push(item);
    } else {
      console.log('Skipped item - missing title or link:', {
        hasTitle: !!itemTitleMatch,
        hasLink: !!itemLinkMatch
      });
    }
  }
  
  console.log(`Total items parsed: ${items.length}`);
  return { title, link, description, items };
}

// Map of RSS source keys to their state codes
const SOURCE_STATE_MAP: Record<string, string> = {
  // New York
  'boropark24': 'NY',
  'yeshiva_world': 'NY',
  'matzav': 'NY',
  'jewish_world_ny': 'NY',
  // New Jersey
  'lakewood_scoop': 'NJ',
  // Maryland
  'baltimore_jewish_life': 'MD',
  'baltimore_jewish_times': 'MD',
  // Pennsylvania
  'philadelphia_exponent': 'PA',
  // Colorado
  'intermountain_jewish_news': 'CO',
  'boulder_jewish_news': 'CO',
  // Connecticut
  'ct_jewish_ledger': 'CT',
  // Arizona
  'arizona_jewish_post': 'AZ',
  // Massachusetts
  'jewish_journal_ma': 'MA',
  // Georgia
  'atlanta_jewish_times': 'GA',
  // Virginia / DC
  'washington_jewish_week': 'VA',
  // Minnesota
  'tc_jewfolk': 'MN',
  // Wisconsin
  'wisconsin_jewish_chronicle': 'WI',
  // Missouri
  'st_louis_jewish_light': 'MO',
  // California (NEW)
  'jewish_journal': 'CA',
  'jewish_journal_la': 'CA',
  'san_diego_jewish_world': 'CA',
  // Ohio (NEW)
  'cleveland_jewish_news': 'OH',
  'columbus_jewish_news': 'OH',
  // Michigan (NEW)
  'detroit_jewish_news': 'MI',
  // Florida (NEW)
  'heritage_fl': 'FL',
  'jewish_press_pinellas': 'FL',
  'jewish_press_tampa': 'FL',
  // National publications
  'jta_obituaries': 'National',
  'jewish_living_learning': 'National'
};

// Check whether an RSS item is likely an obituary (not a news article)
// Applied to general-purpose news feeds that mix obituaries with other content
function isLikelyObituary(title: string, description: string): boolean {
  const text = (title + ' ' + description).toLowerCase();
  const obituaryKeywords = [
    'passed away', 'passing of', 'has died', 'have died', 'died on', 'died at',
    'passed on', 'death of', 'in loving memory', 'memorial service', 'funeral service',
    'survived by', 'leaves behind', 'is survived', 'beloved', 'z"l', "z'l", 'zichrono',
    'baruch dayan', 'condolence', 'mourning', 'shiva', 'yahrzeit', 'obituary',
    'remembrance', 'laid to rest', 'eulogy', 'of blessed memory', 'may his memory',
    'may her memory', 'born in', 'born on'
  ];
  return obituaryKeywords.some(kw => text.includes(kw));
}

// Helper to extract city and state from title or description
function extractLocation(title: string, description: string): { city: string | null; state: string | null } {
  // Common patterns: "Name, City, State" or "City, State - ..."
  const locationPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2})\b/;
  
  // Try title first
  let match = title.match(locationPattern);
  if (match) {
    return { city: match[1], state: match[2] };
  }
  
  // Try description
  match = description.match(locationPattern);
  if (match) {
    return { city: match[1], state: match[2] };
  }
  
  return { city: null, state: null };
}

Deno.serve(async (req) => {
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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting RSS feed parsing...');

    // Get active RSS feed sources
    const { data: sources, error: sourcesError } = await supabaseClient
      .from('obit_sources')
      .select('*')
      .eq('type', 'feed')
      .or('is_active.eq.true,active.eq.true');

    if (sourcesError) {
      console.error('Error fetching sources:', sourcesError);
      throw sourcesError;
    }

    console.log(`Found ${sources?.length || 0} active RSS sources`);

    let totalProcessed = 0;
    let totalInserted = 0;

    // Helper to add delay between requests
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Process each feed source
    for (const source of sources || []) {
      if (!source.feed_url) {
        console.log(`Skipping ${source.label} - no feed URL`);
        continue;
      }

      // Small delay between sources to avoid rate limiting
      await delay(500);

      try {
        console.log(`Fetching RSS feed from: ${source.feed_url}`);
        
        // Fetch the RSS feed with proper headers
        const response = await fetch(source.feed_url, {
          headers: {
            'User-Agent': 'JewishObituaryBot/1.0 (+https://jewishobituary.com; contact@jewishobituary.com)',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*'
          }
        });
        if (!response.ok) {
          console.error(`Failed to fetch feed ${source.feed_url}: ${response.status}`);
          continue;
        }

        const xmlContent = await response.text();
        console.log(`Fetched ${xmlContent.length} characters from ${source.label}`);

        // Parse the RSS feed
        const feed = parseRSSFeed(xmlContent);
        console.log(`Parsed ${feed.items.length} items from ${source.label}`);

        // Process each item
        for (const item of feed.items) {
          totalProcessed++;

          // For general news RSS feeds, skip non-obituary articles
          // Dedicated funeral home / obituary-section feeds can bypass this filter
          const isDedicatedObitSource = source.key?.includes('mortuary') ||
            source.key?.includes('chapel') ||
            source.key?.includes('funeral') ||
            source.key?.includes('cremation') ||
            source.key?.includes('memorial') ||
            source.type === 'scrape';
          if (!isDedicatedObitSource && !isLikelyObituary(item.title, item.description)) {
            console.log(`Skipping non-obituary article: "${item.title}"`);
            continue;
          }
          
          // Use source label as source name
          const sourceName = source.label;
          
          // Parse publication date
          let publishedAt: string | null = null;
          if (item.pubDate) {
            try {
              publishedAt = new Date(item.pubDate).toISOString();
            } catch (e) {
              console.warn(`Invalid date format: ${item.pubDate}`);
            }
          }

          // Clean up description - remove HTML tags and source attribution
          let cleanDescription = item.description
            .replace(/<br><br><em>Source:.*?<\/em>/, '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          // Truncate if too long
          const maxLength = 500;
          if (cleanDescription.length > maxLength) {
            cleanDescription = cleanDescription.substring(0, maxLength) + '...';
          }

          // Extract location information from content
          const location = extractLocation(item.title, item.description);

          // Get state from: database source.state > hardcoded map > extracted from content
          const sourceState = source.state || SOURCE_STATE_MAP[source.key] || location.state;

          // Insert into obits table (avoiding duplicates based on id)
          const { error: insertError } = await supabaseClient
            .from('obits')
            .upsert({
              id: `rss-${encodeURIComponent(item.guid || item.link)}`,
              title: item.title,
              summary: cleanDescription,
              source_name: sourceName,
              source_url: item.link,
              published_at: publishedAt,
              image_url: null, // RSS feeds typically don't include images
              city: location.city,
              state: sourceState
            }, {
              onConflict: 'id'
            });

          if (insertError) {
            console.error(`Error inserting item: ${insertError.message}`, item.title);
          } else {
            totalInserted++;
            console.log(`Inserted: ${item.title}`);
          }
        }
      } catch (error) {
        console.error(`Error processing source ${source.label}:`, error);
      }
    }

    console.log(`RSS parsing complete. Processed: ${totalProcessed}, Inserted: ${totalInserted}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${totalProcessed} items, inserted ${totalInserted} new obituaries`,
        processed: totalProcessed,
        inserted: totalInserted
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('RSS parsing error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});