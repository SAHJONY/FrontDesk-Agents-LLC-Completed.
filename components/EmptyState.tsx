// components/EmptyState.tsx

"use client";

import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
    title: string;
    message: string;
    ctaText: string;
    onCtaClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, ctaText, onCtaClick }) => {
    return (
        <div className="text-center p-12 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
            <PlusCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-xl font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {/* Icono pequeño opcional */}
                    {/* <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
                    {ctaText}
                </button>
            </div>
        </div>
    );
};
