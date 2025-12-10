import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/top-nav"; // Assuming TopNav is now fixed and available

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents - AI Communications",
  description: "Enterprise-grade front desk automation. Turn every call into revenue with human-like AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
