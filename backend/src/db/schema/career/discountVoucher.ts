import {
  pgTable,
  text,
  boolean,
  timestamp,
  serial,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { invoice } from "./invoice.ts";

export const discountVoucher = pgTable("career_discount_voucher", {
  id: serial().primaryKey(),

  code: text().unique().notNull(),
  isActive: boolean().default(false).notNull(),
  total: real().default(0).notNull(),
  limit: real().default(0).notNull(),

  expiredAt: timestamp(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const discountVoucherRels = relations(
  discountVoucher,
  ({ many }) => ({
    invoice: many(invoice), //
  }),
);