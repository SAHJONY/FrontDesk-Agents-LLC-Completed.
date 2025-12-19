import "./globals.css";
import { headers } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";
import LanguageSelector from "@/components/ui/LanguageSelector"; // Including your global selector

export const metadata = {
  title: "FrontDesk Agents",
  description: "Enterprise AI Receptionist Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Accessing headers set by our middleware
  const headerList = await headers();
  const locale = headerList.get("x-detected-locale") || "en";
  const direction = headerList.get("x-detected-dir") || "ltr";

  // Load the dictionary for the specific user locale
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className="bg-white text-neutral-900 antialiased">
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-xl tracking-tight text-blue-600">
              FrontDesk Agents
            </a>
            
            <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
              <a href="/features" className="hover:text-blue-600 transition-colors">
                {dict.navigation.features}
              </a>
              <a href="/compliance-security" className="hover:text-blue-600 transition-colors">
                {dict.navigation.compliance}
              </a>
              <a href="/pricing" className="hover:text-blue-600 transition-colors">
                {dict.navigation.pricing}
              </a>
            </nav>

            <div className="flex items-center gap-4">
              {/* The worldwide language button */}
              <LanguageSelector />
              
              <a 
                href="/login" 
                className="text-sm font-semibold bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-all shadow-sm"
              >
                {dict.navigation.login}
              </a>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-160px)]">
          {children}
        </main>

        <footer className="border-t bg-neutral-50 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} FrontDesk Agents. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              <span>Status: Global Ready</span>
              <span>Encryption: AES-256</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
