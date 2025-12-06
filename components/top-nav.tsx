import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/setup', label: 'Setup' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
