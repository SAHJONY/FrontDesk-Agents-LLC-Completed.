// lib/security/jwt.ts
import jwt from "jsonwebtoken";
import { serverEnv } from "@/lib/env/server";

export type JwtClaims = {
  sub: string;              // userId
  workspaceId?: string;
  roles?: string[];
  iat?: number;
  exp?: number;
};

export function verifyBearerToken(authHeader: string | null): JwtClaims | null {
  if (!authHeader) return null;
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return null;

  try {
    return jwt.verify(token, serverEnv.JWT_SECRET) as JwtClaims;
  } catch {
    return null;
  }
}
