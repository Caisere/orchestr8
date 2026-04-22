import { config } from "dotenv"
import { expand } from "dotenv-expand"
import path from "node:path"
import { z } from "zod/v4"

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
  }),
)

// Core — always required at startup
const CoreEnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string().min(1),
})

// Better Auth — validated when auth module is imported
export const BetterAuthEnvSchema = z.object({
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
})

// Email — validated when email module is imported
export const EmailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
})

// Sentry — validated when sentry config is imported
export const SentryEnvSchema = z.object({
  SENTRY_DSN: z.url(),
  NEXT_PUBLIC_SENTRY_DSN: z.url(),
})

// Inngest — validated when inngest client is imported
export const InngestEnvSchema = z.discriminatedUnion("NODE_ENV", [
  z.object({
    NODE_ENV: z.literal("development"),
    INNGEST_DEV: z.literal("1"),
  }),
  z.object({
    NODE_ENV: z.literal("production"),
    INNGEST_SIGNING_KEY: z.string().min(1),
    INNGEST_EVENT_KEY: z.string().min(1),
  }),
  z.object({
    NODE_ENV: z.literal("test"),
    INNGEST_DEV: z.literal("1"),
  }),
])

// AI providers — validated when inngest functions are imported
export const AIEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
})

export type CoreEnv = z.infer<typeof CoreEnvSchema>
export type BetterAuthEnv = z.infer<typeof BetterAuthEnvSchema>
export type EmailEnv = z.infer<typeof EmailEnvSchema>
export type SentryEnv = z.infer<typeof SentryEnvSchema>
export type InngestEnv = z.infer<typeof InngestEnvSchema>
export type AIEnv = z.infer<typeof AIEnvSchema>

const { data: coreEnv, error } = CoreEnvSchema.safeParse(process.env)

if (error) {
  console.error("❌ Invalid env:")
  console.error(JSON.stringify(z.treeifyError(error), null, 2))
  throw new Error(
    "Invalid environment variables — fix the errors above and restart",
  )
}

export default coreEnv!
