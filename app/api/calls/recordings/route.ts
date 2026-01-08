import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/calls/recordings
 * Upload call recording to Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const callId = formData.get('callId') as string;
    const customerId = formData.get('customerId') as string;

    if (!file || !callId || !customerId) {
      return NextResponse.json(
        { error: 'Missing required fields: file, callId, customerId' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${customerId}/${callId}/${timestamp}-${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('call-recordings')
      .upload(filename, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ Error uploading recording:', error);
      return NextResponse.json(
        { error: 'Failed to upload recording', details: error.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('call-recordings')
      .getPublicUrl(filename);

    // Update call record with recording URL
    const { error: updateError } = await supabase
      .from('calls')
      .update({ recording_url: urlData.publicUrl })
      .eq('id', callId);

    if (updateError) {
      console.error('❌ Error updating call record:', updateError);
    }

    console.log(`✅ Recording uploaded: ${filename}`);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: data.path,
      callId,
    });
  } catch (error) {
    console.error('❌ Error in POST /api/calls/recordings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calls/recordings?callId=xxx
 * Get recording URL for a specific call
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'Missing callId parameter' },
        { status: 400 }
      );
    }

    // Get call record
    const { data: call, error } = await supabase
      .from('calls')
      .select('recording_url')
      .eq('id', callId)
      .single();

    if (error || !call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }

    if (!call.recording_url) {
      return NextResponse.json(
        { error: 'No recording available for this call' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      callId,
      url: call.recording_url,
    });
  } catch (error) {
    console.error('❌ Error in GET /api/calls/recordings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/calls/recordings?callId=xxx
 * Delete recording for a specific call
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'Missing callId parameter' },
        { status: 400 }
      );
    }

    // Get call record to find recording path
    const { data: call, error: fetchError } = await supabase
      .from('calls')
      .select('recording_url, customer_id')
      .eq('id', callId)
      .single();

    if (fetchError || !call || !call.recording_url) {
      return NextResponse.json(
        { error: 'Recording not found' },
        { status: 404 }
      );
    }

    // Extract path from URL
    const urlParts = call.recording_url.split('/call-recordings/');
    if (urlParts.length < 2) {
      return NextResponse.json(
        { error: 'Invalid recording URL' },
        { status: 400 }
      );
    }
    const path = urlParts[1];

    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from('call-recordings')
      .remove([path]);

    if (deleteError) {
      console.error('❌ Error deleting recording:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete recording' },
        { status: 500 }
      );
    }

    // Update call record
    const { error: updateError } = await supabase
      .from('calls')
      .update({ recording_url: null })
      .eq('id', callId);

    if (updateError) {
      console.error('❌ Error updating call record:', updateError);
    }

    console.log(`✅ Recording deleted: ${path}`);

    return NextResponse.json({
      success: true,
      callId,
    });
  } catch (error) {
    console.error('❌ Error in DELETE /api/calls/recordings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
