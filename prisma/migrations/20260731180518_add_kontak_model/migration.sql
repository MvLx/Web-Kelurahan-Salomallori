-- CreateTable
CREATE TABLE "kontak" (
    "id" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telepon" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "jamKerja" TEXT,
    "mapsEmbed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kontak_pkey" PRIMARY KEY ("id")
);
