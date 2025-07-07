import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  boolean,
  real,
  text,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { programOnCourse } from "./programOnCourse.ts";
import { student } from "./student.ts";
import { studentRegistration } from "./studentRegistration.ts";

export const program = pgTable("career_program", {
  id: serial().primaryKey(),

  icon: text(),
  code: text().unique().notNull(),
  codeName: text().unique().notNull(),

  name: text().notNull(),
  description: text(),
  isEnable: boolean().default(false).notNull(),

  cost: real().default(0).notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const programRels = relations(program, ({ many }) => ({
  student: many(student), //
  programCourse: many(programOnCourse), //
  studentRegistration: many(studentRegistration) //
}));