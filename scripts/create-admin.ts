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

  const email = "adminsalomallori@gmail.com";
  const userId = "admin-salomallori";

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: { email, role: "ADMIN", emailVerified: true, name: "Admin Salomallori" },
    create: {
      id: userId,
      name: "Admin Salomallori",
      email,
      emailVerified: true,
      role: "ADMIN",
    },
  });

  const { hashPassword } = await import("@better-auth/utils/password");
  const hashedPassword = await hashPassword("admin123");

  const existingAccount = await prisma.account.findFirst({
    where: { userId, providerId: "credential" },
  });

  if (existingAccount) {
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: { password: hashedPassword, accountId: userId },
    });
    console.log("Account updated:", email);
  } else {
    // Hapus account lama yang salah provider (email) jika ada
    await prisma.account.deleteMany({
      where: { userId, providerId: "email" },
    });

    await prisma.account.create({
      data: {
        id: "acc-admin-salomallori",
        accountId: userId,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
      },
    });
    console.log("Account created:", email);
  }

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