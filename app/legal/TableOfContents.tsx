// app/legal/_components/TableOfContents.tsx
import React from 'react';

export default function TableOfContents() {
  return (
    <nav className="mb-8 p-4 bg-slate-100 rounded">
      <h4 className="font-bold mb-2">Table of Contents</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li><a href="#introduction" className="text-blue-600 hover:underline">Introduction</a></li>
        <li><a href="#data-collection" className="text-blue-600 hover:underline">Data Collection</a></li>
        <li><a href="#contact" className="text-blue-600 hover:underline">Contact Us</a></li>
      </ul>
    </nav>
  );
}
