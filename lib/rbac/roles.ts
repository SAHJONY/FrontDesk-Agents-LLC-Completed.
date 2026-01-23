// lib/rbac/roles.ts
export const ROLES = ["OWNER", "ADMIN", "MANAGER", "AGENT", "VIEWER"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
