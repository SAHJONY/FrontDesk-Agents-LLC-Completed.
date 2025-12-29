import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Corrected path: relative to /app/layout.tsx
import { AuthProvider } from "@/context/AuthContext"; // Ensure this exists in /context

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FrontDesk Agents | Global Revenue Workforce",
  description: "High-performance AI revenue nodes for global markets.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-zinc-50 antialiased">
        <AuthProvider>
          {/* Main layout wrapper for the 30-route platform */}
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
