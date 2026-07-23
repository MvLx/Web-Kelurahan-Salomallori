import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { updateDesaSchema } from "@/lib/schemas/desa";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/desa — public
export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ error: "Data desa tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(desa);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/desa — staff only
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

    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ error: "Data desa tidak ditemukan" }, { status: 404 });
    }

    const parsed = updateDesaSchema.safeParse({ ...body, id: desa.id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: z.flattenError(parsed.error).fieldErrors },
        { status: 422 },
      );
    }

    const { id: _unused, ...updateData } = parsed.data;
    const updated = await prisma.desa.update({
      where: { id: desa.id },
      data: updateData,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}