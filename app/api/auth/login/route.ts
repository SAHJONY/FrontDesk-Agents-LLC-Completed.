import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import { authenticateOwner, isOwnerEmail } from '@/lib/auth/owner-auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Check if this is the owner email
    if (isOwnerEmail(email)) {
      console.log('Owner login detected for:', email);
      
      const result = await authenticateOwner(email, password);
      
      if (!result.success) {
        return NextResponse.json(
          { message: result.error || 'Authentication failed' },
          { status: 401 }
        );
      }

      // Return owner authentication response
      return NextResponse.json({
        success: true,
        message: 'Owner authentication successful',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    }

    // Regular user authentication flow
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query user from database
    const { data: user, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (dbError || !user) {
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

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Return user authentication response
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name || user.name,
        role: user.role || 'user',
        tenant: {
          id: user.id,
          companyName: user.company_name || 'Default Company',
          subdomain: user.subdomain || 'default',
          tier: user.tier || 'basic',
          status: user.status || 'active',
          regionalMultiplier: 1,
          countryCode: 'US',
          currencyCode: 'USD',
        },
      },
      accessToken,
      refreshToken,
    });

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
