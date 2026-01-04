import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { testimonialSchema } from "@/lib/validations";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ testimonials: items });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const result = testimonialSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
  }

  const item = await prisma.testimonial.create({
    data: {
      customerName: result.data.customerName,
      citySlug: result.data.citySlug || null,
      rating: result.data.rating,
      reviewText: result.data.reviewText,
      isPublished: result.data.isPublished,
    },
  });
  revalidatePublicSite();
  return NextResponse.json({ item }, { status: 201 });
}