const handleLanguageChange = (langCode: string): void => {
    const selectedLang = languages.find(l => l.code === langCode);
    
    // 1. Update Persistence
    localStorage.setItem('appLang', langCode);
    
    // 2. Update UI Direction (The CEO Touch)
    if (typeof document !== 'undefined') {
        // This line flips the entire layout for Arabic, Hebrew, etc.
        document.documentElement.dir = selectedLang?.dir || 'ltr';
        document.documentElement.lang = langCode;
    }

    // 3. Trigger Global Event
    window.dispatchEvent(new Event('languageChange'));
    setIsOpen(false);
};
