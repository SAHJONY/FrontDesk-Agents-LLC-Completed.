import "./globals.css";
import type { Metadata } from "next";

import { LanguageProvider } from "./components/LanguageProvider";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <MainNav />
          <div className="min-h-screen w-full">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
