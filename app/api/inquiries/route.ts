import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { inquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const forwardedIp = request.headers.get("x-forwarded-for");
  const ip = forwardedIp ? forwardedIp.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip).success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please fill in the required fields correctly." },
      { status: 400 }
    );
  }

  // Honeypot anti-spam: silently accept but discard bots
  if (result.data.honeypot) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const data = result.data;
  const inquiry = await prisma.inquiry.create({
    data: {
      name: data.name || "Quick Lead",
      phone: data.phone,
      email: data.email || null,
      moveFrom: data.moveFrom,
      moveTo: data.moveTo,
      serviceType: data.serviceType || "General Inquiry",
      moveDate: data.moveDate || null,
      propertyType: data.propertyType || null,
      message: data.message || null,
      landingPage: data.landingPage || null,
      referrer: data.referrer || null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      ipAddress: ip,
    },
  });

  return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
}
