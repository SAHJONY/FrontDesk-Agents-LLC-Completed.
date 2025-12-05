import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrontDesk Agents • AI Voice Receptionist",
  description:
    "24/7 AI voice receptionists that answer, qualify and schedule calls for your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
