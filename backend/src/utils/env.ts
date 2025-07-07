import path from "path";

export const LOCAL_IP = '192.168.1.8'
export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const PROTOCOL = process.env.PROTOCOL || 'http';
export const BACKEND_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN || LOCAL_IP + ':5100';
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || LOCAL_IP + ':3100'
export const DATABASE_URL = process.env.DATABASE_PUBLIC_URL || 'postgres://postgres:12345678@localhost:5432/icc4';
export const VOLUME_PATH = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.resolve('./uploads');
export const JWT_SECRET = process.env.JWT_SECRET || '9A8F6A5E759E465B1781C8D448272';

export const getDomainUrl = (domain: string) => {
  return `${PROTOCOL}://${domain}`;
}