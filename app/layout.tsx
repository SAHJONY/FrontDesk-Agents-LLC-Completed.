import './globals.css';

export const metadata = {
  title: 'FrontDesk Agents',
  description: 'Enterprise AI Reception & Automation Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F1A] text-white">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="
            w-64
            bg-[#111827]
            border-r border-[#374151]
            px-4 py-6
          ">
            <div className="text-xl font-semibold mb-8">
              FrontDesk Agents
            </div>

            <nav className="space-y-2 text-sm">
              <div className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                Operations
              </div>
              <a className="block px-3 py-2 rounded-lg hover:bg-[#1F2937]">
                Dashboard
              </a>
              <a className="block px-3 py-2 rounded-lg hover:bg-[#1F2937]">
                Automations
              </a>
              <a className="block px-3 py-2 rounded-lg hover:bg-[#1F2937]">
                Compliance
              </a>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {/* Header */}
            <header className="
              h-16
              flex items-center justify-between
              px-8
              bg-[#111827]
              border-b border-[#374151]
            ">
              <h2 className="text-lg font-medium">
                Enterprise Console
              </h2>
            </header>

            {/* Content */}
            <section className="p-8">
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
