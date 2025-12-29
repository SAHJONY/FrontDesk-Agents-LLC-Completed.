import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sovereign Global Financial Hub",
  description: "Autonomous AI Receptionist Fleet & Global Financial Infrastructure",
  viewport: "width=device-width, initial-scale=1",
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
          {/* Main Content Wrapper for Global Node Activation */}
          <main className="relative min-h-screen flex flex-col">
            {children}
          </main>
          
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
