import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
const env = process.env.NODE_ENV;

declare global {
  var prisma: PrismaClient | undefined;
}

if (env === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
