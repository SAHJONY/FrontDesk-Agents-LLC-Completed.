/**
 * Workflow Automation Engine
 * 
 * No-code workflow builder and execution engine
 */

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'loop' | 'delay';
  config: Record<string, any>;
  next?: string | string[]; // Next node ID(s)
}

export interface WorkflowTrigger extends WorkflowNode {
  type: 'trigger';
  config: {
    triggerType: 'call_incoming' | 'call_ended' | 'keyword_detected' | 'schedule' | 'webhook' | 'agent_decision';
    conditions?: Record<string, any>;
  };
}

export interface WorkflowAction extends WorkflowNode {
  type: 'action';
  config: {
    actionType: 'send_email' | 'send_sms' | 'api_call' | 'update_database' | 'trigger_agent' | 'create_task' | 'send_webhook';
    parameters: Record<string, any>;
  };
}

export interface WorkflowCondition extends WorkflowNode {
  type: 'condition';
  config: {
    condition: string; // JavaScript expression
    trueNext: string;
    falseNext: string;
  };
}

export interface WorkflowLoop extends WorkflowNode {
  type: 'loop';
  config: {
    items: string; // Variable name or array
    loopBody: string; // Node ID to execute for each item
    next: string; // Node ID after loop completes
  };
}

export interface WorkflowDelay extends WorkflowNode {
  type: 'delay';
  config: {
    duration: number; // milliseconds
    next: string;
  };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  customerId: string;
  enabled: boolean;
  nodes: WorkflowNode[];
  startNodeId: string;
  variables: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  currentNodeId?: string;
  variables: Record<string, any>;
  logs: WorkflowLog[];
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface WorkflowLog {
  timestamp: Date;
  nodeId: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

/**
 * Workflow Automation Engine
 */
export class WorkflowEngine {
  private executions = new Map<string, WorkflowExecution>();

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflow: Workflow, triggerData: Record<string, any> = {}): Promise<WorkflowExecution> {
    const execution: WorkflowExecution = {
      id: this.generateId(),
      workflowId: workflow.id,
      status: 'running',
      currentNodeId: workflow.startNodeId,
      variables: { ...workflow.variables, ...triggerData },
      logs: [],
      startedAt: new Date(),
    };

    this.executions.set(execution.id, execution);

    try {
      await this.executeNode(workflow, execution, workflow.startNodeId);
      execution.status = 'completed';
      execution.completedAt = new Date();
    } catch (error: any) {
      execution.status = 'failed';
      execution.error = error.message;
      execution.completedAt = new Date();
      this.log(execution, workflow.startNodeId, 'error', `Workflow failed: ${error.message}`);
    }

    return execution;
  }

  /**
   * Execute a single node
   */
  private async executeNode(workflow: Workflow, execution: WorkflowExecution, nodeId: string): Promise<void> {
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (!node) {
      throw new Error(`Node ${nodeId} not found`);
    }

    execution.currentNodeId = nodeId;
    this.log(execution, nodeId, 'info', `Executing node: ${node.type}`);

    switch (node.type) {
      case 'trigger':
        // Triggers are handled externally, just proceed to next
        if (node.next && typeof node.next === 'string') {
          await this.executeNode(workflow, execution, node.next);
        }
        break;

      case 'action':
        await this.executeAction(node as WorkflowAction, execution);
        if (node.next && typeof node.next === 'string') {
          await this.executeNode(workflow, execution, node.next);
        }
        break;

      case 'condition':
        const conditionNode = node as WorkflowCondition;
        const result = this.evaluateCondition(conditionNode.config.condition, execution.variables);
        const nextNodeId = result ? conditionNode.config.trueNext : conditionNode.config.falseNext;
        this.log(execution, nodeId, 'info', `Condition evaluated to: ${result}`);
        await this.executeNode(workflow, execution, nextNodeId);
        break;

      case 'loop':
        await this.executeLoop(workflow, node as WorkflowLoop, execution);
        break;

      case 'delay':
        const delayNode = node as WorkflowDelay;
        this.log(execution, nodeId, 'info', `Delaying for ${delayNode.config.duration}ms`);
        await new Promise(resolve => setTimeout(resolve, delayNode.config.duration));
        await this.executeNode(workflow, execution, delayNode.config.next);
        break;
    }
  }

  /**
   * Execute an action node
   */
  private async executeAction(node: WorkflowAction, execution: WorkflowExecution): Promise<void> {
    const { actionType, parameters } = node.config;

    // Replace variables in parameters
    const resolvedParams = this.resolveVariables(parameters, execution.variables);

    switch (actionType) {
      case 'send_email':
        await this.sendEmail(resolvedParams);
        break;

      case 'send_sms':
        await this.sendSMS(resolvedParams);
        break;

      case 'api_call':
        const response = await this.makeAPICall(resolvedParams);
        execution.variables[`${node.id}_response`] = response;
        break;

      case 'update_database':
        await this.updateDatabase(resolvedParams);
        break;

      case 'trigger_agent':
        await this.triggerAgent(resolvedParams);
        break;

      case 'create_task':
        await this.createTask(resolvedParams);
        break;

      case 'send_webhook':
        await this.sendWebhook(resolvedParams);
        break;

      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }

    this.log(execution, node.id, 'info', `Action ${actionType} completed`);
  }

  /**
   * Execute a loop node
   */
  private async executeLoop(workflow: Workflow, node: WorkflowLoop, execution: WorkflowExecution): Promise<void> {
    const items = execution.variables[node.config.items];
    if (!Array.isArray(items)) {
      throw new Error(`Loop items must be an array: ${node.config.items}`);
    }

    for (let i = 0; i < items.length; i++) {
      execution.variables.loopItem = items[i];
      execution.variables.loopIndex = i;
      await this.executeNode(workflow, execution, node.config.loopBody);
    }

    await this.executeNode(workflow, execution, node.config.next);
  }

  /**
   * Evaluate a condition
   */
  private evaluateCondition(condition: string, variables: Record<string, any>): boolean {
    try {
      // Create a safe evaluation context
      const func = new Function(...Object.keys(variables), `return ${condition};`);
      return func(...Object.values(variables));
    } catch (error) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  }

  /**
   * Resolve variables in parameters
   */
  private resolveVariables(params: any, variables: Record<string, any>): any {
    if (typeof params === 'string') {
      // Replace {{variable}} with actual value
      return params.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
        return variables[varName] !== undefined ? variables[varName] : `{{${varName}}}`;
      });
    }

