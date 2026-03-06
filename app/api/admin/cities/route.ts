import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { citySchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const cities = await prisma.city.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ cities });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const result = citySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", details: result.error.issues },
      { status: 400 }
    );
  }

  const city = await prisma.city.create({ data: result.data });
  revalidatePublicSite();
  return NextResponse.json({ city }, { status: 201 });
}
