import { generateEmail } from '../index';

/**
 * Welcome email from support
 */
export function welcomeEmail(data: { name: string; loginUrl: string }): string {
  const template = `
    <h2>Welcome to FrontDesk Agents! 👋</h2>
    <p>Hi {{name}},</p>
    <p>Thank you for choosing FrontDesk Agents! We're excited to help you transform your front office with AI-powered agents.</p>
    <p>Our support team is here to ensure you have a smooth experience. If you have any questions or need assistance, don't hesitate to reach out.</p>
    <a href="{{loginUrl}}" class="button">Access Your Dashboard</a>
    <p>Best regards,<br>The FrontDesk Agents Support Team</p>
  `;
  return generateEmail(template, data, 'Welcome to FrontDesk Agents!');
}

/**
 * Ticket created confirmation
 */
export function ticketCreatedEmail(data: { name: string; ticketId: string; subject: string; ticketUrl: string }): string {
  const template = `
    <h2>Support Ticket Created 🎫</h2>
    <p>Hi {{name}},</p>
    <p>We've received your support request and created ticket <strong>#{{ticketId}}</strong>.</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    <p>Our support team will review your request and respond within 24 hours.</p>
    <a href="{{ticketUrl}}" class="button">View Ticket</a>
    <p>Best regards,<br>The FrontDesk Agents Support Team</p>
  `;
  return generateEmail(template, data, `Ticket #${data.ticketId} created`);
}

/**
 * Ticket resolved email
 */
export function ticketResolvedEmail(data: { name: string; ticketId: string; subject: string; resolution: string }): string {
  const template = `
    <h2>Support Ticket Resolved ✅</h2>
    <p>Hi {{name}},</p>
    <p>Great news! Your support ticket <strong>#{{ticketId}}</strong> has been resolved.</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    <p><strong>Resolution:</strong> {{resolution}}</p>
    <p>If you have any further questions or concerns, please don't hesitate to create a new ticket.</p>
    <p>Best regards,<br>The FrontDesk Agents Support Team</p>
  `;
  return generateEmail(template, data, `Ticket #${data.ticketId} resolved`);
}

/**
 * Follow-up email
 */
export function followUpEmail(data: { name: string; message: string }): string {
  const template = `
    <h2>Following Up 📧</h2>
    <p>Hi {{name}},</p>
    <p>{{message}}</p>
    <p>If you need any assistance, please don't hesitate to reach out to our support team.</p>
    <p>Best regards,<br>The FrontDesk Agents Support Team</p>
  `;
  return generateEmail(template, data, 'Following up on your request');
}
