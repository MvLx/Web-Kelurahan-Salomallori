import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { updateKontakSchema } from "@/lib/schemas/kontak";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/kontak — public (untuk halaman kontak)
export async function GET() {
  try {
    const kontak = await prisma.kontak.findFirst();
    if (!kontak) {
      return NextResponse.json(
        { error: "Data kontak tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json(kontak);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/kontak — staff only (untuk dashboard admin)
export async function PUT(req: NextRequest) {
  try {
    const authResult = await requireAnyRole(STAFF_ROLES);
    if (!authResult.ok) return authResult.response;

    const rateCheck = mutationLimiter.check(getClientIp(req));
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 },
      );
    }

    const body = await req.json();

    const kontak = await prisma.kontak.findFirst();
    if (!kontak) {
      return NextResponse.json(
        { error: "Data kontak tidak ditemukan" },
        { status: 404 },
      );
    }

    const parsed = updateKontakSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: z.flattenError(parsed.error).fieldErrors },
        { status: 422 },
      );
    }

    const updated = await prisma.kontak.update({
      where: { id: kontak.id },
      data: parsed.data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}