import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import os from "os";

function setupServerlessDatabase() {
  const isServerless =
    process.env.NETLIFY === "true" ||
    !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
    !!process.env.LAMBDA_TASK_ROOT ||
    !!process.env.VERCEL;

  if (isServerless) {
    try {
      const tmpDir = os.tmpdir();
      const tmpDbPath = path.join(tmpDir, "dev.db");

      if (!fs.existsSync(tmpDbPath)) {
        const rootDbPath = path.join(process.cwd(), "prisma", "dev.db");
        const altDbPath = path.join(process.cwd(), "dev.db");

        if (fs.existsSync(rootDbPath)) {
          fs.copyFileSync(rootDbPath, tmpDbPath);
        } else if (fs.existsSync(altDbPath)) {
          fs.copyFileSync(altDbPath, tmpDbPath);
        }
      }
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    } catch (err) {
      console.warn("[prisma] Failed to prepare temp DB for serverless execution:", err);
    }
  }
}

setupServerlessDatabase();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
