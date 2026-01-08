/**
 * Workflows API
 * 
 * Manage and execute workflows
 */

import { NextRequest, NextResponse } from 'next/server';
import { workflowEngine, Workflow } from '@/lib/automation/workflow-engine';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/workflows
 * List all workflows for a customer
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const { data: workflows, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: workflows || [],
    });
  } catch (error: any) {
    console.error('Failed to list workflows:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list workflows' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/workflows
 * Create a new workflow
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, customerId, nodes, startNodeId, variables } = body;

    if (!name || !customerId || !nodes || !startNodeId) {
      return NextResponse.json(
        { error: 'Name, customer ID, nodes, and start node ID are required' },
        { status: 400 }
      );
    }

    const { data: workflow, error } = await supabase
      .from('workflows')
      .insert({
        name,
        description,
        customer_id: customerId,
        nodes,
        start_node_id: startNodeId,
        variables: variables || {},
        enabled: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: workflow,
    });
  } catch (error: any) {
    console.error('Failed to create workflow:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create workflow' },
      { status: 500 }
    );
  }
}
