import {
  pgTable,
  integer,
  text,
  timestamp,
  serial,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";
import { student } from "./student.ts";
import { classRoomActivity } from "./classRoomActivity.ts";
import { relations } from "drizzle-orm";

export const enumClassRoomAttendanceStatus = pgEnum("career_class_room_attendance_status", [
  "PRESENT",
  "INTERSHIP",
  "EXCUSED",
  "SICK",
  "ABSENT"
]);

export const classRoomAttendance = pgTable("career_class_room_attendance", {
  id: serial().primaryKey(),

  status: enumClassRoomAttendanceStatus().default("PRESENT").notNull(),
  note: text(),

  studentId: integer()
    .references(() => student.id, { onDelete: "cascade" })
    .notNull(), //
    
  classActivityId: integer()
    .references(() => classRoomActivity.id, { onDelete: "cascade" })
    .notNull(), //

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (table) => [
    unique("career_class_room_attendance_unique").on(
      table.studentId,
      table.classActivityId,
    ),
  ],
);

export const classRoomAttendanceRels = relations(
  classRoomAttendance,
  ({ one }) => ({
    student: one(student, {
      fields: [classRoomAttendance.studentId],
      references: [student.id],
    }), //
    classActivity: one(classRoomActivity, {
      fields: [classRoomAttendance.classActivityId],
      references: [classRoomActivity.id],
    }), //
  }),
);