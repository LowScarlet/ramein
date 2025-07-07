import express, { NextFunction, Request, Response } from "express";
import upload from "../../../../../../../utils/middlewares/multer.ts";
import db from "../../../../../../../db/drizzle.ts";
import { count, desc, eq, sql } from "drizzle-orm";
import { user } from "../../../../../../../db/schema/user.ts";
import { student } from "../../../../../../../db/schema/career/student.ts";
import { program } from "../../../../../../../db/schema/career/program.ts";
import { batch } from "../../../../../../../db/schema/career/batch.ts";
import { wave } from "../../../../../../../db/schema/career/wave.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        activeStudent,
        totalStudent
      ] = await Promise.all([
        db
          .select({ count: count() })
          .from(student)
          .where(
            eq(student.status, "ACTIVE")
          ),
        db
          .select({ count: count() })
          .from(student)
      ]);

      res.json({
        activeStudent: {
          min: Number(activeStudent[0]?.count ?? 0),
          max: Number(totalStudent[0]?.count ?? 0),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const rows = parseInt(req.query.rows as string) || 10;
    const offset = (page - 1) * rows;

    const [rawRecords, countResult] = await Promise.all([
      db
        .select({
          id: student.id,
          photo: student.photo,
          fullName: student.fullName,
          gender: student.gender,
          status: student.status,
          batch: batch.batch,
          year: batch.year,
          wave: wave.wave,
          programName: program.name,
          programCode: program.code,
          registrationNumber: student.registrationNumber,
          updatedAt: student.updatedAt,
        })
        .from(student)
        .leftJoin(user, eq(student.userId, user.id))
        .innerJoin(batch, eq(student.batchId, batch.id))
        .innerJoin(wave, eq(student.waveId, wave.id))
        .innerJoin(program, eq(student.programId, program.id))
        .limit(rows)
        .orderBy(desc(student.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(student),
    ]);

    res.json({
      records: rawRecords,
      count: {
        all: countResult[0]?.count ?? 0,
        show: rawRecords.length,
      },
      pagination: {
        rows,
        page,
      },
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
          id: student.id,

          photo: student.photo,

          programName: program.name,
          programCode: program.code,
          registrationNumber: student.registrationNumber,

          status: student.status,
          fullName: student.fullName,
          gender: student.gender,
          religion: student.religion,
          birthPlace: student.birthPlace,
          birthDate: student.birthDate,
          currentAddress: student.currentAddress,
          parentAddress: student.parentAddress,
          parentPhoneNumber: student.parentPhoneNumber,
          phoneNumber: student.phoneNumber,
          graduateFrom: student.graduateFrom,
          graduateMajor: student.graduateMajor,

          batch: batch.batch,
          wave: wave.wave,

          programId: student.programId,
          batchId: student.batchId,
          waveId: student.waveId,
          userId: student.userId,

          updatedAt: student.updatedAt,
          createdAt: student.createdAt,
        })
        .from(student)
        .innerJoin(program, eq(student.programId, program.id))
        .innerJoin(batch, eq(student.batchId, batch.id))
        .innerJoin(wave, eq(student.waveId, wave.id))
        .where(eq(student.id, id))
        .limit(1);

      res.json(result[0]);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/:id/edit/",
  upload('/public/media/student').single("photo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const {
        status,
        fullName,
        gender,
        religion,
        birthPlace,
        birthDate,
        currentAddress,
        parentAddress,
        parentPhoneNumber,
        phoneNumber,
        graduateFrom,
        graduateMajor,
      } = req.body;

      const updateData: Record<string, any> = {
        ...(fullName && { fullName }),
        ...(phoneNumber && { phoneNumber }),
        ...(gender && { gender }),
        ...(status && { status }),
        ...(religion && { religion }),
        ...(birthPlace && { birthPlace }),
        ...(birthDate && { birthDate: new Date(birthDate) }),
        ...(currentAddress && { currentAddress }),
        ...(parentAddress && { parentAddress }),
        ...(parentPhoneNumber && { parentPhoneNumber }),
        ...(graduateFrom && { graduateFrom }),
        ...(graduateMajor && { graduateMajor }),
      };

      if (req.file) {
        updateData.photo = req.file.filename;
      }

      await db
        .update(student)
        .set(updateData)
        .where(eq(student.id, id));

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
