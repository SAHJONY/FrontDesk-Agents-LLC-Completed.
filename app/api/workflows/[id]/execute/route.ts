/**
 * Workflow Execution API
 * 
 * Execute a workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { workflowEngine } from '@/lib/automation/workflow-engine';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/workflows/[id]/execute
 * Execute a workflow
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { triggerData } = body;

    // Get workflow from database
    const { data: workflow, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    if (!workflow.enabled) {
      return NextResponse.json(
        { error: 'Workflow is disabled' },
        { status: 400 }
      );
    }

    // Execute workflow
    const execution = await workflowEngine.executeWorkflow(
      {
        id: workflow.id,
        name: workflow.name,
        description: workflow.description,
        customerId: workflow.customer_id,
        enabled: workflow.enabled,
        nodes: workflow.nodes,
        startNodeId: workflow.start_node_id,
        variables: workflow.variables,
        createdAt: new Date(workflow.created_at),
        updatedAt: new Date(workflow.updated_at),
      },
      triggerData || {}
    );

    // Save execution to database
    await supabase.from('workflow_executions').insert({
      id: execution.id,
      workflow_id: workflow.id,
      status: execution.status,
      variables: execution.variables,
      logs: execution.logs,
      started_at: execution.startedAt,
      completed_at: execution.completedAt,
      error: execution.error,
    });

    return NextResponse.json({
      success: true,
      data: execution,
    });
  } catch (error: any) {
    console.error('Failed to execute workflow:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to execute workflow' },
      { status: 500 }
    );
  }
}
