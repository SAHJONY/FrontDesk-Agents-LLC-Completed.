// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist",
  description:
    "24/7 AI receptionist that answers, texts and books appointments for your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
