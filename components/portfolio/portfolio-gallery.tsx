"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
  citySlug?: string | null;
  serviceSlug?: string | null;
}

export function PortfolioGallery({
  items,
  cities,
  services,
}: {
  items: PortfolioItem[];
  cities: { value: string; label: string }[];
  services: { value: string; label: string }[];
}) {
  const [city, setCity] = useState("ALL");
  const [service, setService] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = items;
    if (city !== "ALL") result = result.filter((i) => i.citySlug === city);
    if (service !== "ALL") result = result.filter((i) => i.serviceSlug === service);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (i) => i.title.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, city, service, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-faint absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-foreground focus:ring-brand-500 h-11 rounded-lg border border-black/15 bg-white px-3 text-sm shadow-sm focus:ring-2 focus:outline-none"
          >
            <option value="ALL">All Cities</option>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="h-11 rounded-lg border border-black/15 bg-white px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="ALL">All Services</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-black/10 bg-white p-10 text-center text-sm text-muted">
          No portfolio items match your filters.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <div className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-card">
                <div className="h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">{item.tag}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-brand-950">{item.title}</h3>
                  <p className="mt-1 text-sm capitalize text-faint">
                    {item.citySlug}
                    {item.serviceSlug ? ` · ${item.serviceSlug}` : ""}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}