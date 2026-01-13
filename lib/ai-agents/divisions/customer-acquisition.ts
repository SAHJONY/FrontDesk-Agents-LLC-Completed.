/**
 * Customer Acquisition Division
 * AI-powered sales and marketing automation
 */

export interface LeadQualification {
  qualified: boolean;
  score: number; // 0-100
  tier: 'hot' | 'warm' | 'cold';
  budget: 'confirmed' | 'estimated' | 'unknown';
  authority: 'decision-maker' | 'influencer' | 'end-user';
  need: 'urgent' | 'moderate' | 'exploring';
  timeline: 'immediate' | '1-3 months' | '3-6 months' | 'unknown';
  recommendedAction: string;
}

export interface OutreachCampaign {
  leadId: string;
  sequence: OutreachStep[];
  status: 'active' | 'paused' | 'completed';
  performance: {
    sent: number;
    opened: number;
    replied: number;
    converted: boolean;
  };
}

export interface OutreachStep {
  step: number;
  channel: 'email' | 'phone' | 'sms' | 'linkedin';
  content: string;
  delayDays: number;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'replied';
}

/**
 * Lead Qualification Agent
 * Qualifies leads using BANT framework
 */
export class LeadQualificationAgent {
  async qualifyLead(lead: {
    company: string;
    domain?: string;
    contact: {
      name: string;
      email: string;
      title: string;
    };
    source?: string;
  }): Promise<LeadQualification> {
    console.log(`🎯 Qualifying lead: ${lead.company}`);

    let score = 50; // Base score
    let tier: LeadQualification['tier'] = 'warm';

    // Budget assessment
    const budget: LeadQualification['budget'] = 'estimated';
    score += 15;

    // Authority assessment
    const title = lead.contact.title.toLowerCase();
    let authority: LeadQualification['authority'] = 'end-user';

    if (
      title.includes('ceo') ||
      title.includes('founder') ||
      title.includes('president') ||
      title.includes('owner')
    ) {
      authority = 'decision-maker';
      score += 30;
    } else if (
      title.includes('director') ||
      title.includes('vp') ||
      title.includes('head') ||
      title.includes('manager')
    ) {
      authority = 'influencer';
      score += 20;
    } else {
      score += 5;
    }

    // Need assessment
    let need: LeadQualification['need'] = 'exploring';
    if (lead.source === 'demo-request' || lead.source === 'contact-form') {
      need = 'urgent';
      score += 25;
    } else if (lead.source === 'pricing-page') {
      need = 'moderate';
      score += 15;
    } else {
      score += 5;
    }

    // Timeline assessment
    const timeline: LeadQualification['timeline'] =
      need === 'urgent' ? 'immediate' : need === 'moderate' ? '1-3 months' : '3-6 months';

    // Determine tier
    if (score >= 80) {
      tier = 'hot';
    } else if (score >= 60) {
      tier = 'warm';
    } else {
      tier = 'cold';
    }

    const qualified = score >= 50;

    return {
      qualified,
      score,
      tier,
      budget,
      authority,
      need,
      timeline,
      recommendedAction: this.getRecommendedAction(tier, authority, need),
    };
  }

  private getRecommendedAction(
    tier: string,
    authority: string,
    need: string
  ): string {
    if (tier === 'hot' && authority === 'decision-maker') {
      return 'Immediate phone call + personalized demo';
    } else if (tier === 'hot') {
      return 'Schedule demo within 24 hours';
    } else if (tier === 'warm') {
      return 'Send personalized email sequence + offer demo';
    } else {
      return 'Add to nurture campaign';
    }
  }
}

/**
 * Outreach Generation Agent
 * Creates personalized outreach campaigns
 */
