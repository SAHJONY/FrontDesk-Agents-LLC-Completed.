/**
 * Multi-Agent Orchestration Framework
 * 
 * Coordinates multiple AI agents to work together on complex tasks,
 * enabling collaboration, knowledge sharing, and task delegation.
 */

import { OpenAI } from 'openai';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  return openaiClient;
}
import { agentManager, AutonomousAgent } from './autonomous-agent';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  return openaiClient;
}

let supabaseClient: ReturnType<typeof getSupabaseServer> | null = null;
function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = getSupabaseServer();
  }
  return supabaseClient;
}
import { getSupabaseServer } from '@/lib/supabase-server';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  return openaiClient;
}

  apiKey: process.env.OPENAI_API_KEY,
});


export interface Task {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedAgentId?: string;
  dependencies: string[];
  result?: any;
  metadata: Record<string, any>;
}

export interface AgentCapability {
  agentId: string;
  capabilities: string[];
  availability: 'available' | 'busy' | 'offline';
  performanceScore: number;
  specializations: string[];
}

export interface CollaborationSession {
  id: string;
  goal: string;
  participants: string[];
  tasks: Task[];
  sharedContext: Record<string, any>;
  status: 'active' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
}

/**
 * Multi-Agent Orchestrator
 * Coordinates multiple agents to work together on complex tasks
 */
export class MultiAgentOrchestrator {
  private sessions: Map<string, CollaborationSession> = new Map();
  private agentCapabilities: Map<string, AgentCapability> = new Map();

  /**
   * Create a new collaboration session
   */
  async createSession(goal: string, participantIds: string[]): Promise<CollaborationSession> {
    const session: CollaborationSession = {
      id: crypto.randomUUID(),
      goal,
      participants: participantIds,
      tasks: [],
      sharedContext: {},
      status: 'active',
      startTime: new Date(),
    };

    this.sessions.set(session.id, session);

    // Store in database
    await getSupabase()!.from('collaboration_sessions').insert({
      id: session.id,
      goal: session.goal,
      participants: session.participants,
      status: session.status,
      shared_context: session.sharedContext,
      created_at: session.startTime.toISOString(),
    });

    return session;
  }

  /**
   * Execute a complex goal by breaking it down and coordinating agents
   */
  async executeGoal(
    goal: string,
    participantIds: string[],
    context: Record<string, any> = {}
  ): Promise<{
    success: boolean;
    result: any;
    tasks: Task[];
    insights: string[];
  }> {
    // Create collaboration session
    const session = await this.createSession(goal, participantIds);
    session.sharedContext = context;

    try {
      // Step 1: Decompose goal into tasks
      const tasks = await this.decomposeGoal(goal, context);
      session.tasks = tasks;

      // Step 2: Assign tasks to agents based on capabilities
      await this.assignTasks(session);

      // Step 3: Execute tasks in dependency order
      const results = await this.executeTasks(session);

      // Step 4: Synthesize results
      const finalResult = await this.synthesizeResults(session, results);

      // Step 5: Extract insights
      const insights = await this.extractInsights(session, results);

      // Mark session as completed
      session.status = 'completed';
      session.endTime = new Date();

      await this.updateSession(session);

      return {
        success: true,
        result: finalResult,
        tasks: session.tasks,
        insights,
      };
    } catch (error: any) {
      session.status = 'failed';
      session.endTime = new Date();
      await this.updateSession(session);

      throw error;
    }
  }

