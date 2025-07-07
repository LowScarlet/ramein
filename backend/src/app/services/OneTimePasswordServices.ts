import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_SECRET } from '../../utils/env.ts';
import db from '../../db/drizzle.ts';
import { refreshToken as refreshTokenTable } from '../../db/schema/refreshToken.ts';

const accessExpiresIn = 24 * 3600; // 1 day
const refreshExpiresIn = 48 * 3600; // 48 hours

const hashAlgorithm = 'sha512';
const hashDigest = 'hex';

interface User {
  id: number;
}

interface TokenResult {
  token: string;
  expirationDate: Date;
}

interface CreateTokenData {
  accessToken: TokenResult;
  refreshToken: TokenResult;
}

function generateAccessToken(user: User): TokenResult {
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: accessExpiresIn });
  const expirationDate = new Date(Date.now() + accessExpiresIn * 1000);

  return {
    token,
    expirationDate,
  };
}

function generateRefreshToken(user: User, jti: string): TokenResult {
  const token = jwt.sign({ userId: user.id, jti }, JWT_SECRET, { expiresIn: refreshExpiresIn });
  const expirationDate = new Date(Date.now() + refreshExpiresIn * 1000);

  return {
    token,
    expirationDate,
  };
}

function hashToken(token: string): string {
  return crypto.createHash(hashAlgorithm).update(token).digest(hashDigest);
}

async function createToken(
  user: User,
  jti: string,
  data: Record<string, any>
): Promise<CreateTokenData> {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  await db.insert(refreshTokenTable).values({
    token: hashToken(refreshToken.token),
    isActive: true,
    revocationReason: 'OTHER',
    ipAddress: data.ipAddress || 'UNKNOWN',
    userAgent: data.userAgent || 'UNKNOWN',
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
  };
}

async function verifyRefreshToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (!payload || typeof payload !== 'object') {
      return null;
    }

    const { userId, exp } = payload;
    
    const refToken = await db.query.refreshToken.findFirst({
      where: (table, { eq }) => eq(table.token, hashToken(token)),
    });

    if (!refToken || !refToken.isActive || !exp || exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    const user = await db.query.user.findFirst({
      where: (table, { eq }) => eq(table.id, userId),
    });

    return user;
  } catch (err) {
    return null;
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  createToken,
  verifyRefreshToken,
};
