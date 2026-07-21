import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { relations } from "./relations";

const sql = neon(
  process.env.DB_ENV === "dev"
    ? process.env.DATABASE_URL_DEV!
    : process.env.DATABASE_URL_PROD!,
);
export const db = drizzle({ client: sql, relations: relations });
