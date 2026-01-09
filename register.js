// Global polyfill for 'self' to fix "self is not defined" error
// This runs before Next.js build process starts
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

console.log('✅ Global polyfill registered: self =', typeof self);
