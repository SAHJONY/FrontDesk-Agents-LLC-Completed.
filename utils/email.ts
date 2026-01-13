// utils/email.ts
import { Resend } from 'resend';
import { InvitationEmail } from '@/emails/InvitationEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomePackage(email: string, clientName: string) {
  try {
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

    await resend.emails.send({
      from: 'FrontDesk Agents <onboarding@frontdesk-agents.com>',
      to: [email],
      subject: 'Access your Intelligence Portal',
      react: React.createElement(InvitationEmail, {
        clientName: clientName,
        magicLink: magicLink,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    throw error;
  }
}
