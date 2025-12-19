'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { 
  CheckBadgeIcon, 
  ArrowRightIcon, 
  RocketLaunchIcon,
  ShieldCheckIcon,
  CpuChipIcon
} from '@heroicons/react/24/solid';

// CEO Fix: Add the ignore comment right here
// @ts-ignore
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  // CEO Touch: Celebrate the new partnership
  useEffect(() => {
    // Adding a second ignore here just to be 100% safe for the build
    // @ts-ignore
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#3b82f6', '#60a5fa']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-4">
      {/* ... the rest of your beautiful UI code ... */}
      
