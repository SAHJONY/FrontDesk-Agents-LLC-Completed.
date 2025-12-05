import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist SaaS",
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
