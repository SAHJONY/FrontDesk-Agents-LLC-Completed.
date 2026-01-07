import { generateEmail, TemplateData } from '../index';

/**
 * Company-wide announcement from CEO
 */
export function companyAnnouncementEmail(data: { 
  subject: string; 
  message: string; 
  ceoName: string;
  actionUrl?: string;
  actionText?: string;
}): string {
  const template = `
    <h2>{{subject}}</h2>
    <p>Team,</p>
    <p>{{message}}</p>
    ${data.actionUrl ? `<a href="${data.actionUrl}" class="button">${data.actionText || 'Learn More'}</a>` : ''}
    <p>Thank you for your continued dedication to FrontDesk Agents.</p>
    <p>Best regards,<br>{{ceoName}}<br>CEO, FrontDesk Agents LLC</p>
  `;
  return generateEmail(template, data, data.subject);
}

/**
 * Quarterly results announcement
 */
export function quarterlyResultsEmail(data: {
  quarter: string;
  year: number;
  revenue: string;
  growth: string;
  highlights: string[];
  ceoName: string;
}): string {
  const highlightsHtml = data.highlights.map(h => `<li>${h}</li>`).join('');
  const template = `
    <h2>Q{{quarter}} {{year}} Results</h2>
    <p>Team,</p>
    <p>I'm excited to share our results for Q{{quarter}} {{year}}:</p>
    <p>
      <strong>Revenue:</strong> ${{revenue}}<br>
      <strong>Growth:</strong> {{growth}}%
    </p>
    <p><strong>Key Highlights:</strong></p>
    <ul>${highlightsHtml}</ul>
    <p>Thank you all for your hard work and dedication. These results are a testament to our team's excellence.</p>
    <p>Best regards,<br>{{ceoName}}<br>CEO, FrontDesk Agents LLC</p>
  `;
  return generateEmail(template, data, `Q${data.quarter} ${data.year} Results`);
}

/**
 * New hire announcement
 */
