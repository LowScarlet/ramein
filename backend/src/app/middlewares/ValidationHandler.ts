import { validationResult } from "express-validator";
import { ValidationException } from "../exceptions/ValidationExceptions.ts";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const ValidatorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return next(new ValidationException(errors.array()));
  } catch (error) {
    return next(error);
  }
};

export const ZodValidatorHandler = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data; // Cleaned data
      return next();
    }

    const errors = result.error.errors.map((err) => ({
      path: err.path.join("."), // Convert array path to string
      msg: err.message,
    }));

    return next(new ValidationException(errors));
  };
};
