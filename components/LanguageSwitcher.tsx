  const handleLanguageChange = (code: string) => {
    // 1. Set cookie for Middleware
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 2. Get current URL path (e.g., /en/about)
    const pathname = window.location.pathname;
    const segments = pathname.split('/');

    // 3. Check if the first segment is an existing language code
    const hasLocale = languages.some(l => l.code === segments[1]);

    if (hasLocale) {
      // Replace existing locale (e.g., /en/dashboard -> /es/dashboard)
      segments[1] = code;
    } else {
      // Add locale if missing (e.g., /dashboard -> /es/dashboard)
      segments.splice(1, 0, code);
    }

    const newPath = segments.join('/') || '/';
    
    // 4. Navigate to the new URL
    window.location.href = newPath; 
  };
