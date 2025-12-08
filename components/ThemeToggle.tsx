// components/ThemeToggle.tsx
"use client";

export function ThemeToggle() {
  const toggleTheme = () => {
    // Simple theme toggle logic
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100"
    >
      🌙
    </button>
  );
}
