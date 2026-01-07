import { generateEmail, TemplateData } from '../index';

/**
 * Agent introduction email
 */
export function agentIntroductionEmail(data: { customerName: string; agentName: string; agentRole: string; agentCapabilities: string[]; dashboardUrl: string }): string {
  const capabilitiesHtml = data.agentCapabilities.map(cap => `<li>${cap}</li>`).join('');
  const template = `
    <h2>Meet Your AI Agent: {{agentName}} 🤖</h2>
    <p>Hi {{customerName}},</p>
    <p>I'm <strong>{{agentName}}</strong>, your new AI-powered {{agentRole}}. I'm here to help streamline your front office operations!</p>
    <p><strong>What I can do for you:</strong></p>
    <ul>${capabilitiesHtml}</ul>
    <a href="{{dashboardUrl}}" class="button">Configure My Settings</a>
    <p>I'm ready to get started. Let's transform your front office together!</p>
    <p>Best regards,<br>{{agentName}}<br>Your AI {{agentRole}}</p>
  `;
  return generateEmail(template, data, `Meet your AI agent: ${data.agentName}`);
}

/**
 * Agent status update email
 */
export function agentStatusUpdateEmail(data: { customerName: string; agentName: string; status: string; message: string; dashboardUrl: string }): string {
  const template = `
    <h2>Agent Status Update 📊</h2>
    <p>Hi {{customerName}},</p>
    <p>This is <strong>{{agentName}}</strong> with an important status update:</p>
    <p><strong>Status:</strong> {{status}}</p>
    <p>{{message}}</p>
    <a href="{{dashboardUrl}}" class="button">View Dashboard</a>
    <p>Best regards,<br>{{agentName}}</p>
  `;
  return generateEmail(template, data, `Status update from ${data.agentName}`);
}

/**
 * Agent performance report email
 */
export function agentPerformanceReportEmail(data: { 
  customerName: string; 
  agentName: string; 
  period: string;
  tasksCompleted: number;
  responseTime: string;
  satisfactionScore: string;
  reportUrl: string;
}): string {
  const template = `
    <h2>Performance Report: {{agentName}} 📈</h2>
    <p>Hi {{customerName}},</p>
    <p>Here's my performance summary for {{period}}:</p>
    <p>
      <strong>Tasks Completed:</strong> {{tasksCompleted}}<br>
      <strong>Average Response Time:</strong> {{responseTime}}<br>
      <strong>Customer Satisfaction:</strong> {{satisfactionScore}}
    </p>
    <a href="{{reportUrl}}" class="button">View Full Report</a>
    <p>I'm continuously learning and improving to serve you better!</p>
    <p>Best regards,<br>{{agentName}}</p>
  `;
  return generateEmail(template, data, `Performance report from ${data.agentName}`);
}

/**
 * Custom agent message email
 */
export function customAgentMessageEmail(data: { customerName: string; agentName: string; subject: string; message: string; actionUrl?: string; actionText?: string }): string {
  const template = `
    <h2>{{subject}}</h2>
    <p>Hi {{customerName}},</p>
    <p>{{message}}</p>
    ${data.actionUrl ? `<a href="${data.actionUrl}" class="button">${data.actionText || 'Take Action'}</a>` : ''}
    <p>Best regards,<br>{{agentName}}</p>
  `;
  return generateEmail(template, data, data.subject);
}