    if (Array.isArray(params)) {
      return params.map(item => this.resolveVariables(item, variables));
    }

    if (typeof params === 'object' && params !== null) {
      const resolved: Record<string, any> = {};
      for (const [key, value] of Object.entries(params)) {
        resolved[key] = this.resolveVariables(value, variables);
      }
      return resolved;
    }

    return params;
  }

  /**
   * Action implementations
   */
  private async sendEmail(params: any): Promise<void> {
    console.log('Sending email:', params);
    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  }

  private async sendSMS(params: any): Promise<void> {
    console.log('Sending SMS:', params);
    // TODO: Integrate with SMS service (Twilio, etc.)
  }

  private async makeAPICall(params: any): Promise<any> {
    const { url, method = 'GET', headers = {}, body } = params;
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return await response.json();
  }

  private async updateDatabase(params: any): Promise<void> {
    console.log('Updating database:', params);
    // TODO: Implement database update logic
  }

  private async triggerAgent(params: any): Promise<void> {
    console.log('Triggering agent:', params);
    // TODO: Integrate with agent system
  }

  private async createTask(params: any): Promise<void> {
    console.log('Creating task:', params);
    // TODO: Implement task creation
  }

  private async sendWebhook(params: any): Promise<void> {
    const { url, payload } = params;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  /**
   * Logging
   */
  private log(execution: WorkflowExecution, nodeId: string, type: 'info' | 'warning' | 'error', message: string, data?: any): void {
    execution.logs.push({
      timestamp: new Date(),
      nodeId,
      type,
      message,
      data,
    });
  }

  /**
   * Get execution status
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * Cancel execution
   */
  cancelExecution(executionId: string): void {
    const execution = this.executions.get(executionId);
    if (execution && execution.status === 'running') {
      execution.status = 'cancelled';
      execution.completedAt = new Date();
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const workflowEngine = new WorkflowEngine();
