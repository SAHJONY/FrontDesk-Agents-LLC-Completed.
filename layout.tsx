import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import './globals.css';
import ImpersonationBanner from '@/components/admin/ImpersonationBanner';
import Sidebar from '@/components/Sidebar'; 

export const metadata: Metadata = {
  title: 'FrontDesk Agents | AI-Powered Revenue Workforce',
  description: '24/7 AI-powered voice, SMS, and email agents that qualify leads, book appointments, and drive revenue automatically.',
  metadataBase: new URL('https://frontdeskagents.com'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerList = await headers();
  
  // 1. Get the current path from the header we set in middleware.ts
  const currentPath = headerList.get('x-url') || '/'; 

  // 2. Define public routes where the sidebar should stay hidden
  const publicRoutes = [
    '/', 
    '/login', 
    '/signup', 
    '/pricing', 
    '/features', 
    '/demo', 
    '/support',
    '/forgot-password'
  ];
  
  // Check if the current path matches or starts with a public route
  const isPublicRoute = publicRoutes.some(route => 
    currentPath === route || currentPath.startsWith(route + '/')
  );

  const isImpersonating = cookieStore.has('impersonated_owner_id');
  
  // 3. Authenticated check (Checking for any of your possible auth cookies)
  const isAuthenticated = 
    cookieStore.has('auth-token') || 
    cookieStore.has('sb-access-token') || 
    cookieStore.has('fd_session');

  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <div className="flex min-h-screen">
          {/* SIDEBAR LOGIC: 
              Show if user IS authenticated AND NOT on a public landing page.
          */}
          {isAuthenticated && !isPublicRoute && <Sidebar />}
          
          <div className="flex-1 flex flex-col min-w-0">
            {isImpersonating && <ImpersonationBanner />}
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
