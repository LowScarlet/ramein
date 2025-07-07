import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import schema from "./zzzzz.ts";
import { DATABASE_URL } from "../utils/env.ts";

const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle({
  client: pool,
  schema: { ...schema },
  logger: false,
});

export default db;
