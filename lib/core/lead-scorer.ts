/**
 * FRONTDESK AGENTS - NEURAL LEAD SCORING ENGINE
 * Ranks prospects based on multi-channel engagement signals.
 */

export function calculateLeadScore(signals: {
  sentiment: 'Hot 🔥' | 'Warm' | 'Cold';
  channelCount: number;
  interactionDuration: number;
}) {
  let score = 0;

  // Signal Weighting
  if (signals.sentiment === 'Hot 🔥') score += 50;
  score += (signals.channelCount * 10); // Multi-channel engagement
  score += Math.min(signals.interactionDuration / 60, 20); // Engagement depth

  return {
    score,
    priority: score > 70 ? 'CRITICAL' : score > 40 ? 'HIGH' : 'STANDARD'
  };
}
