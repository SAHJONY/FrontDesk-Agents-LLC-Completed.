import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // CEO Move: Read the language and direction from our Middleware headers
  const headerList = await headers()
  const lang = headerList.get('x-detected-locale') || 'en'
  const dir = headerList.get('x-detected-dir') || 'ltr'

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-50 antialiased font-sans">
        {/* Cinematic Background Overlay (Applies to all pages) */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000')] bg-cover bg-center opacity-10 brightness-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        </div>

        <Navbar />
        
        <main className="relative pt-20">
          {children}
        </main>

        {/* Global Footer (Optional) */}
        <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} FrontDesk Agents LLC. All Rights Reserved.
        </footer>
      </body>
    </html>
  )
}
