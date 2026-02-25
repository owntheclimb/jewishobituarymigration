import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = "https://pinwpummsftjsqvszchs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  }

  // Redirect to the home page after successful auth
  return NextResponse.redirect(`${origin}/`);
}
