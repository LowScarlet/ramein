import express, { NextFunction, Request, Response } from "express";
import upload from "../../../../../../utils/middlewares/multer.ts";
import db from "../../../../../../db/drizzle.ts";
import { employee } from "../../../../../../db/schema/employee.ts";
import { and, arrayContains, count, desc, eq, ne, sql } from "drizzle-orm";
import { user } from "../../../../../../db/schema/user.ts";
import { room } from "../../../../../../db/schema/room.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalRooms = await db
        .select({ count: count() })
        .from(room);

      res.json({
        totalRoom: Number(totalRooms[0]?.count ?? 0)
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rawRecords] = await Promise.all([
      db
        .select({
          id: room.id,
          code: room.code,
          name: room.name,
          description: room.description,
          updatedAt: room.updatedAt,
        })
        .from(room)
        .orderBy(desc(room.id)),
    ]);

    res.json({
      records: rawRecords,
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");
      const result = await db
        .select({
          id: room.id,
          code: room.code,
          name: room.name,
          description: room.description,
          updatedAt: room.updatedAt,
        })
        .from(room)
        .where(eq(room.id, id))
        .limit(1);

      res.json(result[0]);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/add/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        code,
        name,
        description,
      } = req.body;

      const newRoom = await db.transaction(async (tx) => {
        const insertedRoom = await tx
          .insert(room)
          .values({
            code,
            name,
            description,
          })
          .returning();
        return insertedRoom;
      });

      res.json(newRoom[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id/edit/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const { code, name, description } = req.body;

      const updateData: Record<string, any> = {
        ...(code && { code }),
        ...(name && { name }),
        ...(description && { description }),
      };

      const result = await db
        .update(room)
        .set(updateData)
        .where(eq(room.id, id));

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id/delete/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
