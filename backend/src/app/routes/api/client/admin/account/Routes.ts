import express, { NextFunction, Request, Response } from "express";
import upload from "../../../../../../utils/middlewares/multer.ts";
import db from "../../../../../../db/drizzle.ts";
import { desc, eq, sql } from "drizzle-orm";
import { user } from "../../../../../../db/schema/user.ts";
import { hashPassword } from "../../../../../services/AuthServices.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleCounts = await db
        .select({
          role: user.role,
          count: sql<number>`count(*)`,
        })
        .from(user)
        .groupBy(user.role);

      const totalCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(user);

      const roleMap = Object.fromEntries(
        roleCounts.map((row) => [row.role, row.count])
      );

      res.json({
        registeredAccount: totalCount[0]?.count ?? 0,
        studentAccount: roleMap["STUDENT"] ?? 0,
        employeeAccount: roleMap["EMPLOYEE"] ?? 0,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const rows = parseInt(req.query.rows as string) || 10;
      const offset = (page - 1) * rows;

      const [results, countResult] = await Promise.all([
        db.select().from(user).limit(rows).orderBy(desc(user.id)).offset(offset),
        db.select({ count: sql<number>`count(*)` }).from(user),
      ]);

      res.json({
        records: results,
        count: {
          all: countResult[0]?.count ?? 0,
          show: results.length,
        },
        pagination: {
          rows,
          page,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");
      const result = await db.select().from(user).where(eq(user.id, id)).limit(1);

      res.json(result[0]);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/:id/edit/",
  upload('/public/media/account').single("photo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const { fullName, userName, email, password } = req.body;

      const updateData: Record<string, any> = {
        ...(fullName && { fullName }),
        ...(userName && { userName }),
        ...(email && { email }),
        ...(password && { password: hashPassword(password) }),
      };

      if (req.file) {
        updateData.photo = req.file.filename;
      }

      const result = await db
        .update(user)
        .set(updateData)
        .where(eq(user.id, id));

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id/delete/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
