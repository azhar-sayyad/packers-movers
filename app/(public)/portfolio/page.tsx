import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { getPortfolioItems, getActiveCities, getActiveServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work & Portfolio",
  description:
    "Browse recent packing, loading and relocation projects completed by Packers & Movers across Madhya Pradesh and Maharashtra.",
};

export default async function PortfolioPage() {
  const [items, cities, services] = await Promise.all([
    getPortfolioItems(),
    getActiveCities(),
    getActiveServices(),
  ]);

  const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            A showcase of recent packing, loading, and relocation projects across the cities we
            serve.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PortfolioGallery
          items={items.map((i) => ({
            id: i.id,
            title: i.title,
            imageUrl: i.imageUrl,
            tag: i.tag,
            citySlug: i.citySlug,
            serviceSlug: i.serviceSlug,
          }))}
          cities={cityOptions}
          services={serviceOptions}
        />
      </section>
    </>
  );
}
