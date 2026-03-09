import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { portfolioSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const items = await prisma.portfolio.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ portfolio: items });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const result = portfolioSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", details: result.error.issues },
      { status: 400 }
    );
  }

  const item = await prisma.portfolio.create({
    data: {
      title: result.data.title,
      citySlug: result.data.citySlug || null,
      serviceSlug: result.data.serviceSlug || null,
      imageUrl: result.data.imageUrl,
      tag: result.data.tag,
    },
  });
  revalidatePublicSite();
  return NextResponse.json({ item }, { status: 201 });
}