export function newHireAnnouncementEmail(data: {
  employeeName: string;
  title: string;
  department: string;
  startDate: string;
  background: string;
  managerName: string;
}): string {
  const template = `
    <h2>Welcome {{employeeName}} to the Team! 👋</h2>
    <p>Team,</p>
    <p>I'm pleased to announce that <strong>{{employeeName}}</strong> is joining FrontDesk Agents as our new <strong>{{title}}</strong> in the {{department}} department, starting on {{startDate}}.</p>
    <p><strong>Background:</strong> {{background}}</p>
    <p>{{employeeName}} will be reporting to {{managerName}}. Please join me in welcoming them to the team!</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, `Welcome ${data.employeeName} to FrontDesk Agents!`);
}

/**
 * Promotion announcement
 */
export function promotionAnnouncementEmail(data: {
  employeeName: string;
  oldTitle: string;
  newTitle: string;
  department: string;
  achievements: string;
  effectiveDate: string;
}): string {
  const template = `
    <h2>Congratulations {{employeeName}}! 🎉</h2>
    <p>Team,</p>
    <p>I'm thrilled to announce that <strong>{{employeeName}}</strong> has been promoted from {{oldTitle}} to <strong>{{newTitle}}</strong> in the {{department}} department, effective {{effectiveDate}}.</p>
    <p>{{achievements}}</p>
    <p>Please join me in congratulating {{employeeName}} on this well-deserved promotion!</p>
    <p>Best regards,<br>The FrontDesk Agents Leadership Team</p>
  `;
  return generateEmail(template, data, `Congratulations ${data.employeeName}!`);
}

/**
 * Policy update announcement
 */
export function policyUpdateEmail(data: {
  policyName: string;
  summary: string;
  effectiveDate: string;
  policyUrl: string;
  contactEmail: string;
}): string {
  const template = `
    <h2>Policy Update: {{policyName}}</h2>
    <p>Team,</p>
    <p>We're updating our <strong>{{policyName}}</strong>, effective {{effectiveDate}}.</p>
    <p><strong>Summary of Changes:</strong></p>
    <p>{{summary}}</p>
    <a href="{{policyUrl}}" class="button">Read Full Policy</a>
    <p>If you have any questions, please contact <a href="mailto:{{contactEmail}}">{{contactEmail}}</a>.</p>
    <p>Best regards,<br>The FrontDesk Agents Team</p>
  `;
  return generateEmail(template, data, `Policy Update: ${data.policyName}`);
}

/**
 * Team meeting invitation
 */
export function teamMeetingEmail(data: {
  meetingTitle: string;
  date: string;
  time: string;
  location: string;
  agenda: string[];
  meetingUrl?: string;
  organizer: string;
}): string {
  const agendaHtml = data.agenda.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('');
  const template = `
    <h2>{{meetingTitle}}</h2>
    <p>Team,</p>
    <p>You're invited to attend:</p>
    <p>
      <strong>Date:</strong> {{date}}<br>
      <strong>Time:</strong> {{time}}<br>
      <strong>Location:</strong> {{location}}
    </p>
    <p><strong>Agenda:</strong></p>
    <ol>${agendaHtml}</ol>
    ${data.meetingUrl ? `<a href="${data.meetingUrl}" class="button">Join Meeting</a>` : ''}
    <p>Looking forward to seeing everyone there!</p>
    <p>Best regards,<br>{{organizer}}</p>
  `;
  return generateEmail(template, data, data.meetingTitle);
}

/**
 * Company milestone celebration
 */
export function milestoneEmail(data: {
  milestone: string;
  description: string;
  thankYouMessage: string;
  celebrationDetails?: string;
  ceoName: string;
}): string {
  const template = `
    <h2>🎉 We Did It! {{milestone}}</h2>
    <p>Team,</p>
    <p>{{description}}</p>
    <p>{{thankYouMessage}}</p>
    ${data.celebrationDetails ? `<p><strong>Celebration Details:</strong> ${data.celebrationDetails}</p>` : ''}
    <p>Here's to continued success!</p>
    <p>Best regards,<br>{{ceoName}}<br>CEO, FrontDesk Agents LLC</p>
  `;
  return generateEmail(template, data, `Milestone: ${data.milestone}`);
}

/**
 * Emergency or urgent communication
 */
export function urgentCommunicationEmail(data: {
  subject: string;
  situation: string;
  immediateActions: string[];
  contactPerson: string;
  contactEmail: string;
  senderName: string;
  senderTitle: string;
}): string {
  const actionsHtml = data.immediateActions.map(action => `<li>${action}</li>`).join('');
  const template = `
    <h2>⚠️ URGENT: {{subject}}</h2>
    <p>Team,</p>
    <p><strong>Situation:</strong> {{situation}}</p>
    <p><strong>Immediate Actions Required:</strong></p>
    <ul>${actionsHtml}</ul>
    <p><strong>Point of Contact:</strong> {{contactPerson}} - <a href="mailto:{{contactEmail}}">{{contactEmail}}</a></p>
    <p>Please acknowledge receipt of this message and take necessary actions immediately.</p>
    <p>Best regards,<br>{{senderName}}<br>{{senderTitle}}</p>
  `;
  return generateEmail(template, data, `URGENT: ${data.subject}`);
}

/**
 * Performance review reminder
 */
export function performanceReviewReminderEmail(data: {
  employeeName: string;
  reviewPeriod: string;
  dueDate: string;
  reviewUrl: string;
  hrContact: string;
}): string {
  const template = `
    <h2>Performance Review Reminder</h2>
    <p>Hi {{employeeName}},</p>
    <p>This is a reminder that your performance review for {{reviewPeriod}} is due by <strong>{{dueDate}}</strong>.</p>
    <a href="{{reviewUrl}}" class="button">Complete Review</a>
    <p>If you have any questions, please contact {{hrContact}}.</p>
    <p>Best regards,<br>Human Resources</p>
  `;
  return generateEmail(template, data, 'Performance Review Reminder');
}

/**
 * Benefits enrollment reminder
 */
export function benefitsEnrollmentEmail(data: {
  employeeName: string;
  enrollmentPeriod: string;
  deadline: string;
  benefitsUrl: string;
  hrContact: string;
}): string {
  const template = `
    <h2>Benefits Enrollment Now Open 🏥</h2>
    <p>Hi {{employeeName}},</p>
    <p>The benefits enrollment period for {{enrollmentPeriod}} is now open!</p>
    <p><strong>Enrollment Deadline:</strong> {{deadline}}</p>
    <a href="{{benefitsUrl}}" class="button">Review & Enroll</a>
    <p>Please review your options and make your selections before the deadline.</p>
    <p>Questions? Contact {{hrContact}}.</p>
    <p>Best regards,<br>Human Resources</p>
  `;
  return generateEmail(template, data, 'Benefits Enrollment Now Open');
}
