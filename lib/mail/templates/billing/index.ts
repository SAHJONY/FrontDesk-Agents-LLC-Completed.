import { generateEmail, TemplateData } from '../index';

/**
 * Invoice sent email
 */
export function invoiceSentEmail(data: { name: string; invoiceNumber: string; amount: string; dueDate: string; invoiceUrl: string }): string {
  const template = `
    <h2>Invoice #{{invoiceNumber}} 💳</h2>
    <p>Hi {{name}},</p>
    <p>Your invoice is ready for payment.</p>
    <p><strong>Invoice Number:</strong> {{invoiceNumber}}<br>
    <strong>Amount:</strong> ${{amount}}<br>
    <strong>Due Date:</strong> {{dueDate}}</p>
    <a href="{{invoiceUrl}}" class="button">View & Pay Invoice</a>
    <p>If you have any questions about this invoice, please contact our billing team.</p>
    <p>Best regards,<br>The FrontDesk Agents Billing Team</p>
  `;
  return generateEmail(template, data, `Invoice #${data.invoiceNumber} - $${data.amount}`);
}

/**
 * Payment received email
 */
export function paymentReceivedEmail(data: { name: string; amount: string; invoiceNumber: string; receiptUrl: string }): string {
  const template = `
    <h2>Payment Received ✅</h2>
    <p>Hi {{name}},</p>
    <p>Thank you! We've received your payment of <strong>${{amount}}</strong> for invoice <strong>#{{invoiceNumber}}</strong>.</p>
    <a href="{{receiptUrl}}" class="button">Download Receipt</a>
    <p>Your account is in good standing. Thank you for your continued business!</p>
    <p>Best regards,<br>The FrontDesk Agents Billing Team</p>
  `;
  return generateEmail(template, data, 'Payment received - Thank you!');
}

/**
 * Payment failed email
 */
export function paymentFailedEmail(data: { name: string; amount: string; reason: string; updateUrl: string }): string {
  const template = `
    <h2>Payment Failed ⚠️</h2>
    <p>Hi {{name}},</p>
    <p>We were unable to process your payment of <strong>${{amount}}</strong>.</p>
    <p><strong>Reason:</strong> {{reason}}</p>
    <p>Please update your payment method to avoid service interruption.</p>
    <a href="{{updateUrl}}" class="button">Update Payment Method</a>
    <p>If you need assistance, please contact our billing team.</p>
    <p>Best regards,<br>The FrontDesk Agents Billing Team</p>
  `;
  return generateEmail(template, data, 'Action Required: Payment Failed');
}

/**
 * Subscription updated email
 */
export function subscriptionUpdatedEmail(data: { name: string; planName: string; amount: string; nextBillingDate: string }): string {
  const template = `
    <h2>Subscription Updated 🎉</h2>
    <p>Hi {{name}},</p>
    <p>Your subscription has been successfully updated!</p>
    <p><strong>Plan:</strong> {{planName}}<br>
    <strong>Amount:</strong> ${{amount}}/month<br>
    <strong>Next Billing Date:</strong> {{nextBillingDate}}</p>
    <p>Thank you for your continued trust in FrontDesk Agents!</p>
    <p>Best regards,<br>The FrontDesk Agents Billing Team</p>
  `;
  return generateEmail(template, data, 'Your subscription has been updated');
}
