import type { Metadata } from "next";
import "./globals.css";
import MainNav from "./components/MainNav";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist SaaS platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <MainNav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
