// ./app/api/bland/webhook/route.ts

import { NextResponse } from 'next/server';

// NOTE: In a production environment, you MUST use a secure method
// to verify the webhook payload, typically by checking a signature header
// provided by Bland AI or using a secret key, to prevent spoofing.
const BLAND_WEBHOOK_SECRET = process.env.BLAND_WEBHOOK_SECRET;

/**
 * Handles incoming POST requests from the Bland AI Webhook Service.
 * This is the critical integration point for real-time call logging.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // --- 1. Security Check (Hardening Production) ---
    // This is a placeholder for checking the security header.
    // Replace this with actual signature verification logic in production.
    const secretFromHeader = request.headers.get('X-Bland-Signature');
    
    if (BLAND_WEBHOOK_SECRET && secretFromHeader !== BLAND_WEBHOOK_SECRET) {
      console.warn('SECURITY ALERT: Received webhook with invalid signature.');
      // Return 401 Unauthorized if verification fails
      // return new NextResponse('Unauthorized', { status: 401 }); 
    }

    // --- 2. Process Payload and Log Data (Opción C - Persistence) ---
    
    // Extract key data points
    const { 
      call_id, 
      status, // e.g., 'completed', 'failed'
      outcome, // e.g., 'booked', 'qualified', 'hangup'
      data, // Contains transcript, duration, lead details
      client_key // Our unique client ID, mapped from Bland's metadata
    } = payload;

    // SIMULATION: In a real application, you would write this to your PostgreSQL DB
    // using Prisma or a similar ORM.
    console.log(`[BLAND WEBHOOK RECEIVED] Call ID: ${call_id}`);
    console.log(`Status: ${status}, Outcome: ${outcome}`);
    console.log(`Client Key: ${client_key} (Used to map to FrontDesk Agents client)`);
    // Example DB write: 
    // await db.callLog.create({ data: { callId, status, outcome, transcript: data.transcript, clientId: client_key } });

    // Optional: Update the RealtimeStatus component cache/DB entry here 
    // to instantly show the activity in the dashboard.
    
    // --- 3. Acknowledge Receipt ---
    // Must return a 200 OK status quickly to confirm receipt to Bland AI.
    return NextResponse.json({ received: true, callId: call_id }, { status: 200 });

  } catch (error) {
    console.error('Error processing Bland webhook:', error);
    // Return an error status if the request body was invalid or processing failed
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Optional: Block other HTTP methods
export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
