/**
 * Next.js Instrumentation
 * Runs once when the server starts
 */

export async function register() {
  // Load polyfills for server-side rendering
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Polyfill 'self' for libraries that expect it
    if (typeof self === 'undefined') {
      (global as any).self = global;
    }
  }
}
