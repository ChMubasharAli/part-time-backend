import z from "zod";
import * as dotenv from "dotenv";

// load .env file
dotenv.config();

// define environment variables schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
  JWT_SECRET: z.string().default("HELLOHOWAREYOUDOING"),
  RATE_LIMIT: z.coerce.number().default(100),
  WINDOW_MS: z.coerce.number().default(900000),
});

// parse and validate
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
