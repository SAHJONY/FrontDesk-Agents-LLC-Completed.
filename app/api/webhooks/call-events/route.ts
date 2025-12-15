import { NextRequest, NextResponse } from 'next/server';

// Helper function to store call data
async function storeCallFromBland(callData: any) {
  // TODO: Implement your database storage logic here
  // Example: await supabase.from('calls').insert(callData);
  console.log('Storing call data:', callData);
  
  // For now, just return success
  return { success: true, callId: callData.call_id };
}

// POST handler for webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate webhook data
    if (!body || !body.call_id) {
      return NextResponse.json(
        { error: 'Invalid webhook data' },
        { status: 400 }
      );
    }

    // Store the call data
    const result = await storeCallFromBland(body);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Call event processed',
        data: result 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing call event:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process call event',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET handler (optional - for testing)
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'Call events webhook endpoint',
      status: 'active',
      method: 'POST required'
    },
    { status: 200 }
  );
}
