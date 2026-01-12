import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailRouting, generateVerificationReport, exportVerificationData } from '@/lib/mail/autonomousEmailVerification';

/**
 * POST /api/email/verify
 * Autonomous email service verification endpoint
 * 
 * Request body:
 * {
 *   "testEmail": "test@example.com" (optional, defaults to frontdeskllc@outlook.com)
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "status": "operational|degraded|failed",
 *   "report": { ... }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testEmail = body.testEmail || 'frontdeskllc@outlook.com';

    console.log(`[EMAIL VERIFY API] Initiating autonomous email verification`);
    console.log(`[EMAIL VERIFY API] Test email: ${testEmail}`);

    // Run autonomous verification
    const report = await verifyEmailRouting(testEmail);

    // Generate human-readable report
    const readableReport = generateVerificationReport(report);
    console.log(readableReport);

    return NextResponse.json({
      success: true,
      status: report.overallStatus,
      summary: {
        totalTests: report.totalTests,
        successCount: report.successCount,
        failureCount: report.failureCount,
      },
      report,
      readableReport,
    });
  } catch (error: any) {
    console.error('[EMAIL VERIFY API] Verification failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/verify
 * Retrieve the status of the email service
 */
export async function GET() {
  return NextResponse.json({
    service: 'Email Verification Service',
    status: 'operational',
    version: '1.0.0',
    endpoints: {
      verify: 'POST /api/email/verify',
      status: 'GET /api/email/verify',
    },
    description: 'Autonomous email service verification and routing validation',
  });
}
