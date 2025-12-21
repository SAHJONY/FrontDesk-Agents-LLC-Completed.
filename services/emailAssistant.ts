// services/emailAssistant.ts
// Email Assistant - Automated inbox management

import OpenAI from 'openai';
import { Resend } from 'resend';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  category?: EmailCategory;
  priority?: 'high' | 'medium' | 'low';
  sentiment?: 'positive' | 'neutral' | 'negative';
}

type EmailCategory = 
  | 'inquiry'
  | 'support'
  | 'complaint'
  | 'sales'
  | 'scheduling'
  | 'spam'
  | 'urgent';

export class EmailAssistantService {
  /**
   * Process incoming email
   */
  async processIncomingEmail(email: Email): Promise<{
    category: EmailCategory;
    priority: Email['priority'];
    sentiment: Email['sentiment'];
    suggestedResponse: string;
    shouldAutoReply: boolean;
  }> {
    // Analyze email
    const analysis = await this.analyzeEmail(email);

    // Generate response
    const suggestedResponse = await this.generateResponse(email, analysis);

    return {
      ...analysis,
      suggestedResponse,
      shouldAutoReply: this.shouldAutoReply(analysis),
    };
  }

  /**
   * Analyze email content with AI
   */
  private async analyzeEmail(email: Email): Promise<{
    category: EmailCategory;
    priority: Email['priority'];
    sentiment: Email['sentiment'];
  }> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Analyze this email and return a JSON object with:
{
  "category": "inquiry" | "support" | "complaint" | "sales" | "scheduling" | "spam" | "urgent",
  "priority": "high" | "medium" | "low",
  "sentiment": "positive" | "neutral" | "negative"
}`,
        },
        {
          role: 'user',
          content: `Subject: ${email.subject}\n\n${email.body}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    return {
      category: result.category || 'inquiry',
      priority: result.priority || 'medium',
      sentiment: result.sentiment || 'neutral',
    };
  }

  /**
   * Generate email response
   */
  private async generateResponse(
    email: Email,
    analysis: { category: EmailCategory; sentiment: Email['sentiment'] }
  ): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional email assistant. Generate a response to this email.
- Be professional and courteous
- Address their main concern
- Provide clear next steps
- Match their tone (formal/informal)
- Keep it concise (2-3 paragraphs)

Email category: ${analysis.category}
Sentiment: ${analysis.sentiment}`,
        },
        {
          role: 'user',
          content: `Subject: ${email.subject}\n\n${email.body}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return completion.choices[0]?.message?.content || '';
  }

  /**
   * Send email response
   */
  async sendEmail(
    to: string,
    subject: string,
    html: string,
    replyTo?: string
  ): Promise<void> {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS!,
        to,
        subject,
        html,
        replyTo,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Auto-reply to email
   */
  async autoReply(
    originalEmail: Email,
    response: string
  ): Promise<void> {
    await this.sendEmail(
      originalEmail.from,
      `Re: ${originalEmail.subject}`,
      this.formatEmailHTML(response),
      originalEmail.to
    );
  }

  /**
   * Determine if email should be auto-replied
   */
  private shouldAutoReply(analysis: {
    category: EmailCategory;
    priority: Email['priority'];
  }): boolean {
    // Auto-reply to common inquiries and scheduling requests
    const autoReplyCategories: EmailCategory[] = ['inquiry', 'scheduling'];
    
    return (
      autoReplyCategories.includes(analysis.category) &&
      analysis.priority !== 'high'
    );
  }

  /**
   * Extract action items from email
   */
  async extractActionItems(email: Email): Promise<string[]> {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract action items from this email. Return a JSON array of strings.
Example: ["Schedule follow-up call", "Send proposal by Friday", "Review contract"]`,
        },
        {
          role: 'user',
          content: `Subject: ${email.subject}\n\n${email.body}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{"items": []}');
    return result.items || [];
  }

  /**
   * Summarize email thread
   */
  async summarizeThread(emails: Email[]): Promise<string> {
    const thread = emails
      .map(e => `From: ${e.from}\nDate: ${e.timestamp}\nSubject: ${e.subject}\n\n${e.body}`)
      .join('\n\n---\n\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Summarize this email thread in 2-3 sentences. Focus on key decisions and action items.',
        },
        { role: 'user', content: thread },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || '';
  }

  /**
   * Format email as HTML
   */
  private formatEmailHTML(text: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    p { margin: 1em 0; }
  </style>
</head>
<body>
  ${text.split('\n\n').map(para => `<p>${para}</p>`).join('\n')}
  
  <hr style="margin: 2em 0; border: none; border-top: 1px solid #ddd;">
  
  <p style="color: #666; font-size: 0.9em;">
    This email was generated by FrontDesk Agents AI Assistant.
  </p>
</body>
</html>`;
  }

  /**
   * Schedule follow-up email
   */
  async scheduleFollowUp(
    to: string,
    subject: string,
    body: string,
    sendAt: Date
  ): Promise<void> {
    const delay = sendAt.getTime() - Date.now();
    
    if (delay < 0) {
      throw new Error('Cannot schedule email in the past');
    }

    setTimeout(async () => {
      await this.sendEmail(to, subject, this.formatEmailHTML(body));
    }, delay);
  }
}

export const emailAssistant = new EmailAssistantService();
