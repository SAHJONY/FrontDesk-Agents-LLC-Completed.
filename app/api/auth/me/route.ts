import { NextResponse } from 'next/server';
import { verifyOwnerToken } from '@/lib/auth/owner-auth';
import jwt from 'jsonwebtoken';
import { requireSupabaseServer } from '@/lib/supabase-server';


export async function GET(req: Request) {
  const supabase = requireSupabaseServer();

  // Ensure the Supabase client is available for all paths
  if (!supabase) {
    return NextResponse.json(
      { message: 'Supabase client not initialized' },
      { status: 500 }
    );
  }
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

    // Verify and decode token
    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if this is an owner token
    if (decoded.role === 'owner') {
      const result = await verifyOwnerToken(token);
      
      if (!result.success) {
        return NextResponse.json(
          { message: result.error || 'Token verification failed' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
      });
    }

    // Regular user token verification


    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
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
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
