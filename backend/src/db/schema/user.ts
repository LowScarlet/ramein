import {
  pgTable,
  text,
  boolean,
  pgEnum,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { oneTimePassword } from "./oneTimePassword.ts";
import { refreshToken } from "./refreshToken.ts";

export const enumUserRole = pgEnum("user_role", [
  "MEMBER",
  "ADMIN",
]);

export const user = pgTable("user", {
  id: serial().primaryKey(),

  photo: text(),

  fullName: text().notNull(),
  userName: text().unique().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  isActive: boolean().default(false),
  role: enumUserRole().default("MEMBER"),
  bio: text(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const userRels = relations(user, ({ one, many }) => ({
  refreshToken: many(refreshToken),
  oneTimePassword: many(oneTimePassword),
}));