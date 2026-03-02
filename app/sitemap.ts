import type { MetadataRoute } from "next";
import { getActiveCities, getActiveServices } from "@/lib/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cities, services] = await Promise.all([getActiveCities(), getActiveServices()]);

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/request-quote",
    "/services",
    "/locations",
    "/portfolio",
    "/testimonials",
    "/faq",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/packers-movers/${city.slug}`,
    lastModified: city.updatedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...servicePages];
}
