import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { createPerangkatDesaSchema } from "@/lib/schemas/perangkat-desa";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/perangkat-desa — public
export async function GET() {
  try {
    const items = await prisma.perangkatDesa.findMany({
      orderBy: { urutan: "asc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data perangkat desa" },
      { status: 500 },
    );
  }
}

// POST /api/perangkat-desa — staff only
export async function POST(req: NextRequest) {
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
    const parsed = createPerangkatDesaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: z.flattenError(parsed.error).fieldErrors },
        { status: 422 },
      );
    }

    const item = await prisma.perangkatDesa.create({ data: parsed.data });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat perangkat desa" },
      { status: 500 },
    );
  }
}