  /**
   * Decompose complex goal into manageable tasks
   */
  private async decomposeGoal(goal: string, context: Record<string, any>): Promise<Task[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a task decomposition expert. Break down complex goals into specific, actionable tasks.
          
Consider:
- Task dependencies (what must be done first)
- Task priority (critical, high, medium, low)
- Required capabilities for each task
- Estimated complexity

Return tasks as JSON array.`,
        },
        {
          role: 'user',
          content: `Goal: ${goal}\n\nContext: ${JSON.stringify(context)}\n\nDecompose this goal into specific tasks. Format: [{"description": "...", "priority": "high", "dependencies": [], "requiredCapabilities": ["..."]}]`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    const taskDefinitions = response.tasks || [];

    return taskDefinitions.map((def: any, index: number) => ({
      id: `task-${index + 1}`,
      description: def.description,
      priority: def.priority || 'medium',
      status: 'pending',
      dependencies: def.dependencies || [],
      metadata: {
        requiredCapabilities: def.requiredCapabilities || [],
        estimatedComplexity: def.estimatedComplexity || 'medium',
      },
    }));
  }

  /**
   * Assign tasks to agents based on capabilities and availability
   */
  private async assignTasks(session: CollaborationSession): Promise<void> {
    // Get agent capabilities
    for (const agentId of session.participants) {
      if (!this.agentCapabilities.has(agentId)) {
        const capabilities = await this.getAgentCapabilities(agentId);
        this.agentCapabilities.set(agentId, capabilities);
      }
    }

    // Assign each task to the best available agent
    for (const task of session.tasks) {
      const bestAgent = this.findBestAgentForTask(task, session.participants);
      task.assignedAgentId = bestAgent;
      task.status = 'pending';

      // Store task assignment
      await getSupabase()!.from('collaboration_tasks').insert({
        id: task.id,
        session_id: session.id,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assigned_agent_id: task.assignedAgentId,
        dependencies: task.dependencies,
        metadata: task.metadata,
      });
    }
  }

  /**
   * Execute tasks in dependency order
   */
  private async executeTasks(session: CollaborationSession): Promise<Map<string, any>> {
    const results = new Map<string, any>();
    const completedTasks = new Set<string>();

    // Keep executing until all tasks are done
    while (completedTasks.size < session.tasks.length) {
      // Find tasks ready to execute (dependencies met)
      const readyTasks = session.tasks.filter(
        task =>
          !completedTasks.has(task.id) &&
          task.dependencies.every(dep => completedTasks.has(dep))
      );

      if (readyTasks.length === 0) {
        throw new Error('Circular dependency detected or no tasks ready');
      }

      // Execute ready tasks in parallel
      const taskPromises = readyTasks.map(task => this.executeTask(task, session, results));
      const taskResults = await Promise.all(taskPromises);

      // Store results
      taskResults.forEach((result, index) => {
        const task = readyTasks[index];
        results.set(task.id, result);
        completedTasks.add(task.id);
        task.status = 'completed';
        task.result = result;
      });
    }

    return results;
  }

  /**
   * Execute a single task
   */
  private async executeTask(
    task: Task,
    session: CollaborationSession,
    previousResults: Map<string, any>
  ): Promise<any> {
    if (!task.assignedAgentId) {
      throw new Error(`Task ${task.id} has no assigned agent`);
    }

    // Update task status
    task.status = 'in_progress';
    await this.updateTask(task, session.id);

    // Build context with previous results
    const taskContext = {
      ...session.sharedContext,
      previousResults: Object.fromEntries(
        task.dependencies.map(dep => [dep, previousResults.get(dep)])
      ),
    };

    // Execute with assigned agent
    const agent = await agentManager.getAgent(task.assignedAgentId);
    const result = await agent.process(task.description, taskContext);

    // Update task with result
    task.result = result;
    task.status = 'completed';
    await this.updateTask(task, session.id);

    return result;
  }

  /**
   * Synthesize results from all tasks
   */
  private async synthesizeResults(
    session: CollaborationSession,
    results: Map<string, any>
  ): Promise<any> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a results synthesizer. Combine multiple task results into a coherent final result.',
        },
        {
          role: 'user',
          content: `Goal: ${session.goal}\n\nTask Results:\n${JSON.stringify(Object.fromEntries(results), null, 2)}\n\nSynthesize these results into a final answer that achieves the goal.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    return completion.choices[0].message.content;
  }

