import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, STAFF_ROLES } from "@/lib/dal";
import { createMessageSchema } from "@/lib/schemas/message";
import { contactLimiter, getClientIp } from "@/lib/api-rate-limit";

// GET /api/messages — paginated list (admin/editor only)
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAnyRole(STAFF_ROLES);
    if (!authResult.ok) return authResult.response;

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)),
    );
    const search = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status") ?? "all"; // "all" | "read" | "unread"

    const where = {
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(status === "read"
        ? { isRead: true }
        : status === "unread"
          ? { isRead: false }
          : {}),
    };

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          content: true,
          isRead: true,
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where }),
    ]);

    return NextResponse.json({
      data: messages,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data pesan" },
      { status: 500 },
    );
  }
}

// POST /api/messages — create new message (public, from contact form)
export async function POST(req: NextRequest) {
  try {
    // Rate limiting — 5 submissions per minute per IP
    const rateCheck = contactLimiter.check(getClientIp(req));
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = createMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 422 },
      );
    }

    const { fullName, email, phoneNumber, content } = parsed.data;

    const message = await prisma.message.create({
      data: { fullName, email, phoneNumber, content },
      select: { id: true, fullName: true, email: true, createdAt: true },
    });

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 },
    );
  }
}