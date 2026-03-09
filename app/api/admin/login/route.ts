import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, createSession } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid email or password format." }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: result.data.email.toLowerCase().trim() },
    });

    if (!admin || !(await comparePassword(result.data.password, admin.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createSession(admin.id);
    await setSessionCookie(token);

    return NextResponse.json({
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
