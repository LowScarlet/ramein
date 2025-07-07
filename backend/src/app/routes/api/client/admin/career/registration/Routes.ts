import express, { NextFunction, Request, Response } from "express";
import db from "../../../../../../../db/drizzle.ts";
import { and, asc, count, desc, eq, sql } from "drizzle-orm";
import { program } from "../../../../../../../db/schema/career/program.ts";
import { batch } from "../../../../../../../db/schema/career/batch.ts";
import { wave } from "../../../../../../../db/schema/career/wave.ts";
import { studentRegistration } from "../../../../../../../db/schema/career/studentRegistration.ts";
import upload from "../../../../../../../utils/middlewares/multer.ts";
import { student } from "../../../../../../../db/schema/career/student.ts";
import { CustomError } from "../../../../../../exceptions/CustomError.ts";
import { config } from "../../../../../../../db/schema/career/config.ts";
import { CAREER_CONFIG } from "../../../../../../../utils/env.ts";
import { user } from "../../../../../../../db/schema/user.ts";
import { invoice } from "../../../../../../../db/schema/career/invoice.ts";
import { invoiceInstallment } from "../../../../../../../db/schema/career/invoiceInstallment.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        activePreRegistration,
        activeReEnrollment,
      ] = await Promise.all([
        db
          .select({ count: count() })
          .from(studentRegistration)
          .where(
            and(
              eq(studentRegistration.type, 'PRE_REGISTRATION'),
              eq(studentRegistration.statusPreRegistration, 'NEED_CONFIRMATION')
            )
          ),
        db
          .select({ count: count() })
          .from(studentRegistration)
          .where(
            and(
              eq(studentRegistration.type, 'RE_ENROLLMENT'),
              eq(studentRegistration.statusReEnrollment, 'NEED_CONFIRMATION')
            )
          ),
      ]);

      res.json({
        activePreRegistration: Number(activePreRegistration[0]?.count ?? 0),
        activeReEnrollment: Number(activeReEnrollment[0]?.count ?? 0),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/add/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        fullName,
        programId,
        waveId,
      } = req.body;

      const insertedRegistration = await db.transaction(async (tx) => {
        const getConfig = (await tx
          .select()
          .from(config)
          .where(eq(config.version, CAREER_CONFIG))
          .limit(1))[0]

        if (!getConfig) {
          throw new CustomError("get_config_failed", 500);
        }

        if (!getConfig.activeBatchId) {
          throw new CustomError("get_active_batch_failed", 500);
        }

        const getBatch = (await tx
          .select()
          .from(batch)
          .where(eq(batch.id, getConfig.activeBatchId))
          .limit(1))[0]

        if (!getBatch) {
          throw new CustomError("get_active_batch_failed", 500);
        }

        return (await tx
          .insert(studentRegistration)
          .values({
            type: 'PRE_REGISTRATION',
            batchId: getConfig.activeBatchId,
            waveId: waveId,
            programId: programId,
            fullName: fullName,
            preRegistrationCost: getBatch.preRegistrationCost
          })
          .returning())[0];
      });

      res.json(insertedRegistration);
    } catch (err) {
      next(err);
    }
  },
);

