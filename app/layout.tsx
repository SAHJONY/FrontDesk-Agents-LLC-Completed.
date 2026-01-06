import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist & Revenue Workforce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Topbar />
              <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
