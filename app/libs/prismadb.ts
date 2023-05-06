import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client

//globalThis is not effected by hot reload, if not used it can give a bunch of errors in the terminal

//Best practice for Next 13+ Prisma