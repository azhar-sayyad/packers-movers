import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";

export type SiteSettings = Record<string, string>;

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const rows = await prisma.siteSetting.findMany();
  const map: SiteSettings = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
});

export const getActiveCities = cache(async () => {
  return prisma.city.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
});

export const getActiveServices = cache(async () => {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
});

export const getPublishedFAQs = cache(async (citySlug?: string) => {
  return prisma.fAQ.findMany({
    where: {
      isPublished: true,
      ...(citySlug ? { OR: [{ citySlug: null }, { citySlug }] } : {}),
    },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
});

export const getPublishedTestimonials = cache(async (citySlug?: string) => {
  return prisma.testimonial.findMany({
    where: {
      isPublished: true,
      ...(citySlug ? { citySlug } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
});

export const getPortfolioItems = cache(async (citySlug?: string, serviceSlug?: string) => {
  return prisma.portfolio.findMany({
    where: {
      ...(citySlug ? { citySlug } : {}),
      ...(serviceSlug ? { serviceSlug } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 24,
  });
});

export const getCityBySlug = cache(async (slug: string) => {
  return prisma.city.findFirst({
    where: { slug, isActive: true },
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findFirst({
    where: { slug, isActive: true },
  });
});