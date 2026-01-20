import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Lazy initialize Supabase client for server-side analytics
let supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pinwpummsftjsqvszchs.supabase.co';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
    }
    supabase = createClient(url, key);
  }
  return supabase;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_name, event_properties, session_id } = body;

    if (!event_name) {
      return NextResponse.json(
        { error: 'event_name is required' },
        { status: 400 }
      );
    }

    // Get request headers for additional context
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';

    // Insert the event
    const { error } = await getSupabase().from('analytics_events').insert({
      event_name,
      event_properties: event_properties || {},
      session_id,
      page_url: event_properties?.page_url || null,
      referrer: referer || event_properties?.referrer || null,
      user_agent: userAgent,
    });

    if (error) {
      console.error('Analytics insert error:', error);
      // Don't return error to client - analytics shouldn't break UX
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    // Always return success - analytics shouldn't break the user experience
    return NextResponse.json({ success: true });
  }
}

// Also support GET for health check
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'analytics' });
}
