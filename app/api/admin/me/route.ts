import { NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/session";

export async function GET() {
  const admin = await getCurrentAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ admin: { id: admin.id, name: admin.name, email: admin.email } });
}
