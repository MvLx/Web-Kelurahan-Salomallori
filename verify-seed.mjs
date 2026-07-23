import "dotenv/config";
import { PrismaClient } from "./lib/generated/prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const counts = {
  Desa: await prisma.desa.count(),
  PerangkatDesa: await prisma.perangkatDesa.count(),
  UMKM: await prisma.uMKM.count(),
  Wisata: await prisma.wisata.count(),
  Infografis: await prisma.infografis.count(),
};

console.log("✅ Data berhasil diverifikasi:");
for (const [model, count] of Object.entries(counts)) {
  console.log(`  ${model}: ${count}`);
}

await prisma.$disconnect();