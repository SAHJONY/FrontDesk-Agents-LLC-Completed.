'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Controls from '@/app/components/Controls';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata = {
  title: 'FrontDesk Agents',
  description: 'Enterprise-grade platform deployment for FrontDesk Agents LLC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {children}
            <Controls />
          </motion.div>
        </AnimatePresence>
        <Analytics />
      </body>
    </html>
  );
}
