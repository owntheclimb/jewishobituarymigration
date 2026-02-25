import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const claimSchema = z.object({
  businessName: z.string().trim().min(1),
  businessType: z.string().trim().min(1),
  website: z.string().trim().optional().default(''),
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  zip: z.string().trim().min(1),
  contactName: z.string().trim().min(1),
  contactTitle: z.string().trim().optional().default(''),
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().optional().default(''),
  description: z.string().trim().optional().default(''),
  services: z.string().trim().optional().default(''),
  verificationMethod: z.string().trim().min(1),
  additionalNotes: z.string().trim().optional().default(''),
});

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase server credentials');
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: Request) {
  try {
    const payload = claimSchema.parse(await request.json());
    const supabase = getAdminClient();

    const { data: claim, error: claimError } = await supabase
      .from('vendor_claims')
      .insert({
        business_name: payload.businessName,
        business_type: payload.businessType,
        website: payload.website || null,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        city: payload.city,
        state: payload.state,
        zip: payload.zip,
        contact_name: payload.contactName,
        contact_title: payload.contactTitle || null,
        contact_email: payload.contactEmail,
        contact_phone: payload.contactPhone || null,
        description: payload.description || null,
        services: payload.services || null,
        verification_method: payload.verificationMethod,
        additional_notes: payload.additionalNotes || null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (claimError) {
      throw claimError;
    }

    const { error: contactError } = await supabase.from('contact_submissions').insert({
      name: payload.contactName,
      email: payload.contactEmail,
      subject: `New Vendor Claim: ${payload.businessName}`,
      message: `Business: ${payload.businessName}\nType: ${payload.businessType}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nAddress: ${payload.address}, ${payload.city}, ${payload.state} ${payload.zip}\n\nVerification Method: ${payload.verificationMethod}\n\nDescription:\n${payload.description}`,
    });

    if (contactError) {
      await supabase.from('vendor_claims').delete().eq('id', claim.id);
      throw contactError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message || 'Invalid request'
        : error instanceof Error
          ? error.message
          : 'Failed to submit claim';

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
