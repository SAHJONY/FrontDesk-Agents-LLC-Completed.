import { generateEmail } from '../index';

/**
 * Demo request confirmation
 */
export function demoConfirmationEmail(data: { name: string; demoDate: string; demoUrl: string }): string {
  const template = `
    <h2>Demo Request Confirmed! 🎉</h2>
    <p>Hi {{name}},</p>
    <p>Thank you for your interest in FrontDesk Agents! We're excited to show you how our AI-powered agents can transform your front office operations.</p>
    <p><strong>Demo Date:</strong> {{demoDate}}</p>
    <p>We'll send you a calendar invite and meeting link shortly.</p>
    <a href="{{demoUrl}}" class="button">View Demo Details</a>
    <p>Looking forward to speaking with you!<br>The FrontDesk Agents Sales Team</p>
  `;
  return generateEmail(template, data, 'Your demo is confirmed!');
}

/**
 * Proposal sent email
 */
export function proposalSentEmail(data: { name: string; proposalUrl: string; validUntil: string }): string {
  const template = `
    <h2>Your Custom Proposal 📄</h2>
    <p>Hi {{name}},</p>
    <p>Thank you for taking the time to discuss your needs with us. We've prepared a custom proposal tailored to your organization.</p>
    <p><strong>Valid Until:</strong> {{validUntil}}</p>
    <a href="{{proposalUrl}}" class="button">View Proposal</a>
    <p>If you have any questions or would like to discuss the proposal, please don't hesitate to reach out.</p>
    <p>Best regards,<br>The FrontDesk Agents Sales Team</p>
  `;
  return generateEmail(template, data, 'Your custom proposal is ready');
}

/**
 * Follow-up after demo
 */
export function demoFollowUpEmail(data: { name: string; demoRecordingUrl?: string; nextSteps: string }): string {
  const template = `
    <h2>Thank You for Attending Our Demo! 🙏</h2>
    <p>Hi {{name}},</p>
    <p>It was great speaking with you today! We hope you found the demo valuable and can see how FrontDesk Agents can benefit your organization.</p>
    ${data.demoRecordingUrl ? '<a href="' + data.demoRecordingUrl + '" class="button">Watch Demo Recording</a>' : ''}
    <p><strong>Next Steps:</strong> {{nextSteps}}</p>
    <p>If you have any questions or would like to move forward, please let us know!</p>
    <p>Best regards,<br>The FrontDesk Agents Sales Team</p>
  `;
  return generateEmail(template, data, 'Thank you for attending our demo');
}

/**
 * Contract sent email
 */
export function contractSentEmail(data: { name: string; contractUrl: string; signUrl: string }): string {
  const template = `
    <h2>Your Contract is Ready! 📝</h2>
    <p>Hi {{name}},</p>
    <p>We're excited to move forward with you! Your contract is ready for review and signature.</p>
    <a href="{{contractUrl}}" class="button">Review Contract</a>
    <a href="{{signUrl}}" class="button">Sign Contract</a>
    <p>Once signed, we'll begin the onboarding process immediately.</p>
    <p>Best regards,<br>The FrontDesk Agents Sales Team</p>
  `;
  return generateEmail(template, data, 'Your contract is ready for signature');
}
