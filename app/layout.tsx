import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "24/7 AI Reception - FrontDesk Agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
