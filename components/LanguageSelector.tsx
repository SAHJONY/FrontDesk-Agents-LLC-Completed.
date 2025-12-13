// components/LanguageSelector.tsx - CORRECTED VERSION

"use client";

import React, { useState, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

// Utility functions now only responsible for I/O, no longer called on init
const setAppLanguage = (langCode) => {
    // CRITICAL FIX: Ensure localStorage is accessed only in the browser context
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('appLang', langCode);
        window.dispatchEvent(new Event('languageChange'));
    }
};

const getAppLanguage = () => {
    // CRITICAL FIX: Ensure localStorage is accessed only in the browser context
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('appLang') || 'en';
    }
    return 'en'; // Default for server rendering
};

export const LanguageSelector = () => {
    // FIX: Initialize state to a safe default ('en') to avoid server crash.
    const [currentLang, setCurrentLang] = useState('en'); 
    
    // FIX: Use useEffect to fetch the real, stored value only after mounting (in the browser).
    useEffect(() => {
        setCurrentLang(getAppLanguage());
        
        const handleLanguageChange = () => {
            setCurrentLang(getAppLanguage());
        };
        
        // This listener is also safe since useEffect only runs in the browser
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
