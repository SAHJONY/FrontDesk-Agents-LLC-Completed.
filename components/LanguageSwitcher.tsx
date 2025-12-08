// components/LanguageSwitcher.tsx
"use client";

export default function LanguageSwitcher() {
  return (
    <div className="relative">
      <button className="flex items-center space-x-1 px-3 py-2 text-sm rounded-md hover:bg-gray-100">
        <span>🌐</span>
        <span>EN</span>
      </button>
    </div>
  );
}
