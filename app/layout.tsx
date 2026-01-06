import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Sidebar from "./components/Sidebar"; // Adjusted to match standard default exports
import Topbar from "./components/Topbar";   // Adjusted to match standard default exports

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist & Revenue Workforce Platform",
};

/**
 * Root Layout
 * Integrates ChatGPT-style Dark Mode, Localized Context, and Sidebar Navigation.
 * Fulfills the "Local Platform" requirement for all global markets.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar provides owner-level navigation if the user is authenticated as owner */}
            <Sidebar />
            
            <div className="flex flex-1 flex-col">
              {/* Topbar contains the Light/Dark toggle and Language switcher */}
              <Topbar />
              
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
