import {
  pgTable,
  text,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { student } from "./student.ts";

export const studentDocument = pgTable("career_student_document", {
  id: serial().primaryKey(),

  name: text().unique().notNull(),
  type: text().notNull(),
  size: integer().notNull(),
  path: text().notNull(),

  studentId: integer()
    .references(() => student.id, { onDelete: "cascade" })
    .unique()
    .notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const studentDocumentRels = relations(studentDocument,
  ({ one }) => ({
    student: one(student, {
      fields: [studentDocument.studentId],
      references: [student.id],
    }), //
  })
);