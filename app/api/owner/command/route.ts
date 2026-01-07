import { NextResponse } from 'next/server';
import { ownerCommandCenter, verifyOwnerAccess } from '@/lib/ai-agents';
import jwt from 'jsonwebtoken';

/**
 * POST /api/owner/command
 * Execute owner commands with unrestricted access
 */
export async function POST(request: Request) {
  try {
    // Verify owner authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookie = request.headers.get('cookie');
    const authToken = token || cookie?.split('auth-token=')[1]?.split(';')[0];

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    let decoded: any;

    try {
      decoded = jwt.verify(authToken, jwtSecret);
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Verify owner access
    if (!verifyOwnerAccess(decoded.email)) {
      return NextResponse.json(
        { error: 'Forbidden: Owner access required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { command, params } = body;

    if (!command) {
      return NextResponse.json({ error: 'Missing required field: command' }, { status: 400 });
    }

    console.log(`👑 Owner Command Received: ${command}`);

    // Execute owner command
    const result = await ownerCommandCenter.executeCommand(command, params);

    return NextResponse.json({
      success: true,
      command,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error executing owner command:', error);
    return NextResponse.json(
      {
        error: 'Failed to execute command',
        details: error instanceof Error ? error.message : 'Unknown error',
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
    // Verify owner authentication (same as POST)
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookie = request.headers.get('cookie');
    const authToken = token || cookie?.split('auth-token=')[1]?.split(';')[0];

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    let decoded: any;

    try {
      decoded = jwt.verify(authToken, jwtSecret);
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    if (!verifyOwnerAccess(decoded.email)) {
      return NextResponse.json(
        { error: 'Forbidden: Owner access required' },
        { status: 403 }
      );
    }

    // Get complete status
    const status = await ownerCommandCenter.executeCommand('status');

    return NextResponse.json({
      success: true,
      owner: {
        email: decoded.email,
        role: decoded.role,
        accessLevel: 'SUPREME_OWNER',
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
    console.error('Error getting owner status:', error);
    return NextResponse.json(
      {
        error: 'Failed to get status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
