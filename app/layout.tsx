import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./components/top-nav";

export const metadata: Metadata = {
  title: "FrontDesk Agents · AI Receptionist SaaS",
  description:
    "FrontDesk Agents: 24/7 AI phone receptionist for clinics, law firms and enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className="min-h-screen bg-black text-neutral-100">
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 pb-10 pt-6">{children}</main>
      </body>
    </html>
  );
}
