import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { createInfografisSchema } from "@/lib/schemas/infografis";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/infografis — public
export async function GET() {
  try {
    const items = await prisma.infografis.findMany({
      orderBy: { tahun: "desc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data infografis" },
      { status: 500 },
    );
  }
}

// POST /api/infografis — staff only
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
    const parsed = createInfografisSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: z.flattenError(parsed.error).fieldErrors },
        { status: 422 },
      );
    }

    const item = await prisma.infografis.create({ data: parsed.data });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan data infografis" },
      { status: 500 },
    );
  }
}