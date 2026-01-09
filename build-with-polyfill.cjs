// Set global polyfills before Next.js build
global.self = global;
global.window = global;

// Run Next.js build
const { execSync } = require('child_process');
execSync('npx next build', { stdio: 'inherit' });
