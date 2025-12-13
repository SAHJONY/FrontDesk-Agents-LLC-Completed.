// components/LanguageSelector.tsx - Corrected Logic

"use client";

import React, { useState, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

// Safely wraps localStorage access
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
    // Return a safe default value if running on the server
    return 'en'; 
};

export const LanguageSelector = () => {
    // FIX: Initialize to a safe default to avoid server-side localStorage call
    const [currentLang, setCurrentLang] = useState('en'); 
    
    // FIX: Load the actual stored language ONLY after mounting (client-side)
    useEffect(() => {
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
                onChange={handleChange}
                className="select-premium border-gray-300 py-1 pl-3 pr-8 text-sm rounded-md"
            >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇲🇽 Español</option>
            </select>
        </div>
    );
};
