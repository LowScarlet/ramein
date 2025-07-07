import express, { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../../../../../utils/env.ts";
import { createToken, generateAccessToken, verifyRefreshToken } from "../../../../services/OneTimePasswordServices.ts";
import { v4 as uuidv4 } from 'uuid';
import db from "../../../../../db/drizzle.ts";
import { body } from "express-validator";
import { ValidatorHandler } from "../../../../middlewares/ValidationHandler.ts";
import bcrypt from "bcryptjs";
import { user } from "../../../../../db/schema/user.ts";
import { hashPassword } from "../../../../services/AuthServices.ts";
import { employee } from "../../../../../db/schema/employee.ts";
import { CustomError } from "../../../../exceptions/CustomError.ts";

const router = express.Router();

router.get(
  "/register-admin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await db.transaction(async (tx) => {
        const [createdUser] = await tx.insert(user).values({
          fullName: 'Admin',
          userName: 'admin',
          email: 'admin@admin.com',
          password: hashPassword('admin123'),
          role: 'EMPLOYEE',
        }).returning();

        if (!createdUser) throw new Error('Membuat pengguna gagal');

        await tx.insert(employee).values({
          fullName: 'Admin',
          email: 'admin@admin.com',
          status: 'FULL_TIME',
          role: ['ADMIN'],
          userId: createdUser.id,
        });
      });

      res.json(out);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/login",
  [
    body('email')
      .notEmpty().withMessage('Masukkan email yang valid'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .custom(async (password, { req }) => {
        const { email } = req.body;
        const user = await db.query.user.findFirst({
          where: (table, { eq, and }) =>
            and(
              eq(table.email, email),
            ),
        });

        if (!user) {
          throw new Error('Tidak ditemukan pengguna dengan email ini');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Akun tidak ditemukan atau password salah');

        return true;
      }),
  ],
  ValidatorHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await db.query.user.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.email, email),
          ),
      });

      if (!user) {
        throw new CustomError("Tidak ditemukan pengguna dengan email ini", 400);
      }

      const jti = uuidv4();

      const { accessToken, refreshToken } = await createToken(user, jti, {
        ipAddress: req.ip,
      });

      res.cookie('accessToken', accessToken.token, {
        httpOnly: false,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        expires: accessToken.expirationDate
      });

      res.cookie('refreshToken', refreshToken.token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        expires: refreshToken.expirationDate
      });

      res.json({
        user: user,
        accessToken: {
          token: accessToken.token,
          expiredAt: accessToken.expirationDate
        },
        refreshToken: {
          token: refreshToken.token,
          expiredAt: refreshToken.expirationDate
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.headers.cookie || '';
      const refreshToken = cookies.split(';').find((c) => c.trim().startsWith('refreshToken='));

      if (!refreshToken) throw new CustomError("Token Refresh tidak valid", 400);

      const token = refreshToken.split('=')[1] || '';

      const user = await verifyRefreshToken(token);

      if (!user) throw new CustomError("Token refresh tidak valid atau telah kedaluwarsa", 400);

      const accessToken = generateAccessToken(user);

      res.cookie('accessToken', accessToken.token, {
        httpOnly: false,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        expires: accessToken.expirationDate
      });

      res.json({
        user,
        accessToken: {
          token: accessToken.token,
          expiredAt: accessToken.expirationDate
        }
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/logout",
  (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
      httpOnly: false,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json();
  }
);

export default router;
