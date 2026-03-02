import { SectionHeading } from "@/components/common/section-heading";
import { CityCard } from "@/components/common/cards";
import { SectionShell } from "@/components/common/section-shell";
import { Reveal } from "@/components/motion/reveal";

interface CitySummary {
  slug: string;
  name: string;
  state: string;
  district: string;
  description: string;
}

export function CitiesSection({ cities }: { cities: CitySummary[] }) {
  return (
    <SectionShell variant="tinted">
      <SectionHeading
        tag="Locations We Serve"
        title="Packers & Movers Near You"
        description="Explore verified relocation services in your city across Madhya Pradesh and Maharashtra."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city, i) => (
          <Reveal key={city.slug} delay={(i % 4) * 0.08}>
            <CityCard city={city} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
