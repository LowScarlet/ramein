import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  timestamp,
  serial,
  pgEnum,
  unique,
  time,
} from "drizzle-orm/pg-core";
import { course } from "./course.ts";
import { employee } from "../employee.ts";
import { room } from "../room.ts";
import { batch } from "./batch.ts";
import { classRoomActivity } from "./classRoomActivity.ts";
import { studentOnClass } from "./studentOnClass.ts";
import { enumDay } from "../_enum.ts";

export const enumClassRoomStatus = pgEnum("career_class_status", [
  "UNACTIVE",
  "ACTIVE",
  "TEMP_NONACTIVE",
  "HOLIDAY",
  "COMPLETED",
  "CANCELED",
]);

export const enumClassRoomSection = pgEnum("career_class_section", [
  "A",
  "B",
  "C",
  "D",
]);

export const classRoom = pgTable("career_class_room", {
  id: serial().primaryKey(),

  section: enumClassRoomSection().notNull(),
  description: text(),
  status: enumClassRoomStatus().default("UNACTIVE").notNull(),

  day: enumDay().notNull(),
  startTime: time().notNull(),

  roomId: integer()
    .references(() => room.id, { onDelete: "set null" }), //

  batchId: integer()
    .references(() => batch.id, { onDelete: "cascade" })
    .notNull(), //

  courseId: integer()
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(), //

  instructorId: integer().references(() => employee.id, {
    onDelete: "set null",
  }), //

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (table) => [
    unique("career_class_room_unique").on(
      table.section,
      table.batchId,
      table.courseId,
      table.day,
      table.startTime,
      table.roomId,
    ),
  ],
);

export const classroomRels = relations(
  classRoom,
  ({ one, many }) => ({
    room: one(room, {
      fields: [classRoom.roomId],
      references: [room.id],
    }), //
    batch: one(batch, {
      fields: [classRoom.batchId],
      references: [batch.id],
    }), //
    course: one(course, {
      fields: [classRoom.courseId],
      references: [course.id],
    }), //
    instructor: one(employee, {
      fields: [classRoom.instructorId],
      references: [employee.id],
    }), //
    activeStudent: many(studentOnClass), //
    activity: many(classRoomActivity), //
  }));