import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton for Next.js.
 * Prevents multiple instances of PrismaClient from being instantiated in development.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
