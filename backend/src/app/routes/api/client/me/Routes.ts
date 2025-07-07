import express, { NextFunction, Request, Response } from "express";
import db from "../../../../../db/drizzle.ts";
import { user } from "../../../../../db/schema/user.ts";
import { employee } from "../../../../../db/schema/employee.ts";
import { student } from "../../../../../db/schema/career/student.ts";
import { eq } from "drizzle-orm";

const router = express.Router();

export function toMeData(row?: {
  user: typeof user.$inferSelect,
  employee?: typeof employee.$inferSelect | null,
  student?: typeof student.$inferSelect | null
}) {
  if (!row) {
    return null;
  }
  return {
    ...row.user,
    profile: {
      employee: row.employee ?? null,
      student: row.student ?? null,
    }
  };
}

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await db
        .select()
        .from(user)
        .leftJoin(employee, eq(user.id, employee.userId))
        .leftJoin(student, eq(user.id, student.userId))
        .where(eq(user.id, req.user.id))
        .limit(1);
      res.json(toMeData(result[0]));
    } catch (err) {
      next(err);
    }
  },
);

export default router;
