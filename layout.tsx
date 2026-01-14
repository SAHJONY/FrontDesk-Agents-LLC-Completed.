import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