export class OutreachGenerationAgent {
  async generateCampaign(lead: {
    company: string;
    contact: { name: string; email: string; title: string };
    qualification: LeadQualification;
  }): Promise<OutreachCampaign> {
    console.log(`📨 Generating outreach campaign for ${lead.company}`);

    const sequence: OutreachStep[] = [];

    // Step 1: Initial email
    sequence.push({
      step: 1,
      channel: 'email',
      content: this.generateInitialEmail(lead),
      delayDays: 0,
      status: 'pending',
    });

    // Step 2: Follow-up email
    sequence.push({
      step: 2,
      channel: 'email',
      content: this.generateFollowUpEmail(lead),
      delayDays: 3,
      status: 'pending',
    });

    // Step 3: Phone call (for hot leads)
    if (lead.qualification.tier === 'hot') {
      sequence.push({
        step: 3,
        channel: 'phone',
        content: this.generatePhoneScript(lead),
        delayDays: 5,
        status: 'pending',
      });
    }

    // Step 4: Final email
    sequence.push({
      step: lead.qualification.tier === 'hot' ? 4 : 3,
      channel: 'email',
      content: this.generateFinalEmail(lead),
      delayDays: 7,
      status: 'pending',
    });

    return {
      leadId: `LEAD-${Date.now()}`,
      sequence,
      status: 'active',
      performance: {
        sent: 0,
        opened: 0,
        replied: 0,
        converted: false,
      },
    };
  }

  private generateInitialEmail(lead: any): string {
    return `Subject: Automate Your Front Office with AI - ${lead.company}

Hi ${lead.contact.name},

I noticed ${lead.company} is in the ${this.guessIndustry(lead.company)} space, and I wanted to reach out about how AI-powered automation can transform your front office operations.

FrontDesk Agents provides 24/7 autonomous AI agents that handle:
• Inbound calls and lead qualification
• Customer support and FAQ handling
• Appointment scheduling and follow-ups
• Multi-language support (50+ languages)

Companies like yours typically see:
✅ 70% reduction in response time
✅ 40% increase in lead conversion
✅ $50K+ annual savings on staffing

Would you be open to a quick 15-minute demo this week? I can show you exactly how it would work for ${lead.company}.

Best regards,
FrontDesk Agents Sales Team

P.S. You can see our pricing and case studies at frontdeskagents.com`;
  }

  private generateFollowUpEmail(lead: any): string {
    return `Subject: Re: Automate Your Front Office with AI - ${lead.company}

Hi ${lead.contact.name},

I wanted to follow up on my previous email about AI automation for ${lead.company}.

I understand you're busy, so I'll keep this brief:

**Quick Question:** What's your biggest challenge with handling inbound calls and customer inquiries right now?

I ask because FrontDesk Agents specializes in solving exactly these problems:
• Missed calls during off-hours → 24/7 AI coverage
• Long response times → Instant AI responses
• Inconsistent customer experience → Military-grade precision

If you're interested, I can send over a 2-minute video showing how it works.

Best,
FrontDesk Agents Team`;
  }

  private generatePhoneScript(lead: any): string {
    return `Phone Script for ${lead.contact.name} at ${lead.company}:

OPENING:
"Hi ${lead.contact.name}, this is [Your Name] from FrontDesk Agents. I sent you a couple of emails about AI automation for your front office. Do you have 2 minutes?"

QUALIFICATION:
"What's your current process for handling inbound calls and customer inquiries?"
"How many calls/inquiries do you handle per day?"
"What happens when calls come in after hours?"

VALUE PROP:
"We provide 24/7 AI agents that handle calls, qualify leads, and schedule appointments automatically. Companies typically see 40% higher conversion rates."

DEMO OFFER:
"I'd love to show you a quick demo. Are you available this Thursday at 2pm or Friday at 10am?"

OBJECTION HANDLING:
- "Too expensive" → "Our clients typically save $50K+ annually on staffing"
- "Need to think about it" → "Totally understand. Can I send you a case study from [similar company]?"
- "Already have a solution" → "That's great! What are you using? I'm curious how it compares."

CLOSE:
"Let's schedule that demo. I'll send you a calendar invite right now."`;
  }

  private generateFinalEmail(lead: any): string {
    return `Subject: Last chance: AI automation for ${lead.company}

Hi ${lead.contact.name},

I've reached out a couple of times about FrontDesk Agents, but haven't heard back.

I'll take that as a sign that now might not be the right time for ${lead.company}.

Before I close your file, I wanted to leave you with this:

**Free Resource:** I'm attaching our "AI Automation Playbook" with strategies you can implement even without our platform.

If anything changes and you want to explore AI automation in the future, feel free to reach out anytime.

Best of luck with ${lead.company}!

Best regards,
FrontDesk Agents Team

P.S. If you do want to see a demo, just reply "DEMO" and I'll get you scheduled within 24 hours.`;
  }

