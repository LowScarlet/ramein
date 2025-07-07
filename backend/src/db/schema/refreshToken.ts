import {
  pgTable,
  text,
  boolean,
  pgEnum,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user.ts";

export const enumRevocationReason = pgEnum("revocation_reason", [
  "LOGOUT",
  "LOGOUT_ALL",
  "RESET_PASSWORD",
  "CHANGE_PASSWORD",
  "OTHER",
]);

export const refreshToken = pgTable("refresh_token", {
  id: serial().primaryKey(),

  token: text().unique().notNull(),
  isActive: boolean().default(false).notNull(),
  revocationReason: enumRevocationReason().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: integer()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const refreshTokenRels = relations(
  refreshToken,
  ({ one }) => ({
    user: one(user, {
      fields: [refreshToken.userId],
      references: [user.id],
    }), //
  })
);
