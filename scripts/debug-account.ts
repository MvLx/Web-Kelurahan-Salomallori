import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  const users = await prisma.user.findMany();
  console.log("USERS:", JSON.stringify(users, null, 2));

  const accounts = await prisma.account.findMany();
  console.log(
    "ACCOUNTS:",
    JSON.stringify(
      accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        providerId: a.providerId,
        userId: a.userId,
        hasPassword: !!a.password,
        passwordPrefix: a.password ? a.password.substring(0, 10) : null,
      })),
      null,
      2
    )
  );

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });