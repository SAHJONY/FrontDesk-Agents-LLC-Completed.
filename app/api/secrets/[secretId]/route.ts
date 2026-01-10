import { NextRequest, NextResponse } from 'next/server';
import { SecretsManager } from '@/lib/services/secrets-manager';
import { requireRole } from '@/lib/auth';

/**
 * GET /api/secrets/[secretId]
 * Get a specific secret (with decrypted value)
 * CAUTION: This returns the actual secret value
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { secretId: string } }
) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const { secretId } = params;
    
    // Additional security: Require explicit confirmation
    const confirm = request.nextUrl.searchParams.get('confirm');
    if (confirm !== 'true') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Viewing secret values requires explicit confirmation',
          hint: 'Add ?confirm=true to the request'
        },
        { status: 403 }
      );
    }
    
    const secret = await SecretsManager.getSecret(secretId, userId);
    
    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'Secret not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      secret,
      warning: 'This response contains sensitive data. Handle with care.'
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error getting secret:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get secret' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/secrets/[secretId]/rotate
 * Rotate a secret (generate new value)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { secretId: string } }
) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const { secretId } = params;
    const body = await request.json();
    const { newValue, action } = body;
    
    if (action === 'rotate') {
      if (!newValue) {
        return NextResponse.json(
          { success: false, error: 'New value is required for rotation' },
          { status: 400 }
        );
      }
      
      const secret = await SecretsManager.rotateSecret(secretId, newValue, userId);
      
      return NextResponse.json({
        success: true,
        secret: secret ? { ...secret, value: '***ENCRYPTED***' } : null,
        message: 'Secret rotated successfully'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error rotating secret:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to rotate secret' },
      { status: 500 }
    );
  }
}
