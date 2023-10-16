import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// in next.js, everytime you change the line of code, it will create new prisma
// to prevent above situation, if env mode is development, it uses globalThis.prisma instead
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
