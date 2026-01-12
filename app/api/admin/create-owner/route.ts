import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'temp-secret-key-12345';

export async function POST(request: Request) {
  try {
    // Check admin secret
    const { secret, email, password, role } = await request.json();
    
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Hash password using bcrypt (same as login API)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Update existing user - only update password, keep existing role
      const updateData: any = {
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('email', email)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to update user', details: error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'User password updated successfully',
        user: {
          id: data.id,
          email: data.email,
          role: data.role,
          name: data.name || 'N/A',
        },
      });
    } else {
      return NextResponse.json(
        { error: 'User does not exist', message: 'Please create the user account first in Supabase dashboard' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
