/**
 * Lead Generation, Qualification, and Outreach Automation
 * End-to-end autonomous sales execution
 */

import type { LeadCard, SequencePack, CampaignPolicy } from './autonomous-sales-workforce';
import { leadSourcingCrawlers } from './lead-sourcing-crawlers';
import { salesRLOptimizer } from './sales-rl-optimizer';

interface ICPDefinition {
  industry: string[];
  company_size: string[];
  revenue_range: string[];
  geo: string[];
  job_titles: string[];
  pain_points: string[];
  triggers: string[];
  exclusions: string[];
  value_props: string[];
}

interface OutreachSequence {
  id: string;
  lead_id: string;
  sequence_pack: SequencePack;
  current_touch: number;
  status: 'active' | 'paused' | 'completed' | 'opted_out';
  touches_sent: number;
  replies_received: number;
  demos_booked: number;
  last_touch_at?: Date;
  next_touch_at?: Date;
}

interface DemoBooking {
  id: string;
  lead_id: string;
  scheduled_at: Date;
  timezone: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'no_show' | 'rescheduled';
  meeting_link: string;
  reminders_sent: number;
}

interface Deal {
  id: string;
  lead_id: string;
  plan: string;
  mrr: number;
  status: 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  close_date?: Date;
  lost_reason?: string;
}

class OutreachAutomation {
  private icpDefinitions: Map<string, ICPDefinition> = new Map();
  private sequences: Map<string, OutreachSequence> = new Map();
  private bookings: Map<string, DemoBooking> = new Map();
  private deals: Map<string, Deal> = new Map();

  /**
   * Define ICP for campaign
   */
  defineICP(campaign_id: string, params: {
    industry: string;
    geo: string;
    company_size?: string;
  }): ICPDefinition {
    const icp: ICPDefinition = {
      industry: [params.industry],
      company_size: params.company_size ? [params.company_size] : ['10-50', '50-200', '200-1000'],
      revenue_range: ['$1M-$10M', '$10M-$50M', '$50M+'],
      geo: [params.geo],
      job_titles: this.getTargetTitles(params.industry),
      pain_points: this.getPainPoints(params.industry),
      triggers: this.getTriggers(params.industry),
      exclusions: ['competitors', 'not_a_fit'],
      value_props: this.getValueProps(params.industry),
    };

    this.icpDefinitions.set(campaign_id, icp);

    return icp;
  }

  /**
   * Get target job titles for industry
   */
  private getTargetTitles(industry: string): string[] {
    const titlesByIndustry: Record<string, string[]> = {
      restaurant: ['Owner', 'General Manager', 'Operations Manager'],
      healthcare: ['Practice Manager', 'Office Manager', 'Administrator'],
      'real-estate': ['Broker', 'Team Lead', 'Managing Partner'],
      retail: ['Store Manager', 'Operations Director', 'Owner'],
      hospitality: ['General Manager', 'Front Office Manager', 'Owner'],
      legal: ['Managing Partner', 'Office Manager', 'Practice Administrator'],
      automotive: ['Service Manager', 'General Manager', 'Owner'],
      'home-services': ['Owner', 'Operations Manager', 'Dispatcher'],
    };

    return titlesByIndustry[industry] || ['CEO', 'COO', 'Operations Manager'];
  }

  /**
   * Get pain points for industry
   */
  private getPainPoints(industry: string): string[] {
    const painsByIndustry: Record<string, string[]> = {
      restaurant: ['Missed reservations', 'Phone calls during rush', 'Staff shortage'],
      healthcare: ['Appointment no-shows', 'Phone tag', 'Front desk costs'],
      'real-estate': ['Lead response time', 'Showing coordination', 'After-hours calls'],
      retail: ['Customer service availability', 'Order tracking', 'Returns processing'],
    };

    return painsByIndustry[industry] || ['Manual processes', 'Missed opportunities', 'High costs'];
  }

  /**
   * Get buying triggers for industry
   */
  private getTriggers(industry: string): string[] {
    return [
      'Hiring challenges',
      'Growth phase',
      'Customer complaints',
      'Competitor pressure',
      'New location opening',
    ];
  }

  /**
   * Get value propositions for industry
   */
  private getValueProps(industry: string): string[] {
    return [
      '24/7 availability without hiring',
      'Never miss a customer again',
      'Reduce operational costs by 70%',
      'Improve customer satisfaction',
      'Scale without adding headcount',
    ];
  }

  /**
   * Source and qualify leads
   */
  async sourceLeads(campaign_id: string, params: {
    industry: string;
    country: string;
    limit: number;
  }): Promise<LeadCard[]> {
    // Get approved sources
    const sources = leadSourcingCrawlers.getApprovedSources(params.country, params.industry);

    // Source from multiple sources
    const allLeads: LeadCard[] = [];

    // Source from Apollo
    const apolloResult = await leadSourcingCrawlers.sourceFromApollo({
      industry: params.industry,
      country: params.country,
      limit: Math.floor(params.limit / 2),
    });

    if (apolloResult.success) {
      allLeads.push(...apolloResult.leads);
    }

    // Source from ZoomInfo
    const zoomInfoResult = await leadSourcingCrawlers.sourceFromZoomInfo({
      industry: params.industry,
      country: params.country,
      limit: Math.floor(params.limit / 2),
    });

    if (zoomInfoResult.success) {
      allLeads.push(...zoomInfoResult.leads);
    }

    // Validate and score leads
    const qualifiedLeads = this.qualifyLeads(allLeads, campaign_id);

    return qualifiedLeads;
  }

