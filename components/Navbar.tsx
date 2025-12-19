// ./components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[var(--color-navy-dark)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg rotate-3 group-hover:rotate-0 transition-transform" />
          <span className="font-bold text-xl tracking-tight text-white">
            FrontDesk<span className="text-[var(--color-primary)]">Agents</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="/legal/privacy" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Legal</Link>
          
          <div className="h-4 w-[1px] bg-gray-700" />
          
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white">Login</Link>
          <Link 
            href="/get-started" 
            className="bg-[var(--color-primary)] text-[var(--color-navy-dark)] px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
          >
            Deploy SARA
          </Link>
        </div>

        {/* Mobile Menu Toggle (Simplified for brevity) */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
