import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import TopNav from "@/components/TopNav";

export const metadata = {
  title: 'FrontDesk Agents: Global Revenue Workforce',
  description: 'Elite AI-powered litigation, arbitration, and revenue operations serving global markets locally.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TopNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
