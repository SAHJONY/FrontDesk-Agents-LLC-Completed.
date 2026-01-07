import { NextResponse } from 'next/server';
import { OwnerCommandCenter, AuthenticatedSession, hasRole, isSessionValid } from '@/lib/ai-agents/owner-access';
import jwt from 'jsonwebtoken';

/**
 * Verify and decode JWT token from request
 */
function verifyToken(request: Request): AuthenticatedSession | null {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookie = request.headers.get('cookie');
    const authToken = token || cookie?.split('auth-token=')[1]?.split(';')[0];

    if (!authToken) {
      return null;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return null;
    }

    const decoded: any = jwt.verify(authToken, jwtSecret);

    // Create session from JWT payload
    const session: AuthenticatedSession = {
      isAuthenticated: true,
      user: {
        userId: decoded.userId || decoded.sub,
        email: decoded.email,
        role: decoded.role || 'viewer',
      },
      sessionId: decoded.sessionId || `session-${Date.now()}`,
      createdAt: new Date(decoded.iat * 1000),
      expiresAt: new Date(decoded.exp * 1000),
    };

    return session;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * POST /api/owner/command
 * Execute owner commands with role-based access control
 */
export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = verifyToken(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing authentication token' },
        { status: 401 }
      );
    }

    if (!isSessionValid(session)) {
      return NextResponse.json(
        { error: 'Unauthorized: Session expired' },
        { status: 401 }
      );
    }

    // Verify owner role
    if (!hasRole(session, 'owner')) {
      return NextResponse.json(
        { error: 'Forbidden: Owner role required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { command, params } = body;

    if (!command) {
      return NextResponse.json(
        { error: 'Missing required field: command' },
        { status: 400 }
      );
    }

    console.log(`[OWNER API] ${session.user.email} executing: ${command}`);

    // Execute command through secure command center
    const commandCenter = new OwnerCommandCenter(session);
    const result = await commandCenter.executeCommand(command, params);

    return NextResponse.json({
      success: true,
      command,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[OWNER API] Error executing command:', error);
    
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      {
        error: 'Failed to execute command',
        details: isDevelopment && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/owner/command
 * Get owner command center status
 */
export async function GET(request: Request) {
  try {
    // Verify authentication
    const session = verifyToken(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing authentication token' },
        { status: 401 }
      );
    }

    if (!isSessionValid(session)) {
      return NextResponse.json(
        { error: 'Unauthorized: Session expired' },
        { status: 401 }
      );
    }

    // Verify owner role
    if (!hasRole(session, 'owner')) {
      return NextResponse.json(
        { error: 'Forbidden: Owner role required' },
        { status: 403 }
      );
    }

    // Get complete status
    const commandCenter = new OwnerCommandCenter(session);
    const status = await commandCenter.executeCommand('status');

    return NextResponse.json({
      success: true,
      user: {
        email: session.user.email,
        role: session.user.role,
        userId: session.user.userId,
      },
      status,
      availableCommands: [
        'status',
        'override',
        'shutdown',
        'create_mission',
        'access_data',
        'view_financials',
        'report',
        'scale_division',
        'restart_system',
      ],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[OWNER API] Error getting status:', error);
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      {
        error: 'Failed to get status',
        details: isDevelopment && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
