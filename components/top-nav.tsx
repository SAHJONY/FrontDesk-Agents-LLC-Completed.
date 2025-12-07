// components/top-nav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            FrontDesk Agents
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className={`${pathname === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
              Dashboard
            </Link>
            <Link href="/bookings" className={`${pathname === '/bookings' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
              Bookings
            </Link>
            <Link href="/guests" className={`${pathname === '/guests' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
              Guests
            </Link>
            <Link href="/rooms" className={`${pathname === '/rooms' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
              Rooms
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search" 
            className="px-3 py-1 border rounded text-sm hidden md:block"
          />
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
