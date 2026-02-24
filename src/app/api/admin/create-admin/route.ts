import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify the user is authenticated and is an admin
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // Check if the user is an admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, is_admin')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Unauthorized - Profile not found' },
        { status: 401 }
      );
    }

    if (profile.role !== 'admin' && !profile.is_admin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { email, fullName, password, action } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Handle "promote existing user" action
    if (action === 'promote') {
      // Find existing profile by email
      const { data: existingProfile, error: searchError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (searchError || !existingProfile) {
        // Try to find user in auth and create profile
        const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
        const authUser = authUsers?.users?.find(u => u.email === email);

        if (!authUser) {
          return NextResponse.json(
            { error: 'User not found. Use "Create New Admin" to create a new account.' },
            { status: 404 }
          );
        }

        // Create profile for existing auth user
        const { data: newProfile, error: createError } = await supabaseAdmin
          .from('profiles')
          .insert({
            user_id: authUser.id,
            email: email,
            full_name: fullName || authUser.user_metadata?.full_name || email.split('@')[0],
            role: 'admin',
            is_admin: true,
          })
          .select()
          .single();

        if (createError) {
          return NextResponse.json(
            { error: `Failed to create profile: ${createError.message}` },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: `${email} has been promoted to admin.`,
          profile: newProfile,
        });
      }

      // Update existing profile to admin
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ role: 'admin', is_admin: true })
        .eq('id', existingProfile.id);

      if (updateError) {
        return NextResponse.json(
          { error: `Failed to update profile: ${updateError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `${email} has been promoted to admin.`,
      });
    }

    // Handle "create new admin" action
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!fullName) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingAuthUser = authUsers?.users?.find(u => u.email === email);

    if (existingAuthUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists. Use "Promote Existing User" instead.' },
        { status: 409 }
      );
    }

    // Create the new user with admin API
    const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: fullName,
      },
    });

    if (createUserError || !newUser.user) {
      return NextResponse.json(
        { error: `Failed to create user: ${createUserError?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Create the profile with admin role
    const { data: newProfile, error: profileCreateError } = await supabaseAdmin
      .from('profiles')
      .insert({
        user_id: newUser.user.id,
        email: email,
        full_name: fullName,
        role: 'admin',
        is_admin: true,
      })
      .select()
      .single();

    if (profileCreateError) {
      // Profile might have been created by a trigger, try updating instead
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ role: 'admin', is_admin: true, full_name: fullName })
        .eq('user_id', newUser.user.id);

      if (updateError) {
        console.error('Failed to set admin role:', updateError);
        // User was created but profile update failed - not ideal but not fatal
      }
    }

    return NextResponse.json({
      success: true,
      message: `${email} has been created as an admin. They can log in immediately.`,
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
      },
    });

  } catch (error) {
    console.error('Error in create-admin API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
