import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set for drizzle-kit",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts", // Path to your schema file
  out: "./drizzle/migrations", // Directory for migration files
  dialect: "postgresql", // Specify PostgreSQL dialect
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
