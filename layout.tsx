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
  // Await headers and cookies (Required in Next.js 15)
  const cookieStore = await cookies();
  const headerList = await headers();
  
  // 1. Get the current path (ensure middleware is passing this)
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
    '/forgot-password',
    '/solutions', // Added to cover industry pages
    '/legal'
  ];
  
  const isPublicRoute = publicRoutes.some(route => 
    currentPath === route || currentPath.startsWith(route + '/')
  );

  const isImpersonating = cookieStore.has('impersonated_owner_id');
  
  // 3. Authenticated check
  // Added a check for the standard Supabase auth cookie pattern
  const isAuthenticated = 
    cookieStore.has('auth-token') || 
    cookieStore.has('sb-access-token') || 
    cookieStore.has('fd_session') ||
    cookieStore.has('sb-') // Catch-all for Supabase-prefixed auth
  
  return (
    <html lang="en" className="h-full">
      <body className="antialiased bg-white text-gray-900 h-full">
        <div className="flex min-h-screen">
          {/* SIDEBAR LOGIC: 
              We only show the sidebar if authenticated and in the dashboard/app area.
          */}
          {isAuthenticated && !isPublicRoute && (
            <aside className="shrink-0">
              <Sidebar />
            </aside>
          )}
          
          <div className="flex-1 flex flex-col min-w-0">
            {isImpersonating && <ImpersonationBanner />}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
