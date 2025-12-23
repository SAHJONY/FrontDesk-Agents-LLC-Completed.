import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  async sendWelcomeEmail(email: string, name: string, plan: string) {
    return await resend.emails.send({
      from: 'FrontDesk Agents <onboarding@frontdeskagents.com>',
      to: [email],
      subject: `Welcome to the Swarm, ${name}`,
      html: `<h1>Strategic Partnership Initialized</h1><p>Your AI FrontDesk is now active on the <strong>${plan}</strong> tier.</p>`
    });
  },
  
  async sendTransactionalEmail(to: string, subject: string, html: string, category: string) {
    return await resend.emails.send({
      from: 'FrontDesk Medic <reports@frontdeskagents.com>',
      to: [to],
      subject: subject,
      html: html,
      tags: [{ name: 'category', value: category }]
    });
  }
};
