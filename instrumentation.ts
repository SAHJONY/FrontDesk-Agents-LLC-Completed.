/**
 * Next.js Instrumentation Hook
 * Runs before any other code during build and runtime
 * Used to polyfill browser globals for Node.js environment
 */

export async function register() {
  // Only run on server side (Node.js environment)
  if (typeof window === 'undefined') {
    // Polyfill browser globals that client-side libraries expect
    // This prevents "self is not defined" errors during build
    if (typeof global.self === 'undefined') {
      (global as any).self = global;
    }
    
    if (typeof global.window === 'undefined') {
      (global as any).window = global;
    }
    
    if (typeof global.document === 'undefined') {
      (global as any).document = {};
    }
    
    if (typeof global.navigator === 'undefined') {
      (global as any).navigator = {
        userAgent: 'node',
      };
    }
    
    console.log('✅ Global polyfills registered for Node.js environment');
  }
}
