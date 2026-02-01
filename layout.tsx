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
  // 1. Safe Header/Cookie Retrieval
  let currentPath = '/';
  let isImpersonating = false;
  let isAuthenticated = false;

  try {
    const cookieStore = await cookies();
    const headerList = await headers();
    
    // Check if middleware passed the URL, otherwise default to root
    currentPath = headerList.get('x-pathname') || '/'; 

    isImpersonating = cookieStore.has('impersonated_owner_id');
    
    // Check for any sign of a session
    isAuthenticated = cookieStore.getAll().some(c => 
      c.name.startsWith('sb-') || 
      c.name === 'auth-token' || 
      c.name === 'token'
    );
  } catch (e) {
    console.error("Auth check failed in layout, defaulting to public view:", e);
  }

  // 2. Public Route Logic
  const publicRoutes = ['/', '/login', '/signup', '/pricing', '/features', '/demo', '/support', '/forgot-password', '/solutions', '/legal', '/debug'];
  const isPublicRoute = publicRoutes.some(route => 
    currentPath === route || currentPath.startsWith(`${route}/`)
  );

  return (
    <html lang="en" className="h-full">
      <body className="antialiased bg-white text-gray-900 h-full">
        <div className="flex min-h-screen">
          {/* Only show Sidebar if we are CERTAIN we are in a protected area */}
          {isAuthenticated && !isPublicRoute && (
            <aside className="shrink-0">
              <Sidebar />
            </aside>
          )}
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {isImpersonating && <ImpersonationBanner />}
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
