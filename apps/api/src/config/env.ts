import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const envPath = fileURLToPath(
  new URL("../../.env", import.meta.url)
);

dotenv.config({ path: envPath });

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(5000),

  MONGODB_URI: z
    .string()
    .min(1)
    .default("mongodb://127.0.0.1:27017/ghoomyaar"),

  CLIENT_ORIGIN: z
    .string()
    .url()
    .default("http://127.0.0.1:5173")
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment configuration:",
    z.treeifyError(parsed.error)
  );

  throw new Error("Environment configuration failed");
}

export const env = parsed.data;