import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

interface FeedItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
}

// Comprehensive HTML entity decoder
function decodeHTMLEntities(text: string): string {
  const namedEntities: Record<string, string> = {
    '&quot;': '"', '&amp;': '&', '&apos;': "'", '&lt;': '<', '&gt;': '>',
    '&nbsp;': ' ', '&mdash;': '\u2014', '&ndash;': '\u2013', '&hellip;': '\u2026',
    '&ldquo;': '\u201C', '&rdquo;': '\u201D', '&lsquo;': '\u2018', '&rsquo;': '\u2019',
    '&bull;': '\u2022', '&copy;': '\u00A9', '&reg;': '\u00AE', '&trade;': '\u2122',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(namedEntities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
  return decoded;
}

// Enhanced obituary detection with scoring system
function isLikelyObituary(title: string, description: string): { isObituary: boolean; reason: string } {
  const content = (title + ' ' + description).toLowerCase();
  let score = 0;
  const reasons: string[] = [];

  // NEGATIVE SIGNALS (auto-reject)
  const negativeKeywords = [
    'rabbis of', 'profile:', 'interview', 'poem for', 'eulogy for',
    'recalls', 'celebrated', 'honored', 'commentary', 'opinion', 
    'analysis', 'column', 'editorial', 'how to', 'guide to',
    'resources for', 'tips for'
  ];
  
  for (const keyword of negativeKeywords) {
    if (content.includes(keyword)) {
      return { isObituary: false, reason: `Contains negative keyword: ${keyword}` };
    }
  }

  // Check title structure (articles often start with "A", "The", question marks)
  if (/^(a |the |an )/i.test(title.trim()) || title.includes('?')) {
    score -= 3;
    reasons.push('Suspicious title structure');
  }

  // Reject titles that are too long (likely articles)
  const titleWordCount = title.split(/\s+/).length;
  if (titleWordCount > 12) {
    return { isObituary: false, reason: 'Title too long (likely article)' };
  }

  // STRONG POSITIVE SIGNALS (+5 points each)
  const strongPositives = ['obituary', 'in memoriam', 'z"l', 'z"l', 'baruch dayan emet', 'funeral service'];
  for (const keyword of strongPositives) {
    if (content.includes(keyword)) {
      score += 5;
      reasons.push(`Strong signal: ${keyword}`);
    }
  }

  // MODERATE POSITIVE SIGNALS (+3 points each)
  const moderatePositives = ['passed away', 'died', 'memorial', 'funeral', 'shiva', 'burial'];
  for (const keyword of moderatePositives) {
    if (content.includes(keyword)) {
      score += 3;
      reasons.push(`Moderate signal: ${keyword}`);
    }
  }

  // WEAK POSITIVE SIGNALS (+1 point each)
  const weakPositives = ['beloved', 'survived by', 'predeceased', 'services will be held', 'visitation'];
  for (const keyword of weakPositives) {
    if (content.includes(keyword)) {
      score += 1;
      reasons.push(`Weak signal: ${keyword}`);
    }
  }

  // Check for name pattern in title (typical obituary format)
  // Names usually have 2-4 words, proper capitalization
  const namePattern = /^[A-Z][a-z]+\s+([A-Z][a-z]+\s+)?[A-Z][a-z]+/;
  if (namePattern.test(title.trim())) {
    score += 2;
    reasons.push('Title matches name pattern');
  }

  // Check for age pattern (common in obituaries)
  if (/\b\d{1,3}\b/.test(title) || /age \d{1,3}/i.test(content)) {
    score += 2;
    reasons.push('Contains age');
  }

  // Minimum score threshold
  const isObituary = score >= 3;
  const reason = isObituary 
    ? `Obituary detected (score: ${score}): ${reasons.join(', ')}`
    : `Not an obituary (score: ${score}): ${reasons.join(', ')}`;

  return { isObituary, reason };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate request
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== Deno.env.get('INTERNAL_API_KEY')) {
      console.error('Unauthorized access attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Starting obituary feed refresh job...");

    // Get active sources
    const { data: sources, error: sourcesError } = await supabase
      .from('obit_sources')
      .select('*')
      .eq('active', true);

    if (sourcesError) {
      console.error('Error fetching sources:', sourcesError);
      throw sourcesError;
    }

    let totalProcessed = 0;
    let totalNew = 0;
    let totalErrors = 0;

    for (const source of sources) {
      try {
        console.log(`Processing source: ${source.key}`);
        
        if (!source.feed_url) {
          console.log(`Skipping ${source.key} - no feed URL configured`);
          continue;
        }

        // Fetch RSS feed
        const feedResponse = await fetch(source.feed_url, {
          headers: {
            'User-Agent': 'Neshama-Memorial-Bot/1.0'
          }
        });

        if (!feedResponse.ok) {
          console.error(`Failed to fetch feed for ${source.key}: ${feedResponse.status}`);
          totalErrors++;
          continue;
        }

        const feedText = await feedResponse.text();
        const parser = new DOMParser();
        const feedDoc = parser.parseFromString(feedText, 'text/xml');
        
        if (!feedDoc) {
          console.error(`Failed to parse XML for ${source.key}`);
          totalErrors++;
          continue;
        }
        
        const items = feedDoc.querySelectorAll('item');
        console.log(`Found ${items.length} items in ${source.key} feed`);

        for (let i = 0; i < items.length; i++) {
          try {
            const item = items[i] as any; // Use any to bypass type issues with deno_dom
            
            // Get text content from child elements
            const getChildText = (tagName: string): string => {
              const children = Array.from(item.childNodes || []) as any[];
              const child = children.find(node => 
                node.nodeType === 1 && node.tagName?.toLowerCase() === tagName.toLowerCase()
              );
              return child?.textContent?.trim() || '';
            };
            
            const rawTitle = getChildText('title');
            const link = getChildText('link'); 
            const rawDescription = getChildText('description');
            const pubDateStr = getChildText('pubDate');
            
            // Skip if missing essential fields
            if (!rawTitle || !link) {
              continue;
            }

            // Decode HTML entities
            const title = decodeHTMLEntities(rawTitle);
            const description = decodeHTMLEntities(rawDescription);

            // Enhanced obituary detection with scoring
            const obituaryCheck = isLikelyObituary(title, description);
            
            if (!obituaryCheck.isObituary) {
              console.log(`Skipping: ${title} - ${obituaryCheck.reason}`);
              continue;
            }
            
            console.log(`✓ Accepted: ${title} - ${obituaryCheck.reason}`);

            // Parse date
            let publishedAt = null;
            if (pubDateStr) {
              try {
                publishedAt = new Date(pubDateStr).toISOString();
                
                // Skip items older than 60 days
                const sixtyDaysAgo = new Date();
                sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
                
                if (new Date(publishedAt) < sixtyDaysAgo) {
                  continue;
                }
              } catch (dateError) {
                console.warn(`Invalid date format for item: ${pubDateStr}`);
              }
            }

            // Generate stable ID from URL
            const encoder = new TextEncoder();
            const data = encoder.encode(link);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            const id = hashHex.substring(0, 16);

            // Truncate summary to ~240 characters at word boundary
            let summary = description;
            if (summary.length > 240) {
              summary = summary.substring(0, 240);
              const lastSpaceIndex = summary.lastIndexOf(' ');
              if (lastSpaceIndex > 180) {
                summary = summary.substring(0, lastSpaceIndex) + '...';
              }
            }

            // Extract image URL if available - simplified approach
            let imageUrl = null;
            // Skip complex image extraction for now, can be enhanced later

            // Upsert obituary record
            const { error: upsertError } = await supabase
              .from('obits')
              .upsert({
                id,
                title,
                summary,
                source_name: source.label,
                source_url: link,
                image_url: imageUrl,
                published_at: publishedAt
              }, {
                onConflict: 'id'
              });

            if (upsertError) {
              console.error(`Error upserting obituary ${id}:`, upsertError);
              totalErrors++;
            } else {
              totalNew++;
            }

            totalProcessed++;
          } catch (itemError) {
            console.error(`Error processing item in ${source.key}:`, itemError);
            totalErrors++;
          }
        }

      } catch (sourceError) {
        console.error(`Error processing source ${source.key}:`, sourceError);
        totalErrors++;
      }
    }

    console.log(`Feed refresh completed. Processed: ${totalProcessed}, New: ${totalNew}, Errors: ${totalErrors}`);

    return new Response(
      JSON.stringify({
        success: true,
        processed: totalProcessed,
        new: totalNew,
        errors: totalErrors,
        sources_processed: sources.length
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in refresh obits function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);