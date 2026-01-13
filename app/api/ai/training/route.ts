/**
 * AI Training API
 * 
 * Manage training datasets and fine-tuning jobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { trainingSystem } from '@/lib/ai/training-system';

/**
 * POST /api/ai/training
 * Start a fine-tuning job
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, datasetId, customerId, baseModel, samples, name, description } = body;

    if (action === 'create_dataset') {
      const dataset = await trainingSystem.createDataset(
        name,
        description,
        customerId,
        samples
      );
      return NextResponse.json({ success: true, data: dataset });
    }

    if (action === 'start_training') {
      const job = await trainingSystem.startFineTuning(
        datasetId,
        customerId,
        baseModel
      );
      return NextResponse.json({ success: true, data: job });
    }

    if (action === 'generate_synthetic') {
      const { topic, sampleCount } = body;
      const samples = await trainingSystem.generateSyntheticData(topic, sampleCount);
      return NextResponse.json({ success: true, data: samples });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Training API error:', error);
    return NextResponse.json(
      { error: error.message || 'Training operation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/training?jobId=xxx
 * Get training job status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const job = await trainingSystem.checkJobStatus(jobId);
    return NextResponse.json({ success: true, data: job });
  } catch (error: any) {
    console.error('Failed to get job status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get job status' },
      { status: 500 }
    );
  }
}
