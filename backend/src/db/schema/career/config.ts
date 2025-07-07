import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  boolean,
  real,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { batch } from "./batch.ts";
import { wave } from "./wave.ts";

export const config = pgTable("career_config", {
  id: serial().primaryKey(),

  version: real().unique().notNull(),

  allowSelfRegistration: boolean().default(false).notNull(),
  activeWaveId: integer().references(() => wave.id, { onDelete: "set null" }),
  activeBatchId: integer().references(() => batch.id, { onDelete: "set null" }),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const batchRels = relations(
  config,
  ({ one }) => ({
    activeWave: one(wave, {
      fields: [config.activeWaveId],
      references: [wave.id],
    }), // 
    activeBatch: one(batch, {
      fields: [config.activeBatchId],
      references: [batch.id],
    }), //
  })
);