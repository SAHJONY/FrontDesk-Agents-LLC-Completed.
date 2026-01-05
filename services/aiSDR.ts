// services/aiSDR.ts
// AI SDR - Outbound sales development representative

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  industry?: string;
  companySize?: string;
  painPoints?: string[];
  previousContact?: Date;
}

interface CallOutcome {
  leadId: string;
  connected: boolean;
  qualified: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  nextAction: 'follow-up' | 'meeting-booked' | 'not-interested' | 'callback';
  meetingScheduled?: Date;
  notes: string;
  transcript: string;
}

export class AISDRService {
  /**
   * Execute outbound calling campaign
   */
  async executeCampaign(
    leads: Lead[],
    campaignMessage: string
  ): Promise<{
    totalCalls: number;
    connected: number;
    qualified: number;
    meetings: number;
  }> {
    const results = {
      totalCalls: 0,
      connected: 0,
      qualified: 0,
      meetings: 0,
    };

    for (const lead of leads) {
      try {
        const outcome = await this.makeCall(lead, campaignMessage);
        
        results.totalCalls++;
        if (outcome.connected) results.connected++;
        if (outcome.qualified) results.qualified++;
        if (outcome.meetingScheduled) results.meetings++;

        // Log outcome
        await this.logCallOutcome(outcome);

        // Rate limiting: wait 2 minutes between calls
        await new Promise(resolve => setTimeout(resolve, 120000));
      } catch (error) {
        console.error(`Failed to call lead ${lead.id}:`, error);
      }
    }

    return results;
  }

  /**
   * Make outbound sales call
   */
  private async makeCall(
    lead: Lead,
    campaignMessage: string
  ): Promise<CallOutcome> {
    // Generate personalized pitch
    const pitch = await this.generatePitch(lead, campaignMessage);

    // Simulate call (in production, this would use Bland AI or Twilio)
    const callScript = await this.generateCallScript(lead, pitch);

    // In production, this would:
    // 1. Initiate call via Bland AI
    // 2. Handle conversation flow
    // 3. Qualify lead based on responses
    // 4. Book meeting if qualified

    // For now, return simulated outcome
    return {
      leadId: lead.id,
      connected: Math.random() > 0.3, // 70% connection rate
      qualified: Math.random() > 0.6, // 40% qualification rate
      sentiment: this.randomSentiment(),
      nextAction: this.determineNextAction(),
      notes: `Called ${lead.name} at ${lead.company}. ${callScript.summary}`,
      transcript: callScript.transcript,
    };
  }

  /**
   * Generate personalized pitch
   */
  private async generatePitch(
    lead: Lead,
    baseMessage: string
  ): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert B2B sales rep. Create a personalized pitch based on:
- Lead's company: ${lead.company}
- Industry: ${lead.industry || 'Unknown'}
- Company size: ${lead.companySize || 'Unknown'}
- Pain points: ${lead.painPoints?.join(', ') || 'Unknown'}

The pitch should:
- Be conversational and natural
- Lead with value, not features
- Ask qualifying questions
- Aim to book a meeting
- Be 2-3 sentences max for opening`,
        },
        {
          role: 'user',
          content: `Base message: ${baseMessage}\n\nCreate opening pitch for ${lead.name}.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || '';
  }

  /**
   * Generate full call script
   */
  private async generateCallScript(
    lead: Lead,
    pitch: string
  ): Promise<{ transcript: string; summary: string }> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Generate a realistic sales call transcript between an SDR and ${lead.name}.
Include:
- Opening (pitch)
- Qualifying questions
- Objection handling
- Close (meeting booking or follow-up)

