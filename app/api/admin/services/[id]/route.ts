import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { serviceSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const result = serviceSchema.partial().safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
  }

  const service = await prisma.service.update({ where: { id }, data: result.data });
  revalidatePublicSite();
  return NextResponse.json({ service });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.service.delete({ where: { id } });
  revalidatePublicSite();
  return NextResponse.json({ success: true });
}