import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Lazy initialize Supabase client for server-side operations
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

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the form data
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // Insert the contact submission
    const { data, error } = await getSupabase()
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'new'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Contact submission insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit contact form. Please try again.' },
        { status: 500 }
      );
    }

    // TODO: Send email notification using Resend when ready
    // await sendContactNotification({ name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      id: data.id
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'contact' });
}
