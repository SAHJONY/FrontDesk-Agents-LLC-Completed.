import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import { authenticateOwner, isOwnerEmail } from '@/lib/auth/owner-auth';

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OWNER_EMAIL = 'frontdeskllc@outlook.com';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Initialize Supabase with service key (server-side only)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Check if this is the owner email
    const isOwner = email.toLowerCase() === OWNER_EMAIL.toLowerCase();

    // Query user from database
    let { data: user, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    // If owner doesn't exist, create owner account automatically
    if (isOwner && (dbError || !user)) {
      console.log('Owner account not found, creating...');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: email,
          password_hash: hashedPassword,
          full_name: 'Platform Owner',
          role: 'owner',
          tier: 'enterprise',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) {
        console.error('Failed to create owner account:', createError);
        return NextResponse.json(
          { error: 'Failed to create owner account' },
          { status: 500 }
        );
      }

      user = newUser;
      console.log('Owner account created successfully');
    }

    // If user still doesn't exist (non-owner), return error
    if (!user) {
      console.error('User not found:', email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      console.error('Password mismatch for user:', email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT tokens
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    
    // Access token (7 days)
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role || 'user',
        tier: user.tier || 'basic',
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Refresh token (30 days)
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name || user.name,
        role: user.role || 'user',
        tier: user.tier || 'basic',
        status: user.status || 'active',
      },
      accessToken,
      refreshToken,
    });

    // Set HTTP-only cookie with the access token
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set refresh token cookie
    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
