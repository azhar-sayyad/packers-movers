"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  PackageOpen,
  ChevronDown,
  ArrowRight,
  MapPin,
  Home,
  Building2,
  Truck,
  Warehouse,
  Package,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { telLink } from "@/lib/phone";
import { Button } from "@/components/ui/button";

const plainLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceIconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Truck,
  Warehouse,
  MapPin,
  Package,
};

interface DropdownItem {
  name: string;
  slug: string;
  shortDesc?: string;
  icon?: string;
}

interface DropdownCity {
  name: string;
  slug: string;
  state?: string;
}

export function PublicHeader({
  phone,
  services = [],
  cities = [],
}: {
  phone?: string;
  services?: DropdownItem[];
  cities?: DropdownCity[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "locations" | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setMobileOpen(null);
    setOpenMenu(null);
  }

  const solid = scrolled || open;
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const locationsActive = pathname === "/locations" || pathname.startsWith("/packers-movers");
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const groupedCities = cities.reduce<Record<string, typeof cities>>((acc, city) => {
    (acc[city.state ?? "Other"] ??= []).push(city);
    return acc;
  }, {});

  return (
    <header
      className={cn(
        "sticky top-0 z-40 -mb-16 w-full border-b transition-all duration-300",
        solid
          ? "border-black/10 bg-white/95 shadow-sm backdrop-blur"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              solid ? "bg-brand-950" : "border border-white/20 bg-white/10"
            )}
          >
            <PackageOpen
              className={cn(
                "h-5 w-5 transition-colors",
                solid ? "text-accent-500" : "text-accent-400"
              )}
            />
          </span>
          <span
            className={cn(
              "font-display text-lg font-bold tracking-tight transition-colors",
              solid ? "text-brand-950" : "text-white"
            )}
          >
            Packers<span className="text-accent-600">&</span>Movers
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="group relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu((prev) => (prev === "services" ? null : prev))}
          >
            <Link
              href="/services"
              onFocus={() => setOpenMenu("services")}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                servicesActive
                  ? solid
                    ? "text-accent-700"
                    : "text-accent-400"
                  : solid
                    ? "text-muted hover:text-foreground hover:bg-black/[0.04]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  openMenu === "services" && "rotate-180"
                )}
              />
            </Link>
            <div
              className={cn(
                "absolute top-full left-0 z-50 w-[34rem] transition-all duration-200",
                openMenu === "services"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0"
              )}
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-950/15 ring-1 ring-black/10">
                <div className="h-1 bg-gradient-to-r from-accent-500 to-accent-600" />
                <div className="grid grid-cols-2 gap-1 p-3">
                  {services.map((service) => {
                    const Icon = serviceIconMap[service.icon ?? ""] ?? Package;
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group/item flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-accent-100 hover:bg-accent-50/60"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-accent-100 transition-colors group-hover/item:bg-accent-600 group-hover/item:text-white group-hover/item:ring-accent-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-foreground">{service.name}</span>
                          {service.shortDesc && (
                            <span className="mt-1 block text-xs leading-snug text-muted">{service.shortDesc}</span>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/services"
                  className="group/foot flex items-center justify-between border-t border-black/[0.06] px-5 py-3 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
                >
                  View all services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/foot:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu((prev) => (prev === "locations" ? null : prev))}
          >
            <Link
              href="/locations"
              onFocus={() => setOpenMenu("locations")}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                locationsActive
                  ? solid
                    ? "text-accent-700"
                    : "text-accent-400"
                  : solid
                    ? "text-muted hover:bg-black/[0.04] hover:text-foreground"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              Locations
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  openMenu === "locations" && "rotate-180"
                )}
              />
            </Link>
            <div
              className={cn(
                "absolute left-0 top-full z-50 w-[30rem] transition-all duration-200",
                openMenu === "locations"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0"
              )}
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-950/15 ring-1 ring-black/10">
                <div className="h-1 bg-gradient-to-r from-accent-500 to-accent-600" />
                <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 p-4">
                  {Object.entries(groupedCities).map(([state, list]) => (
                    <div key={state} className="rounded-xl bg-surface/70 p-2 ring-1 ring-black/[0.06]">
                      <p className="flex items-center gap-2 px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                        {state}
                      </p>
                      <div className="space-y-0.5">
                        {list.map((city) => (
                          <Link
                            key={city.slug}
                            href={`/packers-movers/${city.slug}`}
                            className="group/city flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-brand-950 hover:shadow-sm"
                          >
                            <MapPin className="h-4 w-4 shrink-0 text-accent-500 transition-colors group-hover/city:text-accent-600" />
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/locations"
                  className="group/foot flex items-center justify-between border-t border-black/[0.06] px-5 py-3 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
                >
                  View all locations
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/foot:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {plainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? solid
                    ? "text-accent-700"
                    : "text-accent-400"
                  : solid
                    ? "text-muted hover:bg-black/[0.04] hover:text-foreground"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {phone && (
            <Button
              asChild
              size="sm"
              variant={solid ? "brand" : "outline"}
              className={cn(
                "hidden sm:inline-flex transition-colors",
                !solid && "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              )}
            >
              <a href={telLink(phone)}>
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </Button>
          )}
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/request-quote">Get Quote</Link>
          </Button>
          <button
            className={cn(
              "rounded-md p-2 transition-colors hover:bg-white/10 lg:hidden",
              solid ? "text-muted hover:bg-black/[0.04]" : "text-white"
            )}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.06] bg-white px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            <div>
              <button
                onClick={() => setMobileOpen(mobileOpen === "services" ? null : "services")}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  servicesActive ? "bg-accent-50 text-accent-700" : "text-muted hover:bg-black/[0.04]"
                )}
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", mobileOpen === "services" && "rotate-180")}
                />
              </button>
              {mobileOpen === "services" && (
                <div className="mt-1 space-y-1 border-l-2 border-accent-100 pb-1 pl-3">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-black/[0.04]"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <Link href="/services" className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent-700">
                    View all services
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setMobileOpen(mobileOpen === "locations" ? null : "locations")}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  locationsActive ? "bg-accent-50 text-accent-700" : "text-muted hover:bg-black/[0.04]"
                )}
              >
                Locations
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", mobileOpen === "locations" && "rotate-180")}
                />
              </button>
              {mobileOpen === "locations" && (
                <div className="mt-1 space-y-1 border-l-2 border-accent-100 pb-1 pl-3">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/packers-movers/${city.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-black/[0.04]"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-500" />
                      {city.name}
                    </Link>
                  ))}
                  <Link href="/locations" className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent-700">
                    View all locations
                  </Link>
                </div>
              )}
            </div>

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(link.href) ? "bg-accent-50 text-accent-700" : "text-muted hover:bg-black/[0.04]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            {phone && (
              <Button asChild variant="brand" className="flex-1">
                <a href={telLink(phone)}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            )}
            <Button asChild className="flex-1">
              <Link href="/request-quote">Get Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}