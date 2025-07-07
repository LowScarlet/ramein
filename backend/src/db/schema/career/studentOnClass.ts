import { relations } from "drizzle-orm";
import { pgTable, integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { student } from "./student.ts";
import { classRoom } from "./classRoom.ts";

export const studentOnClass = pgTable("career_student_on_class", {
  studentId: integer()
    .notNull()
    .references(() => student.id, { onDelete: "cascade" })
    .notNull(),
  classId: integer()
    .notNull()
    .references(() => classRoom.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (t) => [primaryKey({ columns: [t.studentId, t.classId] })],
);

export const studentOnClassRels = relations(
  studentOnClass,
  ({ one }) => ({
    student: one(student, {
      fields: [studentOnClass.studentId],
      references: [student.id],
    }), //
    class: one(classRoom, {
      fields: [studentOnClass.classId],
      references: [classRoom.id],
    }), //
  }),
);
