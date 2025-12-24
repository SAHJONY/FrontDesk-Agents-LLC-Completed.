import { Resend } from 'resend';

// This pulls your key securely from your locked-down environment variables
export const resend = new Resend(process.env.RESEND_API_KEY);
