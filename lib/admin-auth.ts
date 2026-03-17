import { NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/session";

export async function requireAdmin() {
  const admin = await getCurrentAdminUser();
  if (!admin) {
    return { admin: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { admin, error: null };
}
