// components/top-nav.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Bookings', href: '/bookings' },
    { name: 'Guests', href: '/guests' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Staff', href: '/staff' },
    { name: 'Reports', href: '/reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className="block h-0.5 w-6 bg-gray-700 mb-1"></span>
                <span className="block h-0.5 w-6 bg-gray-700 mb-1"></span>
                <span className="block h-0.5 w-6 bg-gray-700"></span>
              </div>
            </button>
            
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">FD</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                FrontDeskAgents
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:ml-10 lg:block">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === link.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="search"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-sm"
                placeholder="Search..."
              />
            </div>
            
            <button className="p-2">
              <div className="relative">
                <div className="w-5 h-5 border-2 border-gray-700 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </button>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500"></div>
              <span className="ml-2 hidden md:block">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
