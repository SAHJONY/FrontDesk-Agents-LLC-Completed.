import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import ImpersonationBanner from '@/components/admin/ImpersonationBanner';

export const metadata: Metadata = {
  title: 'FrontDesk Agents | AI-Powered Revenue Workforce',
  description:
    '24/7 AI-powered voice, SMS, and email agents that qualify leads, book appointments, and drive revenue automatically.',
  metadataBase: new URL('https://frontdeskagents.com'),
  openGraph: {
    title: 'FrontDesk Agents',
    description:
      'Enterprise-grade AI receptionists and revenue workforce for modern businesses.',
    url: 'https://frontdeskagents.com',
    siteName: 'FrontDesk Agents',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@frontdeskagents',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for the impersonation cookie on the server
  const cookieStore = await cookies();
  const isImpersonating = cookieStore.has('impersonated_owner_id');

  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {/* The banner will only render if the cookie exists */}
        {isImpersonating && <ImpersonationBanner />}
        {children}
      </body>
    </html>
  );
}
