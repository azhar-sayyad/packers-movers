import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { portfolioSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const result = portfolioSchema.partial().safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", details: result.error.issues },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = { ...result.data };
  if (data.citySlug === "" || data.citySlug === undefined) data.citySlug = null;
  if (data.serviceSlug === "" || data.serviceSlug === undefined) data.serviceSlug = null;

  const item = await prisma.portfolio.update({ where: { id }, data });
  revalidatePublicSite();
  return NextResponse.json({ item });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.portfolio.delete({ where: { id } });
  revalidatePublicSite();
  return NextResponse.json({ success: true });
}