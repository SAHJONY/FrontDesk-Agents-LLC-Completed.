import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as z from 'zod';

const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  companyName: z.string().min(2),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  country: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);

    // Validate password match
    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Check if subdomain is available
    const { data: existingSubdomain } = await supabase
      .from('users')
      .select('id')
      .eq('subdomain', data.subdomain)
      .single();

    if (existingSubdomain) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate unique identifiers
    const nodeId = `node_${data.subdomain}_${Date.now()}`;
    const clientKey = `FDDG-${data.subdomain.toUpperCase().substring(0, 6)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email: data.email,
        password_hash: hashedPassword,
        full_name: data.fullName,
        name: data.fullName,
        company_name: data.companyName,
        subdomain: data.subdomain,
        country: data.country,
        node_id: nodeId,
        client_key: clientKey,
        role: 'OWNER', // First user is always the owner
        tier: 'BASIC', // Default tier
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        clientKey: newUser.client_key,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Node Provisioned Successfully',
      nodeId: nodeId,
      subdomain: data.subdomain,
      tier: 'BASIC',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.full_name,
        role: newUser.role,
      },
    }, { status: 201 });

    // Set HTTP-only cookie with the token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
