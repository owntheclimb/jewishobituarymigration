'use client';

import React from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: 'user' | 'admin' | 'super_admin' | null;
  is_admin?: boolean | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Direct fetch constants - bypassing Supabase client which has issues
  const SUPABASE_URL = "https://pinwpummsftjsqvszchs.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4";

  const fetchProfileDirect = async (userId: string, accessToken: string): Promise<Profile | null> => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}&select=*`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Profile fetch failed:', response.status);
        return null;
      }

      const profiles = await response.json();
      if (profiles && profiles.length > 0) {
        setProfile(profiles[0] as Profile);
        return profiles[0] as Profile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const fetchProfile = async (userId: string, retries = 3): Promise<Profile | null> => {
    // Try to get access token from localStorage
    const storageKey = 'jewish-obits-auth';
    const storedData = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.access_token) {
          return await fetchProfileDirect(userId, parsed.access_token);
        }
      } catch (e) {
        console.error('Error parsing stored session:', e);
      }
    }

    // Fallback to supabase client (may not work)
    for (let attempt = 0; attempt < retries; attempt++) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 200 * (attempt + 1)));
          continue;
        }
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        setProfile(data as Profile);
        return data as Profile;
      }
    }
    return null;
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    let hasCompletedInitialLoad = false;

    // Set a timeout to prevent infinite loading if auth hangs
    const loadingTimeout = setTimeout(() => {
      if (isMounted && !hasCompletedInitialLoad) {
        console.warn('Auth loading timeout - forcing completion');
        setLoading(false);
      }
    }, 8000); // 8 second timeout

    // Helper to handle session and fetch profile
    const handleSession = async (session: Session | null) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const existingProfile = await fetchProfile(session.user.id);

          // Create profile if it doesn't exist
          if (!existingProfile && isMounted) {
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                user_id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
                role: 'user'
              })
              .select()
              .single();

            if (newProfile && isMounted) {
              setProfile(newProfile as Profile);
            }
          }
        } catch (error) {
          console.error('Error fetching/creating profile:', error);
        }
      } else {
        setProfile(null);
      }

      if (isMounted) {
        hasCompletedInitialLoad = true;
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await handleSession(session);
      }
    );

    // Check for existing session with fallback to localStorage
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          await handleSession(session);
          return;
        }

        // Fallback: Check localStorage directly if getSession returns null
        // This handles cases where the Supabase client doesn't properly restore
        if (typeof window !== 'undefined') {
          const storageKey = 'jewish-obits-auth';
          const storedData = localStorage.getItem(storageKey);

          if (storedData) {
            try {
              const parsed = JSON.parse(storedData);
              const currentTime = Math.floor(Date.now() / 1000);

              // Check if token is still valid
              if (parsed.expires_at && parsed.expires_at > currentTime && parsed.access_token && parsed.refresh_token) {
                // Try to restore the session manually
                const { data: refreshData, error: refreshError } = await supabase.auth.setSession({
                  access_token: parsed.access_token,
                  refresh_token: parsed.refresh_token
                });

                if (refreshData?.session && !refreshError) {
                  await handleSession(refreshData.session);
                  return;
                }
              }
            } catch (parseError) {
              console.error('Error parsing stored session:', parseError);
            }
          }
        }

        // No valid session found
        if (isMounted) {
          hasCompletedInitialLoad = true;
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (isMounted) {
          hasCompletedInitialLoad = true;
          setLoading(false);
        }
      }
    };

    initSession();

    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    // If sign-in succeeded, explicitly fetch the profile
    // Don't rely solely on onAuthStateChange which can have race conditions
    if (!error && data?.session?.user) {
      setSession(data.session);
      setUser(data.session.user);

      try {
        // Use direct fetch with the token from sign-in response
        // The supabase client may not have the session ready immediately
        const SUPABASE_URL = "https://pinwpummsftjsqvszchs.supabase.co";
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbndwdW1tc2Z0anNxdnN6Y2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjU1MzEsImV4cCI6MjA2OTY0MTUzMX0.8t-WutBLqrv-60jaGTiJatxygqna45PaiKgRxCt3XP4";

        const profileResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${data.session.user.id}&select=*`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${data.session.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (profileResponse.ok) {
          const profiles = await profileResponse.json();
          if (profiles && profiles.length > 0) {
            setProfile(profiles[0] as Profile);
          } else {
            // Create profile if it doesn't exist
            const createResponse = await fetch(
              `${SUPABASE_URL}/rest/v1/profiles`,
              {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_ANON_KEY,
                  'Authorization': `Bearer ${data.session.access_token}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation',
                },
                body: JSON.stringify({
                  user_id: data.session.user.id,
                  email: data.session.user.email,
                  full_name: data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name,
                  role: 'user'
                }),
              }
            );

            if (createResponse.ok) {
              const newProfiles = await createResponse.json();
              if (newProfiles && newProfiles.length > 0) {
                setProfile(newProfiles[0] as Profile);
              }
            }
          }
        } else {
          console.error('Failed to fetch profile:', await profileResponse.text());
        }
      } catch (profileError) {
        console.error('Error fetching profile after sign-in:', profileError);
      }

      setLoading(false);
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const resetPasswordForEmail = async (email: string) => {
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/reset-password`
      : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error };
  };

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin' || profile?.is_admin === true;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      isAdmin,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      resetPasswordForEmail,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