router.get("/preRegistration", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const rows = parseInt(req.query.rows as string) || 10;
    const offset = (page - 1) * rows;

    const [rawRecords, countResult] = await Promise.all([
      db
        .select({
          id: studentRegistration.id,

          code: studentRegistration.code,

          fullName: studentRegistration.fullName,
          gender: studentRegistration.gender,

          status: studentRegistration.statusPreRegistration,

          cost: studentRegistration.preRegistrationCost,

          batch: batch.batch,
          year: batch.year,
          wave: wave.wave,
          programName: program.name,

          updatedAt: studentRegistration.updatedAt,
          createdAt: studentRegistration.createdAt,
        })
        .from(studentRegistration)
        .innerJoin(batch, eq(studentRegistration.batchId, batch.id))
        .innerJoin(wave, eq(studentRegistration.waveId, wave.id))
        .innerJoin(program, eq(studentRegistration.programId, program.id))
        .limit(rows)
        .orderBy(asc(studentRegistration.statusPreRegistration), desc(studentRegistration.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(studentRegistration),
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
  "/preRegistration/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");
      const result = await db
        .select({
          id: studentRegistration.id,

          code: studentRegistration.code,

          fullName: studentRegistration.fullName,
          gender: studentRegistration.gender,
          currentAddress: studentRegistration.currentAddress,
          phoneNumber: studentRegistration.phoneNumber,
          parentPhoneNumber: studentRegistration.parentPhoneNumber,
          graduateFrom: studentRegistration.graduateFrom,
          knownForm: studentRegistration.knownFrom,

          status: studentRegistration.statusPreRegistration,

          cost: studentRegistration.preRegistrationCost,

          batch: batch.batch,
          year: batch.year,
          wave: wave.wave,
          programName: program.name,

          updatedAt: studentRegistration.updatedAt,
          createdAt: studentRegistration.createdAt,
        })
        .from(studentRegistration)
        .innerJoin(batch, eq(studentRegistration.batchId, batch.id))
        .innerJoin(wave, eq(studentRegistration.waveId, wave.id))
        .innerJoin(program, eq(studentRegistration.programId, program.id))
        .where(eq(studentRegistration.id, id))
        .limit(1);

      res.json(result[0]);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/preRegistration/:id/edit/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const {
        fullName,
        gender,
        currentAddress,
        parentPhoneNumber,
        phoneNumber,
        graduateFrom,
        cost,
      } = req.body;

      const updateData: Record<string, any> = {
        ...(fullName && { fullName }),
        ...(phoneNumber && { phoneNumber }),
        ...(gender && { gender }),
        ...(currentAddress && { currentAddress }),
        ...(parentPhoneNumber && { parentPhoneNumber }),
        ...(graduateFrom && { graduateFrom }),
        ...(cost && { preRegistrationCost: cost }),
      };

      await db
        .update(studentRegistration)
        .set(updateData)
        .where(eq(studentRegistration.id, id));

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/preRegistration/:id/confirm/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const {
        value
      } = req.body;

      if (value === true) {
        await db
          .update(studentRegistration)
          .set({
            type: 'RE_ENROLLMENT',
            statusPreRegistration: 'CONFIRMED',
            statusReEnrollment: 'NEED_CONFIRMATION'
          })
          .where(eq(studentRegistration.id, id));
      }
      else if (value === false) {
        await db
          .update(studentRegistration)
          .set({
            type: 'PRE_REGISTRATION',
            statusPreRegistration: 'NEED_CONFIRMATION',
            statusReEnrollment: 'NEED_CONFIRMATION'
          })
          .where(eq(studentRegistration.id, id));
      }

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
);

router.get("/reEnrollment", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const rows = parseInt(req.query.rows as string) || 10;
    const offset = (page - 1) * rows;

    const [rawRecords, countResult] = await Promise.all([
      db
        .select({
          id: studentRegistration.id,

          photo: studentRegistration.photo,

          code: studentRegistration.code,

          fullName: studentRegistration.fullName,
          gender: studentRegistration.gender,

          status: studentRegistration.statusReEnrollment,

          programCost: program.cost,
          buildingCost: batch.buildingCost,
          waveDiscount: wave.discount,
          otherDiscount: studentRegistration.otherDiscount,

          batch: batch.batch,
          year: batch.year,
          wave: wave.wave,

          programName: program.name,

          updatedAt: studentRegistration.updatedAt,
          createdAt: studentRegistration.createdAt,
        })
        .from(studentRegistration)
        .innerJoin(batch, eq(studentRegistration.batchId, batch.id))
        .innerJoin(wave, eq(studentRegistration.waveId, wave.id))
        .innerJoin(program, eq(studentRegistration.programId, program.id))
        .where(
          eq(studentRegistration.type, 'RE_ENROLLMENT')
        )
        .limit(rows)
        .orderBy(asc(studentRegistration.statusReEnrollment), desc(studentRegistration.id))
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(studentRegistration),
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
  "/reEnrollment/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");
      const result = await db
        .select({
          id: studentRegistration.id,

          photo: studentRegistration.photo,

          code: studentRegistration.code,

          fullName: studentRegistration.fullName,
          gender: studentRegistration.gender,
          religion: studentRegistration.religion,
          birthPlace: studentRegistration.birthPlace,
          birthDate: studentRegistration.birthDate,
          currentAddress: studentRegistration.currentAddress,
          parentAddress: studentRegistration.parentAddress,
          phoneNumber: studentRegistration.phoneNumber,
          parentPhoneNumber: studentRegistration.parentPhoneNumber,
          graduateFrom: studentRegistration.graduateFrom,
          graduateMajor: studentRegistration.graduateMajor,
          knownForm: studentRegistration.knownFrom,

          status: studentRegistration.statusReEnrollment,

          minInstallmentCost: studentRegistration.minEnRollmentInstallmentCost,

          programCost: program.cost,
          buildingCost: batch.buildingCost,
          waveDiscount: wave.discount,
          otherDiscount: studentRegistration.otherDiscount,

          batch: batch.batch,
          year: batch.year,
          wave: wave.wave,
          programName: program.name,

          updatedAt: studentRegistration.updatedAt,
          createdAt: studentRegistration.createdAt,
        })
        .from(studentRegistration)
        .innerJoin(batch, eq(studentRegistration.batchId, batch.id))
        .innerJoin(wave, eq(studentRegistration.waveId, wave.id))
        .innerJoin(program, eq(studentRegistration.programId, program.id))
        .where(eq(studentRegistration.id, id))
        .limit(1);

      res.json(result[0]);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/reEnrollment/:id/edit/",
  upload('/public/media/registrationPhoto').single("photo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      const {
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
        minInstallmentCost,
        otherDiscount
      } = req.body;

      const updateData: Record<string, any> = {
        ...(fullName && { fullName }),
        ...(phoneNumber && { phoneNumber }),
        ...(gender && { gender }),
        ...(religion && { religion }),
        ...(birthPlace && { birthPlace }),
        ...(birthDate && { birthDate: new Date(birthDate) }),
        ...(currentAddress && { currentAddress }),
        ...(parentAddress && { parentAddress }),
        ...(parentPhoneNumber && { parentPhoneNumber }),
        ...(graduateFrom && { graduateFrom }),
        ...(graduateMajor && { graduateMajor }),
        ...(minInstallmentCost && { minEnRollmentInstallmentCost: minInstallmentCost }),
        ...(otherDiscount && { otherDiscount }),
      };

      if (req.file) {
        updateData.photo = req.file.filename;
      }

      await db
        .update(studentRegistration)
        .set(updateData)
        .where(eq(studentRegistration.id, id));

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/reEnrollment/:id/confirm/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id ?? "0");

      await db.transaction(async (tx) => {
        const getConfig = (await tx
          .select()
          .from(config)
          .where(eq(config.version, CAREER_CONFIG))
          .limit(1))[0]

        if (!getConfig) {
          throw new CustomError("get_config_failed", 500);
        }

        const updatedRegistration = (await tx
          .update(studentRegistration)
          .set({
            type: 'RE_ENROLLMENT',
            statusPreRegistration: 'CONFIRMED',
            statusReEnrollment: 'CONFIRMED'
          })
          .where(eq(studentRegistration.id, id))
          .returning())[0];

        if (!updatedRegistration) {
          throw new CustomError("get_registration_failed", 500);
        }

        const getNewBatch = (await tx
          .update(batch)
          .set({
            currentRegistrationNumber: sql`${batch.currentRegistrationNumber} + 1`,
          })
          .where(eq(batch.id, updatedRegistration.batchId))
          .returning())[0];

        if (!getNewBatch) {
          throw new CustomError("get_batch_failed", 500);
        }

        const getWave = (await tx
          .select()
          .from(wave)
          .where(eq(wave.id, updatedRegistration.waveId))
          .limit(1))[0]

        if (!getWave) {
          throw new CustomError("get_wave_failed", 500);
        }

        const getProgram = (await tx
          .select()
          .from(program)
          .where(eq(program.id, updatedRegistration.programId))
          .limit(1))[0]

        if (!getProgram) {
          throw new CustomError("get_program_failed", 500);
        }

        const insertedStudent = (await tx
          .insert(student)
          .values({
            photo: updatedRegistration.photo,

            registrationNumber: getNewBatch.currentRegistrationNumber,
            status: 'ACTIVE',

            fullName: updatedRegistration.fullName,
            gender: updatedRegistration.gender,
            religion: updatedRegistration.religion,
            birthPlace: updatedRegistration.birthPlace,
            birthDate: updatedRegistration.birthDate,
            currentAddress: updatedRegistration.currentAddress,
            parentAddress: updatedRegistration.parentAddress,
            parentPhoneNumber: updatedRegistration.parentPhoneNumber,
            phoneNumber: updatedRegistration.phoneNumber,
            graduateFrom: updatedRegistration.graduateFrom,
            graduateMajor: updatedRegistration.graduateMajor,

            batchId: updatedRegistration.batchId,
            waveId: updatedRegistration.waveId,
            programId: updatedRegistration.programId
          })
          .returning())[0];

        if (!insertedStudent) {
          throw new CustomError("insert_student_failed", 500);
        }

        const insertedInvoice = (await tx
          .insert(invoice)
          .values({
            isPaidOff: false,
            programCost: getProgram.cost,
            buildingCost: getNewBatch.buildingCost,
            waveDiscount: getWave.discount,
            otherDiscount: updatedRegistration.otherDiscount,
            studentId: insertedStudent.id
          })
          .returning())[0];

        if (!insertedInvoice) {
          throw new CustomError("insert_invoice_failed", 500);
        }

        await tx
          .insert(invoiceInstallment)
          .values({
            total: updatedRegistration.minEnRollmentInstallmentCost,
            invoiceId: insertedInvoice.id
          })
          .returning();
      });

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
