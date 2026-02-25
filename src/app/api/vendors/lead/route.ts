import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  vendorId: z.string().uuid(),
  slug: z.string().trim().min(1),
  vendorName: z.string().trim().min(1),
  contactForm: z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(1),
    message: z.string().trim().min(1),
  }),
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
    const payload = leadSchema.parse(await request.json());
    const supabase = getAdminClient();

    const { data: lead, error: leadError } = await supabase
      .from('vendor_leads')
      .insert({
        vendor_id: payload.vendorId,
        lead_type: 'contact_form',
        source_page: `/funeral-homes/${payload.slug}`,
        lead_data: payload.contactForm,
      })
      .select('id')
      .single();

    if (leadError) {
      throw leadError;
    }

    const { error: contactError } = await supabase.from('contact_submissions').insert({
      name: payload.contactForm.name,
      email: payload.contactForm.email,
      subject: `Inquiry for ${payload.vendorName}`,
      message: `Phone: ${payload.contactForm.phone}\n\n${payload.contactForm.message}`,
    });

    if (contactError) {
      await supabase.from('vendor_leads').delete().eq('id', lead.id);
      throw contactError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message || 'Invalid request'
        : error instanceof Error
          ? error.message
          : 'Failed to submit lead';

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
