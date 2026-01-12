import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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

    // Hash password using SHA-256
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          password: hashedPassword,
          role: role || 'OWNER',
          updated_at: new Date().toISOString(),
        })
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
        message: 'User updated successfully',
        user: {
          id: data.id,
          email: data.email,
          role: data.role,
        },
      });
    } else {
      // Create new user
      const userId = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email,
          password: hashedPassword,
          role: role || 'OWNER',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to create user', details: error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        user: {
          id: data.id,
          email: data.email,
          role: data.role,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
