import {
  pgTable,
  text,
  boolean,
  pgEnum,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { employee } from "./employee.ts";
import { oneTimePassword } from "./oneTimePassword.ts";
import { refreshToken } from "./refreshToken.ts";
import { student } from "./career/student.ts";

export const enumUserRole = pgEnum("user_role", [
  "STUDENT",
  "EMPLOYEE",
]);

export const user = pgTable("user", {
  id: serial().primaryKey(),

  photo: text(),

  fullName: text().notNull(),
  userName: text().unique().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  isMaster: boolean().default(false),
  role: enumUserRole().default("STUDENT"),
  bio: text(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const userRels = relations(user, ({ one, many }) => ({
  employee: one(employee),
  refreshToken: many(refreshToken),
  oneTimePassword: many(oneTimePassword),
  careerStudent: one(student, {
    fields: [user.id],
    references: [student.userId],
  }),
}));