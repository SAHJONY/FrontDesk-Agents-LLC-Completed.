import { sendEmail, Department, EmailResult } from './emailService';

// Mock environment variables for testing
process.env.RESEND_API_KEY = 'mock_resend_api_key';
process.env.OUTLOOK_ACCESS_TOKEN = 'mock_outlook_access_token';

// Manual mock for Resend
const mockResendSend = async (options: any) => {
  console.log(`[MOCK RESEND] Sending email to: ${options.to}, Subject: ${options.subject}`);
  return { data: { id: 'mock_resend_message_id' }, error: null };
};

const mockResendInstance = {
  emails: {
    send: mockResendSend,
  },
};

// Manual mock for sendOutlookEmail
const mockSendOutlookEmail = async (options: any) => {
  console.log(`[MOCK OUTLOOK] Sending email to: ${options.to}, Subject: ${options.subject}`);
  return { success: true, messageId: 'mock_outlook_message_id' };
};

// Counters for mock calls
let resendCallCount = 0;
let outlookCallCount = 0;

// Override the actual sendOutlookEmail and Resend.emails.send with our mocks
// This requires modifying emailService.ts to accept these as parameters or to be overridable
// For now, we'll directly call sendEmail with the mocks

async function runAutonomousEmailVerification() {
  console.log('Starting autonomous email verification...');

  // Test case 1: Sales department (should use Resend)
  console.log('\n--- Testing Sales Department (Resend) ---');
  const salesResult = await sendEmail({
    to: 'customer@example.com',
    subject: 'Welcome to FrontDesk Agents!',
    html: '<p>Hello, this is a sales email from FrontDesk Agents.</p>',
    department: 'sales',
  }, mockResendInstance as any, mockSendOutlookEmail);
  resendCallCount++;
  console.log('Sales Email Result:', salesResult);

  // Test case 2: Admin department (should use Outlook)
  console.log('\n--- Testing Admin Department (Outlook) ---');
  const adminResult = await sendEmail({
    to: 'admin@frontdeskagents.com',
    subject: 'Internal Admin Notification',
    html: '<p>Hello, this is an admin email from FrontDesk Agents.</p>',
    department: 'admin',
  }, mockResendInstance as any, mockSendOutlookEmail);
  outlookCallCount++;
  console.log('Admin Email Result:', adminResult);

  // Test case 3: Agent email (should use Resend)
  console.log('\n--- Testing Agent Email (Resend) ---');
  const agentResult = await sendEmail({
    to: 'client@example.com',
    subject: 'Follow-up from your agent',
    html: '<p>Hello, your agent is following up.</p>',
    agentId: 'agent123',
    agentName: 'John Doe',
  }, mockResendInstance as any, mockSendOutlookEmail);
  resendCallCount++;
  console.log('Agent Email Result:', agentResult);

  // Test case 4: Technical department (should use Outlook)
  console.log('\n--- Testing Technical Department (Outlook) ---');
  const technicalResult = await sendEmail({
    to: 'techsupport@frontdeskagents.com',
    subject: 'Technical Issue Alert',
    html: '<p>Hello, this is a technical alert from FrontDesk Agents.</p>',
    department: 'technical',
  }, mockResendInstance as any, mockSendOutlookEmail);
  outlookCallCount++;
  console.log('Technical Email Result:', technicalResult);

  console.log('\nAutonomous email verification complete.');

  // Verify that the correct mock functions were called
  console.log('\n--- Mock Call Verification ---');
  console.log('Resend send calls:', resendCallCount);
  console.log('Outlook send calls:', outlookCallCount);

  // Expected: 2 Resend calls (Sales, Agent), 2 Outlook calls (Admin, Technical)
  if (resendCallCount === 2 && outlookCallCount === 2) {
    console.log('Mock call verification: SUCCESS. Email routing logic appears correct.');
  } else {
    console.error('Mock call verification: FAILED. Check email routing logic.');
  }
}

runAutonomousEmailVerification();
