import { generateEmail } from '../index';

/**
 * Welcome to platform email
 */
export function welcomeToPlatformEmail(data: { name: string; companyName: string; dashboardUrl: string; setupGuideUrl: string }): string {
  const template = `
    <h2>Welcome to FrontDesk Agents! 🚀</h2>
    <p>Hi {{name}},</p>
    <p>Congratulations! Your account for <strong>{{companyName}}</strong> is now active. We're thrilled to have you on board!</p>
    <p>Let's get you started with your AI-powered front office transformation.</p>
    <a href="{{dashboardUrl}}" class="button">Access Dashboard</a>
    <a href="{{setupGuideUrl}}" class="button">View Setup Guide</a>
    <p>Our onboarding team is here to help you every step of the way.</p>
    <p>Best regards,<br>The FrontDesk Agents Onboarding Team</p>
  `;
  return generateEmail(template, data, 'Welcome to FrontDesk Agents!');
}

/**
 * Setup instructions email
 */
export function setupInstructionsEmail(data: { name: string; steps: string[]; helpUrl: string }): string {
  const stepsHtml = data.steps.map((step, index) => `<li><strong>Step ${index + 1}:</strong> ${step}</li>`).join('');
  const template = `
    <h2>Getting Started Guide 📋</h2>
    <p>Hi {{name}},</p>
    <p>Here's your step-by-step guide to get your FrontDesk Agents up and running:</p>
    <ol>${stepsHtml}</ol>
    <a href="{{helpUrl}}" class="button">Need Help?</a>
    <p>Take your time, and don't hesitate to reach out if you have questions!</p>
    <p>Best regards,<br>The FrontDesk Agents Onboarding Team</p>
  `;
  return generateEmail(template, data, 'Your setup guide is ready');
}

/**
 * Training resources email
 */
export function trainingResourcesEmail(data: { name: string; videoUrl: string; docsUrl: string; webinarUrl: string }): string {
  const template = `
    <h2>Training Resources 📚</h2>
    <p>Hi {{name}},</p>
    <p>We've prepared comprehensive training resources to help you get the most out of FrontDesk Agents:</p>
    <a href="{{videoUrl}}" class="button">Watch Tutorial Videos</a>
    <a href="{{docsUrl}}" class="button">Read Documentation</a>
    <a href="{{webinarUrl}}" class="button">Join Live Webinar</a>
    <p>These resources will help you master the platform and maximize your ROI.</p>
    <p>Best regards,<br>The FrontDesk Agents Onboarding Team</p>
  `;
  return generateEmail(template, data, 'Your training resources are ready');
}

/**
 * Onboarding complete email
 */
export function onboardingCompleteEmail(data: { name: string; supportUrl: string; communityUrl: string }): string {
  const template = `
    <h2>Onboarding Complete! 🎉</h2>
    <p>Hi {{name}},</p>
    <p>Congratulations! You've successfully completed the onboarding process. Your FrontDesk Agents are now ready to transform your front office operations!</p>
    <p>Remember, we're always here to help:</p>
    <a href="{{supportUrl}}" class="button">Contact Support</a>
    <a href="{{communityUrl}}" class="button">Join Community</a>
    <p>Thank you for choosing FrontDesk Agents. Here's to your success!</p>
    <p>Best regards,<br>The FrontDesk Agents Onboarding Team</p>
  `;
  return generateEmail(template, data, 'Onboarding complete - Welcome aboard!');
}
