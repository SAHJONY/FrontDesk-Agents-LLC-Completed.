"use client";

import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata = {
  title: "FrontDesk Agents",
  description: "AI Voice Receptionist Platform",
};

export default function RootLayout({ children }) {
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
