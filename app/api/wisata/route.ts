import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { createWisataSchema } from "@/lib/schemas/wisata";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/wisata — paginated list
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limitParam = searchParams.get("limit");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(limitParam ?? "10", 10)),
    );
    const search = searchParams.get("q")?.trim() ?? "";
    const kategoriRaw = searchParams.get("kategori")?.trim();
    const kategori = kategoriRaw &&
      ["WISATA_ALAM", "KULINER", "BUDAYA"].includes(kategoriRaw)
      ? (kategoriRaw as "WISATA_ALAM" | "KULINER" | "BUDAYA")
      : undefined;

    const where = {
      ...(search
        ? { nama: { contains: search, mode: "insensitive" as const } }
        : {}),
      ...(kategori ? { kategori } : {}),
    };

    const [wisata, total] = await Promise.all([
      prisma.wisata.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.wisata.count({ where }),
    ]);

    return NextResponse.json({
      data: wisata,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/wisata — create new wisata (staff only)
export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAnyRole(STAFF_ROLES);
    if (!authResult.ok) return authResult.response;

    // Rate limiting
    const rateCheck = mutationLimiter.check(getClientIp(req));
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = createWisataSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const wisata = await prisma.wisata.create({ data: parsed.data });
    return NextResponse.json(wisata, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}