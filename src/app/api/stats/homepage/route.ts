import { NextResponse } from 'next/server';
import { supabasePublic } from '@/integrations/supabase/client';

export const revalidate = 60; // Refresh roughly every minute so homepage totals stay current

// Fallback response for quick serving
const FALLBACK_STATS = {
  totalMemorials: 0,
  userObituaries: 0,
  scrapedObituaries: 0,
  funeralHomeSources: 0,
  notableFigures: 6,
  synagogues: 0,
  schools: 0,
  organizations: 0,
  lastUpdated: new Date().toISOString(),
  cached: true,
};

// Safe query wrapper that returns fallback on error/timeout
async function safeQuery<T>(
  queryFn: () => PromiseLike<{ data: T | null; count?: number | null; error: unknown }>,
  fallback: { data: T | null; count?: number | null; error: null }
): Promise<{ data: T | null; count?: number | null; error: unknown }> {
  try {
    const result = await Promise.race([
      queryFn(),
      new Promise<{ data: T | null; count?: number | null; error: null }>((resolve) =>
        setTimeout(() => resolve(fallback), 5000)
      ),
    ]);
    return result;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    // Fetch real counts from database with individual timeouts
    const [
      obituaryResult,
      scrapedObituaryResult,
      scrapedSourcesResult,
      communitiesResult,
    ] = await Promise.all([
      // User-created obituaries (published and public)
      safeQuery(
        () => supabasePublic
          .from('obituaries')
          .select('*', { count: 'exact', head: true })
          .eq('published', true)
          .eq('visibility', 'public'),
        { count: 0, data: null, error: null }
      ),

      // Scraped obituaries
      safeQuery(
        () => supabasePublic
          .from('scraped_obituaries')
          .select('*', { count: 'exact', head: true }),
        { count: 0, data: null, error: null }
      ),

      // Active funeral home sources
      safeQuery(
        () => supabasePublic
          .from('scraped_sources')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true),
        { count: 0, data: null, error: null }
      ),

      // Communities by type
      safeQuery(
        () => supabasePublic
          .from('communities')
          .select('type', { count: 'exact' })
          .eq('status', 'active'),
        { data: [], error: null }
      ),
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
    return NextResponse.json(FALLBACK_STATS, { status: 200 });
  }
}
