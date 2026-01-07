// Email template utilities and base layouts

export interface TemplateData {
  [key: string]: any;
}

/**
 * Base email layout wrapper
 */
export function baseEmailLayout(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FrontDesk Agents</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f8f8;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .preheader {
      display: none;
      max-height: 0;
      overflow: hidden;
    }
  </style>
</head>
<body>
  ${preheader ? `<div class="preheader">${preheader}</div>` : ''}
  <div class="container">
    <div class="header">
      <h1>🏢 FrontDesk Agents</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.</p>
      <p>Transform Your Front Office with AI Agents</p>
      <p><a href="https://frontdeskagents.com">frontdeskagents.com</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Replace template variables
 */
export function replaceVariables(template: string, data: TemplateData): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match;
  });
}

/**
 * Generate email from template
 */
export function generateEmail(template: string, data: TemplateData, preheader?: string): string {
  const content = replaceVariables(template, data);
  return baseEmailLayout(content, preheader);
}
