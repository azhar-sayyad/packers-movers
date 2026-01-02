"use client";

import { CrudClient } from "@/components/admin/crud-client";
import { useCallback } from "react";

export default function AdminPortfolioPage() {
  const loadOptions = useCallback(async () => {
    const [citiesRes, servicesRes] = await Promise.all([
      fetch("/api/admin/cities"),
      fetch("/api/admin/services"),
    ]);
    const citiesData = await citiesRes.json();
    const servicesData = await servicesRes.json();
    return {
      citySlug: (citiesData.cities ?? []).map((c: { slug: string; name: string }) => ({ value: c.slug, label: c.name })),
      serviceSlug: (servicesData.services ?? []).map((s: { slug: string; name: string }) => ({ value: s.slug, label: s.name })),
    };
  }, []);

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">Portfolio</h1>
      <p className="mb-8 text-sm text-muted">Manage project photos and completed work gallery.</p>
      <CrudClient
        apiPath="/api/admin/portfolio"
        onLoadData={(data) => data.portfolio}
        title="Portfolio Items"
        description="Add completed project photos."
        loadOptions={loadOptions}
        columns={[
          {
            key: "title",
            label: "Project",
            render: (p) => <p className="font-medium text-foreground">{p.title}</p>,
          },
          { key: "citySlug", label: "City", render: (p) => <span className="text-sm text-muted">{p.citySlug || "—"}</span> },
          { key: "serviceSlug", label: "Service", render: (p) => <span className="text-sm text-muted">{p.serviceSlug || "—"}</span> },
          { key: "tag", label: "Tag", render: (p) => <span className="text-sm">{p.tag}</span> },
          {
            key: "imageUrl",
            label: "Image",
            render: (p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt={p.title} className="h-10 w-16 rounded-md object-cover" />
            ),
          },
        ]}
        fields={[
          { name: "title", label: "Project Title", type: "text", colSpan: 2 },
          { name: "imageUrl", label: "Image URL", type: "text", colSpan: 2 },
          { name: "citySlug", label: "City", type: "select", options: [] },
          { name: "serviceSlug", label: "Service", type: "select", options: [] },
          { name: "tag", label: "Tag", type: "text", placeholder: "e.g. Completed Project" },
        ]}
      />
    </div>
  );
}