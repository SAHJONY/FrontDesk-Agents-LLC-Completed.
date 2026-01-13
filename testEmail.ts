import { sendEmail } from './lib/mail/emailService';
import { Department } from './lib/mail/emailService';

async function runTestEmails() {
  const testEmailAddress = 'frontdeskllc@outlook.com';

  console.log('--- Testing Resend-routed emails ---');

  // Test Sales (Resend)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Sales - Resend)',
    html: '<p>This is a test email from the <strong>Sales</strong> department, routed via Resend.</p>',
    department: 'sales' as Department,
  });

  // Test Onboarding (Resend)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Onboarding - Resend)',
    html: '<p>This is a test email from the <strong>Onboarding</strong> department, routed via Resend.</p>',
    department: 'onboarding' as Department,
  });

  // Test Support (Resend)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Support - Resend)',
    html: '<p>This is a test email from the <strong>Support</strong> department, routed via Resend.</p>',
    department: 'support' as Department,
  });

  console.log('\n--- Testing Outlook-routed emails ---');

  // Test Admin (Outlook)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Admin - Outlook)',
    html: '<p>This is a test email from the <strong>Admin</strong> department, routed via Outlook.</p>',
    department: 'admin' as Department,
  });

  // Test Compliance (Outlook)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Compliance - Outlook)',
    html: '<p>This is a test email from the <strong>Compliance</strong> department, routed via Outlook.</p>',
    department: 'compliance' as Department,
  });

  // Test Technical (Outlook)
  await sendEmail({
    to: testEmailAddress,
    subject: 'Test Email (Technical - Outlook)',
    html: '<p>This is a test email from the <strong>Technical</strong> department, routed via Outlook.</p>',
    department: 'technical' as Department,
  });

  console.log('\n--- Test emails simulation complete ---');
}

runTestEmails();
