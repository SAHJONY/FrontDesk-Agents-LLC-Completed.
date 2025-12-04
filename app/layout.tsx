import "./globals.css";
import type { Metadata } from "next";
import LanguageProvider from "./providers/LanguageProvider";
import GlobalHeader from "./components/GlobalHeader";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist 24/7",
  description:
    "AI receptionists that answer, qualify and route your calls 24/7 so you stop losing money every time the phone rings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <LanguageProvider>
          <GlobalHeader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
