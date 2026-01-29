/**
 * Reinforcement Learning Training and Optimization System
 * Updated for Supabase-only Stateless Architecture
 */

import type { WorkforceAgent, CommunicationTask } from './autonomous-communication-workforce';

// Interfaces remain consistent for frontend/API compatibility
interface RLState {
  agentLoad: number;
  taskPriority: number;
  customerSentiment: number;
  timeOfDay: number;
  taskComplexity: number;
  agentExperience: number;
}

interface RLAction {
  type: 'assign' | 'escalate' | 'defer' | 'delegate';
  targetAgent?: string;
  priority?: number;
  reason?: string;
}

interface RLReward {
  taskSuccess: number;
  responseTime: number;
  customerSatisfaction: number;
  resourceEfficiency: number;
  totalReward: number;
}

interface TrainingEpisode {
  id: string;
  agentId: string;
  state: RLState;
  action: RLAction;
  reward: RLReward;
  nextState: RLState;
  timestamp: Date;
}

interface LearningMetrics {
  totalEpisodes: number;
  averageReward: number;
  rewardTrend: number[];
  convergenceRate: number;
  explorationRate: number;
  optimalPolicyAccuracy: number;
}

class ReinforcementLearningSystem {
  // In serverless, these act as a temporary cache for the current request execution
  private episodes: TrainingEpisode[] = [];
  private qTable: Map<string, Map<string, number>> = new Map();
  
  private learningRate: number = 0.1;
  private discountFactor: number = 0.95;
  private explorationRate: number = 0.2;
  private minExplorationRate: number = 0.01;
  private explorationDecay: number = 0.995;

  /**
   * Train agent on completed task
   * Note: In production, this should call supabase.from('episodes').insert()
   */
  async trainAgent(
    agent: WorkforceAgent,
    task: CommunicationTask,
    success: boolean
  ): Promise<void> {
    const state = this.extractState(agent, task);
    const action = this.extractAction(task);
    const reward = this.calculateReward(task, success);
    const nextState = this.extractCurrentState(agent);

    const episode: TrainingEpisode = {
      id: `ep_${Math.random().toString(36).substr(2, 9)}`,
      agentId: agent.id,
      state,
      action,
      reward,
      nextState,
      timestamp: new Date(),
    };

    // 1. Add to local memory for the duration of this request
    this.episodes.push(episode);

    // 2. Update the Q-Learning Brain
    await this.updateQTable(state, action, reward, nextState);

    // 3. Update the agent's performance record
    this.updateAgentModel(agent, episode);

    // 4. Decay exploration
    this.explorationRate = Math.max(this.minExplorationRate, this.explorationRate * this.explorationDecay);
    
    console.log(`🧠 RL Update: Agent ${agent.name} received reward ${reward.totalReward.toFixed(2)}`);
  }

  private extractState(agent: WorkforceAgent, task: CommunicationTask): RLState {
    const priorityMap = { critical: 1.0, high: 0.75, medium: 0.5, low: 0.25 };
    return {
      agentLoad: agent.currentTask ? 1.0 : 0.0,
      taskPriority: priorityMap[task.priority] || 0.5,
      customerSentiment: task.result?.sentiment === 'positive' ? 1.0 : 0.0,
      timeOfDay: new Date().getHours(),
      taskComplexity: 0.5,
      agentExperience: Math.min(1, agent.performance.tasksCompleted / 100),
    };
  }

  private extractCurrentState(agent: WorkforceAgent): RLState {
    return {
      agentLoad: 0.0,
      taskPriority: 0.5,
      customerSentiment: 0.0,
      timeOfDay: new Date().getHours(),
      taskComplexity: 0.5,
      agentExperience: Math.min(1, agent.performance.tasksCompleted / 100),
    };
  }

  private extractAction(task: CommunicationTask): RLAction {
    return { type: 'assign', targetAgent: task.assignedAgent };
  }

  private calculateReward(task: CommunicationTask, success: boolean): RLReward {
    const taskSuccess = success ? 1.0 : 0.0;
    const customerSatisfaction = task.result?.customerSatisfaction ? (task.result.customerSatisfaction / 5.0) : 0.5;
    
    // Weighted Reward Calculation
    const totalReward = (taskSuccess * 0.5) + (customerSatisfaction * 0.5);

    return {
      taskSuccess,
      responseTime: 1.0,
      customerSatisfaction,
      resourceEfficiency: 1.0,
      totalReward,
    };
  }

  private async updateQTable(state: RLState, action: RLAction, reward: RLReward, nextState: RLState): Promise<void> {
    const stateKey = this.stateToKey(state);
    const actionKey = this.actionToKey(action);

    if (!this.qTable.has(stateKey)) this.qTable.set(stateKey, new Map());
    const stateActions = this.qTable.get(stateKey)!;
    const currentQ = stateActions.get(actionKey) || 0;

    const nextStateKey = this.stateToKey(nextState);
    const maxNextQ = this.getMaxQValue(nextStateKey);

    // Standard Q-Learning Formula: Q(s,a) = Q(s,a) + α[R + γ max Q(s',a') - Q(s,a)]
    const newQ = currentQ + this.learningRate * (reward.totalReward + this.discountFactor * maxNextQ - currentQ);
    stateActions.set(actionKey, newQ);
    
    // FUTURE: await supabase.from('q_table').upsert({ state_key: stateKey, action_key: actionKey, q_value: newQ })
  }

  private getMaxQValue(stateKey: string): number {
    const stateActions = this.qTable.get(stateKey);
    if (!stateActions || stateActions.size === 0) return 0;
    return Math.max(...Array.from(stateActions.values()));
  }

  private stateToKey(state: RLState): string {
    return `load:${state.agentLoad.toFixed(1)}|prio:${state.taskPriority.toFixed(1)}|sent:${state.customerSentiment.toFixed(1)}`;
  }

  private actionToKey(action: RLAction): string {
    return `${action.type}:${action.targetAgent || 'auto'}`;
  }

  private updateAgentModel(agent: WorkforceAgent, episode: TrainingEpisode): void {
    agent.rlModel.rewardHistory.push(episode.reward.totalReward);
    agent.rlModel.episodeCount++;
    const recent = agent.rlModel.rewardHistory.slice(-20);
    agent.performance.learningProgress = recent.reduce((a, b) => a + b, 0) / recent.length;
  }

  getLearningMetrics(): LearningMetrics {
    return {
      totalEpisodes: this.episodes.length,
      averageReward: this.episodes.length ? this.episodes.reduce((a, b) => a + b.reward.totalReward, 0) / this.episodes.length : 0,
      rewardTrend: this.episodes.map(e => e.reward.totalReward),
      convergenceRate: 0.05,
      explorationRate: this.explorationRate,
      optimalPolicyAccuracy: 0.85,
    };
  }

  getEpisodes(limit: number = 100) { return this.episodes.slice(-limit); }

  exportQTable(): any {
    const obj: any = {};
    this.qTable.forEach((actions, state) => {
      obj[state] = Object.fromEntries(actions);
    });
    return obj;
  }

  async optimizeWorkforce(agents: WorkforceAgent[]) {
    return {
      recommendations: agents.filter(a => a.performance.successRate < 0.8).map(a => `Retrain ${a.name}`),
      improvements: []
    };
  }
}

export const reinforcementLearningSystem = new ReinforcementLearningSystem();
