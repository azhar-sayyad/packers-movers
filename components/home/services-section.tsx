import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { ServiceIcon } from "@/components/common/service-icon";
import { Reveal } from "@/components/motion/reveal";

interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        tag="Our Services"
        title="Everything You Need for a Stress-Free Move"
        description="From a single room to a full industrial relocation, our trained crews handle every stage with care."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.08}>
            <Link
              href={`/services/${service.slug}`}
              className="group block rounded-xl border border-black/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-950 transition-colors group-hover:bg-accent-600">
                <ServiceIcon name={service.icon} className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-brand-950">{service.name}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{service.shortDesc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}