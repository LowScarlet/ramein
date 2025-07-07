import express, { NextFunction, Request, Response } from "express";
import db from "../../../../../../../db/drizzle.ts";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { config } from "../../../../../../../db/schema/career/config.ts";
import { CAREER_CONFIG } from "../../../../../../../utils/env.ts";
import { batch } from "../../../../../../../db/schema/career/batch.ts";
import { wave } from "../../../../../../../db/schema/career/wave.ts";
import { CustomError } from "../../../../../../exceptions/CustomError.ts";
import { student } from "../../../../../../../db/schema/career/student.ts";
import { employee } from "../../../../../../../db/schema/employee.ts";
import { classRoom } from "../../../../../../../db/schema/career/classRoom.ts";

const router = express.Router();

router.get(
  "/stats/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await db.transaction(async (tx) => {
        const getConfig = (await tx
          .select()
          .from(config)
          .where(eq(config.version, CAREER_CONFIG))
          .limit(1))[0]
        if (!getConfig) {
          throw new CustomError("get_config_failed", 500);
        }

        const getBatch = (await tx
          .select()
          .from(batch)
          .where(eq(batch.id, getConfig.activeBatchId ?? 0))
          .limit(1))[0];
        if (!getBatch) {
          throw new CustomError("get_batch_failed", 500);
        }

        const getTotalStudent = (await tx
          .select({ count: count() })
          .from(student)
          .where(eq(student.batchId, getConfig.activeBatchId ?? 0))
        )[0];
        if (!getTotalStudent) {
          throw new CustomError("get_stats_failed 1", 500);
        }

        const getTotalInstructor = (await tx
          .select({ count: count() })
          .from(employee)
        )[0];
        if (!getTotalInstructor) {
          throw new CustomError("get_stats_failed 2", 500);
        }

        const getTotalClass = (await tx
          .select({ count: count() })
          .from(classRoom)
          .where(
            eq(classRoom.batchId, getConfig.activeBatchId ?? 0)
          )
        )[0];
        if (!getTotalClass) {
          throw new CustomError("get_stats_failed 3", 500);
        }

        return {
          totalStudent: getTotalStudent.count,
          totalInstructor: getTotalInstructor.count,
          totalClass: getTotalClass.count,
        };
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/getBatch/:id/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.transaction(async (tx) => {
      const getConfig = (await tx
        .select()
        .from(config)
        .where(eq(config.version, CAREER_CONFIG))
        .limit(1))[0]
      if (!getConfig) {
        throw new CustomError("get_config_failed", 500);
      }

      const getBatch = (await tx
        .select()
        .from(batch)
        .where(eq(batch.id, getConfig.activeBatchId ?? 0))
        .limit(1))[0];
      if (!getBatch) {
        throw new CustomError("get_batch_failed", 500);
      }

      const getWave = (await tx
        .select()
        .from(wave)
        .where(eq(wave.id, getConfig.activeWaveId ?? 0))
        .limit(1))[0];
      if (!getWave) {
        throw new CustomError("get_wave_failed", 500);
      }

      const getWaves = await tx
        .select({
          id: wave.id,
          wave: wave.wave,
        })
        .from(wave)
        .orderBy(asc(wave.id))
        .where(eq(wave.batchId, getBatch.id ?? 0));
      if (getWaves.length === 0) {
        throw new CustomError("batch_no_waves", 500);
      }

      return {
        batch: getBatch.batch,
        year: getBatch.year,
        startDate: getBatch.startDate,
        endDate: getBatch.endDate,
        preRegistrationCost: getBatch.preRegistrationCost,
        buildingCost: getBatch.buildingCost,
        currentWave: getWave.id,
        waveDiscount: getWave.discount ?? 0,
        waves: getWaves,
        allowSelfRegistration: getConfig.allowSelfRegistration,
      };
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/startBatch", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nBatch, nYear } = req.body;

    await db.transaction(async (tx) => {
      const getConfig = (await tx
        .select()
        .from(config)
        .where(eq(config.version, CAREER_CONFIG))
        .limit(1))[0]
      if (getConfig) {
        throw new CustomError("has_been_start", 500);
      }

      const newBatch = (await tx
        .insert(batch)
        .values({
          batch: parseInt(nBatch, 10),
          year: parseInt(nYear, 10),
        })
        .returning())[0];

      if (!newBatch) {
        throw new CustomError("create_batch_failed", 500);
      }

      const nextBatchWaves = (
        await tx
          .insert(wave)
          .values(
            [1, 2, 3, 4].map((i) => ({
              wave: i,
              discount: 0,
              batchId: newBatch.id,
            }))
          )
          .returning()
      ).sort((a, b) => a.wave - b.wave);

      if (!nextBatchWaves[0]) {
        throw new CustomError("error_when_set_active_wave", 500);
      }

      await tx
        .insert(config)
        .values({
          version: CAREER_CONFIG,
          activeBatchId: newBatch.id,
          activeWaveId: nextBatchWaves[0].id,
        })
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

router.post("/nextBatch", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nBatch, nYear } = req.body;

    await db.transaction(async (tx) => {
      const getLatestBatch = (await tx
        .select()
        .from(batch)
        .orderBy(desc(batch.batch))
        .limit(1))[0]
      if (!getLatestBatch) {
        throw new CustomError("get_batch_failed", 500);
      }

      const nextBatch = (await tx
        .insert(batch)
        .values({
          batch: parseInt(nBatch ?? getLatestBatch.batch + 1, 10),
          year: parseInt(nYear ?? getLatestBatch.year, 10),
          preRegistrationCost: getLatestBatch.preRegistrationCost,
          buildingCost: getLatestBatch.buildingCost,
        })
        .returning())[0];

      if (!nextBatch) {
        throw new CustomError("create_batch_failed", 500);
      }

      const nextBatchWaves = (
        await tx
          .insert(wave)
          .values(
            [1, 2, 3, 4].map((i) => ({
              wave: i,
              discount: 0,
              batchId: nextBatch.id,
            }))
          )
          .returning()
      ).sort((a, b) => a.wave - b.wave);

      await tx
        .update(config)
        .set({
          activeBatchId: nextBatch.id,
          activeWaveId: nextBatchWaves[0]?.id,
          allowSelfRegistration: false
        })
        .where(eq(config.version, CAREER_CONFIG));
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

router.post("/changeWave", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { waveId } = req.body;

    await db.transaction(async (tx) => {
      const getConfig = (await tx
        .select()
        .from(config)
        .where(eq(config.version, CAREER_CONFIG))
        .limit(1))[0]
      if (!getConfig) {
        throw new CustomError("get_config_failed", 500);
      }

      const getWave = (await tx
        .select()
        .from(wave)
        .where(and(eq(wave.id, parseInt(waveId ?? 0)), eq(wave.batchId, getConfig.activeBatchId ?? 0)))
        .limit(1))[0];
      if (!getWave) {
        throw new CustomError("get_wave_failed", 500);
      }

      await tx
        .update(config)
        .set({
          activeWaveId: getWave.id,
        })
        .where(eq(config.version, CAREER_CONFIG));
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

router.post("/edit", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id ?? "0");

    const {
      preRegistrationCost,
      buildingCost,
      waveDiscount,
      allowSelfRegistration,
    } = req.body;

    await db.transaction(async (tx) => {
      const getConfig = (await tx
        .select()
        .from(config)
        .where(eq(config.version, CAREER_CONFIG))
        .limit(1))[0]
      if (!getConfig) {
        throw new CustomError("get_config_failed", 500);
      }

      const getBatch = (await tx
        .select()
        .from(batch)
        .where(eq(batch.id, getConfig.activeBatchId ?? 0))
        .limit(1))[0];
      if (!getBatch) {
        throw new CustomError("get_batch_failed", 500);
      }

      const getWave = (await tx
        .select()
        .from(wave)
        .where(eq(wave.id, getConfig.activeWaveId ?? 0))
        .limit(1))[0];
      if (!getWave) {
        throw new CustomError("get_wave_failed", 500);
      }

      await tx
        .update(config)
        .set({
          allowSelfRegistration
        })
        .where(eq(config.version, CAREER_CONFIG));

      await tx
        .update(batch)
        .set({
          preRegistrationCost,
          buildingCost,
        })
        .where(eq(batch.id, getBatch.id));

      await tx
        .update(wave)
        .set({
          discount: waveDiscount,
        })
        .where(eq(wave.id, getWave.id));
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

export default router;
