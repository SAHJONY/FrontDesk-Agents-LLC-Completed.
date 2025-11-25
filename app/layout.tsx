import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "Deploy an AI receptionist in minutes. Answer calls 24/7, turn calls into booked appointments, and monitor everything from a single command center.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="fd-root">
        <div className="fd-background-glow" />
        {children}
      </body>
    </html>
  );
}