  private guessIndustry(company: string): string {
    const lower = company.toLowerCase();
    if (lower.includes('tech') || lower.includes('software')) return 'technology';
    if (lower.includes('health') || lower.includes('medical')) return 'healthcare';
    if (lower.includes('legal') || lower.includes('law')) return 'legal';
    if (lower.includes('real estate') || lower.includes('property')) return 'real estate';
    return 'business services';
  }
}

/**
 * Sales Workflow Orchestrator
 * Coordinates the entire sales process
 */
export class SalesWorkflowOrchestrator {
  private qualificationAgent = new LeadQualificationAgent();
  private outreachAgent = new OutreachGenerationAgent();

  async executeSalesWorkflow(lead: {
    company: string;
    domain?: string;
    contact: {
      name: string;
      email: string;
      title: string;
    };
    source?: string;
  }): Promise<{
    qualification: LeadQualification;
    campaign: OutreachCampaign;
    nextSteps: string[];
  }> {
    console.log(`🚀 Executing sales workflow for ${lead.company}`);

    // Step 1: Qualify the lead
    const qualification = await this.qualificationAgent.qualifyLead(lead);

    if (!qualification.qualified) {
      console.log(`❌ Lead not qualified: ${lead.company} (Score: ${qualification.score})`);
      return {
        qualification,
        campaign: {
          leadId: '',
          sequence: [],
          status: 'paused',
          performance: { sent: 0, opened: 0, replied: 0, converted: false },
        },
        nextSteps: ['Add to nurture campaign', 'Re-qualify in 3 months'],
      };
    }

    // Step 2: Generate outreach campaign
    const campaign = await this.outreachAgent.generateCampaign({
      company: lead.company,
      contact: lead.contact,
      qualification,
    });

    // Step 3: Determine next steps
    const nextSteps = this.determineNextSteps(qualification, campaign);

    console.log(`✅ Sales workflow complete for ${lead.company}`);
    console.log(`📊 Qualification: ${qualification.tier} (${qualification.score}/100)`);
    console.log(`📨 Campaign: ${campaign.sequence.length} steps`);

    return {
      qualification,
      campaign,
      nextSteps,
    };
  }

  private determineNextSteps(
    qualification: LeadQualification,
    campaign: OutreachCampaign
  ): string[] {
    const steps: string[] = [];

    if (qualification.tier === 'hot') {
      steps.push('Send first email immediately');
      steps.push('Schedule phone call within 24 hours');
      steps.push('Prepare personalized demo');
    } else if (qualification.tier === 'warm') {
      steps.push('Send first email within 4 hours');
      steps.push('Monitor email opens and clicks');
      steps.push('Follow up in 3 days');
    } else {
      steps.push('Add to nurture campaign');
      steps.push('Send educational content');
      steps.push('Re-qualify in 30 days');
    }

    return steps;
  }
}

/**
 * Customer Acquisition Division
 * Main division coordinator
 */
export class CustomerAcquisitionDivision {
  private workflowOrchestrator = new SalesWorkflowOrchestrator();

  private stats = {
    totalLeads: 0,
    qualifiedLeads: 0,
    hotLeads: 0,
    campaignsCreated: 0,
    conversions: 0,
  };

  async processLead(lead: {
    company: string;
    domain?: string;
    contact: {
      name: string;
      email: string;
      title: string;
    };
    source?: string;
  }) {
    this.stats.totalLeads++;

    const result = await this.workflowOrchestrator.executeSalesWorkflow(lead);

    if (result.qualification.qualified) {
      this.stats.qualifiedLeads++;
      this.stats.campaignsCreated++;

      if (result.qualification.tier === 'hot') {
        this.stats.hotLeads++;
      }
    }

    return result;
  }

  getStats() {
    return {
      ...this.stats,
      qualificationRate: this.stats.totalLeads > 0
        ? (this.stats.qualifiedLeads / this.stats.totalLeads) * 100
        : 0,
      conversionRate: this.stats.qualifiedLeads > 0
        ? (this.stats.conversions / this.stats.qualifiedLeads) * 100
        : 0,
    };
  }
}

// Export singleton instance
export const customerAcquisitionDivision = new CustomerAcquisitionDivision();
