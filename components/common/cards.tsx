import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ServiceIcon } from "@/components/common/service-icon";

interface ServiceSummary {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
}

export function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group shadow-card hover:shadow-card-hover block rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1"
    >
      <div className="bg-brand-950 group-hover:bg-accent-600 mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-colors">
        <ServiceIcon name={service.icon} className="h-5 w-5 text-white" />
      </div>
      <h3 className="font-display text-brand-950 mb-2 text-lg font-bold">{service.name}</h3>
      <p className="text-muted mb-4 text-sm leading-relaxed">{service.shortDesc}</p>
      <span className="text-accent-700 inline-flex items-center gap-1 text-sm font-semibold">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

interface CitySummary {
  slug: string;
  name: string;
  state: string;
  description: string;
}

export function CityCard({ city }: { city: CitySummary }) {
  return (
    <Link
      href={`/packers-movers/${city.slug}`}
      className="group shadow-card hover:shadow-card-hover block rounded-xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1"
    >
      <div className="bg-accent-50 mb-2 flex h-9 w-9 items-center justify-center rounded-lg">
        <MapPin className="text-accent-600 h-4 w-4" />
      </div>
      <h3 className="font-display text-brand-950 text-lg font-bold">{city.name}</h3>
      <p className="text-faint mb-2 text-xs font-medium tracking-wide uppercase">{city.state}</p>
      <p className="text-muted mb-3 line-clamp-2 text-sm">{city.description}</p>
      <span className="text-accent-700 inline-flex items-center gap-1 text-sm font-semibold">
        Get moving in {city.name}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
