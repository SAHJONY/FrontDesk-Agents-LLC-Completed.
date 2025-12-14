'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  PhoneIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Fortune500Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'AI Automations', href: '/automations', icon: PhoneIcon },
    { name: 'Client Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Legal Center', href: '/legal/terms', icon: BookOpenIcon },
    { name: 'Support & Help', href: '/support', icon: QuestionMarkCircleIcon },
  ];

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#000814]">
      {/* Top Navigation Bar - Fortune 500 Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {sidebarOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FD</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold">
                    <span className="text-white">FrontDesk</span>
                    <span className="text-cyan-400">Agents</span>
                  </div>
                  <div className="text-xs text-gray-400">AI Receptionist Command Center</div>
                </div>
              </Link>
            </div>

            {/* Right Side - Search, Notifications, Profile */}
            <div className="flex items-center gap-3">
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-white">Admin User</div>
                  <div className="text-xs text-gray-400">admin@company.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar - Fortune 500 Style */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-40 w-72 bg-[#0a1929]/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* SARA Status Card */}
          <div className="p-6 border-b border-white/10">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">SARA AI</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-300">
                Contact: <span className="text-cyan-400 font-medium">+1 (216) 480-4413</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-all ${
                      active ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400'
                    }`}
                  />
                  <span>{item.name}</span>
                  {active && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <UserCircleIcon className="w-5 h-5" />
              <span className="font-medium">My Profile</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16">
        <div className="min-h-screen">
          {children}
        </div>

        {/* Footer - Fortune 500 Style */}
        <footer className="border-t border-white/10 bg-[#0a1929]/50 backdrop-blur-xl">
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FD</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">FrontDesk Agents</div>
                    <div className="text-xs text-gray-400">AI-Powered Reception</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Fortune 500-level AI automation to handle your front desk operations 24/7. 
                  HIPAA compliant, enterprise-grade security.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400">99.9% Uptime Guaranteed</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
                  <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
                  <li><Link href="/demo" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Request Demo</Link></li>
                  <li><Link href="/contact-sales" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Contact Sales</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/legal/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/legal/terms" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/legal/security" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Security</Link></li>
                  <li><Link href="/legal/compliance" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">HIPAA Compliance</Link></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2024 FrontDesk Agents LLC. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500">Made with ❤️ in Houston, TX</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-xs text-cyan-400 font-medium">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
