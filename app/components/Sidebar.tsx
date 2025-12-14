// ./app/components/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  PhoneIcon,
  CodeBracketSquareIcon,
  BookOpenIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: ChartBarSquareIcon },
  { href: '/automations', label: 'AI Automations', icon: PhoneIcon },
  { href: '/settings', label: 'Client Settings', icon: Cog6ToothIcon },
  { href: '/legal/terms', label: 'Legal Center', icon: BookOpenIcon },
  { href: '/support', label: 'Support & Help', icon: CodeBracketSquareIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return `
      flex items-center p-3 rounded-lg transition-colors duration-150 ease-in-out
      ${isActive 
        ? 'bg-indigo-700 text-white font-semibold shadow-lg' 
        : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
      }
    `;
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 border-r border-indigo-900/50 shadow-2xl">
      
      {/* FD Logo and Branding (Matching provided logo style) */}
      <div className="p-6 border-b border-indigo-900/50">
        <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center">
            <span className="bg-blue-600 rounded-full w-6 h-6 mr-3 flex items-center justify-center text-xs font-bold text-white">FD</span>
            FrontDesk Agents
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={getLinkClasses(item.href)}>
            <item.icon className="w-6 h-6 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
        
        {/* Separator */}
        <div className="border-t border-indigo-900/50 pt-2 mt-2"></div>

        {/* Static Footer Links/Profile Placeholder */}
        <Link href="/settings/profile" className={getLinkClasses('/settings/profile')}>
            <UsersIcon className="w-6 h-6 mr-3" />
            <span>My Profile</span>
        </Link>
        
        {/* Logout */}
        <Link href="/login" className="flex items-center p-3 rounded-lg text-red-400 hover:bg-red-900/50 hover:text-white transition-colors duration-150 mt-4">
            <ArrowRightStartOnRectangleIcon className="w-6 h-6 mr-3" />
            <span>Logout</span>
        </Link>
      </nav>

      {/* Footer / Contact */}
      <div className="p-4 text-xs text-indigo-400 border-t border-indigo-900/50">
        <p className="font-semibold">SARA AI is Active</p>
        <p>Contact: +1 (216) 480-4413</p>
      </div>
    </div>
  );
}
