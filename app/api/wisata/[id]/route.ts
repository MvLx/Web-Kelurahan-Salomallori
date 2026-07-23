import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { updateWisataSchema } from "@/lib/schemas/wisata";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/wisata/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const wisata = await prisma.wisata.findUnique({ where: { id } });

    if (!wisata) {
      return NextResponse.json({ error: "Wisata tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(wisata);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data wisata" },
      { status: 500 },
    );
  }
}

// PUT /api/wisata/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const body = await req.json();
    const parsed = updateWisataSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const existing = await prisma.wisata.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Wisata tidak ditemukan" },
        { status: 404 },
      );
    }

    const { id: _unused, ...updateData } = parsed.data;
    const updated = await prisma.wisata.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui wisata" },
      { status: 500 },
    );
  }
}

// DELETE /api/wisata/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    const existing = await prisma.wisata.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Wisata tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.wisata.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus wisata" },
      { status: 500 },
    );
  }
}