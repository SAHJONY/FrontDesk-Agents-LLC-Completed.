// components/LanguageSelector.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

// Mock de la función de traducción
const setAppLanguage = (langCode) => {
    localStorage.setItem('appLang', langCode);
    window.dispatchEvent(new Event('languageChange'));
};

const getAppLanguage = () => {
    return localStorage.getItem('appLang') || 'en';
};

export const LanguageSelector = () => {
    const [currentLang, setCurrentLang] = useState(getAppLanguage());

    const handleChange = (e) => {
        const newLang = e.target.value;
        setCurrentLang(newLang);
        setAppLanguage(newLang);
    };

    // Sincronizar el estado con el evento global
    useEffect(() => {
        const handleLanguageChange = () => {
            setCurrentLang(getAppLanguage());
        };
        window.addEventListener('languageChange', handleLanguageChange);
        return () => window.removeEventListener('languageChange', handleLanguageChange);
    }, []);

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
