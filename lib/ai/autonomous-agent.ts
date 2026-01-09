/**
 * Autonomous AI Agent Framework
 * 
 * Self-learning agents that improve through reinforcement learning,
 * continuous feedback, and performance optimization.
 */

import { OpenAI } from 'openai';
import { getSupabaseServer } from '@/lib/supabase-server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Lazy initialization of Supabase client
let supabaseClient: ReturnType<typeof getSupabaseServer> | null = null;
function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = getSupabaseServer();
  }
  return supabaseClient;
}

export interface AgentMemory {
  id: string;
  agentId: string;
  conversationId: string;
  input: string;
  output: string;
  feedback: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface AgentKnowledge {
  id: string;
  agentId: string;
  topic: string;
  content: string;
  confidence: number;
  sources: string[];
  lastUpdated: Date;
}

export interface LearningMetrics {
  successRate: number;
  averageConfidence: number;
  totalInteractions: number;
  positiveFeedback: number;
  negativeFeedback: number;
  improvementRate: number;
}

export class AutonomousAgent {
  private agentId: string;
  private memory: AgentMemory[] = [];
  private knowledge: Map<string, AgentKnowledge> = new Map();
  private learningRate: number = 0.1;
  
  constructor(agentId: string) {
    this.agentId = agentId;
  }

  /**
   * Initialize agent by loading memory and knowledge from database
   */
  async initialize(): Promise<void> {
    await this.loadMemory();
    await this.loadKnowledge();
  }

  /**
   * Process input and generate response with learning
   */
  async process(input: string, context: Record<string, any> = {}): Promise<{
    response: string;
    confidence: number;
    reasoning: string;
  }> {
    // Retrieve relevant memories
    const relevantMemories = await this.retrieveRelevantMemories(input);
    
    // Retrieve relevant knowledge
    const relevantKnowledge = await this.retrieveRelevantKnowledge(input);
    
    // Build enhanced prompt with memory and knowledge
    const enhancedPrompt = this.buildEnhancedPrompt(
      input,
      context,
      relevantMemories,
      relevantKnowledge
    );
    
    // Generate response using GPT-4
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt(),
        },
        {
          role: 'user',
          content: enhancedPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content || '';
    
    // Calculate confidence based on response quality and past performance
    const confidence = await this.calculateConfidence(input, response);
    
    // Extract reasoning
    const reasoning = await this.extractReasoning(input, response);
    
    // Store interaction in memory
    await this.storeMemory({
      id: crypto.randomUUID(),
      agentId: this.agentId,
      conversationId: context.conversationId || crypto.randomUUID(),
      input,
      output: response,
      feedback: 'neutral',
      timestamp: new Date(),
      metadata: { confidence, reasoning, context },
    });
    
    return { response, confidence, reasoning };
  }

  /**
   * Learn from feedback to improve future responses
   */
  async learn(memoryId: string, feedback: 'positive' | 'negative', details?: string): Promise<void> {
    // Update memory with feedback
    const { data: memory } = await supabase
      .from('agent_memory')
      .update({ feedback, feedback_details: details })
      .eq('id', memoryId)
      .select()
      .single();

    if (!memory) return;

    // Extract learnings from feedback
    if (feedback === 'positive') {
      // Reinforce successful patterns
      await this.reinforcePattern(memory);
    } else if (feedback === 'negative') {
      // Learn from mistakes
      await this.learnFromMistake(memory, details);
    }

    // Update learning metrics
    await this.updateLearningMetrics();
  }

  /**
   * Retrieve relevant memories using semantic search
   */
  private async retrieveRelevantMemories(query: string, limit: number = 5): Promise<AgentMemory[]> {
    // Generate embedding for query
    const embedding = await this.generateEmbedding(query);
    
    // Search for similar memories using vector similarity
    const { data: memories } = await getSupabase()!.rpc('match_agent_memories', {
      agent_id: this.agentId,
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
    });

    return memories || [];
  }

  /**
   * Retrieve relevant knowledge using semantic search
   */
  private async retrieveRelevantKnowledge(query: string, limit: number = 3): Promise<AgentKnowledge[]> {
    const embedding = await this.generateEmbedding(query);
    
    const { data: knowledge } = await getSupabase()!.rpc('match_agent_knowledge', {
      agent_id: this.agentId,
      query_embedding: embedding,
      match_threshold: 0.75,
      match_count: limit,
    });

    return knowledge || [];
  }

