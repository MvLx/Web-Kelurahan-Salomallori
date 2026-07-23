import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { updatePerangkatDesaSchema } from "@/lib/schemas/perangkat-desa";
import { mutationLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/perangkat-desa/[id] — public
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await prisma.perangkatDesa.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data perangkat desa" },
      { status: 500 },
    );
  }
}

// PUT /api/perangkat-desa/[id] — staff only
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
    const parsed = updatePerangkatDesaSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: z.flattenError(parsed.error).fieldErrors },
        { status: 422 },
      );
    }

    const existing = await prisma.perangkatDesa.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Perangkat desa tidak ditemukan" }, { status: 404 });
    }

    const { id: _unused, ...updateData } = parsed.data;
    const item = await prisma.perangkatDesa.update({ where: { id }, data: updateData });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengupdate perangkat desa" },
      { status: 500 },
    );
  }
}

// DELETE /api/perangkat-desa/[id] — staff only
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
    const existing = await prisma.perangkatDesa.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Perangkat desa tidak ditemukan" }, { status: 404 });
    }

    await prisma.perangkatDesa.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus perangkat desa" },
      { status: 500 },
    );
  }
}