  /**
   * Qualify leads based on ICP
   */
  private qualifyLeads(leads: LeadCard[], campaign_id: string): LeadCard[] {
    const icp = this.icpDefinitions.get(campaign_id);
    if (!icp) return leads;

    return leads
      .filter(lead => {
        // Check if lead matches ICP
        return (
          icp.industry.includes(lead.industry) &&
          icp.geo.includes(lead.geo.country)
        );
      })
      .sort((a, b) => b.lead_score - a.lead_score); // Sort by score
  }

  /**
   * Create outreach sequence
   */
  createSequence(params: {
    lead: LeadCard;
    policy: CampaignPolicy;
    language: string;
    offer: string;
  }): SequencePack {
    const { lead, policy, language, offer } = params;

    // Generate personalized sequence
    const sequencePack: SequencePack = {
      id: `seq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${lead.industry} - ${lead.geo.country}`,
      language,
      variant: 'A',
      touches: [
        {
          day: 0,
          channel: 'email',
          subject: `Quick question about ${lead.company_name}'s customer communication`,
          body: this.generateEmailBody(lead, offer, 1),
          cta: 'Reply to this email',
        },
        {
          day: 3,
          channel: 'email',
          subject: `Following up - ${offer} for ${lead.company_name}`,
          body: this.generateEmailBody(lead, offer, 2),
          cta: 'Book a 15-minute demo',
        },
        {
          day: 7,
          channel: 'email',
          subject: `Last follow-up - ${lead.company_name}`,
          body: this.generateEmailBody(lead, offer, 3),
          cta: 'Schedule a call',
        },
      ],
      opt_out_text: 'Reply STOP to unsubscribe',
      sender_identity: {
        name: 'Sales Team',
        email: 'sales@frontdeskagents.com',
        company: 'FrontDesk Agents LLC',
      },
    };

    return sequencePack;
  }

  /**
   * Generate personalized email body
   */
  private generateEmailBody(lead: LeadCard, offer: string, touchNumber: number): string {
    if (touchNumber === 1) {
      return `Hi there,

I noticed ${lead.company_name} is in the ${lead.industry} industry. Many ${lead.industry} businesses struggle with missed calls and customer communication.

${offer}

Would you be open to a quick 15-minute demo to see how we can help ${lead.company_name}?

Best regards,
Sales Team
FrontDesk Agents LLC

---
Reply STOP to unsubscribe`;
    }

    if (touchNumber === 2) {
      return `Hi again,

Following up on my previous email about ${offer} for ${lead.company_name}.

Quick question: Are you currently handling all customer calls manually, or do you have an automated system?

If you're interested in seeing how we can help, here's a link to book a 15-minute demo: [DEMO_LINK]

Best regards,
Sales Team

---
Reply STOP to unsubscribe`;
    }

    return `Hi,

This is my last follow-up. I understand you're busy, so I'll keep this brief.

${offer} - specifically designed for ${lead.industry} businesses like ${lead.company_name}.

If you'd like to learn more, just reply to this email or book a time here: [DEMO_LINK]

Otherwise, I'll assume it's not a priority right now and won't reach out again.

Best regards,
Sales Team

---
Reply STOP to unsubscribe`;
  }