  /**
   * Build enhanced prompt with context, memory, and knowledge
   */
  private buildEnhancedPrompt(
    input: string,
    context: Record<string, any>,
    memories: AgentMemory[],
    knowledge: AgentKnowledge[]
  ): string {
    let prompt = `Current Input: ${input}\n\n`;

    if (Object.keys(context).length > 0) {
      prompt += `Context:\n${JSON.stringify(context, null, 2)}\n\n`;
    }

    if (memories.length > 0) {
      prompt += `Relevant Past Interactions:\n`;
      memories.forEach((mem, idx) => {
        prompt += `${idx + 1}. Input: "${mem.input}" → Output: "${mem.output}" (Feedback: ${mem.feedback})\n`;
      });
      prompt += '\n';
    }

    if (knowledge.length > 0) {
      prompt += `Relevant Knowledge:\n`;
      knowledge.forEach((k, idx) => {
        prompt += `${idx + 1}. ${k.topic}: ${k.content} (Confidence: ${k.confidence})\n`;
      });
      prompt += '\n';
    }

    prompt += `Based on the above context, memories, and knowledge, provide the best possible response.`;

    return prompt;
  }

  /**
   * Calculate confidence score for response
   */
  private async calculateConfidence(input: string, response: string): Promise<number> {
    // Get agent's historical performance
    const metrics = await this.getLearningMetrics();
    
    // Base confidence on success rate
    let confidence = metrics.successRate;
    
    // Adjust based on response length and coherence
    if (response.length < 20) confidence *= 0.8;
    if (response.length > 500) confidence *= 0.9;
    
    // Adjust based on similar past interactions
    const similarMemories = await this.retrieveRelevantMemories(input, 3);
    const positiveMemories = similarMemories.filter(m => m.feedback === 'positive').length;
    const totalMemories = similarMemories.length;
    
    if (totalMemories > 0) {
      const historicalSuccess = positiveMemories / totalMemories;
      confidence = (confidence + historicalSuccess) / 2;
    }
    
    return Math.min(Math.max(confidence, 0), 1);
  }

