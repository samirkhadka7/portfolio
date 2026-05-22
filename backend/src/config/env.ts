import dotenv from 'dotenv';

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const requiredMinLength = (key: string, minLength: number): string => {
  const value = required(key);
  if (value.length < minLength) {
    throw new Error(
      `${key} must be at least ${minLength} characters (got ${value.length}). ` +
        `Generate one with: openssl rand -hex 32`,
    );
  }
  return value;
};

export const env = {
  PORT: parseInt(process.env.PORT ?? '5000', 10),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGODB_URI: required('MONGODB_URI'),
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
  CLOUDINARY_CLOUD_NAME: required('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: required('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: required('CLOUDINARY_API_SECRET'),
  ADMIN_EMAIL: required('ADMIN_EMAIL'),
  ADMIN_PASSWORD: required('ADMIN_PASSWORD'),
  JWT_SECRET: requiredMinLength('JWT_SECRET', 32),
} as const;

export const isProd = env.NODE_ENV === 'production';
