import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { updateUMKMSchema } from "@/lib/schemas/umkm";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/umkm/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const umkm = await prisma.uMKM.findUnique({
      where: { id },
    });

    if (!umkm) {
      return NextResponse.json(
        { error: "UMKM tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(umkm);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data UMKM" },
      { status: 500 },
    );
  }
}

// PUT /api/umkm/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const body = await req.json();
    const parsed = updateUMKMSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const existing = await prisma.uMKM.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "UMKM tidak ditemukan" },
        { status: 404 },
      );
    }

    const { id: _unused, ...updateData } = parsed.data;

    const updated = await prisma.uMKM.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui UMKM" },
      { status: 500 },
    );
  }
}

// DELETE /api/umkm/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    const existing = await prisma.uMKM.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "UMKM tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.uMKM.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus UMKM" },
      { status: 500 },
    );
  }
}