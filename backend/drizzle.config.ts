import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/utils/env";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema", "./src/db/schema/career"],
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});