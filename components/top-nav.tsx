// components/top-nav.tsx
"use client";

import { useState } from 'react';
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
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                <span className="text-blue-600">FrontDesk</span>
                <span className="text-gray-800">Agents</span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
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
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 border rounded text-sm"
              />
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <div className="h-0.5 w-6 bg-gray-600 mb-1"></div>
                <div className="h-0.5 w-6 bg-gray-600 mb-1"></div>
                <div className="h-0.5 w-6 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
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
      </div>
    </div>
  );
};

export default TopNav;
