import Link from "next/link";
import { Phone, Mail, MapPin, Clock, PackageOpen } from "lucide-react";
import { telLink } from "@/lib/phone";

interface FooterProps {
  settings: Record<string, string>;
  cities: { name: string; slug: string }[];
  services: { name: string; slug: string }[];
}

export function PublicFooter({ settings, cities, services }: FooterProps) {
  const phone = settings.phone;

  return (
    <footer className="bg-surface text-muted border-t border-black/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-accent-100 ring-accent-200 flex h-9 w-9 items-center justify-center rounded-lg ring-1">
              <PackageOpen className="text-brand-700 h-5 w-5" />
            </span>
            <span className="font-display text-foreground text-lg font-bold tracking-tight">
              Packers<span className="text-brand-600">&</span>Movers
            </span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Trusted relocation services across Madhya Pradesh and Maharashtra. Home shifting, office
            relocation, vehicle transport and warehousing — done right.
          </p>
        </div>

        <div>
          <h3 className="font-display text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-muted hover:text-brand-700 transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Service Cities
          </h3>
          <ul className="space-y-2.5 text-sm">
            {cities.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/packers-movers/${c.slug}`}
                  className="text-muted hover:text-brand-700 transition-colors"
                >
                  Packers & Movers in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Contact
          </h3>
          <ul className="text-muted space-y-3 text-sm">
            {settings.address && (
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-600 mt-0.5 h-4 w-4 shrink-0" />
                <span>{settings.address}</span>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-3">
                <Phone className="text-brand-600 h-4 w-4 shrink-0" />
                <a href={telLink(phone)} className="hover:text-brand-700 transition-colors">
                  {phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail className="text-brand-600 h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-brand-700 transition-colors"
                >
                  {settings.email}
                </a>
              </li>
            )}
            {settings.workingHours && (
              <li className="flex items-center gap-3">
                <Clock className="text-brand-600 h-4 w-4 shrink-0" />
                <span>{settings.workingHours}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-faint sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Packers & Movers Logistics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/faq" className="transition-colors hover:text-brand-700">
              FAQ
            </Link>
            <Link href="/locations" className="transition-colors hover:text-brand-700">
              Locations
            </Link>
            <Link href="/testimonials" className="transition-colors hover:text-brand-700">
              Reviews
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}