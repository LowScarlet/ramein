import {
  pgTable,
  text,
  timestamp,
  serial,
  real,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { invoice } from "./invoice.ts";

export const invoiceInstallment = pgTable("career_invoice_installment", {
  id: serial().primaryKey(),

  document: text().array(),

  total: real().default(0).notNull(),
  note: text(),

  invoiceId: integer()
    .references(() => invoice.id, { onDelete: "cascade" })
    .notNull(), //

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const invoiceInstallmentRels = relations(
  invoiceInstallment,
  ({ one }) => ({
    invoice: one(invoice, {
      fields: [invoiceInstallment.invoiceId],
      references: [invoice.id],
    }), //
  }),
);