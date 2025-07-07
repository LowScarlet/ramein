// Import required modules
import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/routes/Routes.ts";
import i18n from "./utils/i18n.ts";
import { handle } from "i18next-http-middleware";
import cors from "cors";
import ErrorHandler from "./utils/middlewares/error.ts";
import { FRONTEND_DOMAIN, getDomainUrl } from "./utils/env.ts";

// Create the Express app
const app: Application = express();

// i18n
app.use(handle(i18n));

app.use(cors({
  origin: [getDomainUrl(FRONTEND_DOMAIN)],
  credentials: true,
}));

// Default configuration
app.set("json spaces", 2);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "404 - ('_>')___+-- get out!",
  });
});

app.use(ErrorHandler)

// Export the app module
export default app;
