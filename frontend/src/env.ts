export const LOCAL_IP = '192.168.1.8';
export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
export const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || LOCAL_IP + ':5100';
export const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || LOCAL_IP + ':3100';

export const getDomainUrl = (domain: string) => {
  return `${PROTOCOL}://${domain}`;
}