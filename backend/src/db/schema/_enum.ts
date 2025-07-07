import { pgEnum } from "drizzle-orm/pg-core";

export const enumGender = pgEnum("gender", [
  "MALE",
  "FEMALE",
  "OTHER"
]);

export const enumReligion = pgEnum("religion", [
  "ISLAM",
  "CHRISTIANITY",
  "HINDUISM",
  "BUDDHISM",
  "OTHER",
]);

export const enumDay = pgEnum("day", [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);
