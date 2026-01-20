import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Lazy initialize Supabase client for server-side webhook handling
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

/**
 * RB2B Webhook Handler
 * Receives identified visitor data from RB2B and stores in Supabase
 *
 * Webhook payload structure (typical):
 * {
 *   id: string,
 *   email: string,
 *   first_name: string,
 *   last_name: string,
 *   full_name: string,
 *   linkedin_url: string,
 *   job_title: string,
 *   company: {
 *     name: string,
 *     domain: string,
 *     industry: string,
 *     employee_count: string
 *   },
 *   city: string,
 *   state: string,
 *   country: string,
 *   page_url: string,
 *   referrer: string
 * }
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validate required fields
    if (!payload.id && !payload.email) {
      return NextResponse.json(
        { error: 'Missing required fields: id or email' },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData = {
      rb2b_id: payload.id || null,
      email: payload.email || null,
      first_name: payload.first_name || payload.firstName || null,
      last_name: payload.last_name || payload.lastName || null,
      full_name: payload.full_name || payload.fullName || payload.name || null,
      linkedin_url: payload.linkedin_url || payload.linkedinUrl || payload.linkedin || null,
      job_title: payload.job_title || payload.jobTitle || payload.title || null,
      company_name: payload.company?.name || payload.companyName || null,
      company_domain: payload.company?.domain || payload.companyDomain || null,
      company_industry: payload.company?.industry || payload.companyIndustry || null,
      company_size: payload.company?.employee_count || payload.companySize || null,
      city: payload.city || null,
      state: payload.state || null,
      country: payload.country || 'US',
      page_url: payload.page_url || payload.pageUrl || null,
      referrer: payload.referrer || null,
      last_seen_at: new Date().toISOString(),
    };

    // Check if lead already exists
    const existingLead = payload.id
      ? await getSupabase()
          .from('rb2b_leads')
          .select('id, visit_count')
          .eq('rb2b_id', payload.id)
          .single()
      : payload.email
      ? await getSupabase()
          .from('rb2b_leads')
          .select('id, visit_count')
          .eq('email', payload.email)
          .single()
      : null;

    if (existingLead?.data) {
      // Update existing lead
      const { error } = await getSupabase()
        .from('rb2b_leads')
        .update({
          ...leadData,
          visit_count: (existingLead.data.visit_count || 1) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.data.id);

      if (error) {
        console.error('RB2B lead update error:', error);
        return NextResponse.json(
          { error: 'Failed to update lead' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: 'updated',
        lead_id: existingLead.data.id,
      });
    } else {
      // Insert new lead
      const { data, error } = await getSupabase()
        .from('rb2b_leads')
        .insert(leadData)
        .select('id')
        .single();

      if (error) {
        console.error('RB2B lead insert error:', error);
        return NextResponse.json(
          { error: 'Failed to create lead' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: 'created',
        lead_id: data?.id,
      });
    }
  } catch (error) {
    console.error('RB2B webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'rb2b-webhook',
    timestamp: new Date().toISOString(),
  });
}
