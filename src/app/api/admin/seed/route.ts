import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// This endpoint creates the initial admin user
// It should be called once and then removed or protected
export async function POST(request: NextRequest) {
  // Check for a secret key to prevent unauthorized access
  const { secret } = await request.json();

  // Simple secret check - in production, use env variable
  if (secret !== 'SEED_ADMIN_2024_JEWISH_OBIT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = 'https://pinwpummsftjsqvszchs.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Missing SUPABASE_SERVICE_ROLE_KEY' },
      { status: 500 }
    );
  }

  // Use service role key for admin operations
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const adminEmail = 'owntheclimb@neshamajfs.com';
  const adminPassword = 'Shimipotter613!';
  const adminName = 'Shimi Carroll';

  try {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === adminEmail);

    if (existingUser) {
      // User exists, just update their profile to be admin
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          user_id: existingUser.id,
          email: adminEmail,
          full_name: adminName,
          role: 'admin',
        }, { onConflict: 'user_id' });

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update profile', details: updateError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Admin user already exists, profile updated',
        userId: existingUser.id,
      });
    }

    // Create the user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: adminName,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: 'Failed to create user', details: authError.message },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation returned no user' },
        { status: 500 }
      );
    }

    // Create the profile with admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: authData.user.id,
        email: adminEmail,
        full_name: adminName,
        role: 'admin',
      }, { onConflict: 'user_id' });

    if (profileError) {
      return NextResponse.json(
        { error: 'Failed to create profile', details: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Admin user created successfully',
      userId: authData.user.id,
      email: adminEmail,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error.message },
      { status: 500 }
    );
  }
}
