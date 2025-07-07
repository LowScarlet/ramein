import express, { NextFunction, Request, Response } from "express";
import { enumUserRole } from "../../../../../../db/schema/user.ts";

const router = express.Router();

router.get(
  "/accountRole/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(enumUserRole.enumValues);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
