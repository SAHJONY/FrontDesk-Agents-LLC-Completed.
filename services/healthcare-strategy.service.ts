// services/healthcare-strategy.service.ts
import { aiCeoAgent } from './automation.service';

export const healthcareStrategy = {
  /**
   * Processes the outcome of a medical interaction and triggers the RL reward
   */
  async optimizeOutcome(outcome: { type: string; interactionId: string; details: any }) {
    let rewardValue = 0;

    switch (outcome.type) {
      case 'APPOINTMENT_BOOKED':
        rewardValue = 50;
        break;
      case 'PAYMENT_RECEIVED':
        rewardValue = 30;
        break;
      case 'NEGATIVE_SENTIMENT':
        rewardValue = -100;
        break;
      default:
        rewardValue = 1;
    }

    // Register the reward with the AI CEO to refine global policies
    return await aiCeoAgent.registerReward(outcome.interactionId, rewardValue);
  }
};
