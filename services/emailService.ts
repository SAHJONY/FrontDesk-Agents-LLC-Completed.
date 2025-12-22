import { render } from '@react-email/render';
import { EscalationTemplate } from './emails/EscalationTemplate';

// ... existing code ...

export const emailService = {
  // ... existing sendWelcomeEmail ...

  async triggerEscalation(to: string, agentName: string, taskDescription: string, taskId: string) {
    try {
      const approvalLink = `${process.env.NEXT_PUBLIC_APP_URL}/approve/${taskId}`;
      const emailHtml = await render(
        EscalationTemplate({ agentName, taskDescription, approvalLink })
      );

      const msg = {
        to,
        from: 'alerts@frontdeskagents.com',
        subject: `[ESCALATION] ${agentName} requires oversight`,
        html: emailHtml,
        headers: { 'Importance': 'high', 'X-Priority': '1' } // Force high priority in inboxes
      };

      await sgMail.send(msg);
      console.log(`[ALERTS] Escalation protocol sent for task ${taskId}`);
    } catch (error: any) {
      await medicAgent.reportIncident(error, 'Escalation Email Failure');
    }
  }
};
