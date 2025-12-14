'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  PlayCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'AI Agents', href: '/ai-agents', description: 'Meet SARA - Your AI receptionist' },
        { name: 'Industries', href: '/industries', description: 'Healthcare, Legal, Real Estate' },
        { name: 'Features', href: '/product', description: 'All platform capabilities' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Support', href: '/support' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">FD</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold">
                <span className="text-white">FrontDesk</span>
                <span className="text-cyan-400">Agents</span>
              </div>
              <div className="text-xs text-gray-400">Enterprise AI Reception</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                    className="relative"
                  >
                    <button className="flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors">
                      {item.name}
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {productsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-[#0a1929]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 hover:bg-white/5 transition-all group"
                          >
                            <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                              {subItem.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {subItem.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/demo"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium transition-all"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Demo
            </Link>
            <a
              href="tel:+12164804413"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <PhoneIcon className="w-5 h-5" />
              Call Sara Now
            </a>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all"
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {productsOpen && (
                        <div className="ml-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive(item.href)
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  Watch Demo
                </Link>
                <a
                  href="tel:+12164804413"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call Sara Now
                </a>
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white font-medium text-center hover:bg-white/10 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
