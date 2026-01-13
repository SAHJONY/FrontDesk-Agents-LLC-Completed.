// services/ai-ceo.service.ts
import { createServerClient as createClient } from '@/lib/supabase/server';
import automationService from './automation.service';

export const aiCeoAgent = {
  /**
   * Orchestrate any of the 15 products via a single entry point.
   * Now enhanced with Episodic Memory and RL-based decision making.
   */
  async dispatch(task: { 
    productId: string; 
    leadId: string; 
    data: any; 
    embedding?: number[] // Optional vector for semantic recall
  }) {
    console.log(`[CEO] Strategic dispatch for ${task.productId} - Lead: ${task.leadId}`);
    
    // 1. RECALL: Retrieve relevant past experiences if embedding is provided
    let historicalContext = null;
    if (task.embedding) {
      historicalContext = await this.recallPastSuccess(task.embedding);
    }

    // 2. ANALYZE: Retrieve RL Weights for the specific product/market
    const weights = await this.getAgentWeights(task.productId);

    // 3. EXECUTE: Select the optimal strategy based on Weights + Memory
    const result = await this.executeStrategy(
      task.productId, 
      weights, 
      task.data, 
      historicalContext
    );

    return result;
  },

  /**
   * Uses the pgvector RPC to find the most successful past interactions.
   */
  async recallPastSuccess(embedding: number[]) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('match_episodic_memories', {
      query_embedding: embedding,
      match_threshold: 0.82, // Only recall high-confidence matches
      match_count: 3
    });

    if (error || !data) return null;

    // Filter for the memory with the highest reward (The "Winner")
    return data.reduce((prev: any, current: any) => 
      (prev.reward_total > current.reward_total) ? prev : current
    , data[0]);
  },

  async getAgentWeights(productId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agent_performance_weights')
      .select('*')
      .eq('product_id', productId)
      .single();

    if (error) {
      console.warn(`[CEO] Using default RL weights for ${productId}.`);
      return { sales: 0.33, finance: 0.33, ops: 0.34 };
    }

    return data.weights;
  },

  /**
   * Final decision engine.
   * If a historical success is found, it overrides or shifts the weights.
   */
  async executeStrategy(productId: string, weights: any, data: any, memory: any = null) {
    if (memory && memory.reward_total > 0) {
      console.log(`[CEO] Anchoring strategy to past success: ${memory.id}`);
      // Logic to bias the execution towards the successful past strategy
    }

    // Connect to your automation infrastructure
    const result = await automationService.orchestrate({
      productId: productId,
      type: 'EXECUTE_STRATEGY', // Placeholder type
      data: {
        ...data,
        weights,
        strategy_anchor: memory?.id
      }
    });

    return result;
  }
};
