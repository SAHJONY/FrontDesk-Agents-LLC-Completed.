import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Path adjusted: globals.css is located in the src/ directory
import "../globals.css"; 
// Using the @ alias which is configured in your tsconfig.json to point to /src
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sovereign Global Financial Hub",
  description: "Autonomous AI Receptionist Fleet & Global Financial Infrastructure",
  // Note: viewport is now handled via the viewport export in Next.js 15
};

// Next.js 15 Viewport Configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Node Activation Wrapper */}
          <main className="relative min-h-screen flex flex-col">
            {children}
          </main>
          
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
