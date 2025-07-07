import express, { Request, Response, NextFunction } from "express";
import admin from "./client/admin/Routes.ts";
import me from "./client/me/Routes.ts";
import auth from "./client/auth/Routes.ts";
import { CheckEmployeeRole, IsAuthenticated } from "../../middlewares/AuthMiddlewares.ts";

// test routes
import test_batch from "./client/admin/career/batch/Routes.ts";

const router = express.Router();

router.use("/client/admin", IsAuthenticated, CheckEmployeeRole(['ADMIN']), admin);
router.use("/client/auth", auth);
router.use("/client/me", IsAuthenticated, me);
router.use("/client/test", test_batch);

export default router;
