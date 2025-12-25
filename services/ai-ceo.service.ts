// services/ai-ceo.service.ts
import { createClient } from '@/lib/supabase'; // Import the new async client
import { automationService } from './automation.service';

export const aiCeoAgent = {
  // Orchestrate any of the 15 products via a single entry point
  async dispatch(task: { productId: string; data: any }) {
    console.log(`[CEO] Strategic dispatch for ${task.productId}`);
    
    // 1. Retrieve historical RL 'Rewards'
    const weights = await this.getAgentWeights(task.productId);

    // 2. Select the optimal VP Agent
    const result = await this.executeStrategy(task.productId, weights, task.data);

    return result;
  },

  async getAgentWeights(productId: string) {
    // FIX: Await the client creation for Next.js 15
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('agent_performance_weights')
      .select('*')
      .eq('product_id', productId)
      .single();

    if (error) {
      console.warn(`[CEO] No specific weights found for ${productId}, using defaults.`);
      return { sales: 0.33, finance: 0.33, ops: 0.34 };
    }

    return data.weights;
  },

  private async executeStrategy(productId: string, weights: any, data: any) {
    // Strategy selection logic here
    return { status: 'success', message: `Strategy executed for ${productId}` };
  }
};
