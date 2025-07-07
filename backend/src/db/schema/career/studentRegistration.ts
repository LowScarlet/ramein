import {
  pgTable,
  text, integer,
  timestamp,
  serial,
  pgEnum,
  real
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { enumGender, enumReligion } from "../_enum.ts";
import { batch } from "./batch.ts";
import { program } from "./program.ts";
import { wave } from "./wave.ts";
import { employee } from "../employee.ts";

function generateRegistrationCode(length: number = 12): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let uniqueString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}

export const enumRegistrationType = pgEnum("career_registration_type", [
  "PRE_REGISTRATION",
  "RE_ENROLLMENT",
]);

export const enumRegistrationStatus = pgEnum("career_registration_status", [
  "NEED_CONFIRMATION",
  "CONFIRMED",
]);

export const enumKnownFrom = pgEnum("career_registration_known_from", [
  "PROMOTION_AT_SCHOOL",
  "INVITATION_LETTER",
  "FAMILY_LETTER",
  "FRIEND",
  "BANNER_OR_BILLBOARD",
  "BROCHURE",
  "BUILDING",
  "TEACHER",
  "INTERNET",
  "SOCIAL_MEDIA",
]);

export const studentRegistration = pgTable("career_student_registration", {
  id: serial().primaryKey(),

  photo: text(),

  code: text().unique().$default(() => generateRegistrationCode()).notNull(),

  type: enumRegistrationType().default('PRE_REGISTRATION').notNull(),

  statusPreRegistration: enumRegistrationStatus().default("NEED_CONFIRMATION").notNull(),
  statusReEnrollment: enumRegistrationStatus().default("NEED_CONFIRMATION").notNull(),

  preRegistrationCost: real().default(0).notNull(),
  minEnRollmentInstallmentCost: real().default(0).notNull(),
  otherDiscount: real().default(0).notNull(),

  fullName: text().notNull(),
  gender: enumGender().default("MALE").notNull(),
  religion: enumReligion().default("ISLAM").notNull(),
  birthPlace: text(),
  birthDate: timestamp(),
  currentAddress: text(),
  parentAddress: text(),
  parentPhoneNumber: text(),
  phoneNumber: text(),
  graduateFrom: text(),
  graduateMajor: text(),
  
  knownFrom: enumKnownFrom(),

  batchId: integer()
    .references(() => batch.id, { onDelete: "restrict" })
    .notNull(),

  waveId: integer()
    .references(() => wave.id, { onDelete: "restrict" })
    .notNull(),

  programId: integer()
    .references(() => program.id, { onDelete: "set null" })
    .notNull(),

  presenterId: integer().references(() => employee.id, { onDelete: "set null" }),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});

export const studentReEnrollmentRels = relations(studentRegistration,
  ({ one }) => ({
    batch: one(batch, {
      fields: [studentRegistration.batchId],
      references: [batch.id],
    }), //
    wave: one(wave, {
      fields: [studentRegistration.waveId],
      references: [wave.id],
    }), //
    program: one(program, {
      fields: [studentRegistration.programId],
      references: [program.id],
    }),
    presenter: one(employee, {
      fields: [studentRegistration.presenterId],
      references: [employee.id],
    }), //
  })
);