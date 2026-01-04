import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { serviceSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const result = serviceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
  }

  const service = await prisma.service.create({ data: result.data });
  revalidatePublicSite();
  return NextResponse.json({ service }, { status: 201 });
}