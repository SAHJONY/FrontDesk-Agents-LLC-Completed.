import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { URLSearchParams } from 'url'; // Required for some environments, though isomorphic-fetch might polyfill

interface OutlookEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

interface OutlookEmailResult {
  success: boolean;
  error?: string;
}

// Placeholder for an access token. In a real application, this would be dynamically fetched.
// For a server-side application, you'd typically use client credentials flow or similar.
// For now, we'll assume an environment variable or a secure token retrieval mechanism.
const getAccessToken = async (): Promise<string> => {
  // TODO: Implement secure retrieval of an access token for Microsoft Graph API.
  // This would typically involve using Azure AD client credentials flow.
  // For demonstration, we'll use a placeholder or expect it from an environment variable.
  const accessToken = process.env.OUTLOOK_ACCESS_TOKEN; // Example: This needs to be securely managed
  if (!accessToken) {
    throw new Error('OUTLOOK_ACCESS_TOKEN is not configured.');
  }
  return accessToken;
};

export async function sendOutlookEmail(options: OutlookEmailOptions): Promise<OutlookEmailResult> {
  try {
    const accessToken = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const recipients = (Array.isArray(options.to) ? options.to : [options.to]).map(email => ({
      emailAddress: { address: email }
    }));

    const ccRecipients = options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]).map(email => ({
      emailAddress: { address: email }
    })) : undefined;

    const bccRecipients = options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]).map(email => ({
      emailAddress: { address: email }
    })) : undefined;

    const message: any = {
      subject: options.subject,
      body: {
        contentType: options.html ? 'HTML' : 'Text',
        content: options.html || options.text || '',
      },
      toRecipients: recipients,
    };

    if (ccRecipients) {
      message.ccRecipients = ccRecipients;
    }
    if (bccRecipients) {
      message.bccRecipients = bccRecipients;
    }

    if (options.attachments && options.attachments.length > 0) {
      message.attachments = options.attachments.map(att => ({
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: att.filename,
        contentType: att.contentType || 'application/octet-stream',
        contentBytes: (att.content instanceof Buffer) ? att.content.toString('base64') : Buffer.from(att.content).toString('base64'),
      }));
    }

    await client.api('/me/sendMail').post({ message, saveToSentItems: true });

    return { success: true };
  } catch (error: any) {
    console.error('Outlook email sending failed:', error);
    return { success: false, error: error.message };
  }
}
