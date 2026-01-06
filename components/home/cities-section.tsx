import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface City {
  slug: string;
  name: string;
  state: string;
  district: string;
  description: string;
}

export function CitiesSection({ cities }: { cities: City[] }) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          tag="Locations We Serve"
          title="Packers & Movers Near You"
          description="Explore verified relocation services in your city across Madhya Pradesh and Maharashtra."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
{cities.map((city, i) => (
          <Reveal key={city.slug} delay={(i % 4) * 0.08}>
            <Link
              href={`/packers-movers/${city.slug}`}
              className="group block rounded-xl border border-black/10 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50">
                <MapPin className="h-4 w-4 text-accent-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-950">{city.name}</h3>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">{city.state}</p>
              <p className="mb-3 line-clamp-2 text-sm text-muted">{city.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                Get moving in {city.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
        </div>
      </div>
    </section>
  );
}