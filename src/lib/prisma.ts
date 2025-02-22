// prisma.ts
// instantiate a single instance PrismaClient and save it on the globalThis object.
// check globalThis to see if anything is stored on it
// If nothing is on the object, we will create a new PrismaClient; otherwise, we will just reuse the one stored.
// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

let prisma : PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;