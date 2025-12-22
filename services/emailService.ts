import * as sgMail from '@sendgrid/mail';
import { render } from '@react-email/render';
import { WelcomeTemplate } from './emails/WelcomeTemplate';
import { Plans } from './plans';
import { medicAgent } from './medic.service';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const emailService = {
  async sendWelcomeEmail(to: string, clientName: string, plan: Plans) {
    try {
      // CEO Fix: Rendering the React component into HTML string
      const emailHtml = await render(WelcomeTemplate({ clientName, plan }));

      const msg = {
        to,
        from: 'ceo@frontdeskagents.com',
        subject: `[SYSTEM ACTIVATED] Welcome, ${clientName}`,
        html: emailHtml,
      };

      await sgMail.send(msg);
      console.log(`[EMAIL] React-rendered protocol sent to ${to}`);
    } catch (error: any) {
      await medicAgent.reportIncident(error, 'React Email Render/Send Failure');
      throw error;
    }
  }
};
