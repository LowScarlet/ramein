import express, { Request, Response, NextFunction } from "express";
import api from "./api/Routes.ts";
import media from "./media/Routes.ts"
import { CheckPayload } from "../middlewares/AuthMiddlewares.ts";
import { BACKEND_DOMAIN, FRONTEND_DOMAIN, getDomainUrl } from "../../utils/env.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const contributors = [
    {
      fullName: "Tegar Maulana Fahreza",
      github: "LowScarlet",
    },
  ];

  try {
    res.json({
      domains: {
        frontend:  getDomainUrl(FRONTEND_DOMAIN),
        backend: getDomainUrl(BACKEND_DOMAIN),
      },
      message: "Welcome To Api!",
      framework: "Express.js x Scarlet.ts V1.0 (Experimental)",
      contributors,
    });
  } catch (err) {
    next(err);
  }
});

// Client
router.use("/api", CheckPayload, api);
router.use("/media", media);

export default router;
