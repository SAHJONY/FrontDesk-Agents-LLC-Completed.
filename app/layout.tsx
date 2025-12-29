import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Corrected: Path is now relative to this file in /app
import { AuthProvider } from "@/context/AuthContext"; // Corrected: Uses root alias

const inter = Inter({ subsets: ["latin"] });

/**
 * FRONTDESK AGENTS: SOVEREIGN ROOT LAYOUT
 * * Deployed to Western Corridor (pdx1)
 * * Workforce: Autonomous RL-Agents
 */

export const metadata: Metadata = {
  title: "FrontDesk Agents | Global Revenue Hub",
  description: "Autonomous Agentic Workforce for Global Revenue Recovery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* The AuthProvider enables session persistence for the 30-route fleet */}
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
