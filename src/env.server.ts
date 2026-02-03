import "server-only";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

export const serverEnv = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Database
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1).optional(),

    // Auth
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRATION: z.string().default("24h"),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(32).optional(),

    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

    // OpenAI / Bland (optional)
    OPENAI_API_KEY: z.string().min(1).optional(),
    BLAND_API_KEY: z.string().min(1).optional(),
    BLAND_WEBHOOK_SECRET: z.string().min(1).optional(),

    // Stripe (optional)
    STRIPE_SECRET_KEY: z.string().min(1).optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

    // Cron / webhook security
    CRON_SECRET: z.string().min(16).optional(),
    WEBHOOK_SECRET: z.string().min(16).optional(),

    // Feature flags
    ENABLE_AI_WORKFORCE: z.string().optional(),
    ENABLE_ANALYTICS: z.string().optional(),
    DEBUG: z.string().optional(),
  })
  .superRefine((env, ctx) => {
    // Enforce stronger requirements in prod
    if (isProd) {
      // If you rely on Vercel Cron, require CRON_SECRET
      if (!env.CRON_SECRET) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CRON_SECRET is required in production",
        });
      }

      // If Stripe is configured, require the webhook secret too
      if (env.STRIPE_SECRET_KEY && !env.STRIPE_WEBHOOK_SECRET) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "STRIPE_WEBHOOK_SECRET is required when STRIPE_SECRET_KEY is set",
        });
      }
    }
  })
  .parse(process.env);
