import { generateEmail } from '../index';

/**
 * System maintenance notice
 */
export function maintenanceNoticeEmail(data: { name: string; startTime: string; endTime: string; impact: string }): string {
  const template = `
    <h2>Scheduled Maintenance Notice 🔧</h2>
    <p>Hi {{name}},</p>
    <p>We'll be performing scheduled maintenance on our platform:</p>
    <p>
      <strong>Start Time:</strong> {{startTime}}<br>
      <strong>End Time:</strong> {{endTime}}<br>
      <strong>Expected Impact:</strong> {{impact}}
    </p>
    <p>We apologize for any inconvenience and appreciate your patience as we work to improve our services.</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, 'Scheduled maintenance notice');
}

/**
 * Feature update announcement
 */
export function featureUpdateEmail(data: { name: string; featureName: string; description: string; learnMoreUrl: string }): string {
  const template = `
    <h2>New Feature: {{featureName}} ✨</h2>
    <p>Hi {{name}},</p>
    <p>We're excited to announce a new feature that will enhance your FrontDesk Agents experience!</p>
    <p><strong>{{featureName}}</strong></p>
    <p>{{description}}</p>
    <a href="{{learnMoreUrl}}" class="button">Learn More</a>
    <p>This feature is now available in your dashboard. Give it a try!</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, `New feature: ${data.featureName}`);
}

/**
 * Security alert email
 */
export function securityAlertEmail(data: { name: string; alertType: string; description: string; actionRequired: string; actionUrl: string }): string {
  const template = `
    <h2>Security Alert: {{alertType}} 🔒</h2>
    <p>Hi {{name}},</p>
    <p><strong>Alert:</strong> {{description}}</p>
    <p><strong>Action Required:</strong> {{actionRequired}}</p>
    <a href="{{actionUrl}}" class="button">Take Action Now</a>
    <p>If you didn't initiate this action or have concerns, please contact our support team immediately.</p>
    <p>Best regards,<br>The FrontDesk Agents Security Team</p>
  `;
  return generateEmail(template, data, `Security Alert: ${data.alertType}`);
}

/**
 * Password reset email
 */
export function passwordResetEmail(data: { name: string; resetUrl: string; expiresIn: string }): string {
  const template = `
    <h2>Password Reset Request 🔑</h2>
    <p>Hi {{name}},</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <a href="{{resetUrl}}" class="button">Reset Password</a>
    <p><strong>This link will expire in {{expiresIn}}.</strong></p>
    <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, 'Password reset request');
}

/**
 * Email verification
 */
export function emailVerificationEmail(data: { name: string; verificationUrl: string }): string {
  const template = `
    <h2>Verify Your Email Address 📧</h2>
    <p>Hi {{name}},</p>
    <p>Thank you for signing up for FrontDesk Agents! Please verify your email address to complete your registration:</p>
    <a href="{{verificationUrl}}" class="button">Verify Email Address</a>
    <p>If you didn't create an account, please ignore this email.</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, 'Please verify your email address');
}
