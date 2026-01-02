"use client";

import { CrudClient, BoolBadge } from "@/components/admin/crud-client";
import { useCallback } from "react";

export default function AdminFaqsPage() {
  const loadOptions = useCallback(async () => {
    const res = await fetch("/api/admin/cities");
    const data = await res.json();
    return {
      citySlug: (data.cities ?? []).map((c: { slug: string; name: string }) => ({ value: c.slug, label: c.name })),
    };
  }, []);

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">FAQs</h1>
      <p className="mb-8 text-sm text-muted">Manage frequently asked questions and their ordering.</p>
      <CrudClient
        apiPath="/api/admin/faqs"
        onLoadData={(data) => data.faqs}
        title="FAQs"
        description="Add, edit, or reorder frequently asked questions."
        loadOptions={loadOptions}
        columns={[
          { key: "order", label: "Order", render: (f) => <span className="text-sm font-medium text-muted">{f.order}</span> },
          { key: "question", label: "Question", render: (f) => <span className="max-w-72 truncate font-medium text-foreground" title={f.question}>{f.question}</span> },
          { key: "category", label: "Category", render: (f) => <span className="text-sm">{f.category}</span> },
          { key: "citySlug", label: "City", render: (f) => <span className="text-sm text-muted">{f.citySlug || "General"}</span> },
          { key: "isPublished", label: "Published", render: (f) => <BoolBadge value={f.isPublished} trueLabel="Published" falseLabel="Hidden" /> },
        ]}
        fields={[
          { name: "question", label: "Question", type: "text", colSpan: 2 },
          { name: "answer", label: "Answer", type: "textarea", colSpan: 2 },
          { name: "category", label: "Category", type: "text", placeholder: "e.g. Pricing & Estimates" },
          { name: "citySlug", label: "City (optional)", type: "select", options: [] },
          { name: "order", label: "Order", type: "number", defaultValue: 0 },
          { name: "isPublished", label: "Published", type: "boolean", defaultValue: true },
        ]}
      />
    </div>
  );
}