// components/LanguageSelector.tsx - CRITICAL FIX for localStorage
"use client";

import React, { useState, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

// Utility functions MUST be safe for server/client
const setAppLanguage = (langCode) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('appLang', langCode);
        window.dispatchEvent(new Event('languageChange'));
    }
};

const getAppLanguage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('appLang') || 'en';
    }
    return 'en'; // Safe default for Server-Side Rendering
};

export const LanguageSelector = () => {
    // FIX 1: Initialize to a safe default. The actual value is loaded in useEffect.
    const [currentLang, setCurrentLang] = useState('en'); 
    
    // FIX 2: Load the language from localStorage ONLY after mounting (Client-side)
    useEffect(() => {
        // Hydrate state with actual stored value
        setCurrentLang(getAppLanguage());
        
        const handleLanguageChange = () => {
            setCurrentLang(getAppLanguage());
        };
        
        window.addEventListener('languageChange', handleLanguageChange);
        return () => window.removeEventListener('languageChange', handleLanguageChange);
    }, []);

    const handleChange = (e) => {
        const newLang = e.target.value;
        setCurrentLang(newLang);
        setAppLanguage(newLang);
    };

    return (
        <div className="flex items-center gap-2">
            <GlobeAltIcon className="h-5 w-5 text-gray-500" />
            <select
                value={currentLang}
                onChange={handleChange} // This is the handler that was causing the serialization error if the component was missing "use client"
                className="select-premium border-gray-300 py-1 pl-3 pr-8 text-sm rounded-md"
            >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇲🇽 Español</option>
            </select>
        </div>
    );
};
