// Supabase client configuration
// Note: This file provides two clients - one with auth (for authenticated operations)
// and one without auth session persistence (for fast public queries)
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pinwpummsftjsqvszchs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Singleton pattern to prevent multiple GoTrueClient instances
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;
let supabasePublicInstance: ReturnType<typeof createClient<Database>> | null = null;

// Main client with auth session persistence (for authenticated operations)
function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: isBrowser ? localStorage : undefined,
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        storageKey: 'jewish-obits-auth', // Unique storage key
      }
    });
  }
  return supabaseInstance;
}

// Public client WITHOUT session persistence (for fast public queries that don't need auth)
// Use this for queries on public tables like obituaries, obits, scraped_obituaries
// This client won't wait for auth session restoration, making queries faster
function getSupabasePublicClient() {
  if (!supabasePublicInstance) {
    supabasePublicInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: 'jewish-obits-public', // Different storage key to avoid conflicts
      }
    });
  }
  return supabasePublicInstance;
}

export const supabase = getSupabaseClient();
export const supabasePublic = getSupabasePublicClient();
