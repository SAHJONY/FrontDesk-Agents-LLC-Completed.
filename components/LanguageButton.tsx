// components/LanguageButton.tsx
return (
  <div className="relative z-[9999]"> {/* Force it to the top layer */}
    <button 
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 px-3 py-2 border-2 border-blue-500 rounded-lg bg-white text-black" // Blue border to find it
    >
      <Globe size={18} />
      <span>Language</span>
    </button>
    {/* ... rest of your dropdown code ... */}
  </div>
)
