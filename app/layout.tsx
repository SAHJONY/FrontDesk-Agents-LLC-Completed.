// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "Deploy AI receptionists in minutes. Answer calls 24/7, book appointments and capture leads automatically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          {children}
        </div>
      </body>
    </html>
  );
}
