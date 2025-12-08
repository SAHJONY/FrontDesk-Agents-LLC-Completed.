// components/top-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Bookings", href: "/bookings" },
    { name: "Guests", href: "/guests" },
    { name: "Rooms", href: "/rooms" },
    { name: "Staff", href: "/staff" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                FrontDesk Agents
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === link.href
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              className="px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              onClick={() => alert("Language switched")}
            >
              🌐 EN
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => alert("Theme toggled")}
            >
              🌙
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
