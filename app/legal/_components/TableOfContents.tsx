import React from 'react';

export default function TableOfContents() {
  return (
    <nav className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <h4 className="font-bold mb-2 text-slate-900">Table of Contents</h4>
      <ul className="list-disc ml-5 space-y-1 text-blue-600 text-sm">
        <li><a href="#introduction" className="hover:underline">Introduction</a></li>
        <li><a href="#data-collection" className="hover:underline">Data Collection</a></li>
        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
      </ul>
    </nav>
  );
}
