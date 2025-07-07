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
import { user } from "../user.ts";
import { enumGender, enumReligion } from "../_enum.ts";
import { batch } from "./batch.ts";
import { program } from "./program.ts";
import { invoice } from "./invoice.ts";
import { classRoomAttendance } from "./classRoomAttendance.ts";
import { studentOnClass } from "./studentOnClass.ts";
import { studentDocument } from "./studentDocument.ts";
import { wave } from "./wave.ts";

export const enumStudentStatus = pgEnum("career_student_status", [
  "ACTIVE",
  "INTERNSHIP",
  "GRADUATE",
  "DROPOUT",
]);

export const student = pgTable("career_student", {
  id: serial().primaryKey(),

  photo: text(),

  registrationNumber: integer(),
  status: enumStudentStatus().default("ACTIVE").notNull(),

  fullName: text().notNull(),
  gender: enumGender().default("MALE").notNull(),
  religion: enumReligion().default("ISLAM").notNull(),
  birthPlace: text(),
  birthDate: timestamp(),
  currentAddress: text(),
  parentAddress: text(),
  parentPhoneNumber: text(),
  phoneNumber: text(),
  graduateFrom: text(),
  graduateMajor: text(),

  batchId: integer()
    .references(() => batch.id, { onDelete: "restrict" })
    .notNull(),
    
  waveId: integer()
    .references(() => wave.id, { onDelete: "restrict" })
    .notNull(),

  programId: integer()
    .references(() => program.id, { onDelete: "set null" })
    .notNull(),

  userId: integer().references(() => user.id, { onDelete: "set null" }),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const studentRels = relations(student,
  ({ one, many }) => ({
    user: one(user, {
      fields: [student.userId], 
      references: [user.id],
    }), //
    batch: one(batch, {
      fields: [student.batchId],
      references: [batch.id],
    }), //
    wave: one(wave, {
      fields: [student.waveId],
      references: [wave.id],
    }), //
    program: one(program, {
      fields: [student.programId],
      references: [program.id],
    }), //
    invoice: one(invoice), //
    document: many(studentDocument), //
    classRoom: many(studentOnClass), //
    attendance: many(classRoomAttendance), //
  })
);