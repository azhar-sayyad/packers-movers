import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "./prisma";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(adminUserId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.adminSession.create({
    data: {
      token,
      adminUserId,
      expiresAt,
    },
  });

  return token;
}

export async function verifySession(token: string) {
  if (!token) return null;

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { adminUser: true },
  });

  if (!session) return null;

  if (new Date() > session.expiresAt) {
    await prisma.adminSession.delete({ where: { token } });
    return null;
  }

  return session.adminUser;
}

export async function destroySession(token: string): Promise<void> {
  if (!token) return;
  try {
    await prisma.adminSession.delete({ where: { token } });
  } catch {
    // Ignore if already deleted
  }
}
