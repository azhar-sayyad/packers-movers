import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { getSessionCookie, removeSessionCookie } from "@/lib/session";

export async function POST() {
  const token = await getSessionCookie();
  if (token) {
    await destroySession(token);
  }
  await removeSessionCookie();
  return NextResponse.json({ success: true });
}