// File: lib/auth.ts

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface AuthUser {
  userId: string;
  email: string;
  role: string;
  clientKey: string;
}

interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  clientKey: string;
}

/**
 * Get authentication data from JWT token
 */
export async function auth(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return null;
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    const decoded = jwt.verify(token.value, jwtSecret) as AuthUser;

    return decoded;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const authData = await auth();
  return authData !== null;
}

/**
 * Get current session with full user details
 */
export async function getSession(): Promise<Session | null> {
  try {
    const authData = await auth();

    if (!authData) {
      return null;
    }

    return {
      user: {
        id: authData.userId,
        email: authData.email,
        role: authData.role,
      },
      clientKey: authData.clientKey,
    };
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const authData = await auth();

  if (!authData) {
    throw new Error('Unauthorized');
  }

  return authData;
}

/**
 * Require specific role - throws if user doesn't have the role
 */
export async function requireRole(role: string): Promise<AuthUser> {
  const authData = await requireAuth();

  if (authData.role !== role) {
    throw new Error('Forbidden');
  }

  return authData;
}

/**
 * Check if user is owner
 */
export async function isOwner(): Promise<boolean> {
  const authData = await auth();
  return authData?.role === 'OWNER';
}
