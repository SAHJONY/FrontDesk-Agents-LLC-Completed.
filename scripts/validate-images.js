// scripts/validate-images.js
// Scans public/images and reports missing premium files listed in manifest below.

const fs = require("fs");
const path = require("path");

const publicDir = path.join(process.cwd(), "public", "images");

// list of required paths relative to public/images
const required = [
  "premium/hero-cinematic.jpg",
  "premium/hero-cinematic.webp",
  "premium/hero-cinematic.avif",
  "premium/command-center-dark.jpg",
  "premium/command-center-dark.avif",
  "premium/command-center-light.jpg",
  "premium/industries/construction.jpg",
  "premium/industries/healthcare.jpg",
  "premium/industries/law.jpg",
  "premium/industries/logistics.jpg",
  "premium/industries/medical.jpg",
  "premium/team/agents-grid.jpg",
  "premium/banners/marketing-banner.jpg"
];

const missing = [];
required.forEach(rel => {
  const p = path.join(publicDir, rel);
  if (!fs.existsSync(p)) missing.push(rel);
});

if (missing.length) {
  console.error("Missing required premium images:");
  missing.forEach(m => console.error("  -", m));
  process.exitCode = 2;
  process.exit(2);
} else {
  console.log("All premium images present.");
  process.exit(0);
}
