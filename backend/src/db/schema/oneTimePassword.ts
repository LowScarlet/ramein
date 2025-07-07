import {
  pgTable,
  text,
  date,
  pgEnum,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user.ts";

export const enumOneTimePasswordType = pgEnum("one_time_password_type", [
  "RESET_PASSWORD",
  "EDIT_ACCOUNT",
]);

export const oneTimePassword = pgTable("one_time_password", {
  id: serial().primaryKey(),

  password: text().unique().notNull(),
  type: enumOneTimePasswordType().notNull(),
  expiredAt: date().notNull(),
  userId: integer()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const oneTimePasswordRels = relations(
  oneTimePassword,
  ({ one }) => ({
    user: one(user, {
      fields: [oneTimePassword.userId],
      references: [user.id],
    }), //
  }),
);