import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT NOW()`;
  } finally {
    await prisma.$disconnect();
  }
}

export default prisma;
