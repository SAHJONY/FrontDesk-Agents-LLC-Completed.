// lib/db.ts
// Main database export - re-exports from db-simulation for now
// In production, this would connect to your actual database

export * from './db-simulation';
export { db } from './db-simulation';
