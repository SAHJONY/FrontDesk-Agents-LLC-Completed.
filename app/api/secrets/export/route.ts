import { NextRequest, NextResponse } from 'next/server';
import { SecretsManager } from '@/lib/services/secrets-manager';

/**
 * GET /api/secrets/export
 * Export secrets to .env format
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const environment = searchParams.get('environment') || 'production';
    
    // TODO: Get user ID from session/JWT
    const userId = 'owner_user_id';
    
    // TODO: Verify user has owner role
    // const session = await verifyToken(request);
    // if (!hasRole(session, 'owner')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }
    
    const envContent = await SecretsManager.exportToEnv(environment, userId);
    
    return new NextResponse(envContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename=".env.${environment}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting secrets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export secrets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/secrets/export
 * Import secrets from .env format
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { envContent, environment } = body;
    
    if (!envContent || !environment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // TODO: Get user ID from session/JWT
    const userId = 'owner_user_id';
    
    // TODO: Verify user has owner role
    // const session = await verifyToken(request);
    // if (!hasRole(session, 'owner')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }
    
    const result = await SecretsManager.importFromEnv(envContent, environment, userId);
    
    return NextResponse.json({
      success: true,
      imported: result.imported,
      errors: result.errors,
      message: `Successfully imported ${result.imported} secret(s)`
    });
  } catch (error) {
    console.error('Error importing secrets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import secrets' },
      { status: 500 }
    );
  }
}
