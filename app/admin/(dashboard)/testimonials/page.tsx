"use client";

import { CrudClient, BoolBadge } from "@/components/admin/crud-client";
import { Star } from "lucide-react";
import { useCallback } from "react";

export default function AdminTestimonialsPage() {
  const loadOptions = useCallback(async () => {
    const res = await fetch("/api/admin/cities");
    const data = await res.json();
    return {
      citySlug: (data.cities ?? []).map((c: { slug: string; name: string }) => ({
        value: c.slug,
        label: c.name,
      })),
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-brand-950 mb-2 text-2xl font-bold">Testimonials</h1>
      <p className="text-muted mb-8 text-sm">Manage customer reviews shown across the website.</p>
      <CrudClient
        apiPath="/api/admin/testimonials"
        onLoadData={(data) => data.testimonials}
        title="Customer Reviews"
        description="Add or edit customer testimonials."
        loadOptions={loadOptions}
        columns={[
          {
            key: "customerName",
            label: "Customer",
            render: (t) => <p className="text-foreground font-medium">{t.customerName}</p>,
          },
          {
            key: "rating",
            label: "Rating",
            render: (t) => (
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="h-3.5 w-3.5 fill-current" />
                {t.rating}/5
              </span>
            ),
          },
          { key: "citySlug", label: "City", render: (t) => <span className="text-sm text-muted">{t.citySlug || "—"}</span> },
          { key: "reviewText", label: "Review", render: (t) => <span className="max-w-72 truncate text-xs text-muted" title={t.reviewText}>{t.reviewText}</span> },
          { key: "isPublished", label: "Published", render: (t) => <BoolBadge value={t.isPublished} trueLabel="Published" falseLabel="Hidden" /> },
        ]}
        fields={[
          { name: "customerName", label: "Customer Name", type: "text", colSpan: 2 },
          { name: "citySlug", label: "City", type: "select", options: [] },
          { name: "rating", label: "Rating (1-5)", type: "number", defaultValue: 5 },
          { name: "isPublished", label: "Published", type: "boolean", defaultValue: true },
          { name: "reviewText", label: "Review Text", type: "textarea", colSpan: 2 },
        ]}
      />
    </div>
  );
}