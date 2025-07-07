import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  date,
  real,
  timestamp,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";
import { classRoom } from "./classRoom.ts";
import { config } from "./config.ts";
import { wave } from "./wave.ts";
import { student } from "./student.ts";
import { studentRegistration } from "./studentRegistration.ts";

export const batch = pgTable("career_batch", {
  id: serial().primaryKey(),

  batch: integer().unique().notNull(),
  year: integer().notNull(),

  startDate: date(),
  endDate: date(),

  preRegistrationCost: real().default(0).notNull(),
  minEnRollmentInstallmentCost: real().default(0).notNull(),
  buildingCost: real().default(0).notNull(),
  currentRegistrationNumber: integer().notNull().default(0),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const batchRels = relations(batch, ({ many }) => ({
  configActiveBatch: many(config), //
  classRoom: many(classRoom), //
  wave: many(wave), //
  student: many(student), // 
  studentRegistration: many(studentRegistration) //
}));