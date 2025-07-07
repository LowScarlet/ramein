import { relations } from "drizzle-orm";
import { pgTable, integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { course } from "./course.ts";
import { program } from "./program.ts";

export const programOnCourse = pgTable("career_program_on_course", {
  programId: integer()
    .references(() => program.id, { onDelete: "cascade" })
    .notNull(),
  courseId: integer()
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (t) => [primaryKey({ columns: [t.courseId, t.programId] })],
);

export const programOnCourseRels = relations(
  programOnCourse,
  ({ one }) => ({
    program: one(program, {
      fields: [programOnCourse.programId],
      references: [program.id],
    }), //
    course: one(course, {
      fields: [programOnCourse.courseId],
      references: [course.id],
    }), //
  }),
);
