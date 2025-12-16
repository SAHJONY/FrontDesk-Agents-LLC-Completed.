import "./globals.css";

export const metadata = {
  title: "FrontDesk Agents",
  description: "Enterprise AI Receptionist Platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">FrontDesk Agents</a>
            <nav className="flex gap-6 text-sm">
              <a href="/features">Features</a>
              <a href="/compliance-security">Compliance</a>
              <a href="/pricing">Pricing</a>
              <a href="/login" className="font-medium">Login</a>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100vh-64px)]">{children}</main>

        <footer className="border-t">
          <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-neutral-600">
            © {new Date().getFullYear()} FrontDesk Agents. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
