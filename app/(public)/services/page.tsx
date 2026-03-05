import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { ServiceIcon } from "@/components/common/service-icon";
import { getActiveServices, getActiveCities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Household shifting, office relocation, car transport, packing & unpacking, and warehousing services across Madhya Pradesh and Maharashtra.",
};

export default async function ServicesIndexPage() {
  const [services, cities] = await Promise.all([getActiveServices(), getActiveCities()]);

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Moving Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            End-to-end relocation solutions tailored for homes, offices, vehicles, and storage.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          title="Choose the Right Service"
          description="Every move is different. Explore our specialized relocation services below."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group shadow-card hover:shadow-card-hover rounded-xl border border-black/10 bg-white p-7 transition-all hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="bg-brand-950 group-hover:bg-accent-600 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  <ServiceIcon name={service.icon} className="h-6 w-6 text-white" />
                </span>
                <h2 className="font-display text-brand-950 text-xl font-bold">{service.name}</h2>
              </div>
              <p className="text-muted mb-5 text-sm leading-relaxed">{service.fullDesc}</p>
              <ul className="mb-5 space-y-2">
                {JSON.parse(service.features)
                  .slice(0, 4)
                  .map((f: string) => (
                    <li key={f} className="text-muted flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
              </ul>
              <span className="text-accent-700 inline-flex items-center gap-1 text-sm font-semibold">
                View service details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-brand-950 mb-6 text-2xl font-bold">
            Available in Your City?
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/packers-movers/${city.slug}`}
                className="text-muted hover:border-accent-600 hover:text-accent-700 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium transition-colors"
              >
                Packers & Movers in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}