import express, { NextFunction, Request } from "express";
import path from "path";
import { VOLUME_PATH } from "../../../utils/env.ts";

const router = express.Router();

// Gabungkan path ke direktori public
const account = path.join(path.resolve(VOLUME_PATH), "public/media/account");
const employee = path.join(path.resolve(VOLUME_PATH), "public/media/employee");
const student = path.join(path.resolve(VOLUME_PATH), "public/media/student");
const registrationPhoto = path.join(path.resolve(VOLUME_PATH), "public/media/registrationPhoto");

// Middleware static
router.use("/account", express.static(account));
router.use("/employee", express.static(employee));
router.use("/student", express.static(student));
router.use("/registrationPhoto", express.static(registrationPhoto));

export default router;
