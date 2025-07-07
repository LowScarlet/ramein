import express, { NextFunction, Request, Response } from "express";
import upload from "../../../../../../utils/middlewares/multer.ts";
import db from "../../../../../../db/drizzle.ts";
import { employee } from "../../../../../../db/schema/employee.ts";
import { and, arrayContains, count, desc, eq, ne, or, sql } from "drizzle-orm";
import { user } from "../../../../../../db/schema/user.ts";
import { hashPassword } from "../../../../../services/AuthServices.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalEmployees = await db
        .select({ count: count() })
        .from(employee);

      const activeEmployees = await db
        .select({ count: count() })
        .from(employee)
        .where(ne(employee.status, "INACTIVE"));

      const [admin, instructor, academic] = await Promise.all([
        db
          .select({ count: count() })
          .from(employee)
          .where(
            and(
              ne(employee.status, "INACTIVE"),
              arrayContains(employee.role, ["ADMIN"])
            )
          ),
        db
          .select({ count: count() })
          .from(employee)
          .where(
            and(
              ne(employee.status, "INACTIVE"),
              arrayContains(employee.role, ["INSTRUCTOR"])
            )
          ),
        db
          .select({ count: count() })
          .from(employee)
          .where(
            and(
              ne(employee.status, "INACTIVE"),
              arrayContains(employee.role, ["ACADEMIC"])
            )
          ),
      ]);

      res.json({
        activeEmployee: {
          min: Number(activeEmployees[0]?.count ?? 0),
          max: Number(totalEmployees[0]?.count ?? 0),
        },
        activeAdmin: {
          min: Number(admin[0]?.count ?? 0),
          max: Number(totalEmployees[0]?.count ?? 0),
        },
        activeInstructor: {
          min: Number(instructor[0]?.count ?? 0),
          max: Number(totalEmployees[0]?.count ?? 0),
        },
        activeAcademic: {
          min: Number(academic[0]?.count ?? 0),
          max: Number(totalEmployees[0]?.count ?? 0),
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
          id: employee.id,
          userName: user.userName,
          fullName: employee.fullName,
          email: employee.email,
          gender: employee.gender,
          phoneNumber: employee.phoneNumber,
          photo: employee.photo,
          status: employee.status,
          role: employee.role,
          updatedAt: employee.updatedAt,
        })
        .from(employee)
        .innerJoin(user, eq(employee.userId, user.id))
        .limit(rows)
        .orderBy(desc(employee.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(employee),
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
          id: employee.id,
          fullName: employee.fullName,
          email: employee.email,
          gender: employee.gender,
          phoneNumber: employee.phoneNumber,
          photo: employee.photo,
          status: employee.status,
          role: employee.role,
          religion: employee.religion,
          birthPlace: employee.birthPlace,
          birthDate: employee.birthDate,
          currentAddress: employee.currentAddress,
          updatedAt: employee.updatedAt,
        })
        .from(employee)
        .where(eq(employee.id, id))
        .innerJoin(user, eq(employee.userId, user.id))
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
        userName,
        fullName,
        email,
        password,
      } = req.body;

      const existingUser = await db
        .select()
        .from(user)
        .where(
          or(eq(user.userName, userName), eq(user.email, email))
        )
        .limit(1);

      if (existingUser.length > 0) {
        throw new Error("Username Sudah Digunakan. Silakan Pilih yang Lain");
      }

      const newEmployee = await db.transaction(async (tx) => {
        const insertedUsers = await tx
          .insert(user)
          .values({
            fullName,
            userName,
            email,
            password: hashPassword(password),
            role: "EMPLOYEE"
          })
          .returning({ id: user.id });

        const newUser = insertedUsers[0];

        if (!newUser) {
          throw new Error("Gagal membuat data pekerja baru karena pembuatan data pengguna mengalami kendala");
        }

        return await tx.insert(employee).values({
          fullName,
          email,
          userId: newUser.id,
        })
          .returning();
      });

      res.json(newEmployee[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id/edit/",
  upload('/public/media/employee').single("photo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const { fullName, email, phoneNumber, gender, status, religion, birthPlace, currentAddress } = req.body;

      const updateData: Record<string, any> = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
        ...(gender && { gender }),
        ...(status && { status }),
        ...(religion && { religion }),
        ...(birthPlace && { birthPlace }),
        ...(currentAddress && { currentAddress }),
      };

      if (req.file) {
        updateData.photo = req.file.filename;
      }

      const result = await db
        .update(employee)
        .set(updateData)
        .where(eq(employee.id, id));

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