  /**
   * Extract reasoning for the response
   */
  private async extractReasoning(input: string, response: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an AI reasoning analyzer. Explain the reasoning behind responses concisely.',
        },
        {
          role: 'user',
          content: `Input: "${input}"\nResponse: "${response}"\n\nExplain the reasoning behind this response in 1-2 sentences.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 150,
    });

    return completion.choices[0].message.content || 'No reasoning available';
  }

  /**
   * Reinforce successful patterns
   */
  private async reinforcePattern(memory: AgentMemory): Promise<void> {
    // Extract key patterns from successful interaction
    const patterns = await this.extractPatterns(memory);
    
    // Store as knowledge
    for (const pattern of patterns) {
      await this.addKnowledge({
        id: crypto.randomUUID(),
        agentId: this.agentId,
        topic: pattern.topic,
        content: pattern.content,
        confidence: Math.min((pattern.confidence || 0.5) + this.learningRate, 1),
        sources: [memory.id],
        lastUpdated: new Date(),
      });
    }
  }

  /**
   * Learn from mistakes
   */
  private async learnFromMistake(memory: AgentMemory, details?: string): Promise<void> {
    // Analyze what went wrong
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an AI learning system. Analyze mistakes and suggest improvements.',
        },
        {
          role: 'user',
          content: `Input: "${memory.input}"\nResponse: "${memory.output}"\nFeedback: Negative\nDetails: ${details || 'No details provided'}\n\nWhat went wrong and how can this be improved?`,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const improvement = analysis.choices[0].message.content || '';
    
    // Store as negative knowledge (what to avoid)
    await getSupabase()!.from('agent_learnings').insert({
      agent_id: this.agentId,
      type: 'mistake',
      input: memory.input,
      output: memory.output,
      analysis: improvement,
      created_at: new Date().toISOString(),
    });
  }

  /**
   * Extract patterns from successful interactions
   */
  private async extractPatterns(memory: AgentMemory): Promise<Array<{
    topic: string;
    content: string;
    confidence: number;
  }>> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Extract key patterns and learnings from successful interactions. Return as JSON array.',
        },
        {
          role: 'user',
          content: `Input: "${memory.input}"\nOutput: "${memory.output}"\n\nExtract patterns in format: [{"topic": "...", "content": "...", "confidence": 0.8}]`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    try {
      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.patterns || [];
    } catch {
      return [];
    }
  }

  /**
   * Generate embedding for semantic search
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  /**
   * Store memory in database
   */
  private async storeMemory(memory: AgentMemory): Promise<void> {
    const embedding = await this.generateEmbedding(memory.input + ' ' + memory.output);
    
    await getSupabase()!.from('agent_memory').insert({
      id: memory.id,
      agent_id: memory.agentId,
      conversation_id: memory.conversationId,
      input: memory.input,
      output: memory.output,
      feedback: memory.feedback,
      embedding,
      metadata: memory.metadata,
      created_at: memory.timestamp.toISOString(),
    });
  }

  /**
   * Add knowledge to knowledge base
   */
  private async addKnowledge(knowledge: AgentKnowledge): Promise<void> {
    const embedding = await this.generateEmbedding(knowledge.topic + ' ' + knowledge.content);
    
    await getSupabase()!.from('agent_knowledge').upsert({
      id: knowledge.id,
      agent_id: knowledge.agentId,
      topic: knowledge.topic,
      content: knowledge.content,
      confidence: knowledge.confidence,
      sources: knowledge.sources,
      embedding,
      last_updated: knowledge.lastUpdated.toISOString(),
    });
  }

  /**
   * Load memory from database
   */
  private async loadMemory(): Promise<void> {
    const { data: memories } = await supabase
      .from('agent_memory')
      .select('*')
      .eq('agent_id', this.agentId)
      .order('created_at', { ascending: false })
      .limit(100);

    this.memory = memories || [];
  }

  /**
   * Load knowledge from database
   */
  private async loadKnowledge(): Promise<void> {
    const { data: knowledge } = await supabase
      .from('agent_knowledge')
      .select('*')
      .eq('agent_id', this.agentId);

    if (knowledge) {
      knowledge.forEach(k => {
        this.knowledge.set(k.id, k);
      });
    }
  }

  /**
   * Get learning metrics
   */
  private async getLearningMetrics(): Promise<LearningMetrics> {
    const { data } = await getSupabase()!.rpc('get_agent_learning_metrics', {
      agent_id: this.agentId,
    });

    return data || {
      successRate: 0.5,
      averageConfidence: 0.5,
      totalInteractions: 0,
      positiveFeedback: 0,
      negativeFeedback: 0,
      improvementRate: 0,
    };
  }

  /**
   * Update learning metrics
   */
  private async updateLearningMetrics(): Promise<void> {
    await getSupabase()!.rpc('update_agent_learning_metrics', {
      agent_id: this.agentId,
    });
  }

  /**
   * Get system prompt for agent
   */
  private getSystemPrompt(): string {
    return `You are an autonomous AI agent with learning capabilities. You improve over time through feedback and experience.

Your capabilities:
- Learn from past interactions
- Adapt responses based on feedback
- Build and utilize knowledge base
- Provide confident, helpful responses
- Explain your reasoning

Always:
- Be helpful and professional
- Admit when uncertain
- Learn from mistakes
- Improve continuously`;
  }
}

/**
 * Agent Manager for coordinating multiple autonomous agents
 */
export class AgentManager {
  private agents: Map<string, AutonomousAgent> = new Map();

  /**
   * Get or create agent instance
   */
  async getAgent(agentId: string): Promise<AutonomousAgent> {
    if (!this.agents.has(agentId)) {
      const agent = new AutonomousAgent(agentId);
      await agent.initialize();
      this.agents.set(agentId, agent);
    }

    return this.agents.get(agentId)!;
  }

  /**
   * Process input with specific agent
   */
  async processWithAgent(
    agentId: string,
    input: string,
    context?: Record<string, any>
  ): Promise<{
    response: string;
    confidence: number;
    reasoning: string;
  }> {
    const agent = await this.getAgent(agentId);
    return agent.process(input, context);
  }

  /**
   * Provide feedback to agent
   */
  async provideFeedback(
    agentId: string,
    memoryId: string,
    feedback: 'positive' | 'negative',
    details?: string
  ): Promise<void> {
    const agent = await this.getAgent(agentId);
    await agent.learn(memoryId, feedback, details);
  }
}

// Export singleton instance
export const agentManager = new AgentManager();
