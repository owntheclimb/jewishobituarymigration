import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Lazy initialize Supabase client for server-side webhook handling
let supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
    }
    if (!key) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
    }
    supabase = createClient(url, key);
  }
  return supabase;
}

/**
 * Verify webhook signature using HMAC-SHA256
 * Supports multiple signature header formats for compatibility
 */
function verifyWebhookSignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;

  // Handle different signature formats
  // Format 1: sha256=<signature>
  // Format 2: <signature>
  const signatureValue = signature.startsWith('sha256=')
    ? signature.slice(7)
    : signature;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  try {
    const signatureBuffer = Buffer.from(signatureValue, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    // timingSafeEqual requires equal length buffers
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
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
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.RB2B_WEBHOOK_SECRET;
    if (webhookSecret) {
      const headersList = await headers();
      // Check common signature header names
      const signature =
        headersList.get('x-rb2b-signature') ||
        headersList.get('x-webhook-signature') ||
        headersList.get('x-signature');

      if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
        console.error('RB2B webhook signature verification failed');
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }
    } else {
      // Log warning if no secret configured (for development awareness)
      console.warn('RB2B_WEBHOOK_SECRET not configured - webhook signature verification disabled');
    }

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
