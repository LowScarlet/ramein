import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      payload: Record<string, any>;
      user: Record<string, any>;
    }
  }
}
