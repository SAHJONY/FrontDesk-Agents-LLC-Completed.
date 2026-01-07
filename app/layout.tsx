import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n/provider';
import { AutonomousProvider } from '../lib/autonomous/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FrontDesk Agents | AI-Powered Revenue Workforce',
    template: '%s | FrontDesk Agents',
  },
  description: '24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations. Serving global markets locally with AI-powered agents.',
  keywords: [
    'AI receptionist',
    'virtual receptionist',
    'AI voice agents',
    'customer service automation',
    'lead qualification',
    'revenue operations',
    'business automation',
    'AI workforce',
  ],
  authors: [{ name: 'FrontDesk Agents LLC' }],
  creator: 'FrontDesk Agents LLC',
  publisher: 'FrontDesk Agents LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://frontdeskagents.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frontdeskagents.com',
    siteName: 'FrontDesk Agents',
    title: 'FrontDesk Agents | AI-Powered Revenue Workforce',
    description: '24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FrontDesk Agents - AI-Powered Revenue Workforce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrontDesk Agents | AI-Powered Revenue Workforce',
    description: '24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.',
    images: ['/og-image.jpg'],
    creator: '@frontdeskagents',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'FrontDesk Agents LLC',
              url: 'https://frontdeskagents.com',
              logo: 'https://frontdeskagents.com/logo.png',
              description: 'AI-Powered Revenue Workforce platform providing 24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-123-4567',
                contactType: 'Customer Service',
                email: 'support@frontdeskagents.com',
              },
              sameAs: [
                'https://twitter.com/frontdeskagents',
                'https://linkedin.com/company/frontdeskagents',
                'https://facebook.com/frontdeskagents',
              ],
            }),
          }}
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#06b6d4" />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        <I18nProvider>
          <AutonomousProvider>
            <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
            {children}
          </AutonomousProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
