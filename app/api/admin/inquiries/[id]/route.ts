import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { inquiryStatusSchema } from "@/lib/validations";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (session.error) return session.error;

  const { id } = await params;
  const body = await request.json();
  const result = inquiryStatusSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  const updated = await prisma.inquiry.update({
    where: { id },
    data: {
      status: result.data.status,
      ...(result.data.internalNotes !== undefined && {
        internalNotes: result.data.internalNotes,
      }),
    },
  });

  return NextResponse.json({ inquiry: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (session.error) return session.error;

  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  await prisma.inquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}