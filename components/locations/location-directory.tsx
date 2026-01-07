"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/motion/reveal";

interface City {
  slug: string;
  name: string;
  state: string;
  district: string;
}

interface LocationDirectoryProps {
  cities: City[];
}

export function LocationDirectory({ cities }: LocationDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("ALL");

  const states = useMemo(() => {
    const set = new Set(cities.map((c) => c.state));
    return ["ALL", ...Array.from(set).sort()];
  }, [cities]);

  const filtered = useMemo(() => {
    let result = cities;
    if (selectedState !== "ALL") {
      result = result.filter((c) => c.state === selectedState);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q)
      );
    }
    return result;
  }, [cities, query, selectedState]);

  const grouped = useMemo(() => {
    const map: Record<string, City[]> = {};
    for (const city of filtered) {
      if (!map[city.state]) map[city.state] = [];
      map[city.state].push(city);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, district, or state..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedState === state
                  ? "border-brand-950 bg-brand-950 text-white"
                  : "border-black/15 bg-white text-muted hover:bg-surface"
              }`}
            >
              {state === "ALL" ? "All States" : state}
            </button>
          ))}
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="rounded-xl border border-black/10 bg-white p-10 text-center text-sm text-muted">
          No locations match your search.
        </p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([state, stateCities]) => (
            <div key={state}>
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand-950">
                <Navigation className="h-5 w-5 text-accent-600" />
                {state}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {stateCities.map((city, i) => (
                    <Reveal key={city.slug} delay={(i % 3) * 0.06}>
                      <Link
                        href={`/packers-movers/${city.slug}`}
                        className="group flex items-start gap-3 rounded-xl border border-black/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50">
                          <MapPin className="h-5 w-5 text-accent-600" />
                        </span>
                        <div>
                          <h3 className="font-display text-sm font-bold text-brand-950">
                            Packers & Movers in {city.name}
                          </h3>
                          <p className="text-xs text-muted">
                            District: {city.district} · {state}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}