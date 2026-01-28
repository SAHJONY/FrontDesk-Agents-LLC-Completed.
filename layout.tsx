import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import './globals.css';
import ImpersonationBanner from '@/components/admin/ImpersonationBanner';
import Sidebar from '@/components/Sidebar'; // Ensure this path is correct

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
  const cookieStore = await cookies();
  const headerList = await headers();
  
  // Get current path to determine if we should show the sidebar
  const fullPath = headerList.get('x-url') || ''; 
  const isImpersonating = cookieStore.has('impersonated_owner_id');
  
  // Define public routes where the sidebar should NOT appear
  const publicRoutes = ['/', '/login', '/signup', '/pricing', '/features', '/marketing'];
  const isPublicRoute = publicRoutes.some(route => fullPath.endsWith(route) || fullPath === '');

  // Alternatively, check for an auth session cookie to be safe
  const isAuthenticated = cookieStore.has('sb-access-token') || cookieStore.has('next-auth.session-token');

  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 flex min-h-screen">
        {/* Only show sidebar if the user is logged in AND not on a public landing page */}
        {isAuthenticated && !isPublicRoute && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {isImpersonating && <ImpersonationBanner />}
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
