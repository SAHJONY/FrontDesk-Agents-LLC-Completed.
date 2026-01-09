/**
 * Global Polyfills for Server-Side Rendering
 * 
 * Provides browser globals that some client-side libraries expect
 */

// Polyfill 'self' for libraries that expect it
if (typeof self === 'undefined') {
  (global as any).self = global;
}

// Polyfill 'window' for libraries that expect it
if (typeof window === 'undefined') {
  (global as any).window = global;
}

export {};
