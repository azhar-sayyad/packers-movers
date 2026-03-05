import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { JsonLd } from "@/components/ui/jsonld";
import { ServiceIcon } from "@/components/common/service-icon";
import { SectionHeading } from "@/components/common/section-heading";
import { getActiveServices, getActiveCities, getServiceBySlug } from "@/lib/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getActiveServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.metaTitle ?? service.name,
    description: service.metaDescription ?? service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle ?? service.name,
      description: service.shortDesc,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, services, cities] = await Promise.all([
    getServiceBySlug(slug),
    getActiveServices(),
    getActiveCities(),
  ]);

  if (!service) notFound();

  const features: string[] = JSON.parse(service.features);
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.fullDesc,
    serviceType: service.name,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-accent-500 mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
            {service.name}
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {service.shortDesc}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            {service.fullDesc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-brand-950">Key Features</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-brand-950">How It Works</h2>
              <ol className="space-y-6">
                {["Request a Free Quote", "Book Your Moving Date", "We Pack & Load Everything", "Safe Transit to Destination", "Unload & Reassemble at Your Doorstep"].map(
                  (step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-600 font-display text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-brand-950">{step}</p>
                      </div>
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-black/10 bg-white p-6 shadow-card">
              <h3 className="mb-4 font-display text-lg font-bold text-brand-950">
                Available in Your City
              </h3>
              <ul className="mb-5 space-y-2">
                {cities.slice(0, 6).map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/packers-movers/${city.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-accent-700"
                    >
                      <MapPin className="h-4 w-4 text-accent-600" />
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700"
              >
                View all locations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <SectionHeading
              title="Other Moving Services"
              description="Explore our full range of relocation solutions."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-xl border border-black/10 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <ServiceIcon name={s.icon} className="mb-3 h-6 w-6 text-accent-600" />
                  <h3 className="mb-1 font-display text-sm font-bold text-brand-950">{s.name}</h3>
                  <p className="line-clamp-2 text-xs text-muted">{s.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}