  /**
   * Start outreach sequence
   */
  async startSequence(lead: LeadCard, sequencePack: SequencePack): Promise<OutreachSequence> {
    const sequence: OutreachSequence = {
      id: `outreach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lead_id: lead.id,
      sequence_pack: sequencePack,
      current_touch: 0,
      status: 'active',
      touches_sent: 0,
      replies_received: 0,
      demos_booked: 0,
      next_touch_at: new Date(), // Send first touch immediately
    };

    this.sequences.set(sequence.id, sequence);

    // Send first touch
    await this.sendTouch(sequence);

    return sequence;
  }

  /**
   * Send touch in sequence
   */
  private async sendTouch(sequence: OutreachSequence): Promise<void> {
    const touch = sequence.sequence_pack.touches[sequence.current_touch];

    if (!touch) {
      sequence.status = 'completed';
      return;
    }

    // Simulate sending email
    console.log(`Sending touch ${sequence.current_touch + 1} to lead ${sequence.lead_id}`);
    console.log(`Channel: ${touch.channel}`);
    console.log(`Subject: ${touch.subject}`);

    // Update sequence
    sequence.touches_sent++;
    sequence.last_touch_at = new Date();

    // Schedule next touch
    if (sequence.current_touch < sequence.sequence_pack.touches.length - 1) {
      const nextTouch = sequence.sequence_pack.touches[sequence.current_touch + 1];
      const nextTouchDate = new Date();
      nextTouchDate.setDate(nextTouchDate.getDate() + nextTouch.day);
      sequence.next_touch_at = nextTouchDate;
      sequence.current_touch++;
    } else {
      sequence.status = 'completed';
    }
  }

  /**
   * Handle reply
   */
  async handleReply(sequence_id: string, reply: {
    sentiment: 'positive' | 'neutral' | 'negative';
    intent: 'interested' | 'not_interested' | 'question' | 'opt_out';
    text: string;
  }): Promise<{ action: string; response?: string }> {
    const sequence = this.sequences.get(sequence_id);
    if (!sequence) {
      return { action: 'error' };
    }

    sequence.replies_received++;

    // Handle opt-out
    if (reply.intent === 'opt_out') {
      sequence.status = 'opted_out';
      return { action: 'opted_out' };
    }

    // Handle not interested
    if (reply.intent === 'not_interested') {
      sequence.status = 'completed';
      return { action: 'completed' };
    }

    // Handle interested
    if (reply.intent === 'interested') {
      sequence.status = 'paused';
      return {
        action: 'book_demo',
        response: 'Great! Here are some times for a demo: [BOOKING_LINK]',
      };
    }

    // Handle question
    if (reply.intent === 'question') {
      return {
        action: 'answer_question',
        response: this.generateAnswerResponse(reply.text),
      };
    }

    return { action: 'continue' };
  }

  /**
   * Generate answer to question
   */
  private generateAnswerResponse(question: string): string {
    return `Thanks for your question! Here's what I can tell you:

FrontDesk Agents provides AI-powered phone agents that handle customer calls 24/7. Think of it as hiring a full-time receptionist, but available around the clock at a fraction of the cost.

Would you like to schedule a quick demo to see it in action?

[BOOKING_LINK]`;
  }

  /**
   * Book demo
   */
  async bookDemo(lead_id: string, params: {
    scheduled_at: Date;
    timezone: string;
  }): Promise<DemoBooking> {
    const booking: DemoBooking = {
      id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lead_id,
      scheduled_at: params.scheduled_at,
      timezone: params.timezone,
      status: 'scheduled',
      meeting_link: `https://frontdeskagents.com/demo/${Date.now()}`,
      reminders_sent: 0,
    };

    this.bookings.set(booking.id, booking);

    // Send confirmation
    await this.sendDemoConfirmation(booking);

    return booking;
  }

  /**
   * Send demo confirmation
   */
  private async sendDemoConfirmation(booking: DemoBooking): Promise<void> {
    console.log(`Sending demo confirmation for booking ${booking.id}`);
    console.log(`Scheduled at: ${booking.scheduled_at.toISOString()}`);
    console.log(`Meeting link: ${booking.meeting_link}`);
  }

  /**
   * Send demo reminder
   */
  async sendDemoReminder(booking_id: string): Promise<void> {
    const booking = this.bookings.get(booking_id);
    if (!booking) return;

    console.log(`Sending demo reminder for booking ${booking_id}`);
    booking.reminders_sent++;
  }

  /**
   * Create deal
   */
  async createDeal(lead_id: string, params: {
    plan: string;
    mrr: number;
  }): Promise<Deal> {
    const deal: Deal = {
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lead_id,
      plan: params.plan,
      mrr: params.mrr,
      status: 'proposal',
    };

    this.deals.set(deal.id, deal);

    return deal;
  }

  /**
   * Close deal
   */
  async closeDeal(deal_id: string, won: boolean, lost_reason?: string): Promise<Deal> {
    const deal = this.deals.get(deal_id);
    if (!deal) {
      throw new Error('Deal not found');
    }

    deal.status = won ? 'closed_won' : 'closed_lost';
    deal.close_date = new Date();
    if (lost_reason) {
      deal.lost_reason = lost_reason;
    }

    return deal;
  }

  /**
   * Get metrics
   */
  getMetrics(): {
    sequences: number;
    active_sequences: number;
    touches_sent: number;
    replies_received: number;
    demos_booked: number;
    deals_created: number;
    deals_won: number;
  } {
    const sequences = Array.from(this.sequences.values());
    const deals = Array.from(this.deals.values());

    return {
      sequences: sequences.length,
      active_sequences: sequences.filter(s => s.status === 'active').length,
      touches_sent: sequences.reduce((sum, s) => sum + s.touches_sent, 0),
      replies_received: sequences.reduce((sum, s) => sum + s.replies_received, 0),
      demos_booked: this.bookings.size,
      deals_created: deals.length,
      deals_won: deals.filter(d => d.status === 'closed_won').length,
    };
  }

  /**
   * Get all sequences
   */
  getSequences(): OutreachSequence[] {
    return Array.from(this.sequences.values());
  }

  /**
   * Get all bookings
   */
  getBookings(): DemoBooking[] {
    return Array.from(this.bookings.values());
  }

  /**
   * Get all deals
   */
  getDeals(): Deal[] {
    return Array.from(this.deals.values());
  }
}

// Export singleton instance
export const outreachAutomation = new OutreachAutomation();
export type { ICPDefinition, OutreachSequence, DemoBooking, Deal };
