import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { classRoom } from "./career/classRoom.ts";

export const room = pgTable("room", {
  id: serial().primaryKey(),

  code: text().unique().notNull(),
  name: text().unique().notNull(),
  description: text(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const roomRels = relations(room, ({ many }) => ({
  careerClassRoom: many(classRoom), //
}));