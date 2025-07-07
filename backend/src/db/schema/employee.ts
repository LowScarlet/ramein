import { relations } from "drizzle-orm";
import {
  pgTable, text,
  integer,
  date,
  pgEnum,
  timestamp,
  serial
} from "drizzle-orm/pg-core";
import { enumGender, enumReligion } from "./_enum.ts";
import { user } from "./user.ts";

export const enumEmployeeStatus = pgEnum("employee_status", [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERSHIP",
  "INACTIVE",
]);

export const enumEmployeeRole = pgEnum("employee_role", [
  "ADMIN",
  "INSTRUCTOR",
  "ACADEMIC",
]);

export const employee = pgTable("employee", {
  id: serial().primaryKey(),

  fullName: text().notNull(),
  email: text().unique().notNull(),
  photo: text(),
  status: enumEmployeeStatus().default("INACTIVE").notNull(),
  role: enumEmployeeRole().array().default(["INSTRUCTOR"]).notNull(),
  gender: enumGender().default("MALE").notNull(),
  religion: enumReligion().default("ISLAM").notNull(),
  birthPlace: text(),
  birthDate: date(),
  currentAddress: text(),
  phoneNumber: text(),

  userId: integer()
    .references(() => user.id, { onDelete: "set null" })
    .unique(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const employeeRels = relations(employee, ({ one, many }) => ({
  user: one(user, {
    fields: [employee.userId],
    references: [user.id],
  }), //
}));