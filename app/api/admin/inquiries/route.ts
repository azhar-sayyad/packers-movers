import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (session.error) return session.error;

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { phone: { contains: search } },
      { moveFrom: { contains: search } },
      { moveTo: { contains: search } },
    ];
  }

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ inquiries });
}