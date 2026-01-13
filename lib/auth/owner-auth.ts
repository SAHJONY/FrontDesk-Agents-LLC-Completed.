/**
 * Owner Authentication Service
 * Handles owner-level authentication and access control
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const OWNER_EMAIL = 'frontdeskllc@outlook.com';

interface OwnerAuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: 'owner';
    tenant: {
      id: string;
      companyName: string;
      subdomain: string;
      tier: 'enterprise';
      status: 'active';
      regionalMultiplier: 1;
      countryCode: 'US';
      currencyCode: 'USD';
    };
  };
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

/**
 * Check if an email is the owner email
 */
export function isOwnerEmail(email: string): boolean {
  return email.toLowerCase() === OWNER_EMAIL.toLowerCase();
}

/**
 * Authenticate owner with email and password
 */
export async function authenticateOwner(
  email: string,
  password: string
): Promise<OwnerAuthResult> {
  try {
    // Verify this is the owner email
    if (!isOwnerEmail(email)) {
      return {
        success: false,
        error: 'Not authorized as owner',
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return {
        success: false,
        error: 'Server configuration error',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if owner exists in database
    const { data: existingUser, error: queryError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    let user = existingUser;

    // If owner doesn't exist, create owner account
    if (queryError || !existingUser) {
      console.log('Owner account not found, creating new owner account');
      
      const passwordHash = await bcrypt.hash(password, 10);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: email,
          password_hash: passwordHash,
          full_name: 'Juan Gonzalez',
          role: 'owner',
          tier: 'enterprise',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError || !newUser) {
        console.error('Failed to create owner account:', createError);
        return {
          success: false,
          error: 'Failed to create owner account',
        };
      }

      user = newUser;
    } else {
      // Verify password for existing user
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      }

      // Update role to owner if not already set
      if (user.role !== 'owner') {
        await supabase
          .from('users')
          .update({ role: 'owner', tier: 'enterprise' })
          .eq('id', user.id);
        
        user.role = 'owner';
        user.tier = 'enterprise';
      }
    }

    // Generate JWT tokens
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: 'owner',
        tier: 'enterprise',
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

    // Return authenticated owner
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name || 'Juan Gonzalez',
        role: 'owner',
        tenant: {
          id: user.id,
          companyName: 'FrontDesk Agents LLC',
          subdomain: 'frontdesk',
          tier: 'enterprise',
          status: 'active',
          regionalMultiplier: 1,
          countryCode: 'US',
          currencyCode: 'USD',
        },
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Owner authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Verify owner token and return user data
 */
export async function verifyOwnerToken(token: string): Promise<OwnerAuthResult> {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    
    const decoded = jwt.verify(token, jwtSecret) as any;

    if (decoded.role !== 'owner') {
      return {
        success: false,
        error: 'Not authorized as owner',
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
        error: 'Server configuration error',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name || 'Juan Gonzalez',
        role: 'owner',
        tenant: {
          id: user.id,
          companyName: 'FrontDesk Agents LLC',
          subdomain: 'frontdesk',
          tier: 'enterprise',
          status: 'active',
          regionalMultiplier: 1,
          countryCode: 'US',
          currencyCode: 'USD',
        },
      },
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'Invalid token',
    };
  }
}
