import { NextFunction, Request, Response } from "express";
import {
  AuthorizedUserException,
  UnAuthorizedUserException,
} from "../exceptions/AuthExceptions.ts";
import { JWT_SECRET } from "../../utils/env.ts";
import jwt from "jsonwebtoken";
import db from "../../db/drizzle.ts";
import { user } from "../../db/schema/user.ts";
import { eq } from "drizzle-orm";
import { toMeData } from "../routes/api/client/me/Routes.ts";
import { employee } from "../../db/schema/employee.ts";
import { student } from "../../db/schema/career/student.ts";

interface JwtPayload {
  userId: number;
}

export async function CheckPayload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(" ")[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as unknown;

    const payload = decoded as JwtPayload;

    if (!payload || !payload.userId) {
      return next();
    }

    req.payload = payload;

    const result = await db
      .select()
      .from(user)
      .leftJoin(employee, eq(user.id, employee.userId))
      .leftJoin(student, eq(user.id, student.userId))
      .where(eq(user.id, payload.userId))
      .limit(1);

    req.user = toMeData(result[0]) || {};
  } catch (err) { }

  return next();
}

export function IsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    const exception = UnAuthorizedUserException();
    throw exception;
  }

  try {
    const token = authorization.split(" ")[1];

    if (!token) {
      const exception = UnAuthorizedUserException();
      throw exception;
    }

    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const exception = UnAuthorizedUserException();
    throw exception;
  }

  return next();
}

export function IsNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const exception = AuthorizedUserException();
      throw exception;
    }
  } catch (err) { }

  return next();
}

export function CheckEmployeeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      if (!user || !user.role) {
        throw UnAuthorizedUserException();
      }

      if (user.role !== "EMPLOYEE") {
        throw UnAuthorizedUserException();
      }

      const userEmployeeStatus = user.profile.employee.status;

      const allowedStatuses = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

      if (!allowedStatuses.includes(userEmployeeStatus)) {
        throw UnAuthorizedUserException();
      }

      const userEmployeeRole = user.profile.employee.role;

      if (Array.isArray(userEmployeeRole)) {
        const hasAllowedRole = userEmployeeRole.some((role: string) =>
          allowedRoles.includes(role)
        );
        if (!hasAllowedRole) {
          throw UnAuthorizedUserException();
        }
      } else {
        const hasAllowedRole = allowedRoles.includes(userEmployeeRole);
        if (!hasAllowedRole) {
          throw UnAuthorizedUserException();
        }
      }

      return next();
    } catch (err) {
      throw UnAuthorizedUserException();
    }
  };
}
