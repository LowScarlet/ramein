import express, { Request, Response, NextFunction } from "express";

import enumModel from "./enum/Routes.ts";
import account from "./account/Routes.ts";
import employee from "./employee/Routes.ts";
import room from "./room/Routes.ts";

import career_program from "./career/program/Routes.ts";
import career_course from "./career/course/Routes.ts";
import career_batch from "./career/batch/Routes.ts";
import career_student from "./career/student/Routes.ts";
import career_registration from "./career/registration/Routes.ts";

const router = express.Router();

router.use("/enum", enumModel);
router.use("/account", account);
router.use("/employee", employee);
router.use("/room", room);
router.use("/career/program", career_program);
router.use("/career/course", career_course);
router.use("/career/batch", career_batch);
router.use("/career/student", career_student);
router.use("/career/registration", career_registration);

export default router;
