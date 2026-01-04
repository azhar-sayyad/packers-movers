import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { siteSettingSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const { settings } = body;

  if (!Array.isArray(settings)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  for (const setting of settings) {
    const result = siteSettingSchema.safeParse(setting);
    if (!result.success) continue;
    await prisma.siteSetting.upsert({
      where: { key: result.data.key },
      update: { value: result.data.value, description: result.data.description },
      create: result.data,
    });
  }

  const updated = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  revalidatePublicSite();
  return NextResponse.json({ settings: updated });
}