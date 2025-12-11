// types/index.ts (or wherever your shared types are defined)

// ... other interfaces and types might exist above this ...

/**
 * Defines the structure for image data used in the Hero section.
 * This is the type that needs to include 'src' to fix the error.
 */
export interface HeroImage {
  src: string;        // <-- CRITICAL FIX: The required primary image source
  alt: string;
  srcWebp?: string;   // Optional source for WebP format
  width?: number;
  height?: number;
}

// ... other interfaces and types might exist below this ...

// Example of another export (if applicable):
// export interface UserProfile {
//   id: string;
//   name: string;
// }
