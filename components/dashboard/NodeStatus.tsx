'use client';

import React from 'react';

// Use a Named Export to align with your page.tsx import
export const NodeStatus = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
        Node: pdx1 | Status: Online
      </span>
    </div>
  );
};
