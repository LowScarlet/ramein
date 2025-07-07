import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  serial,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discountVoucher } from "./discountVoucher.ts";
import { invoiceInstallment } from "./invoiceInstallment.ts";
import { student } from "./student.ts";

function generateInvoiceCode(length: number = 12): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let uniqueString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}

export const invoice = pgTable("career_invoice", {
  id: serial().primaryKey(),

  code: text().unique().$default(() => generateInvoiceCode()).notNull(),
  isPaidOff: boolean().default(false).notNull(),

  programCost: real().default(0).notNull(),
  buildingCost: real().default(0).notNull(),
  waveDiscount: real().default(0).notNull(),
  voucherDiscount: real().default(0).notNull(),
  otherDiscount: real().default(0).notNull(),

  studentId: integer()
    .references(() => student.id, { onDelete: "cascade" })
    .unique()
    .notNull(), //
  discountVoucherId: integer().references(() => discountVoucher.id, {
    onDelete: "set null",
  }), //

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const invoiceRels = relations(
  invoice,
  ({ one, many }) => ({
    student: one(student, {
      fields: [invoice.studentId],
      references: [student.id],
    }), // 
    discountVoucher: one(discountVoucher, {
      fields: [invoice.discountVoucherId],
      references: [discountVoucher.id],
    }), //
    installment: many(invoiceInstallment), //
  }),
);