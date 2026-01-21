import { NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // Fetch real counts from database
    const [
      obituaryResult,
      scrapedObituaryResult,
      scrapedSourcesResult,
      communitiesResult,
    ] = await Promise.all([
      // User-created obituaries (published and public)
      supabase
        .from('obituaries')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
        .eq('visibility', 'public'),

      // Scraped obituaries
      supabase
        .from('scraped_obituaries')
        .select('*', { count: 'exact', head: true }),

      // Active funeral home sources
      supabase
        .from('scraped_sources')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),

      // Communities by type
      supabase
        .from('communities')
        .select('type', { count: 'exact' })
        .eq('status', 'active'),
    ]);

    // Calculate totals with fallbacks to 0
    const userObituaries = obituaryResult.count || 0;
    const scrapedObituaries = scrapedObituaryResult.count || 0;
    const totalMemorials = userObituaries + scrapedObituaries;
    const funeralHomeSources = scrapedSourcesResult.count || 0;

    // Count communities by type if we have data
    const communities = communitiesResult.data || [];
    const synagogueCount = communities.filter((c: { type: string }) => c.type === 'synagogue').length;
    const schoolCount = communities.filter((c: { type: string }) => c.type === 'school').length;
    const organizationCount = communities.filter((c: { type: string }) => c.type === 'organization').length;

    return NextResponse.json({
      totalMemorials,
      userObituaries,
      scrapedObituaries,
      funeralHomeSources,
      notableFigures: 6, // Real count from our data file
      synagogues: synagogueCount,
      schools: schoolCount,
      organizations: organizationCount,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching homepage stats:', error);

    // Return minimal fallback data on error
    return NextResponse.json({
      totalMemorials: 0,
      userObituaries: 0,
      scrapedObituaries: 0,
      funeralHomeSources: 0,
      notableFigures: 6,
      synagogues: 0,
      schools: 0,
      organizations: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch complete statistics',
    }, { status: 500 });
  }
}
