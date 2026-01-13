/**
 * Prebuild Script
 * Comprehensive polyfills for browser globals in Node.js environment
 * Prevents build errors from client-side libraries during Next.js build
 */

// Polyfill global.self (most important for socket.io-client and other libs)
if (typeof global.self === 'undefined') {
  global.self = global;
  console.log('✅ Polyfilled global.self');
}

// Polyfill global.window with essential properties
if (typeof global.window === 'undefined') {
  global.window = {
    ...global,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    setTimeout: global.setTimeout,
    setInterval: global.setInterval,
    clearTimeout: global.clearTimeout,
    clearInterval: global.clearInterval,
    location: {
      href: '',
      origin: '',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
    },
    history: {
      pushState: () => {},
      replaceState: () => {},
      back: () => {},
      forward: () => {},
      go: () => {},
      length: 0,
      state: null,
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    },
    matchMedia: () => ({
      matches: false,
      media: '',
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    getComputedStyle: () => ({}),
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
  };
  console.log('✅ Polyfilled global.window');
}

// Polyfill global.document with essential DOM APIs
if (typeof global.document === 'undefined') {
  global.document = {
    createElement: (tag) => ({
      tagName: tag,
      style: {},
      setAttribute: () => {},
      getAttribute: () => null,
      removeAttribute: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      appendChild: () => {},
      removeChild: () => {},
      children: [],
      childNodes: [],
      parentNode: null,
    }),
    createElementNS: (ns, tag) => ({
      tagName: tag,
      style: {},
      setAttribute: () => {},
      getAttribute: () => null,
    }),
    getElementById: () => null,
    getElementsByClassName: () => [],
    getElementsByTagName: () => [],
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    body: {
      style: {},
      appendChild: () => {},
      removeChild: () => {},
      children: [],
    },
    head: {
      appendChild: () => {},
      removeChild: () => {},
      children: [],
    },
    documentElement: {
      style: {},
      clientWidth: 1024,
      clientHeight: 768,
    },
    cookie: '',
    readyState: 'complete',
  };
  console.log('✅ Polyfilled global.document');
}

// Polyfill global.navigator
if (typeof global.navigator === 'undefined') {
  global.navigator = {
    userAgent: 'Mozilla/5.0 (Node.js)',
    platform: 'node',
    language: 'en-US',
    languages: ['en-US', 'en'],
    onLine: true,
    cookieEnabled: true,
  };
  console.log('✅ Polyfilled global.navigator');
}

// Polyfill global.location
if (typeof global.location === 'undefined') {
  global.location = {
    href: 'http://localhost:3000/',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: () => {},
    replace: () => {},
    reload: () => {},
  };
  console.log('✅ Polyfilled global.location');
}

// Polyfill performance API
if (typeof global.performance === 'undefined') {
  global.performance = {
    now: () => Date.now(),
    timing: {},
    navigation: {},
  };
  console.log('✅ Polyfilled global.performance');
}

// Polyfill fetch (if not already available)
if (typeof global.fetch === 'undefined') {
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => '',
    blob: async () => new Blob(),
  });
  console.log('✅ Polyfilled global.fetch');
}

// Polyfill WebSocket
if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = class WebSocket {
    constructor() {
      this.readyState = 0;
    }
    send() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  };
  console.log('✅ Polyfilled global.WebSocket');
}

console.log('🚀 Prebuild polyfills complete - ready for Next.js build');