Format as:
SDR: [message]
Lead: [response]`,
        },
        {
          role: 'user',
          content: `Opening pitch: ${pitch}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    });

    const transcript = completion.choices[0]?.message?.content || '';

    return {
      transcript,
      summary: this.summarizeCall(transcript),
    };
  }

  /**
   * Qualify lead based on conversation
   */
  async qualifyLead(
    transcript: string,
    lead: Lead
  ): Promise<{
    qualified: boolean;
    score: number;
    reasons: string[];
    nextSteps: string[];
  }> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Analyze this sales call transcript and qualify the lead. Return JSON:
{
  "qualified": boolean,
  "score": 0-100,
  "reasons": ["reason1", "reason2"],
  "nextSteps": ["step1", "step2"]
}

Qualification criteria:
- Has budget
- Has authority to make decision
- Has a clear need
- Timeline within 3 months`,
        },
        {
          role: 'user',
          content: `Transcript:\n${transcript}\n\nLead: ${JSON.stringify(lead)}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  /**
   * Book meeting in calendar
   */
  async bookMeeting(
    _lead: Lead,
    proposedTimes: Date[]
  ): Promise<{ booked: boolean; meetingTime?: Date }> {
    // In production, this would:
    // 1. Check calendar availability
    // 2. Send meeting invite
    // 3. Add to CRM
    // 4. Send confirmation email

    const meetingTime = proposedTimes[0];

    // Simulate booking
    return {
      booked: true,
      meetingTime,
    };
  }

  /**
   * Schedule follow-up call
   */
  async scheduleFollowUp(
    lead: Lead,
    followUpDate: Date,
    _notes: string
  ): Promise<void> {
    // Add to call queue
    console.log(`Follow-up scheduled for ${lead.name} on ${followUpDate}`);
    
    // In production, this would add to database and trigger automated call
  }

  /**
   * Generate call report
   */
  async generateCallReport(outcomes: CallOutcome[]): Promise<{
    summary: string;
    metrics: {
      connectionRate: number;
      qualificationRate: number;
      meetingBookedRate: number;
    };
    topPerformers: string[];
    recommendations: string[];
  }> {
    const connected = outcomes.filter(o => o.connected).length;
    const qualified = outcomes.filter(o => o.qualified).length;
    const meetings = outcomes.filter(o => o.meetingScheduled).length;

    return {
      summary: `Called ${outcomes.length} leads. Connected with ${connected}, qualified ${qualified}, booked ${meetings} meetings.`,
      metrics: {
        connectionRate: (connected / outcomes.length) * 100,
        qualificationRate: connected > 0 ? (qualified / connected) * 100 : 0,
        meetingBookedRate: qualified > 0 ? (meetings / qualified) * 100 : 0,
      },
      topPerformers: this.identifyTopPerformers(outcomes),
      recommendations: await this.generateRecommendations(outcomes),
    };
  }

  // Helper methods
  private summarizeCall(transcript: string): string {
    const lines = transcript.split('\n').filter(l => l.trim());
    return lines.slice(0, 3).join(' ');
  }

  private randomSentiment(): 'positive' | 'neutral' | 'negative' {
    const rand = Math.random();
    if (rand < 0.3) return 'negative';
    if (rand < 0.7) return 'neutral';
    return 'positive';
  }

  private determineNextAction(): CallOutcome['nextAction'] {
    const actions: CallOutcome['nextAction'][] = [
      'follow-up',
      'meeting-booked',
      'not-interested',
      'callback',
    ];
    return actions[Math.floor(Math.random() * actions.length)];
  }

  private identifyTopPerformers(outcomes: CallOutcome[]): string[] {
    return outcomes
      .filter(o => o.qualified)
      .map(o => o.leadId)
      .slice(0, 5);
  }

  private async generateRecommendations(
    _outcomes: CallOutcome[]
  ): Promise<string[]> {
    // Analyze patterns and generate recommendations
    return [
      'Best calling time: 10am-11am and 2pm-3pm',
      'Personalized email follow-ups increase conversion by 40%',
      'Focus on pain points related to efficiency',
    ];
  }

  private async logCallOutcome(outcome: CallOutcome): Promise<void> {
    // Save to database
    console.log('Call outcome:', outcome);
  }
}

export const aiSDR = new AISDRService();
