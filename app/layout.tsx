import "./globals.css";
import { headers } from "next/headers";
import { languages } from "@/config/languages"; // Import our 50-language config

export const metadata = {
  title: "FrontDesk Agents",
  description: "Enterprise AI Receptionist Platform"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // CEO Move: Access the headers set by our middleware
  const headerList = await headers();
  const locale = headerList.get('x-detected-locale') || 'en';
  const direction = headerList.get('x-detected-dir') || 'ltr';

  return (
    // The html tag now dynamically responds to the user's location
    <html lang={locale} dir={direction}>
      <body className="bg-white text-neutral-900 antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">FrontDesk Agents</a>
            <nav className="flex gap-6 text-sm items-center">
              <a href="/features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="/compliance-security" className="hover:text-blue-600 transition-colors">Compliance</a>
              <a href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <div className="h-4 w-px bg-gray-200 mx-2" /> {/* Visual separator */}
              <a href="/login" className="font-medium bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all">
                Login
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100vh-64px)]">{children}</main>

        <footer className="border-t bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex justify-between items-center">
              <div className="text-sm text-neutral-600">
                © {new Date().getFullYear()} FrontDesk Agents. All rights reserved.
              </div>
              <div className="flex gap-4 text-xs text-neutral-400">
                <span>Infrastructure: Global</span>
                <span>Security: HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
