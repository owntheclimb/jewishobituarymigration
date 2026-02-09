import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExternalObituary {
  id: string;
  source_url: string;
  published_at?: string;
  created_at: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching external obituaries for sitemap generation...');

    // Fetch all obituaries from both external sources
    const [obitsResponse, scrapedResponse, userObitsResponse] = await Promise.all([
      supabase.from('obits').select('id, source_url, published_at, created_at'),
      supabase.from('scraped_obituaries').select('id, source_url, published_at, created_at'),
      supabase.from('obituaries').select('id, created_at, updated_at').eq('published', true)
    ]);

    const allExternalObits: ExternalObituary[] = [
      ...(obitsResponse.data || []),
      ...(scrapedResponse.data || [])
    ];

    console.log(`Found ${allExternalObits.length} external obituaries and ${userObitsResponse.data?.length || 0} user obituaries`);

    // Generate XML sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add main search page
    sitemap += '  <url>\n';
    sitemap += '    <loc>https://jewishobituary.com/search</loc>\n';
    sitemap += '    <changefreq>daily</changefreq>\n';
    sitemap += '    <priority>1.0</priority>\n';
    sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
    sitemap += '  </url>\n';

    // Add pagination pages
    const totalPages = Math.ceil(allExternalObits.length / 12);
    for (let page = 2; page <= Math.min(totalPages, 100); page++) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://jewishobituary.com/search?page=${page}</loc>\n`;
      sitemap += '    <changefreq>daily</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      sitemap += '  </url>\n';
    }

    // Add user-created obituaries
    for (const obit of userObitsResponse.data || []) {
      const lastmod = obit.updated_at || obit.created_at;
      const lastmodDate = new Date(lastmod);
      const daysOld = (Date.now() - lastmodDate.getTime()) / (1000 * 60 * 60 * 24);
      
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://jewishobituary.com/obituary/${obit.id}</loc>\n`;
      sitemap += `    <lastmod>${lastmodDate.toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>${daysOld < 7 ? 'daily' : daysOld < 30 ? 'weekly' : 'monthly'}</changefreq>\n`;
      sitemap += `    <priority>${daysOld < 7 ? '0.9' : daysOld < 30 ? '0.7' : '0.6'}</priority>\n`;
      sitemap += '  </url>\n';
    }

    // Add external obituaries
    for (const obit of allExternalObits) {
      const lastmod = obit.published_at || obit.created_at;
      const lastmodDate = new Date(lastmod);
      const daysOld = (Date.now() - lastmodDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // URL encode the ID for external obituaries
      const encodedId = encodeURIComponent(obit.id);
      
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://jewishobituary.com/obituary/${encodedId}</loc>\n`;
      sitemap += `    <lastmod>${lastmodDate.toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>${daysOld < 7 ? 'daily' : daysOld < 30 ? 'weekly' : 'monthly'}</changefreq>\n`;
      sitemap += `    <priority>${daysOld < 7 ? '0.9' : daysOld < 30 ? '0.7' : '0.6'}</priority>\n`;
      sitemap += '  </url>\n';
    }

    sitemap += '</urlset>';

    console.log('Sitemap generated successfully');

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