  /**
   * Extract insights from collaboration
   */
  private async extractInsights(
    session: CollaborationSession,
    results: Map<string, any>
  ): Promise<string[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Extract key insights and learnings from a multi-agent collaboration session.',
        },
        {
          role: 'user',
          content: `Goal: ${session.goal}\n\nTasks: ${JSON.stringify(session.tasks)}\n\nResults: ${JSON.stringify(Object.fromEntries(results))}\n\nExtract 3-5 key insights as JSON array of strings.`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response.insights || [];
  }

  /**
   * Get agent capabilities
   */
  private async getAgentCapabilities(agentId: string): Promise<AgentCapability> {
    // Get agent details
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    // Get performance metrics
    const { data: metrics } = await getSupabase()!.rpc('get_agent_learning_metrics', {
      agent_id: agentId,
    });

    return {
      agentId,
      capabilities: agent.capabilities || [],
      availability: agent.status === 'active' ? 'available' : 'offline',
      performanceScore: metrics?.success_rate || 0.5,
      specializations: agent.specializations || [],
    };
  }

  /**
   * Find best agent for task
   */
  private findBestAgentForTask(task: Task, participantIds: string[]): string {
    const requiredCapabilities = task.metadata.requiredCapabilities || [];
    
    let bestAgent = participantIds[0];
    let bestScore = -1;

    for (const agentId of participantIds) {
      const capabilities = this.agentCapabilities.get(agentId);
      if (!capabilities || capabilities.availability !== 'available') continue;

      // Calculate match score
      let score = capabilities.performanceScore;

      // Bonus for matching capabilities
      const matchingCapabilities = requiredCapabilities.filter((cap: string) =>
        capabilities.capabilities.includes(cap)
      );
      score += matchingCapabilities.length * 0.2;

      // Bonus for specializations
      const matchingSpecializations = requiredCapabilities.filter((cap: string) =>
        capabilities.specializations.includes(cap)
      );
      score += matchingSpecializations.length * 0.3;

      if (score > bestScore) {
        bestScore = score;
        bestAgent = agentId;
      }
    }

    return bestAgent;
  }

  /**
   * Update session in database
   */
  private async updateSession(session: CollaborationSession): Promise<void> {
    await supabase
      .from('collaboration_sessions')
      .update({
        status: session.status,
        shared_context: session.sharedContext,
        completed_at: session.endTime?.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.id);
  }

  /**
   * Update task in database
   */
  private async updateTask(task: Task, sessionId: string): Promise<void> {
    await supabase
      .from('collaboration_tasks')
      .update({
        status: task.status,
        result: task.result,
        updated_at: new Date().toISOString(),
      })
      .eq('id', task.id)
      .eq('session_id', sessionId);
  }

  /**
   * Enable knowledge sharing between agents
   */
  async shareKnowledge(
    sourceAgentId: string,
    targetAgentIds: string[],
    topic: string
  ): Promise<void> {
    // Get knowledge from source agent
    const { data: knowledge } = await supabase
      .from('agent_knowledge')
      .select('*')
      .eq('agent_id', sourceAgentId)
      .ilike('topic', `%${topic}%`)
      .order('confidence', { ascending: false })
      .limit(10);

    if (!knowledge || knowledge.length === 0) return;

    // Share with target agents
    for (const targetAgentId of targetAgentIds) {
      for (const k of knowledge) {
        await getSupabase()!.from('agent_knowledge').insert({
          id: crypto.randomUUID(),
          agent_id: targetAgentId,
          topic: k.topic,
          content: k.content,
          confidence: k.confidence * 0.8, // Reduce confidence for shared knowledge
          sources: [...k.sources, `shared_from:${sourceAgentId}`],
          embedding: k.embedding,
          last_updated: new Date().toISOString(),
        });
      }
    }
  }

  /**
   * Get session status
   */
  async getSessionStatus(sessionId: string): Promise<CollaborationSession | null> {
    return this.sessions.get(sessionId) || null;
  }
}

// Export singleton instance
export const orchestrator = new MultiAgentOrchestrator();
