import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  timestamp,
  serial,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import { classRoom } from "./classRoom.ts";
import { classRoomAttendance } from "./classRoomAttendance.ts";
import { employee } from "../employee.ts";

export const classRoomActivity = pgTable("career_class_room_activity", {
  id: serial().primaryKey(),

  day: integer().notNull(),
  note: text(),

  isChecked: boolean().default(false),
  checkedAt: timestamp(),

  checkedByAcademic: integer()
    .references(() => employee.id, { onDelete: "set null" }), //

  classRoomId: integer()
    .references(() => classRoom.id, { onDelete: "cascade" })
    .notNull(), //

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (table) => [
    unique("career_class_room_activity_unique").on(
      table.day,
      table.classRoomId,
    ),
  ],
);

export const career_classActivity_relations = relations(
  classRoomActivity,
  ({ one, many }) => ({
    checkedByAcademic: one(employee, {
      fields: [classRoomActivity.checkedByAcademic],
      references: [employee.id],
    }), //
    classRoom: one(classRoom, {
      fields: [classRoomActivity.classRoomId],
      references: [classRoom.id],
    }), //
    attendance: many(classRoomAttendance), //
  }),
);