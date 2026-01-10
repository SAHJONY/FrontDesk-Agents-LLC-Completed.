import { NextRequest, NextResponse } from 'next/server';
import { SecretsManager } from '@/lib/services/secrets-manager';
import { requireRole } from '@/lib/auth';

/**
 * GET /api/secrets/export
 * Export secrets to .env format
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const searchParams = request.nextUrl.searchParams;
    const environment = searchParams.get('environment') || 'production';
    
    const envContent = await SecretsManager.exportToEnv(environment, userId);
    
    return new NextResponse(envContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename=".env.${environment}"`,
      },
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
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
    // Verify user is authenticated and has owner role
    const authUser = await requireRole('OWNER');
    const userId = authUser.userId;
    
    const body = await request.json();
    const { envContent, environment } = body;
    
    if (!envContent || !environment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await SecretsManager.importFromEnv(envContent, environment, userId);
    
    return NextResponse.json({
      success: true,
      imported: result.imported,
      errors: result.errors,
      message: `Successfully imported ${result.imported} secret(s)`
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error importing secrets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import secrets' },
      { status: 500 }
    );
  }
}
