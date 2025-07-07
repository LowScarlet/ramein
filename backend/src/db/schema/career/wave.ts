import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  date,
  real,
  timestamp,
  serial,
  unique,
} from "drizzle-orm/pg-core";
import { config } from "./config.ts";
import { batch } from "./batch.ts";
import { student } from "./student.ts";
import { studentRegistration } from "./studentRegistration.ts";

export const wave = pgTable("career_wave", {
  id: serial().primaryKey(),

  wave: integer().notNull(),
  discount: real().default(0).notNull(),

  batchId: integer()
    .references(() => batch.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
},
  (table) => [
    unique().on(table.wave, table.batchId),
  ],
);

export const waveRels = relations(
  wave,
  ({ one, many }) => ({
    configActiveWave: many(config), //
    batch: one(batch, {
      fields: [wave.batchId],
      references: [batch.id],
    }), //
    student: many(student), // 
    studentRegistration: many(studentRegistration) //
  })
);