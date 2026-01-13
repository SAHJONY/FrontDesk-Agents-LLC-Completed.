import { NextRequest, NextResponse } from 'next/server';
import { SecretsManager, Secret } from '@/lib/services/secrets-manager';
import { requireRole } from '@/lib/auth';

/**
 * GET /api/secrets
 * List all secrets (values masked)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const searchParams = request.nextUrl.searchParams;
    const environment = searchParams.get('environment') || undefined;
    
    const secrets = await SecretsManager.listSecrets(userId, environment);
    
    return NextResponse.json({
      success: true,
      secrets: secrets.map(s => ({
        ...s,
        value: '***ENCRYPTED***' // Never return actual values in list
      }))
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error listing secrets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list secrets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/secrets
 * Create a new secret
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const body = await request.json();
    const { key, value, category, environment, description } = body;
    
    // Validate input
    if (!key || !value || !category || !environment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate key format
    const validation = SecretsManager.validateKey(key);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // Check if secret already exists
    const exists = await SecretsManager.secretExists(key, environment);
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'Secret with this key already exists in this environment' },
        { status: 409 }
      );
    }
    
    const secret = await SecretsManager.createSecret(
      key,
      value,
      category,
      environment,
      userId,
      description
    );
    
    return NextResponse.json({
      success: true,
      secret: {
        ...secret,
        value: '***ENCRYPTED***' // Don't return the actual value
      },
      message: 'Secret created successfully'
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error creating secret:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create secret' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/secrets
 * Update an existing secret
 */
export async function PUT(request: NextRequest) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const body = await request.json();
    const { secretId, value, description, isActive } = body;
    
    if (!secretId) {
      return NextResponse.json(
        { success: false, error: 'Secret ID is required' },
        { status: 400 }
      );
    }
    
    const updates: Partial<Pick<Secret, 'value' | 'description' | 'isActive'>> = {};
    if (value !== undefined) updates.value = value;
    if (description !== undefined) updates.description = description;
    if (isActive !== undefined) updates.isActive = isActive;
    
    const secret = await SecretsManager.updateSecret(secretId, updates, userId);
    
    return NextResponse.json({
      success: true,
      secret: secret ? { ...secret, value: '***ENCRYPTED***' } : null,
      message: 'Secret updated successfully'
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error updating secret:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update secret' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/secrets
 * Delete a secret
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const searchParams = request.nextUrl.searchParams;
    const secretId = searchParams.get('secretId');
    
    if (!secretId) {
      return NextResponse.json(
        { success: false, error: 'Secret ID is required' },
        { status: 400 }
      );
    }
    
    const success = await SecretsManager.deleteSecret(secretId, userId);
    
    return NextResponse.json({
      success,
      message: success ? 'Secret deleted successfully' : 'Failed to delete secret'
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error deleting secret:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete secret' },
      { status: 500 }
    );
  }
}
