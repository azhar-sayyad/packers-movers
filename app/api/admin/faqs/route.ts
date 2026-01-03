import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { faqSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const items = await prisma.fAQ.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json({ faqs: items });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const result = faqSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
  }

  const item = await prisma.fAQ.create({
    data: {
      question: result.data.question,
      answer: result.data.answer,
      category: result.data.category,
      citySlug: result.data.citySlug || null,
      order: result.data.order,
      isPublished: result.data.isPublished,
    },
  });
  revalidatePublicSite();
  return NextResponse.json({ item }, { status: 201 });
}