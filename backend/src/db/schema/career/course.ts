import { eq, ilike, inArray, relations, SQL, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  boolean,
  text,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { classRoom } from "./classRoom.ts";
import { programOnCourse } from "./programOnCourse.ts";

export const course = pgTable("career_course", {
  id: serial().primaryKey(),

  icon: text(),
  code: text().unique().notNull(),
  codeName: text().unique().notNull(),

  name: text().notNull(),
  description: text(),
  isEnable: boolean().default(false).notNull(),

  courseHour: integer().default(0).notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const courseRels = relations(course, ({ many }) => ({
  courseProgram: many(programOnCourse), //
  classRoom: many(classRoom), //
}));