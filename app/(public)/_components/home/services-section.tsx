import { SectionHeading } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/common/cards";
import { SectionShell } from "@/components/common/section-shell";
import { Reveal } from "@/components/motion/reveal";

interface ServiceSummary {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
}

export function ServicesSection({ services }: { services: ServiceSummary[] }) {
  return (
    <SectionShell>
      <SectionHeading
        tag="Our Services"
        title="Everything You Need for a Stress-Free Move"
        description="From a single room to a full industrial relocation, our trained crews handle every stage with care."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.08}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
