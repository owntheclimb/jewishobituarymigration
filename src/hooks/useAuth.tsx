'use client';

import React from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: 'user' | 'admin' | null;
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
  refreshProfile: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchProfile = async (userId: string, retries = 3): Promise<Profile | null> => {
    for (let attempt = 0; attempt < retries; attempt++) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // If RLS/auth error, wait and retry (token might not be ready)
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
    // Reduced to 5 seconds for better UX
    const loadingTimeout = setTimeout(() => {
      if (isMounted && !hasCompletedInitialLoad) {
        console.warn('Auth loading timeout - forcing completion');
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch profile
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
      }
    );

    // Check for existing session
    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            await fetchProfile(session.user.id);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }

        if (isMounted) {
          hasCompletedInitialLoad = true;
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        if (isMounted) {
          hasCompletedInitialLoad = true;
          setLoading(false);
        }
      });

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
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

  const isAdmin = profile?.role === 'admin';

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
