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
      const totalPrograms = await db
        .select({ count: count() })
        .from(program);

      res.json({
        totalProgram: Number(totalPrograms[0]?.count ?? 0)
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
          id: program.id,
          name: program.name,
          code: program.code,
          codeName: program.codeName,
          cost: program.cost,
          isEnable: program.isEnable,
          courses: sql<string[]>`COALESCE(array_remove(array_agg(${course.codeName}), NULL), '{}')`,
          updatedAt: program.updatedAt,
        })
        .from(program)
        .leftJoin(programOnCourse, eq(program.id, programOnCourse.programId))
        .leftJoin(course, eq(programOnCourse.courseId, course.id))
        .groupBy(program.id)
        .orderBy(desc(program.isEnable), desc(program.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(program),
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
          id: program.id,
          name: program.name,
          code: program.code,
          codeName: program.codeName,
          cost: program.cost,
          isEnable: program.isEnable,
          courses: sql<string[]>`COALESCE(array_remove(array_agg(${course.codeName}), NULL), '{}')`,
          updatedAt: program.updatedAt,
        })
        .from(program)
        .leftJoin(programOnCourse, eq(program.id, programOnCourse.programId))
        .leftJoin(course, eq(programOnCourse.courseId, course.id))
        .groupBy(program.id)
        .where(eq(program.id, id))
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

      const newRoom = await db.transaction(async (tx) => {
        const insertedProgram = await tx
          .insert(program)
          .values({
            code,
            codeName,
            name,
          })
          .returning();
        return insertedProgram;
      });

      res.json(newRoom[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:id/edit/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "0");

    let { code, codeName, name, cost, isEnable, courses } = req.body;

    const updateData: Record<string, any> = {
      ...(code && { code }),
      ...(codeName && { codeName }),
      ...(name && { name }),
      ...(cost && { cost }),
      ...(isEnable && { isEnable }),
    };

    await db.update(program).set(updateData).where(eq(program.id, id));

    if (typeof courses === "string") {
      if (courses.trim() === "") {
        courses = [];
      } else if (courses.startsWith("[") || courses.startsWith("{")) {
        try {
          courses = JSON.parse(courses);
        } catch {
          courses = [];
        }
      } else {
        courses = courses.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    if (!Array.isArray(courses)) {
      courses = courses ? [courses] : [];
    }

    const courseRecords = await db
      .select({ id: course.id })
      .from(course)
      .where(inArray(course.codeName, courses));

    const newCourseIds = courseRecords.map(c => c.id);

    const currentLinks = await db
      .select({ courseId: programOnCourse.courseId })
      .from(programOnCourse)
      .where(eq(programOnCourse.programId, id));

    const currentCourseIds = currentLinks.map(link => link.courseId);

    const toAdd = newCourseIds
      .filter(cid => !currentCourseIds.includes(cid))
      .map(cid => ({ programId: id, courseId: cid }));

    const toRemove = currentCourseIds.filter(
      cid => !newCourseIds.includes(cid)
    );

    if (toRemove.length > 0) {
      await db
        .delete(programOnCourse)
        .where(
          and(
            eq(programOnCourse.programId, id),
            inArray(programOnCourse.courseId, toRemove)
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
      .delete(program)
      .where(eq(program.id, id));

    await db
      .delete(programOnCourse)
      .where(eq(programOnCourse.programId, id));

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});
export default router;
