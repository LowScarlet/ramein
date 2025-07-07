import express, { NextFunction, Request, Response } from "express";
import db from "../../../../../../../db/drizzle.ts";
import { and, count, desc, eq, inArray, sql } from "drizzle-orm";
import { program } from "../../../../../../../db/schema/career/program.ts";
import { programOnCourse } from "../../../../../../../db/schema/career/programOnCourse.ts";
import { course } from "../../../../../../../db/schema/career/course.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalCourses = await db
        .select({ count: count() })
        .from(course);

      res.json({
        totalCourse: Number(totalCourses[0]?.count ?? 0)
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
          id: course.id,
          name: course.name,
          code: course.code,
          codeName: course.codeName,
          courseHour: course.courseHour,
          isEnable: course.isEnable,
          programs: sql<string[]>`COALESCE(array_remove(array_agg(${program.codeName}), NULL), '{}')`,
          updatedAt: course.updatedAt,
        })
        .from(course)
        .leftJoin(programOnCourse, eq(course.id, programOnCourse.courseId))
        .leftJoin(program, eq(programOnCourse.programId, program.id))
        .groupBy(course.id)
        .orderBy(desc(course.isEnable), desc(course.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(course),
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
          id: course.id,
          name: course.name,
          code: course.code,
          codeName: course.codeName,
          courseHour: course.courseHour,
          isEnable: course.isEnable,
          programs: sql<string[]>`COALESCE(array_remove(array_agg(${program.codeName}), NULL), '{}')`,
          updatedAt: course.updatedAt,
        })
        .from(course)
        .leftJoin(programOnCourse, eq(course.id, programOnCourse.courseId))
        .leftJoin(program, eq(programOnCourse.programId, program.id))
        .groupBy(course.id)
        .where(eq(course.id, id))
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
        codeName,
        name,
      } = req.body;

      const newD = await db.transaction(async (tx) => {
        const insertion = await tx
          .insert(course)
          .values({
            code,
            codeName,
            name,
          })
          .returning();
        return insertion;
      });

      res.json(newD[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:id/edit/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "0");

    let { code, codeName, name, courseHour, isEnable, programs } = req.body;

    const updateData: Record<string, any> = {
      ...(code && { code }),
      ...(codeName && { codeName }),
      ...(name && { name }),
      ...(courseHour && { courseHour }),
      ...(isEnable && { isEnable }),
    };

    await db.update(course).set(updateData).where(eq(course.id, id));

    if (typeof programs === "string") {
      if (programs.trim() === "") {
        programs = [];
      } else if (programs.startsWith("[") || programs.startsWith("{")) {
        try {
          programs = JSON.parse(programs);
        } catch {
          programs = [];
        }
      } else {
        programs = programs.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    if (!Array.isArray(programs)) {
      programs = programs ? [programs] : [];
    }

    const programRecords = await db
      .select({ id: program.id })
      .from(program)
      .where(inArray(program.codeName, programs));

    const newProgramIds = programRecords.map(c => c.id);

    const currentLinks = await db
      .select({ programId: programOnCourse.programId })
      .from(programOnCourse)
      .where(eq(programOnCourse.courseId, id));

    const currentProgramIds = currentLinks.map(link => link.programId);

    const toAdd = newProgramIds
      .filter(cid => !currentProgramIds.includes(cid))
      .map(cid => ({ courseId: id, programId: cid }));

    const toRemove = currentProgramIds.filter(
      cid => !newProgramIds.includes(cid)
    );

    if (toRemove.length > 0) {
      await db
        .delete(programOnCourse)
        .where(
          and(
            eq(programOnCourse.courseId, id),
            inArray(programOnCourse.programId, toRemove)
          )
        );
    }

    if (toAdd.length > 0) {
      await db.insert(programOnCourse).values(toAdd);
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

router.post("/:id/delete/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "0");

    await db
      .delete(course)
      .where(eq(course.id, id));

    await db
      .delete(programOnCourse)
      .where(eq(programOnCourse.courseId, id));

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});
export default router;
