import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { createGaleriSchema } from "@/lib/schemas/galeri";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/galeri — public, with pagination & category filter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(limitParam ?? "20", 10)));
    const kategori = searchParams.get("kategori")?.trim() ?? "";

    const where = kategori ? { kategori } : {};

    const [items, total] = await Promise.all([
      prisma.galeri.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.galeri.count({ where }),
    ]);

    return NextResponse.json({
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" },
      { status: 500 },
    );
  }
}

// POST /api/galeri — staff only, with validation
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

    const user = authResult.session.user;
    const body = await req.json();
    const parsed = createGaleriSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const item = await prisma.galeri.create({
      data: {
        ...parsed.data,
        uploadedById: user.id,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat galeri" },
      { status: 500 },
    );
  }
}